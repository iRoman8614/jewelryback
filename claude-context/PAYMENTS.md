# Онлайн-оплата через ЮKassa (карта, СБП)

Логика готова и протестирована. Пока в `.env` нет ключей ЮKassa, онлайн-оплата
**выключена**: онлайн-способы скрыты в checkout, сайт работает как раньше.

## Как это устроено

```
Покупатель → форма (ConfirmForm) ──POST /api/orders (Idempotency-Key)──► бэк
   бэк: заказ status=awaiting_payment, товар зарезервирован, платёж в ЮKassa
   ◄── confirmationUrl ── редирект на страницу оплаты ЮKassa (карта / СБП)
ЮKassa ──вебхук──► POST /api/payments/yookassa/webhook
   бэк: GET платежа из API ЮKassa (телу вебхука не доверяем) → заказ paid,
        письмо «Оплата получена»; кассовый чек шлёт ЮKassa сама
ЮKassa ──return_url──► /payment/result?order=…&token=…  (опрос статуса, «Оплатить снова»)
```

Статусы заказа: `awaiting_payment` → `paid` → дальше как раньше. Неоплаченный
заказ отменяется автоматически через `PAYMENT_TTL_MINUTES` (по умолчанию 60),
товар возвращается в продажу.

## Защита от двойных списаний

1. **Оформление идемпотентно.** Фронт шлёт `Idempotency-Key` (UUID в sessionStorage).
   Двойной клик, перезагрузка, повтор после обрыва сети дают тот же заказ
   (`orders.checkoutKey` UNIQUE).
2. **Один живой платёж на заказ.** Создание платежа идёт под `SELECT … FOR UPDATE`
   на заказ. Если платёж уже есть, возвращается его ссылка, новый не создаётся.
3. **Idempotence-Key ЮKassa сохраняется в БД до запроса.** Потерянный ответ (5xx,
   таймаут) повторяется с тем же ключом, и ЮKassa возвращает тот же платёж.
4. **Статус берётся только из API ЮKassa.** Поддельный вебхук ничего не сделает,
   повторные вебхуки ничего не меняют.
5. **Заказ оплачивает ровно один платёж** (`orders.paidPaymentId`). Лишняя успешная
   оплата (повторная или пришедшая после отмены) **автоматически возвращается**,
   покупатель получает письмо.
6. **Возвраты.** Строка `refunds` создаётся под блокировкой до запроса и «занимает»
   сумму и позиции, поэтому двойной клик не вернёт деньги дважды. Учёт склада
   ведётся через `order_items.restockedQuantity`, повторный возврат товара на склад
   невозможен.
7. **Фоновая задача раз в 3 минуты** подтягивает платежи и возвраты, если вебхук
   потерялся, повторяет запросы с потерянным ответом (тем же ключом) и отменяет
   просроченные заказы.

## Возвраты (админка)

Orders → заказ → кнопка **«Возврат»**: таблица платежей и возвратов, выбор
позиций и доставки, галочка «вернуть на склад», «Вернуть выбранное» / «Вернуть всё».
- Полный возврат → заказ `refunded`. Частичный → `paymentStatus = partially_refunded`.
- Оплаченный онлайн заказ нельзя перевести в `cancelled`/`refunded` вручную, пока
  деньги не возвращены (409 с подсказкой).
- Кнопка **«Обновить оплату»** запрашивает актуальные статусы в ЮKassa.
- Разделы Orders → Payments / Refunds / Payment Events — журналы только для чтения.

## Письма

| событие | письмо |
|---|---|
| оплата прошла | «Оплата получена»: состав заказа, доставка, дата, способ, номер платежа |
| возврат выполнен | «Возврат оформлен» (полный/частичный, сумма) |
| срок оплаты истёк | «Заказ отменён — оплата не поступила» |
| повторная оплата | «Повторная оплата возвращена» |
| оплата после отмены | «Оплата будет возвращена» |
| кассовый чек | присылает **ЮKassa** (Чеки от ЮKassa) на email покупателя |

Офлайн-заказы («оплата при получении»): как раньше, письмо «Заказ принят» сразу.

## Чеки 54-ФЗ

В каждый платёж передаётся `receipt` с позициями (товар, размер) и строкой
«Доставка». Для частичных возвратов передаётся чек с возвращаемыми позициями,
полный возврат ЮKassa оформит по исходному чеку.

При `YOOKASSA_PAYMENT_MODE=full_prepayment` (по умолчанию: товар передаётся после
оплаты), когда заказ переходит в `YOOKASSA_SETTLEMENT_STATUS` (по умолчанию
`completed`), автоматически отправляется **чек зачёта предоплаты**.

