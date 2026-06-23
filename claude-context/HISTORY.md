# История правок

Короткие истории того, что было сломано и как починили. Помогает понять,
откуда взялись инварианты и почему «странные» решения — на самом деле осознанные.

---

## 1. AdminJS React-компоненты не работали в prod

**Симптом:** в dev админка с кастомными компонентами рендерилась, в prod — пустота.

**Корень:** AdminJS в prod не пересобирает свой браузерный бандл при старте, рассчитывает на заранее собранный `.adminjs/bundle.js`. Старый `build`-скрипт его не собирал, в Docker папка `.adminjs/` не копировалась, а в финальном образе нет devDeps (babel/bundler), поэтому ребандл-на-лету тоже невозможен.

**Решение:**
- Добавлен `src/bundle.js` — прекомпиляция через `@adminjs/bundler` (использует тот же `componentLoader`).
- `npm run build` теперь делает: `babel src → dist` + `babel src/adminComponents → dist/adminComponents` + `node dist/bundle.js → dist/.adminjs/`.
- Dockerfile копирует `dist/` (включая `.adminjs/`) в финальный образ.
- `ADMIN_JS_SKIP_BUNDLE=true` — запрещает рантайм-бандлинг.
- `assetsCDN` + `express.static(dist/.adminjs)` в prod-ветке `admin.js`.

**Вывод:** r2wc / web components тут не работают — у AdminJS своя система компонентов с props/контекстом. Правильное решение — прекомпиляция бандла, а не подмена системы. См. `INVARIANTS.md` #3.

---

## 2. Авторизация админки была сломана

**Симптом:** залогиненный через форму AdminJS админ получал 401 на `/api/orders/...` под `isAdminAuthenticated`.

**Корень:** `@adminjs/express` внутри `buildAuthenticatedRouter` **всегда** поднимает свою `express-session` с `cookieName`/`cookiePassword` из `authOptions`. В коде это было `cookieName: 'adminjs-session'`, `cookiePassword: process.env.ADMIN_COOKIE_PASSWORD` — другая cookie и другой секрет, чем глобальная сессия в `server.js`. AdminJS писал `adminUser` в свою сессию, `/api`-роуты читали из глобальной → всегда `undefined`. Плюс глобальная сессия была на дефолтном MemoryStore.

**Решение:**
- `src/config/session.js` — единый источник: `SequelizeStore` (persist в MySQL, таблица `Sessions`) + общие `secret`/`name`/`cookie` опции.
- В `admin.js` `cookiePassword`/`cookieName` теперь берутся из этого же конфига, и в `sessionOptions` передаётся тот же `store`.
- `authMiddleware` читает `req.session.adminUser` — общая сессия теперь содержит его.
- `db-create.js` синкает таблицу `Sessions` при создании схемы.

**Вывод:** одинаковый `secret` сам по себе не делает две сессии общими — они всё равно независимые, если разные `name`/store. Нужно **физически** один store. См. `INVARIANTS.md` #1.

---

## 3. Миграции и сидеры — заменены скриптами

**Контекст:** проект ещё не в проде, а схема росла как `migrations + seeders + sync({alter})` в dev одновременно — три источника правды, расходящиеся между собой. Плюс конфиг для CLI (`config/config.cjs`) имел хардкод-креды `root`/`12345678`.

**Решение:** взяли финальное состояние схемы (после применения всех миграций — `HomepageConfig` без alt-полей, `DeliveryOption` с `allowsPaymentOnDelivery`). Проверили, что **модели Sequelize уже отражают это финальное состояние** → значит модели и есть единственный честный источник правды.

- Удалили `src/migrations/`, `src/seeders/`, `models/index.js`, оба `config.cjs`, `.sequelizerc`, `sequelize-cli`.
- Создали `src/scripts/db-create.js` (`CREATE DATABASE IF NOT EXISTS` + `sync()` всех моделей) и `db-seed.js` (идемпотентное наполнение).
- `sequelize.sync({ alter: true })` из `server.js` убран — **сервер схему не трогает**.

**Вывод:** `sync()` подходит для разворачивания на пустой базе. Когда появятся реальные данные — миграции придётся вернуть. Это сознательно отложено. См. `INVARIANTS.md` #2.

