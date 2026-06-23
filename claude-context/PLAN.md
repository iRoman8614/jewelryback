# План работ

## Сегодня

### ✅ 1. Email-сервис через Resend (HTTP API) — СДЕЛАНО
- Resend SDK подключен, ключ в `.env` (`RESEND_API_KEY`).
- `src/services/emailService.js` переписан — единый publicAPI: `sendOrderConfirmationEmail`, `sendOrderStatusUpdateEmail`, `statusNotifiesCustomer`.
- Шаблоны в `src/email-templates/`: `orderConfirmation.html` (статус `new`), `orderStatusUpdate.html` (универсальный для `paid`/`shipped`/`ready_for_pickup`/`completed`/`cancelled`).
- Вызовы в `orderController.js` после `transaction.commit()`, fire-and-forget.
- Локально проверено: тестовый POST → письмо в Gmail (в спам, т.к. sandbox-домен `onboarding@resend.dev` — нормально для дева).
- ⚠️ Sandbox-ограничение: с `onboarding@resend.dev` шлёт **только на email, подтверждённый при регистрации в Resend**. Снимается верификацией собственного домена на этапе прода.
- ⚠️ После теста: **отозвать дев-ключ Resend и создать новый** — старый засветился в чате.

### 2. Связка фронт ↔ бэк (локально)
- Поднять локально фронт-репо.
- В `.env.local` фронта: `NEXT_PUBLIC_API_URL=http://localhost:5050/api`.
- Проверить:
  - Каталог грузится (`GET /api/products`).
  - Категории и коллекции открываются.
  - Корзина / чекаут проходит (`POST /api/orders`).
  - Картинки отдаются (`/uploads/...`).
  - Нет CORS-ошибок в DevTools → Network.
- В бэке `whitelist` (src/server.js) — уже есть `http://localhost:3000`. Если фронт на другом порту — добавить.

### 3. Наполнение тестовой БД
- Через AdminJS-панель (`http://localhost:5050/admin`).
- Создать тестовые товары, коллекции, конфиги главной, картинки.
- Проверить, что фронт показывает все эти данные.
- Сделать пару тестовых заказов через фронт → убедиться, что приходят в админку и шлют письма через Resend.

---

## Завтра

### 4. Новый сервер + домен + верификация домена в Resend
- Поднять ВМ на Yandex Cloud (Ubuntu 24.04, 2 vCPU / 2-4 GB RAM).
- SSH-ключ `~/.ssh/jewelry_dev.pub`, alias `jewelry-prod` в `~/.ssh/config`.
- На сервере: `apt update && apt upgrade -y`, Docker, nginx, UFW (22, 80, 443).
- Прописать DNS:
  - **A-запись** домена на IP сервера.
  - **TXT + CNAME для Resend** (выдаст Resend → Domains → Add Domain) — это SPF/DKIM/DMARC, без них письма летят в спам.
- В Resend дождаться статуса `Verified` у домена → в `.env` сервера: `EMAIL_FROM=27 JWLR <info@<domain>>`. Тот же `RESEND_API_KEY` — **код менять не нужно**.
- HTTPS через certbot + Let's Encrypt: `apt install certbot python3-certbot-nginx && certbot --nginx -d <domain>`.
- **НЕ переносить** на сервер `SESSION_COOKIE_INSECURE=true` (только локально для HTTP).
- Из `whitelist` убрать `http://localhost:*`, оставить только реальные домены.

### 5. Фронт на новый сервер/домен
- В Vercel в фронт-репо: `NEXT_PUBLIC_API_URL=https://<domain>/api`.
- Передеплоить фронт (push в main).
- В `whitelist` бэка добавить Vercel-URL и кастомный домен фронта (если будет).
- Проверить полный цикл: открыть фронт → каталог → корзина → чекаут → письмо (теперь во «Входящих», не в спам) → админка.

### 6. Tinkoff эквайринг (тестовый режим)
- Заявка в Тинькофф Бизнес (если ещё не подана) — модерация 1-3 дня. **Подать сразу, параллельно с пунктами 4-5.**
- Документация: https://www.tbank.ru/kassa/dev/payments/
- Получить тестовые ключи (terminal key + password).
- На бэке:
  - `POST /api/payments/init` — создаёт платёж, возвращает URL/виджет.
  - `POST /api/payments/notification` — webhook от Тинькофф, обновляет статус заказа на `paid` (триггерит письмо «Оплата получена» автоматически).
  - HMAC-подпись запросов согласно их API.
- На фронте — кнопка «Оплатить», редирект на платёжку либо встроенный виджет.
- Тесты на тестовых картах: `4300 0000 0000 0777` и др.

---

## Перед сдачей заказчику (обязательно)

### 7. Безопасность из BACKLOG.md
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
- Snapshot ВМ перед запуском (резервный откат).
- Мониторинг: UptimeRobot или подобный.

### 8. Боевой режим Tinkoff
- Переключить с тестовых ключей на боевые.
- Финальная проверка полного цикла оплаты на реальной карте (малая сумма).

---

## Локальные правки, которые НЕ переносим на сервер
- `SESSION_COOKIE_INSECURE=true` в `.env` — **убрать**.
- `PORT=5050` — можно вернуть `PORT=5000`.
- `http://localhost:5050` и `http://localhost:3000` в whitelist (src/server.js) — **удалить**.
- `EMAIL_FROM=27 JWLR <onboarding@resend.dev>` — заменить на `info@<domain>` после верификации домена в Resend.

---

## Заметки

- **SMTP с Yandex.Почты не работает из локального Docker** (TLS-handshake обрывается на стороне Яндекса для свежих ящиков, либо блок на уровне их antispam). Решение — HTTP API Resend, работает и на дев, и на прод.
- Resend бесплатен на 3000 писем/мес — хватит на дев + первые месяцы прода.
- Sandbox-домен `onboarding@resend.dev` ограничен отправкой **только на подтверждённый при регистрации email**. На прод верифицируем свой домен — ограничение снимается.
- Когда трафик заказов перерастёт лимит — переходим на платный тариф Resend ($20/мес = 50k писем) или мигрируем на Brevo / Mailgun / SES без переписывания (HTTP API у всех похож).