> ⚠️ Уточнить у бухгалтера: ставку НДС (`YOOKASSA_VAT_CODE`), систему
> налогообложения (`YOOKASSA_TAX_SYSTEM_CODE`), признак расчёта (`YOOKASSA_PAYMENT_MODE`)
> и нужны ли особые реквизиты для ювелирных изделий из драгметаллов (ГИИС ДМДК).

## Переменные `.env` (бэк)

```env
# обязательные для включения
YOOKASSA_SHOP_ID=
YOOKASSA_SECRET_KEY=
PUBLIC_SITE_URL=https://27jwlr.com

# фискализация (по умолчанию: чеки включены, без НДС, товар, предоплата)
YOOKASSA_RECEIPTS=true
YOOKASSA_VAT_CODE=1
#YOOKASSA_TAX_SYSTEM_CODE=2
YOOKASSA_PAYMENT_SUBJECT=commodity
YOOKASSA_PAYMENT_MODE=full_prepayment
YOOKASSA_SETTLEMENT_STATUS=completed
#YOOKASSA_RECEIPT_TIMEZONE=2

# прочее
PAYMENT_TTL_MINUTES=60
YOOKASSA_WEBHOOK_STRICT_IP=false
#DB_POOL_MAX=15
```

## Деплой кода (сейчас, без ключей): данные не теряются

```bash
# 0) бэкап БД
cd /opt/jewelry/deploy
F=~/jewelry_$(date +%F_%H%M).sql
docker compose exec -T mysql sh -c 'mysqldump --single-transaction --routines --triggers -uroot -p"$MYSQL_ROOT_PASSWORD" jewelry' > "$F"
ls -lh "$F" && tail -1 "$F"          # не 0 байт и "-- Dump completed"

# 1) бэк
cd /opt/jewelry/jewelryback && git pull
cd /opt/jewelry/deploy && docker compose up -d --build --no-deps backend && sleep 3 && docker compose restart nginx

# 2) миграция: сначала план, потом применение (только ADD COLUMN / ADD INDEX / CREATE TABLE)
docker compose exec backend node dist/scripts/migrate-add-payments.js --dry-run
docker compose exec backend node dist/scripts/migrate-add-payments.js

# 3) фронт
cd /opt/jewelry/jewelryNext && git pull
cd /opt/jewelry/deploy && docker compose up -d --build --no-deps frontend && sleep 3 && docker compose restart nginx
```

Откат БД (если что-то пошло не так):
`cat ~/jewelry_ДАТА.sql | docker compose exec -T mysql sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" jewelry'`

## Включение оплаты (когда будут ключи)

1. **ЛК ЮKassa → Интеграция → HTTP-уведомления:** URL
   `https://27jwlr.com/api/payments/yookassa/webhook`, события
   `payment.succeeded`, `payment.canceled`, `payment.waiting_for_capture`, `refund.succeeded`.
2. **ЛК ЮKassa → Чеки:** подключить «Чеки от ЮKassa» (или свою онлайн-кассу).
3. Сначала **тестовый магазин** ЮKassa (тестовые ключи и тестовые карты), потом боевой.
4. Вписать ключи в `/opt/jewelry/deploy/.env` и пересоздать контейнер (пересборка не нужна):
   ```bash
   cd /opt/jewelry/deploy && docker compose up -d --no-deps --force-recreate backend && sleep 3 && docker compose restart nginx
   docker compose logs backend | grep -i yookassa    # "YooKassa payments enabled"
   ```
5. **Админка → Shop Settings → Payment Methods:** у «Банковская карта» поле
   *Yookassa Method* = «ЮKassa: банковская карта», у «СБП» = «ЮKassa: СБП».
   У «оплата при получении» оставить пустым.
6. Пробный заказ: оплатить → письмо → «Возврат» в админке.

## Файлы

- `config/payments.js`: настройки из env, IP ЮKassa
- `services/yookassaClient.js`: HTTP-клиент API v3 (Idempotence-Key, повторы)
- `services/paymentService.js`: платежи, вебхуки, возвраты, чеки, фоновая задача
- `services/stockService.js`: резерв и возврат остатков
- `controllers/paymentController.js`, `routes/paymentRoutes.js`: публичный статус, «Оплатить», вебхук
- `models/Payment.js`, `Refund.js`, `PaymentEvent.js` (+ поля в `Order`, `OrderItem`, `PaymentMethod`)
- `scripts/migrate-add-payments.js`: миграция без потери данных
- `adminComponents/RefundAction.jsx`: действие «Возврат»
- `email-templates/paymentSucceeded.html`: письмо об оплате
- фронт: `ConfirmForm.jsx` (ключ идемпотентности и редирект), `app/payment/result`, `components/PaymentResult`
