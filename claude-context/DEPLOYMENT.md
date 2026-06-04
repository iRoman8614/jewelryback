# Развёртывание

## Требуемые переменные окружения

```bash
# MySQL
DB_HOST=...
DB_PORT=3306          # опционально, по умолчанию 3306
DB_NAME=...
DB_USER=...
DB_PASSWORD=...

# Сессии — ОБЯЗАТЕЛЕН в production, иначе процесс не стартует.
ADMIN_SESSION_SECRET=...   # длинная случайная строка, не коммитить

# Начальный админ (используется только при db:seed)
ADMIN_EMAIL=...
ADMIN_PASSWORD=...

# Frontend origin (для CORS — корректировать под прод-домен)
FRONTEND_URL=https://...
```

`ADMIN_COOKIE_PASSWORD` больше не используется — секрет общий через `ADMIN_SESSION_SECRET`.

## Первое развёртывание с нуля

```bash
npm install

# DEV (из исходников)
npm run db:setup        # = db:create + db:seed
npm run dev             # nodemon src/server.js

# PROD (из dist/)
npm run build           # транспилирует src→dist + собирает AdminJS-бандл
npm run db:setup:prod   # = db:create:prod + db:seed:prod
npm start
```

`db:create` идемпотентен (создаёт только отсутствующие таблицы), `db:seed`
тоже (повторный запуск не дублирует категории/админа/конфиги).

## Полный сброс БД (УДАЛЯЕТ ДАННЫЕ)

```bash
npm run db:reset        # dropAll + create + seed
```

## Docker

```bash
docker compose up --build
```

Multi-stage Dockerfile:
- **builder** — ставит все зависимости (включая devDeps), транспилирует, собирает AdminJS-бандл в `dist/.adminjs/`.
- **runtime** — `npm install --omit=dev`, копирует только `dist/`. Запускает `node dist/server.js`.

В runtime установлены `NODE_ENV=production` и `ADMIN_JS_SKIP_BUNDLE=true` — последнее обязательно, иначе AdminJS попробует ребандлить компоненты без babel и упадёт.

Перед первым запуском в Docker нужно прогнать `db:setup:prod` (можно отдельным
job'ом, либо `docker compose run --rm app npm run db:setup:prod`).

### Тома

- `uploads/` — пользовательские картинки. **Монтировать как volume**, иначе теряются при пересборке образа.

### Переменные в docker-compose

Прокидывать `ADMIN_SESSION_SECRET`, `DB_*`, `ADMIN_EMAIL`/`ADMIN_PASSWORD`,
`FRONTEND_URL` через `environment:` или `.env`.

## Проверка после развёртывания

1. `curl http://localhost:5000/` → 200 «Server is running...».
2. Открыть `/admin` → форма логина → войти с `ADMIN_EMAIL`/`ADMIN_PASSWORD`.
3. После логина дёрнуть какой-нибудь admin-only API (`GET /api/orders/filter`) с теми же куками — должен вернуть данные, не 401.
4. Создать тестовый заказ через `POST /api/orders` — должен пройти.

Если `/api` даёт 401 после успешного логина — нарушен инвариант #1 (см.
`INVARIANTS.md`), сессии разъехались.

## Откат

Поскольку миграций нет, «откат» означает либо `db:reset`, либо ручной SQL.
Перед опасными изменениями моделей на живой базе — **дамп**:

```bash
mysqldump -u $DB_USER -p $DB_NAME > backup-$(date +%F).sql
```

## Когда БД появится в проде с реальными данными

`sync()` опасен на живой базе (теряет данные). В этот момент нужно вернуть
**миграции** для дальнейших изменений схемы. См. `INVARIANTS.md` #2 — это
сознательно отложено, не сюрприз.
