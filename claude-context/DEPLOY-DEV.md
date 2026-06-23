# DEPLOY-DEV.md — деплой на dev-сервер Timeweb

Пошаговая инструкция для Claude Code. Сервер уже куплен (Timeweb Cloud,
Ubuntu 24.04), SSH-доступ по ключу настроен через alias `jewelry-dev` в
`~/.ssh/config`. Фронтенд на Vercel — на сервере поднимаем только MySQL
и бэкенд.

**IP сервера:** 77.233.223.30
**SSH-алиас:** `jewelry-dev` (т.е. `ssh jewelry-dev "<команда>"`)

---

## Часть 0. Что в итоге будет работать

- На сервере 2 Docker-контейнера: `mysql` (MySQL 8) и `backend` (наш Node).
- БД и uploads — на томах, переживают рестарт контейнеров.
- Бэкенд слушает порт 5000 на публичном IP. Frontend на Vercel ходит на него по `http://77.233.223.30:5000`.
- Админка: `http://77.233.223.30:5000/admin`, логин/пароль из `.env`.

> ⚠️ HTTPS на дев не настраиваем (нужен домен и nginx с certbot). Для дева
> http — приемлемо. На прод — обязательно HTTPS.

---

## Часть 1. Подготовка сервера (одноразово)

Все команды — **локально на маке**, в виде `ssh jewelry-dev "..."`.
Claude Code выполняет одну за другой, проверяя exit code.

### 1.1. Обновить систему

```bash
ssh jewelry-dev "apt update && apt upgrade -y"
```

Может выдать предупреждение про рестарт сервисов — это нормально, идём дальше.

### 1.2. Установить Docker и docker compose plugin

```bash
ssh jewelry-dev "curl -fsSL https://get.docker.com | sh"
ssh jewelry-dev "docker --version && docker compose version"
```

Должны вывестись версии (Docker 24+, Compose v2). Если `docker compose version`
ругается — установить плагин:

```bash
ssh jewelry-dev "apt install -y docker-compose-plugin"
```

### 1.3. Настроить файрвол (UFW)

Открываем только то, что нужно: SSH (22) и бэк (5000). MySQL **наружу не открываем** —
к нему ходит только бэк по внутренней сети Docker.

```bash
ssh jewelry-dev "ufw allow 22/tcp && ufw allow 5000/tcp && ufw --force enable && ufw status"
```

Должно вывести `Status: active` с двумя правилами.

> ⚠️ Внимание: если случайно открыть только 5000 без 22 и активировать UFW,
> ты потеряешь SSH-доступ. В команде выше 22 идёт первой — это правильно.

### 1.4. Создать рабочую директорию для проекта

```bash
ssh jewelry-dev "mkdir -p /srv/jewelry && chmod 750 /srv/jewelry"
```

Проект будет жить в `/srv/jewelry`. Тома Docker — там же.

### 1.5. Проверка

```bash
ssh jewelry-dev "docker run --rm hello-world"
```

Должно вывести `Hello from Docker!`. Если так — сервер готов.

---

## Часть 2. Подготовка локального проекта

Делается один раз. Все команды — **локально**, в корне репо.

### 2.1. Обновить `docker-compose.yml`

Текущий compose рассчитан на внешнюю сеть и не содержит MySQL. Заменяем
его полностью. Создай файл `docker-compose.yml` в корне проекта со следующим
содержимым:

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: jewelry-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - jewelry-net
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p$$MYSQL_ROOT_PASSWORD"]
      interval: 10s
      timeout: 5s
      retries: 10
    # MySQL НЕ публикуем наружу — только во внутренней сети.

  backend:
    build: .
    container_name: jewelry-backend
    restart: unless-stopped
    depends_on:
      mysql:
        condition: service_healthy
    env_file:
      - .env
    environment:
      # Внутри docker сети backend ходит к mysql по имени сервиса
      DB_HOST: mysql
      DB_PORT: 3306
    ports:
      - "5000:5000"
    volumes:
      - ./uploads:/app/uploads
    networks:
      - jewelry-net

