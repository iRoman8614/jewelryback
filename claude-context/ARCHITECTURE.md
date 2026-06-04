# Архитектура

## Что это

Бэкенд интернет-магазина ювелирных украшений. Двуязычный (RU/EN). Гостевой
чекаут — покупатель **не регистрируется**, кладёт товары в localStorage на
фронте, оформляет заказ через форму. Админка — отдельный логин через
встроенную форму AdminJS.

Фронт — Next.js на Vercel (другой репозиторий, другой домен).

## Стек

- **Node.js 18** (ESM, `"type": "module"`)
- **Express 5**
- **Sequelize 6** + **mysql2** → MySQL 8 (диалект `utf8mb4`)
- **AdminJS 7** + `@adminjs/express` + `@adminjs/sequelize` — админ-панель
- **express-session** + **connect-session-sequelize** — единая сессия,
  persist в MySQL (таблица `Sessions`)
- **multer** — загрузка картинок товаров (лимит 10 МБ)
- **bcryptjs** — хеши паролей админа
- **Babel** — транспиляция (нужна для JSX-компонентов AdminJS)
- **Docker** — двухстадийная сборка (builder + runtime)

## Структура папок

```
src/
  server.js              # точка входа Express, монтаж middleware/роутеров
  admin.js               # вся конфигурация AdminJS (ресурсы, переводы, UI)
  bundle.js              # prod-скрипт прекомпиляции AdminJS-бандла
  config/
    database.js          # Sequelize-инстанс (порт/charset из env)
    session.js           # ЕДИНЫЙ session store + опции (используется и server, и admin)
  models/
    associations.js      # ЕДИНОЕ место объявления всех FK/relations
    *.js                 # модели Sequelize — источник правды о схеме БД
  scripts/
    db-create.js         # создание БД и всех таблиц через sync() (одноразово)
    db-seed.js           # идемпотентное наполнение (категории, конфиги, админ)
  routes/                # Express-роутеры, монтируются под /api
  controllers/           # бизнес-логика
  middleware/
    authMiddleware.js    # isAdminAuthenticated — читает req.session.adminUser
    uploadMiddleware.js  # multer с лимитом 10 МБ
    errorHandler.js
  services/
    emailService.js      # ЗАГЛУШКА (см. BACKLOG)
  adminComponents/       # JSX-компоненты для AdminJS (transpile -> dist)
  translations/          # i18n-ресурсы AdminJS

.adminjs/
  entry.js               # манифест компонентов для AdminJS-бандлера
  bundle.js              # генерируется build (в gitignore)

uploads/                 # загруженные картинки (вне образа, монтировать том)
```

## Главные потоки

### Запуск приложения

`server.js`:
1. CORS → JSON parser (30 МБ) → static `/uploads` → **`sessionMiddleware`** (общая сессия).
2. `/api/uploads` (под админом) — смонтирован **после** session.
3. `/admin/login` — лог попыток + rate-limit (см. BACKLOG: лимитер не на том пути).
4. `/api` — основной роутер.
5. `errorHandler` в конце.

`Sequelize.authenticate()` → `defineAssociations()` → загрузка AdminJS.
**Схему сервер не трогает** — она создаётся отдельно через `db:create`.

### Создание заказа (публичный)

`POST /api/orders` → `createOrder`:
- Открывает транзакцию.
- Для каждого `item`: валидирует `quantity` (положительное целое), берёт цену
  из БД (НЕ из тела запроса), `lock: UPDATE` на товар, проверяет сток, списывает.
- Считает сумму на сервере (никогда не доверять total от клиента).
- Создаёт `Order` + `OrderItem`s в одной транзакции.

### Смена статуса (админ)

`PUT /api/orders/:id/status` → `updateOrderStatus`:
- Проверяет `newStatus` против ENUM модели (`Order.rawAttributes.status.values`).
- При откате (`cancelled`) — возвращает сток.
- Пишет `OrderStatusLog`.
- (Будущее: триггер email-уведомления покупателю — сейчас заглушка.)

### Админка

AdminJS монтируется через `buildAuthenticatedRouter`. После логина в форме
кладёт `{ id, email }` в `req.session.adminUser` в **общую** сессию (см. `INVARIANTS`).
`/api`-роуты под `isAdminAuthenticated` читают ту же `req.session.adminUser`.

### Загрузка картинок

`POST /api/uploads` (под админом) → multer → `/uploads/<filename>`. Файлы лежат
в `uploads/` рядом с проектом, монтируются в Docker как volume.

### Сидинг и развёртывание

См. `DEPLOYMENT.md`. Кратко: один раз `npm run db:setup` создаёт схему из
моделей и заливает начальные данные.

## Модель данных (упрощённо)

```
Category ─< Collection ─< Product
                       └── OrderItem >─ Order ─< OrderStatusLog >─ Admin
                                       │
                                       └── deliveryMethod, paymentMethod (по слагу)

singletons: HomepageConfig, MobileSliderConfig, IconLinksConfig,
            ReelGalleryConfig, SnakeConfig — по одной строке, редактируется в админке.
```

Источник правды о схеме — **модели Sequelize**, не миграции (их больше нет).
См. `INVARIANTS.md` про это.
