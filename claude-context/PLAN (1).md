# План работ

## Сегодня

### 1. Email-сервис через Resend (HTTP API)
- Зарегаться на resend.com, получить API-ключ.
- `npm install resend` (вместо nodemailer/handlebars — но handlebars оставляем для шаблонов).
- Переписать `src/services/emailService.js` под Resend SDK. Структура шаблонов и публичный API (`sendOrderConfirmationEmail`, `sendOrderStatusUpdateEmail`, `statusNotifiesCustomer`) — без изменений.
- На дев: `from: 'onboarding@resend.dev'` (sandbox-домен Resend, не требует верификации).
- HTML-шаблоны в `src/email-templates/`:
  - `orderConfirmation.html` (статус `new`).
  - `orderStatusUpdate.html` (универсальный, для `paid`, `shipped`, `ready_for_pickup`, `completed`, `cancelled`).
- Подключить fire-and-forget вызовы в `orderController.js`:
  - `sendOrderConfirmationEmail` — после `transaction.commit()` в `createOrder`.
  - `sendOrderStatusUpdateEmail` — после `transaction.commit()` в `updateOrderStatus`.
- `.env`:
  ```
  RESEND_API_KEY=re_xxxxxxxx_yyyyyyyy
  EMAIL_FROM=27 JWLR <onboarding@resend.dev>
  ```
- Тест: POST на `/api/orders` с реальным `customerEmail` → проверить, что письмо пришло. Сменить статус в админке → следующее письмо.
- Обновить `claude-context/BACKLOG.md` (вычеркнуть #12), `HISTORY.md` (запись про email через Resend).

### 2. Связка фронт ↔ бэк (локально)
- Поднять локально фронт-репо.
- В `.env.local` фронта: `NEXT_PUBLIC_API_URL=http://localhost:5050/api`.
- Проверить:
  - Каталог грузится (`GET /api/products`).
  - Категории и коллекции открываются.
  - Корзина / чекаут проходит (`POST /api/orders`).
  - Картинки отдаются (`/uploads/...`).
  - Нет CORS-ошибок в DevTools → Network.
- В бэке `whitelist` (src/server.js) — уже есть `http://localhost:3000`.

### 3. Наполнение тестовой БД
- Через AdminJS-панель (`http://localhost:5050/admin`).
- Создать тестовые товары, коллекции, конфиги главной, картинки.
- Проверить, что фронт показывает все эти данные.
- Сделать пару тестовых заказов через фронт → убедиться, что приходят в админку и шлют письма через Resend.

---

## Завтра

### 4. Новый сервер + домен + доменная почта
- Поднять ВМ на Yandex Cloud (Ubuntu 24.04, 2 vCPU / 2-4 GB RAM).
- SSH-ключ `~/.ssh/jewelry_dev.pub`, alias `jewelry-prod` в `~/.ssh/config`.
- На сервере: `apt update && apt upgrade -y`, Docker, nginx, UFW (22, 80, 443).
- Прописать DNS:
  - **A-запись** домена на IP сервера.
  - DNS-записи для **Resend верификации домена** (TXT + DKIM CNAME — Resend выдаст после добавления домена в их кабинете).
- В Resend добавить домен, дождаться верификации → переключить `EMAIL_FROM` на `info@<domain>` (или похожий). Тот же `RESEND_API_KEY` остаётся, **код менять не нужно**.
- HTTPS через certbot + Let's Encrypt: `apt install certbot python3-certbot-nginx && certbot --nginx -d <domain>`.
- **НЕ переносить** на сервер `SESSION_COOKIE_INSECURE=true` (только локально для HTTP).
- Из `whitelist` убрать `http://localhost:*`, оставить только реальные домены.

### 5. Фронт на новый сервер/домен
- В Vercel в фронт-репо: `NEXT_PUBLIC_API_URL=https://<domain>/api`.
- Передеплоить фронт (push в main).
- В `whitelist` бэка добавить Vercel-URL и кастомный домен фронта (если будет).
- Проверить полный цикл: открыть фронт → каталог → корзина → чекаут → письмо → админка.

### 6. Tinkoff эквайринг (тестовый режим)
- Заявка в Тинькофф Бизнес (если ещё не подана) — модерация 1-3 дня.
- Получить тестовые ключи (terminal key + password).
- На бэке:
  - `POST /api/payments/init` — создаёт платёж, возвращает URL/виджет.
  - `POST /api/payments/notification` — webhook от Тинькофф, обновляет статус заказа на `paid`.
  - HMAC-подпись запросов согласно их API.
- На фронте — кнопка «Оплатить», редирект на платёжку либо встроенный виджет.
- Тесты на тестовых картах: `4300 0000 0000 0777` и др.
- Документация: https://www.tinkoff.ru/kassa/develop/api/

---

## После

### 7. Боевой режим + безопасность
- Переключить Тинькофф с тестовых ключей на боевые.
- Пройти оставшийся `BACKLOG.md`:
  - helmet (#3).
  - rate-limit на `POST /api/orders` (#4).
  - cleanup-страховки для `cleanupUnusedImages` (#5).
  - Слой валидации схем (zod / express-validator) (#6).
  - `express.json` limit 30mb → 256kb (#7).
  - CORS почистить от `!origin` и http-origin'ов (#8).
  - Кросс-доменные куки `sameSite: 'none'` + `secure: true` + `trust proxy` (#9).
  - Логи без PII (#10).
  - Graceful shutdown (#11).
  - `errorHandler` без `err.message` наружу (#13).
- Включить бэкапы в Yandex Cloud.
- Резервный план отката (snapshot ВМ перед запуском).
- Мониторинг: хотя бы uptime-чек (UptimeRobot бесплатный).

---

## Локальные правки, которые НЕ переносим на сервер
- `SESSION_COOKIE_INSECURE=true` в `.env` — **убрать**.
- `PORT=5050` — можно вернуть `PORT=5000`.
- `http://localhost:5050` в whitelist (src/server.js) — **удалить**.
- `EMAIL_FROM=27 JWLR <onboarding@resend.dev>` — заменить на `info@<domain>`.

---

## Заметки

- **SMTP с Yandex.Почты не работает из локального Docker** (TLS-handshake обрывается на стороне Яндекса для свежих ящиков, либо блок на уровне их antispam). Поэтому email через **HTTP API Resend** — это и дев-решение, и прод-решение в одном.
- Resend бесплатен на 3000 писем/мес — этого хватит на дев + первые месяцы прода.
- Когда трафик заказов перерастёт лимит — переходим на их платный тариф ($20/мес = 50k писем) или мигрируем на Brevo / Mailgun / SES без переписывания, так как HTTP API у всех похож.