volumes:
  mysql_data:

networks:
  jewelry-net:
    driver: bridge
```

Ключевые отличия от старого compose:
- Добавлен сервис `mysql` с healthcheck.
- `backend` ждёт `mysql` через `depends_on: service_healthy`.
- `DB_HOST=mysql` (имя сервиса) переопределяется через `environment` поверх `.env` — так что в `.env` хост может быть любой, в Docker всегда `mysql`.
- Сеть внутренняя `jewelry-net`, не external. Не надо ничего создавать руками.
- MySQL **не публикуется наружу** (нет `ports:` у сервиса mysql).

### 2.2. Создать `.env` локально (НЕ коммитить!)

В корне проекта создаём `.env`:

```bash
cat > .env << 'EOF'
# ===== БД =====
DB_HOST=mysql
DB_PORT=3306
DB_NAME=jewelry
DB_USER=jewelry
DB_PASSWORD=<СГЕНЕРИТЬ_СТРОКА_32>
MYSQL_ROOT_PASSWORD=<СГЕНЕРИТЬ_СТРОКА_32>

# ===== Сессии =====
# Обязательно — иначе сервер не стартует в production
ADMIN_SESSION_SECRET=<СГЕНЕРИТЬ_СТРОКА_64>

# ===== Начальный админ (используется только при db:seed) =====
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<СГЕНЕРИТЬ_СТРОКА_24>

# ===== Прочее =====
NODE_ENV=production
PORT=5000
ADMIN_JS_SKIP_BUNDLE=true
EOF
```

Сгенерировать секреты:

```bash
echo "DB_PASSWORD:           $(openssl rand -base64 24)"
echo "MYSQL_ROOT_PASSWORD:   $(openssl rand -base64 24)"
echo "ADMIN_SESSION_SECRET:  $(openssl rand -base64 48)"
echo "ADMIN_PASSWORD:        $(openssl rand -base64 18)"
```

Подставь полученные значения в `.env` вместо `<СГЕНЕРИТЬ_СТРОКА_N>`. **Сохрани
ADMIN_EMAIL и ADMIN_PASSWORD отдельно у себя** — этим логином ты потом
заходишь в `/admin`.

Убедись, что `.env` в `.gitignore` (должен быть — проверь `grep '^\.env$' .gitignore`).

### 2.3. Проверить, что `build` собирает AdminJS-бандл

Открой `package.json`. В строке `"build"` должен присутствовать шаг сборки
AdminJS-бандла (это inv #3 в INVARIANTS.md). Должно быть примерно так:

```json
"build:components": "babel src/adminComponents --out-dir dist/adminComponents --extensions \".jsx\" --copy-files --source-maps",
"build:bundle": "node dist/bundle.js",
"build": "rm -rf dist && babel src --out-dir dist --copy-files && npm run build:components && npm run build:bundle"
```

Если `build:bundle` отсутствует в `"build"` — добавь, иначе в проде кастомные
компоненты AdminJS не отрендерятся (см. INVARIANTS.md #3 и HISTORY.md #1).

### 2.4. Создать `.dockerignore`-проверку (если ещё не было)

Убедись, что в `.dockerignore` есть `node_modules`, `.env`, `uploads`, `.git`,
`.idea`, `__MACOSX`. Если чего-то нет — добавь, чтобы `COPY . .` в Dockerfile
не тащил мусор в образ.

---

## Часть 3. Первая заливка проекта на сервер

### 3.1. rsync с правильными исключениями

```bash
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  --exclude='uploads' \
  --exclude='.idea' \
  --exclude='__MACOSX' \
  --exclude='.DS_Store' \
  ./ jewelry-dev:/srv/jewelry/
