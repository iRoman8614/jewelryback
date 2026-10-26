// src/config/payments.js
//
// Настройки онлайн-оплаты через ЮKassa. Всё берётся из .env, чтобы ключи
// и фискальные параметры можно было поменять без правки кода.
//
// Пока YOOKASSA_SHOP_ID / YOOKASSA_SECRET_KEY не заданы, онлайн-оплата
// ВЫКЛЮЧЕНА: онлайн-способы скрыты в checkout, сайт работает как раньше.
//
// Обязательные (для включения):
//   YOOKASSA_SHOP_ID       — идентификатор магазина (ЛК → Настройки → Магазин)
//   YOOKASSA_SECRET_KEY    — секретный ключ (ЛК → Интеграция → Ключи API)
//   PUBLIC_SITE_URL        — https://27jwlr.com (для return_url)
//
// Фискализация (54-ФЗ) — уточнить у бухгалтера:
//   YOOKASSA_RECEIPTS          true|false  — передавать данные для чека (по умолчанию true)
//   YOOKASSA_VAT_CODE          1..12       — ставка НДС (1 = без НДС, обычно для УСН). По умолчанию 1
//   YOOKASSA_TAX_SYSTEM_CODE   1..6        — система налогообложения (нужна не всем кассам). По умолчанию не передаётся
//   YOOKASSA_PAYMENT_SUBJECT   commodity|… — признак предмета расчёта для товаров. По умолчанию commodity
//   YOOKASSA_PAYMENT_MODE      full_prepayment|full_payment — признак способа расчёта.
//                              full_prepayment (по умолчанию): товар передаётся позже →
//                              при передаче товара отправляется чек зачёта предоплаты.
//   YOOKASSA_SETTLEMENT_STATUS статус заказа, при котором отправляется чек зачёта
//                              (только для full_prepayment). По умолчанию completed
//   YOOKASSA_RECEIPT_TIMEZONE  1..11 — часовая зона кассы (2 = Москва). По умолчанию не передаётся
//
// Прочее:
//   YOOKASSA_API_URL               — по умолчанию https://api.yookassa.ru/v3 (меняется только для тестов)
//   PAYMENT_TTL_MINUTES            — сколько держим резерв товара под неоплаченный заказ (по умолчанию 60)
//   YOOKASSA_WEBHOOK_STRICT_IP     — true: отклонять вебхуки не с IP ЮKassa (требует корректный
//                                    X-Forwarded-For от nginx). По умолчанию false — статус всё равно
//                                    перепроверяется запросом к API ЮKassa, телу вебхука не доверяем.

const bool = (v, def) => {
    if (v === undefined || v === null || v === '') return def;
    return ['1', 'true', 'yes', 'on'].includes(String(v).trim().toLowerCase());
};
const int = (v, def) => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : def;
};

export const getPaymentConfig = () => {
    const env = process.env;
    const siteUrl = (env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
    const paymentMode = env.YOOKASSA_PAYMENT_MODE === 'full_payment' ? 'full_payment' : 'full_prepayment';
    return {
        shopId: (env.YOOKASSA_SHOP_ID || '').trim(),
        secretKey: (env.YOOKASSA_SECRET_KEY || '').trim(),
        apiUrl: (env.YOOKASSA_API_URL || 'https://api.yookassa.ru/v3').replace(/\/$/, ''),
        siteUrl,
        returnPath: '/payment/result',
        ttlMinutes: Math.max(15, int(env.PAYMENT_TTL_MINUTES, 60)),
        receipts: bool(env.YOOKASSA_RECEIPTS, true),
        vatCode: int(env.YOOKASSA_VAT_CODE, 1),
        taxSystemCode: env.YOOKASSA_TAX_SYSTEM_CODE ? int(env.YOOKASSA_TAX_SYSTEM_CODE, null) : null,
        paymentSubject: (env.YOOKASSA_PAYMENT_SUBJECT || 'commodity').trim(),
        deliverySubject: 'service',
        paymentMode,
        settlementStatus: (env.YOOKASSA_SETTLEMENT_STATUS || 'completed').trim(),
        receiptTimezone: env.YOOKASSA_RECEIPT_TIMEZONE ? int(env.YOOKASSA_RECEIPT_TIMEZONE, null) : null,
        strictWebhookIp: bool(env.YOOKASSA_WEBHOOK_STRICT_IP, false),
    };
};

export const isOnlinePaymentConfigured = () => {
    const c = getPaymentConfig();
    return Boolean(c.shopId && c.secretKey && c.siteUrl);
};

// Значения поля PaymentMethod.yookassaMethod (настраивается в админке).
//   bank_card — сразу форма оплаты картой
//   sbp       — сразу оплата через СБП (QR / приложение банка)
//   any       — страница ЮKassa с выбором способа
export const YOOKASSA_METHODS = ['bank_card', 'sbp', 'any'];

// IP-адреса, с которых ЮKassa шлёт уведомления (документация «Входящие уведомления»).
export const YOOKASSA_WEBHOOK_NETWORKS = [
    '185.71.76.0/27',
    '185.71.77.0/27',
    '77.75.153.0/25',
    '77.75.156.11/32',
    '77.75.156.35/32',
    '77.75.154.128/25',
    '2a02:5180::/32',
];

export default getPaymentConfig;