---

## 4. Утечка персональных данных через публичные роуты

**Симптом:** `GET /api/orders/filter`, `/orders/status/:status` отдавали список заказов с именами/email/телефонами клиентов и составом без авторизации. `POST /api/uploads` тоже был открыт + лимит файла 250 МБ.

**Решение:** все эти роуты под `isAdminAuthenticated`. Один `POST /api/orders` остался публичным — это гостевой чекаут. `/api/uploads` перенесён в `server.js` **после** `sessionMiddleware` (иначе сессии бы не было). Лимит загрузки 250 МБ → 10 МБ.

Заодно: убран битый роут `/status/new` (контроллер ожидал `req.params.status`, а сегмент был захардкожен → выборка по `undefined`). И `multer` был использован в обработчике ошибок `uploadRoutes`, но не импортирован — ловили бы `ReferenceError` при любой ошибке загрузки.

---

## 5. `createOrder` принимал отрицательные quantity

**Симптом:** клиент мог прислать `{ quantity: -5 }` — код делал `stockQuantity -= -5`, то есть **увеличивал сток**, и сумма заказа становилась отрицательной.

**Решение:** валидация `Number.isInteger(quantity) && quantity > 0` до любой математики. Брошенная ошибка прерывает транзакцию, всё откатывается.

---

## 6. `updateOrderStatus`: висячая транзакция + произвольный статус

**Симптом 1:** при пустом `newStatus` контроллер делал `return res.status(400)` **после** открытия транзакции, но **без `rollback`** → транзакция не закрывалась, соединение из пула протекало.

**Симптом 2:** `newStatus` записывался без проверки против ENUM модели → можно было записать произвольную строку.

**Решение:** `rollback` перед ранним return; валидация против `Order.rawAttributes.status.values` (один источник правды — модель).

---

## 7. `Components.SimpleTest` крашил админку

**Симптом:** в `admin.js` поле `password` ресурса `Admin` имело `components: { edit: Components.SimpleTest }`, но компонент `SimpleTest.jsx` был удалён как мёртвый. `Components.SimpleTest` стал `undefined` → AdminJS падал.

**Решение:** заменено на `Components.PasswordInput` — он был зарегистрирован в `components.js`/`entry.js`, но нигде не использовался. Очевидно, его и хотели — это поле пароля.

