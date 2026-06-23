# DEPLOY-DEV.md — ручной деплой на dev-сервер Timeweb

Пошаговая инструкция, которую ты выполняешь **сам, копируя команды**.
Сервер уже куплен, SSH-доступ настроен.

- **Сервер:** Timeweb Cloud, Ubuntu 24.04, IP `77.233.223.30`
- **SSH-алиас:** `jewelry-dev` (т.е. `ssh jewelry-dev`)
- **Архитектура:** 2 контейнера (MySQL 8 + Node-backend) + нативный nginx на хосте
- **Фронт:** остаётся на Vercel
- **Доступ:** `http://77.233.223.30/admin` и `http://77.233.223.30/api/...` (через nginx, порт 80)

---

## 0. Подсказки по навигации

- Все команды помечены: **[ЛОКАЛЬНО]** (на маке, в корне проекта) или **[НА СЕРВЕРЕ]** (`ssh jewelry-dev` без аргументов → попадаешь внутрь сервера, там вводишь команду).
- После многих команд есть «Проверка» — выполни её и убедись, что вывод соответствует. Если нет — стой, ищи причину, не иди дальше.
- Команды для копирования — в блоках с тройными бэктиками. Если в команде есть `<ПОДСТАВЬ>` — там надо вписать своё значение.

---

## 1. Подготовка проекта локально

### 1.1. ⚠️ Пересоздать `.env` (старый скомпрометирован)

**[ЛОКАЛЬНО]** В корне проекта удалить старый и сгенерить новые секреты:

```bash
rm -f .env
echo "DB_PASSWORD:          $(openssl rand -base64 24)"
echo "MYSQL_ROOT_PASSWORD:  $(openssl rand -base64 24)"
echo "ADMIN_SESSION_SECRET: $(openssl rand -base64 48)"
echo "ADMIN_PASSWORD:       $(openssl rand -base64 18)"
```

Скопируй четыре строки куда-нибудь во временное место (Notes / Bitwarden).
Особенно `ADMIN_PASSWORD` — это твой пароль для входа в админку.

Теперь создай свежий `.env` в корне проекта со следующим содержимым,
подставив свои сгенерённые значения:

```ini
# ===== БД =====
DB_HOST=mysql
DB_PORT=3306
DB_NAME=jewelry
DB_USER=jewelry
DB_PASSWORD=<СГЕНЕРЁННЫЙ_DB_PASSWORD>
MYSQL_ROOT_PASSWORD=<СГЕНЕРЁННЫЙ_MYSQL_ROOT_PASSWORD>

# ===== Сессии =====
ADMIN_SESSION_SECRET=<СГЕНЕРЁННЫЙ_ADMIN_SESSION_SECRET>

# ===== Начальный админ =====
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<СГЕНЕРЁННЫЙ_ADMIN_PASSWORD>

# ===== Прочее =====
NODE_ENV=production
PORT=5000
ADMIN_JS_SKIP_BUNDLE=true
```

**Проверка:**

```bash
grep -E '^[A-Z_]+=' .env | wc -l   # должно быть 10
grep -c '<СГЕНЕРЁННЫЙ' .env         # должно быть 0 — все плейсхолдеры заменены
```

### 1.2. Изменить `docker-compose.yml` — bind backend только на localhost

В файле `docker-compose.yml` найди блок `backend`, строку:

```yaml
    ports:
      - "5000:5000"
```

Замени на:

```yaml
    ports:
      - "127.0.0.1:5000:5000"
```

Это значит: контейнер `backend` слушает только на `127.0.0.1:5000` хост-машины,
наружу из интернета он не виден. Доступ снаружи будет **только через nginx**
на порту 80.

### 1.3. Проверить `.gitignore` и `.dockerignore`

**[ЛОКАЛЬНО]** Убедись, что `.env` в `.gitignore`:

```bash
grep -E '^\.env$' .gitignore
```

Должно вывести `.env`. Если нет — добавь руками в `.gitignore`.

---

## 2. Подготовка сервера (одноразово)

Подключись к серверу одной командой:

```bash
ssh jewelry-dev
```

Дальше всё **[НА СЕРВЕРЕ]**, под `root@msk-1-vm-uisg:~#`.

### 2.1. Обновить систему

```bash
apt update && apt upgrade -y
```