```

Объяснение исключений:
- `node_modules`, `dist` — пересоберутся на сервере в Docker.
- `.git` — на сервере не нужен (мы не пушим оттуда).
- `uploads` — папка с загруженными картинками: пустая локально, на сервере хранится в томе.
- `.idea`, `__MACOSX`, `.DS_Store` — мусор.

`--delete` означает «всё, чего нет локально, удалить на сервере». Безопасно
здесь, потому что важные данные (БД, uploads) лежат вне `/srv/jewelry`, в
Docker-томах.

### 3.2. Проверка

```bash
ssh jewelry-dev "ls /srv/jewelry/"
```

Должны быть видны `src`, `package.json`, `Dockerfile`, `docker-compose.yml`,
`.env`, `claude-context` и т.д.

Проверь, что `.env` доехал (он скрытый, может незаметно):

```bash
ssh jewelry-dev "ls -la /srv/jewelry/.env && wc -l /srv/jewelry/.env"
```

Должен показать файл и количество строк (~12).

---

## Часть 4. Первый запуск

### 4.1. Сборка и старт контейнеров

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose up -d --build"
```

Первый build занимает 2-5 минут (тянет node:18-alpine, ставит deps, билдит).
Видны логи каждого шага.

### 4.2. Дождаться, пока MySQL поднимется (через healthcheck)

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose ps"
```

Ждём, пока в столбце State у `jewelry-mysql` появится `healthy` (10-30 секунд).
Если `starting` — подожди ещё, повтори команду.

`jewelry-backend` стартует автоматически после того, как mysql станет healthy
(`depends_on: condition: service_healthy`).

### 4.3. Создать схему БД и засеять начальные данные

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose exec backend npm run db:setup:prod"
```

Это создаст БД из моделей (`db:create:prod`) и засеет 5 категорий + конфиги +
начального админа из `ADMIN_EMAIL`/`ADMIN_PASSWORD`.

Должно вывести:
```
✅ Database "jewelry" is present...
✅ Schema created...
✅ Session store table ensured.
✅ Categories seeded.
✅ homepage_config: initial row created.
... (остальные singletons)
✅ Initial admin created: admin@example.com
🎉 db-seed finished.
```

### 4.4. Проверить, что бэк работает

```bash
ssh jewelry-dev "curl -s http://localhost:5000/"
```

Должно вернуть 200 с текстом типа `Server is running...`.

С твоего мака:

```bash
curl -i http://77.233.223.30:5000/
```

То же самое.

### 4.5. Зайти в админку

В браузере: **http://77.233.223.30:5000/admin**