**Вывод:** при удалении компонента надо грепать использования. Сейчас этого защищает только синхронность `components.js`/`entry.js` (см. `INVARIANTS.md` #4).

---

## 8. Dockerfile копировал удалённые пути

**Симптом:** после удаления `src/migrations/`, `src/seeders/`, `config/`, `models/`, `.sequelizerc` — Dockerfile продолжал делать `COPY --from=builder /app/src/migrations ./src/migrations` и падал на «not found».

**Решение:** убраны все эти `COPY`. Финальный образ содержит только `dist/` (где уже всё нужное после `build`).

---

## 9. Rate-limit на `/admin/login` фактически не срабатывал

**Симптом:** `adminLoginLimiter` и логирующий обработчик регистрировались через `app.post('/admin/login', ...)` на верхнем уровне `server.js` (синхронно, до `start()`), а AdminJS-роутер монтировался позже — внутри `setupAdminPanel` через `app.use('/admin', adminJsRouter)`. В итоге оба обработчика оказывались в стеке Express **после** `errorHandler` (тоже верхнего уровня), и приходящие POST-запросы достигали admin-роутера раньше лимитера.

**Решение:** оба `app.post(adminLoginPath, ...)` вызова перенесены **внутрь `start()`**, прямо перед `await setupAdminPanel(app)`. Теперь в стеке они стоят **до** admin-роутера и гарантированно перехватывают login-POST'ы. `adminLoginLimiter` остался на верхнем уровне как константа. Путь жёстко задан как `'/admin/login'` — дефолт `adminJs.options.loginPath`.

---

## 10. Отсутствовала валидация клиентских полей в `createOrder`

**Симптом:** `customerName`, `customerEmail`, `customerPhone` писались в `Order.create` без проверки — пустые значения давали 500 от Sequelize (`allowNull: false`) вместо 400. `paymentMethod` вообще не проверялся на существование (в отличие от `deliveryMethod`), а все четыре поля шли в БД сырыми строками (с возможными пробелами).

**Решение:** добавлена pre-transaction валидация в начало `createOrder` (до `sequelize.transaction()`): все пять входящих строк (`customerName`, `customerEmail`, `customerPhone`, `deliveryMethod`, `paymentMethod`) тримятся; поля customerName/Phone/Email проверяются на непустоту; email проверяется regex'ом; `paymentMethod` — `findOne` по slug, как уже было для `deliveryMethod`. Ранний `return res.status(400)` не создаёт висячей транзакции, поскольку вся проверка предшествует её открытию. В `Order.create` и в `DeliveryOption.findOne` используются trimmed-значения.

---

## 11. Email-уведомления через Resend (вместо нерабочего SMTP)

**Контекст:** требовалось отправлять покупателю транзакционные письма: подтверждение заказа при создании и уведомления при смене статуса (`paid`, `shipped`, `ready_for_pickup`, `completed`, `cancelled`). Статусы `accepted`, `processing`, `refunded` — внутренние, без писем.

**Симптом отказа SMTP:** первая попытка через `nodemailer` + Yandex SMTP (`smtp.yandex.ru:465` и `:587`) — TLS handshake обрывается до завершения (`Client network socket disconnected before secure TLS connection was established`). Диагностика показала, что TCP-уровень проходит, но Yandex молча душит SMTP-сессии для свежесозданных ящиков (antispam-холдинг). Воспроизводилось и на `@yandex.com`, и на `@yandex.ru`-вариантах. Не наша проблема — серверная блокировка на стороне провайдера.

**Решение:** перешли на **HTTP API Resend** (порт 443, не блокируется ничем).

- `npm install resend`, `nodemailer` остался как зависимость, но не используется.
- `src/services/emailService.js` переписан под `Resend` SDK. Публичный API — без изменений: `sendOrderConfirmationEmail`, `sendOrderStatusUpdateEmail`, `statusNotifiesCustomer`. Это означает, что `orderController.js` (вызовы из `createOrder` и `updateOrderStatus` после `commit`, fire-and-forget) не пришлось трогать при переходе.
- Шаблоны в `src/email-templates/`:
  - `orderConfirmation.html` — статус `new`, с полным списком товаров.
  - `orderStatusUpdate.html` — универсальный, использует `heading` + `body` из реестра `STATUS_NOTIFICATIONS` в `emailService.js`.
- Handlebars кешируется при первой загрузке, шаблоны компилируются один раз.
- Ошибки от Resend SDK возвращаются в `data.error` (не throw'ами) — обрабатываем явно.
- Все `send*` функции **swallowing errors** — фейл отправки логируется, но не валит транзакцию заказа и не задерживает HTTP-ответ.
- `.env`: `RESEND_API_KEY=re_...`, `EMAIL_FROM="27 JWLR <onboarding@resend.dev>"` (sandbox для дева; на проде заменяется на `info@<domain>` после верификации домена в Resend).

**Sandbox-ограничения дева:** `onboarding@resend.dev` шлёт только на email, подтверждённый в Resend при регистрации, и Gmail/Yandex кладут такие письма в «Спам». Оба ограничения снимаются верификацией собственного домена (см. `BACKLOG.md` #14).

**Вывод:** SMTP — устаревший транспорт для прода, у крупных облачных провайдеров часто заблокирован по умолчанию. HTTP API почтовых сервисов (Resend, Brevo, Mailgun, SES) проще, надёжнее и работает везде. Тот же подход следует применять при будущей миграции — если Resend упрётся в лимит, переключение на другого провайдера займёт замену клиента в `emailService.js`, не больше.

---

## Общий стиль чинки

Чинили **итеративно, по одному кусту за раз**: бандл AdminJS → БД → сессии/auth → публичные роуты + валидация заказа → удаление cli → точечные баги → email через HTTP API. На каждом шаге — проверка целостности графа импортов, синтаксиса, и smoke-тест где возможно. Этот же подход рекомендуется и впредь.