Если спросит «restart services» — нажми Tab, выбери всё, OK.

### 2.2. Установить Docker

```bash
curl -fsSL https://get.docker.com | sh
```

**Проверка:**

```bash
docker --version
docker compose version
```

Должны вывестись версии (Docker 24+, compose v2.x).

### 2.3. Установить nginx

```bash
apt install -y nginx
systemctl enable --now nginx
systemctl status nginx --no-pager | head -5
```

Должен быть `active (running)`. Выйти из status — нажми `q`.

### 2.4. Настроить файрвол

Открываем только SSH (22) и HTTP (80). Бэк-порт 5000 наружу **не открываем** —
он только для nginx через localhost.

```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw --force enable
ufw status
```

Должно быть `Status: active` с двумя правилами.

> ⚠️ Если по ошибке откроешь UFW без 22 — потеряешь SSH-доступ. В команде
> выше 22 идёт первой, всё ок.

### 2.5. Создать рабочую директорию

```bash
mkdir -p /srv/jewelry
chmod 750 /srv/jewelry
ls -ld /srv/jewelry
```

Должно вывести `drwxr-x--- 2 root root ...`.

### 2.6. Smoke-тест Docker

```bash
docker run --rm hello-world
```

Должен вывести `Hello from Docker!`. Если так — сервер готов.

Выйди обратно на мак:

```bash
exit
```

---

## 3. Заливка проекта на сервер

### 3.1. rsync

**[ЛОКАЛЬНО]** В корне проекта:

```bash
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  --exclude='uploads' \
  --exclude='.idea' \
  --exclude='__MACOSX' \
  --exclude='.DS_Store' \
  --exclude='.adminjs/bundle.js' \
  ./ jewelry-dev:/srv/jewelry/
```

Пояснение:
- `node_modules`, `dist`, `.adminjs/bundle.js` — пересобираются в Docker, незачем тащить.
- `uploads` — это том Docker, хранится на сервере отдельно.
- `--delete` — то, чего нет локально, удаляется на сервере. Безопасно, потому что БД и uploads вне `/srv/jewelry`.

### 3.2. Проверка, что `.env` доехал

```bash
ssh jewelry-dev "ls -la /srv/jewelry/.env && head -2 /srv/jewelry/.env"
```

Должно вывести права (`-rw-r--r--` или подобное) и первые две строки (`# ===== БД =====` и `DB_HOST=mysql`).

Если `.env` не доехал — rsync мог его исключить из-за глобального `.gitignore` (rsync сам по себе не смотрит в `.gitignore`, но проверь, что в команде нет `--filter ':- .gitignore'`). В нашем варианте `.env` должен попасть.

---

## 4. Настройка nginx

### 4.1. Создать конфиг сайта

**[НА СЕРВЕРЕ]** (зайди по `ssh jewelry-dev`):

```bash
cat > /etc/nginx/sites-available/jewelry << 'EOF'
server {
    listen 80;
    server_name 77.233.223.30 _;

    # Размер тела запроса — крупнее, чем стандарт, под загрузку картинок (10 МБ + запас).
    client_max_body_size 15m;

    # Прокси на backend в Docker (порт открыт только на localhost — см. compose).
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;

        # Чтобы express видел реального клиента и протокол.
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Таймауты на длинные операции (sync, бандл, тяжёлые запросы).
        proxy_connect_timeout 60s;
        proxy_send_timeout    120s;
        proxy_read_timeout    120s;

        # WebSocket / keep-alive (AdminJS иногда использует).
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        "upgrade";
    }
}
EOF
```

### 4.2. Включить сайт и убрать дефолтный

```bash
ln -sf /etc/nginx/sites-available/jewelry /etc/nginx/sites-enabled/jewelry
rm -f /etc/nginx/sites-enabled/default
```

### 4.3. Проверить и применить конфиг

```bash
nginx -t
```

Должно вывести `syntax is ok` и `test is successful`. Если ошибки — проверь конфиг ещё раз.

```bash
systemctl reload nginx
```

Тишина — значит ок.

### 4.4. Sanity-чек nginx

```bash
curl -I http://localhost
```

Сейчас бэка ещё нет, поэтому будет либо `502 Bad Gateway`, либо `connection refused`.
Это нормально — nginx настроен, осталось запустить бэк.