Войти как `ADMIN_EMAIL` / `ADMIN_PASSWORD` из `.env`. Если форма принимает —
сессия работает (см. INVARIANTS.md #1).

### 4.6. Sanity check — API под админом

После логина в браузере, в DevTools → Network скопируй cookie `jewelry.sid`,
либо просто из терминала (с того же origin'а) проверь, что админ-API доступен:

```bash
# из мака не получится без cookie — но из админки проверь, что навигация по
# заказам, категориям, продуктам работает без 401.
```

Если 401 на админских API — порвалась связка сессий (INVARIANTS.md #1).

---

## Часть 5. Обновление проекта (при изменениях в коде)

После любых правок на маке:

```bash
# 1. Залить изменения
rsync -avz --delete \
  --exclude='node_modules' --exclude='.git' --exclude='dist' \
  --exclude='uploads' --exclude='.idea' --exclude='__MACOSX' --exclude='.DS_Store' \
  ./ jewelry-dev:/srv/jewelry/

# 2. Пересобрать и перезапустить только backend (mysql не трогаем)
ssh jewelry-dev "cd /srv/jewelry && docker compose up -d --build backend"

# 3. Посмотреть логи (Ctrl+C чтобы выйти)
ssh jewelry-dev "cd /srv/jewelry && docker compose logs -f --tail=50 backend"
```

**Когда нужен `db:setup` повторно:** только если изменилась модель → новая
колонка/таблица. Тогда:

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose exec backend npm run db:create:prod"
```

`db:create` идемпотентен: создаёт только отсутствующие таблицы, существующие
**не трогает**. Это `sync()` без `alter`, см. INVARIANTS.md #2.

> ⚠️ Если изменения в существующих колонках (тип, ENUM, длина) — `db:create`
> не подхватит. На дев можно `db:reset` (УДАЛЯЕТ ДАННЫЕ). На прод — никогда,
> там нужны миграции (см. INVARIANTS.md #2).

---

## Часть 6. Отладка и частые проблемы

### Посмотреть логи

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose logs -f backend"  # бэк
ssh jewelry-dev "cd /srv/jewelry && docker compose logs -f mysql"    # mysql
ssh jewelry-dev "cd /srv/jewelry && docker compose ps"               # статусы
```

### Зайти внутрь контейнера

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose exec backend sh"
ssh jewelry-dev "cd /srv/jewelry && docker compose exec mysql mysql -uroot -p\$MYSQL_ROOT_PASSWORD jewelry"
```

### Полный рестарт

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose down && docker compose up -d"
```

### `db:setup` падает с `Unknown database 'jewelry'`

MySQL ещё не успел создать БД из переменных окружения. Подожди 10 секунд и
повтори, либо проверь `docker compose logs mysql` — там должна быть строка
про создание БД.

### Бэк падает с `ADMIN_SESSION_SECRET is not set`

`.env` не доехал на сервер, либо в нём нет переменной. Проверь:

```bash
ssh jewelry-dev "grep ADMIN_SESSION_SECRET /srv/jewelry/.env"
```

### Кастомные компоненты в `/admin` не отрисованы (поля пустые, ошибки JS в консоли)

`build:bundle` не выполнился. См. часть 2.3. Пересобери:

```bash
ssh jewelry-dev "cd /srv/jewelry && docker compose build --no-cache backend && docker compose up -d backend"
```

### Залогинился в `/admin`, но API даёт 401

Сессия порвалась — нарушен INVARIANTS.md #1. Проверь, что в `admin.js` всё
ещё используются `SESSION_COOKIE_NAME` / `SESSION_SECRET_VALUE` из общего
`config/session.js`, и `store: sessionStore` передаётся в `buildAuthenticatedRouter`.

---

## Часть 7. Уничтожение сервера (когда дев больше не нужен)

Локально:

```bash
# Снять и удалить контейнеры + тома (потеря всех данных БД!)
ssh jewelry-dev "cd /srv/jewelry && docker compose down -v"

# Опционально: удалить проект с диска
ssh jewelry-dev "rm -rf /srv/jewelry"
```

Сам сервер — удалить в личном кабинете Timeweb. На этом всё.

---

## Что НЕ делать (важно)

- ❌ **Не коммить `.env`** — там пароли и секрет сессии.
- ❌ **Не открывать MySQL-порт наружу** (`3306` в UFW). Только внутри Docker-сети.
- ❌ **Не пускать `db:reset` на прод** (когда появятся реальные данные).
- ❌ **Не использовать root-пароль сервера** для SSH — ключ настроен, root-пароль в Timeweb остаётся только как fallback. На прод его лучше отключить совсем.
- ❌ **Не править файлы напрямую на сервере** (`vim` в `/srv/jewelry/src/...`) — следующий rsync с `--delete` их сотрёт. Правишь локально → rsync → ребилд.

---

## Когда соберёшься на прод

1. Купить домен, направить A-запись на IP прод-сервера.
2. Поставить nginx + certbot (Let's Encrypt) на серверe, проксировать HTTPS → 5000.
3. В `.env` поставить `NODE_ENV=production` и `FRONTEND_URL=https://yourdomain.com`.
4. В `src/server.js` в `whitelist` оставить только прод-домены (см. BACKLOG #8 про CORS-чистку).
5. Включить бэкапы в Timeweb (300₽/мес) — там уже реальные данные клиентов.
6. Когда появятся реальные данные — ввести миграции для последующих изменений схемы (см. INVARIANTS.md #2).