Выйди обратно: `exit`.

---

## 5. Первый запуск

### 5.1. Сборка и старт контейнеров

**[ЛОКАЛЬНО]**:

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose up -d --build"
```

Первый build занимает 3-7 минут (тянет образы, ставит deps, билдит AdminJS).
Логи можно посмотреть отдельно (см. 5.4).

### 5.2. Дождаться, пока MySQL станет healthy

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose ps"
```

Запускай эту команду каждые ~10 секунд, пока в столбце `STATUS` у `jewelry-mysql`
не появится `(healthy)`. Обычно 15-30 секунд.

`jewelry-backend` стартует автоматически, когда mysql станет healthy
(`depends_on: service_healthy`).

### 5.3. Создать схему БД и засеять начальные данные

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose exec backend npm run db:setup:prod"
```

Должно вывести:
```
✅ Database "jewelry" is present...
✅ Connected to the database.
✅ Schema created (create missing only).
✅ Session store table ensured.
🎉 db-create finished.
...
✅ Categories seeded.
✅ homepage_config: initial row created.
... (остальные singletons)
✅ Initial admin created: admin@example.com
🎉 db-seed finished.
```

### 5.4. Проверки

**Bэк жив (изнутри сервера, минуя nginx):**

```bash
ssh jewelry-dev "curl -s http://localhost:5000/"
```

Должно вернуть строку про работающий сервер.

**Bэк через nginx (как извне):**

```bash
curl -i http://77.233.223.30/
```

Должно быть `200 OK` и та же строка про сервер.

**Логи бэка (на случай ошибок):**

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose logs --tail=50 backend"
```

**Зайти в админку:**

В браузере: **http://77.233.223.30/admin**

Логин — `admin@example.com` (или то, что у тебя в `ADMIN_EMAIL`), пароль — `ADMIN_PASSWORD` из `.env`.

Если форма принимает и появляется дашборд админки — деплой успешен.

---

## 6. Обновление при изменениях в коде

После любых правок локально:

```bash
# 1. Залить
rsync -avz --delete \
  --exclude='node_modules' --exclude='.git' --exclude='dist' \
  --exclude='uploads' --exclude='.idea' --exclude='__MACOSX' \
  --exclude='.DS_Store' --exclude='.adminjs/bundle.js' \
  ./ jewelry-dev:/srv/jewelry/

# 2. Пересобрать backend (mysql не трогаем)
ssh jewelry-dev "cd /srv/jewelry && docker compose up -d --build backend"

# 3. Посмотреть логи (Ctrl+C чтобы выйти)
ssh jewelry-dev "cd /srv/jewelry && docker compose logs -f --tail=50 backend"
```

**Когда нужен `db:setup` повторно:** только если добавил новую модель/колонку.

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose exec backend npm run db:create:prod"
```

`db:create` идемпотентен: создаёт только отсутствующие таблицы. Для существующих
**ничего не меняет** (см. `INVARIANTS.md` #2).

> ⚠️ Если изменилась колонка в существующей таблице (тип, ENUM) — `db:create`
> это не подхватит. На дев можно полный сброс (УДАЛЯЕТ ДАННЫЕ):
> ```bash
> ssh jewelry-dev "cd /srv/jewelry && docker compose exec backend npm run db:reset:prod"
> ```
> Но `db:reset:prod` у тебя нет в scripts — добавь, если понадобится, по аналогии с `db:reset`:
> ```json
> "db:reset:prod": "node dist/scripts/db-create.js --force && node dist/scripts/db-seed.js"
> ```

---

## 7. Отладка / частые проблемы

### Посмотреть логи

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose logs -f backend"
ssh jewelry-dev "cd /srv/jewelry && docker compose logs -f mysql"
ssh jewelry-dev "cd /srv/jewelry && docker compose ps"
ssh jewelry-dev "tail -50 /var/log/nginx/error.log"
ssh jewelry-dev "tail -50 /var/log/nginx/access.log"
```

### Зайти внутрь контейнеров

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose exec backend sh"
ssh jewelry-dev 'cd /srv/jewelry && docker compose exec mysql sh -c "mysql -uroot -p\$MYSQL_ROOT_PASSWORD jewelry"'
```

### Перезапуск

```bash
# Только backend (если поменял код)
ssh jewelry-dev "cd /srv/jewelry && docker compose restart backend"

# Всё целиком
ssh jewelry-dev "cd /srv/jewelry && docker compose down && docker compose up -d"

# Nginx
ssh jewelry-dev "systemctl reload nginx"
```

### Типичные ошибки

**`502 Bad Gateway` при заходе на /admin**
- Backend не запущен или упал. `docker compose ps` → должен быть `Up`.
- `docker compose logs backend` → смотри ошибку.

**`db:setup` падает с `Unknown database 'jewelry'`**
- MySQL ещё инициализируется. Подожди 15 секунд и повтори. Или проверь `docker compose logs mysql` — должна быть запись про создание `jewelry`.

**Backend падает при старте с `ADMIN_SESSION_SECRET is not set`**
- `.env` не доехал на сервер. Проверь: `ssh jewelry-dev "grep ADMIN_SESSION_SECRET /srv/jewelry/.env"`.

**Залогинился в `/admin`, но API даёт 401**
- Порвалась связка сессий — нарушен `INVARIANTS.md` #1. Скорее всего кто-то поменял `admin.js`, и `cookieName`/`cookiePassword` больше не совпадают с глобальным session-конфигом.

**В админке кастомные компоненты не отрисованы (загрузка картинок, пароль)**
- `build:bundle` не отработал. Пересобери с `--no-cache`:
  ```bash
  ssh jewelry-dev "cd /srv/jewelry && docker compose build --no-cache backend && docker compose up -d backend"
  ```

**nginx: `proxy_pass http://127.0.0.1:5000` даёт `connection refused`**
- Backend не маппит порт на localhost. Проверь, что в `docker-compose.yml` стоит `"127.0.0.1:5000:5000"`, не `"5000:5000"`.
- Из контейнера nginx видит `127.0.0.1` хоста? Видит, потому что nginx **нативный**, не в Docker. Если в будущем переедешь на nginx в compose — там надо будет `proxy_pass http://backend:5000` (по имени сервиса).

---

## 8. Снос дев-сервера (когда отладишь и пора на прод)

```bash
# Остановить и удалить контейнеры + тома (потеря данных БД и uploads!)
ssh jewelry-dev "cd /srv/jewelry && docker compose down -v"

# Удалить проект с диска
ssh jewelry-dev "rm -rf /srv/jewelry"

# Сам сервер — удалить в личном кабинете Timeweb (значок корзины на дашборде сервера).
```

---

## 9. Что НЕ делать

- ❌ **Не коммить `.env`** (там пароли). Уже в `.gitignore`.
- ❌ **Не открывать MySQL-порт наружу** (3306 в UFW). Только во внутренней Docker-сети.
- ❌ **Не открывать порт 5000 наружу** — после изменения `ports` в compose он должен быть `127.0.0.1:5000:5000`.
- ❌ **Не использовать root-пароль сервера** для SSH. Ключ настроен. На прод — отключить пароль вовсе.
- ❌ **Не править файлы напрямую на сервере** (`vim /srv/jewelry/src/...`). Следующий rsync с `--delete` их сотрёт. Правишь локально → rsync → ребилд.
- ❌ **Не пускать `db:reset` на прод**, когда появятся реальные данные.

---

## 10. Когда соберёшься на прод

1. Купить домен, направить A-запись на IP прод-сервера.
2. Поставить certbot и получить SSL: `apt install certbot python3-certbot-nginx && certbot --nginx -d yourdomain.com`.
   Он сам перепишет nginx-конфиг на HTTPS.
3. В `.env` `FRONTEND_URL=https://yourdomain.com`.
4. В `src/server.js` в `whitelist` оставить только прод-домены (BACKLOG #8).
5. В `src/config/session.js` поменять `sameSite: 'lax'` → `'none'`, `secure: true` (BACKLOG #9). Плюс `app.set('trust proxy', 1)` в `server.js` — без этого express не поймёт, что за reverse proxy.
6. Включить бэкапы в Timeweb (300₽/мес) — там уже реальные данные.
7. Когда появятся реальные данные — ввести миграции для последующих изменений схемы (INVARIANTS.md #2).
8. Закрыть оставшиеся пункты бэклога (helmet, rate-limit на write-эндпоинты, валидация через zod, cleanup-страховки).