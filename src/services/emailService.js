// src/services/emailService.js
//
// Transactional email service. Sends order-related notifications via the
// Resend HTTP API using handlebars templates from src/email-templates/.
//
// Localization: every order carries `order.language` ('ru' | 'en'). All
// customer-facing copy is chosen from that, so confirmation AND status emails
// arrive in the customer's language. Default is 'ru'.
//
// Design contract (unchanged):
//   - All public send*() functions catch their own errors and never re-throw
//     (fire-and-forget; email must not break the order transaction).
//   - Templates are compiled with handlebars and cached on first use.
//   - Handlebars escapes interpolated values by default (safe vs HTML
//     injection from order data).
//
// Required env:
//   RESEND_API_KEY    - API key from https://resend.com/api-keys
//   EMAIL_FROM        - "Sender Name <email@domain>"
//   PUBLIC_SITE_URL   - public origin for absolute asset URLs in emails
//                       (e.g. https://rbjwlr.ru). Used to build logo and
//                       product image links. Without it, images won't load.
// Optional env:
//   EMAIL_LOGO_URL    - absolute URL of the email logo PNG. Defaults to
//                       `${PUBLIC_SITE_URL}/images/logo.png`. NOTE: the email
//                       has a WHITE background, so this must be a DARK logo —
//                       a white logo would be invisible.

import { Resend } from 'resend';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '..', 'email-templates');

// --- asset URLs ----------------------------------------------------------
const SITE_URL = (process.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
const LOGO_URL = process.env.EMAIL_LOGO_URL || (SITE_URL ? `${SITE_URL}/images/logo.png` : '');

// Public contacts shown in the footer (matches the site footer block).
const FOOTER = {
    store: 'SERVICE@27JWLR.STORE',
    instagram: '@27jwlr',
    telegram: '@hnp27',
    phone: '+7 996 777 9999',
};

// --- Resend client (single instance) -------------------------------------
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

if (!apiKey) {
    console.warn(
        '⚠️   RESEND_API_KEY is not set — email sending is disabled. ' +
        'Set it in .env to enable transactional emails.',
    );
} else {
    console.log('✅  Resend client initialized');
}

// --- template loader & cache ---------------------------------------------
const templateCache = new Map();

const loadTemplate = async (name) => {
    if (templateCache.has(name)) return templateCache.get(name);
    const filepath = path.join(TEMPLATES_DIR, `${name}.html`);
    const source = await fs.readFile(filepath, 'utf-8');
    const compiled = handlebars.compile(source);
    templateCache.set(name, compiled);
    return compiled;
};

// --- helpers -------------------------------------------------------------
const normLang = (lang) => (lang === 'en' ? 'en' : 'ru');

// "33000" -> "33 000 ₽" (ru) / "33,000 ₽" (en)
export const formatPrice = (value, lang) => {
    const n = Math.round(Number(value) || 0);
    const sep = normLang(lang) === 'en' ? ',' : '\u00A0';
    const grouped = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    return `${grouped}\u00A0₽`;
};

// Build the per-item rows: image, type (category), name, price.
const buildItems = (items, lang) => {
    const l = normLang(lang);
    return (items || []).map((item) => {
        const pd = item.productDetails || null;
        const cat = pd?.category || null;
        const type = cat ? (l === 'en' ? cat.name : cat.title_ru) : '';
        const name = pd ? (l === 'en' ? pd.name_en : pd.name_ru) : item.productName;
        const rawImg = pd?.previewImage || '';
        const image = rawImg ? (SITE_URL ? `${SITE_URL}${rawImg}` : rawImg) : '';
        return {
            image,
            type: type || '',
            name: name || '',
            price: formatPrice(item.priceAtOrder, l),
            quantity: item.quantity,
        };
    });
};

// --- localized copy ------------------------------------------------------
const confirmationLabels = (orderId, lang) => (normLang(lang) === 'en' ? {
    notification: 'NOTIFICATION',
    intro: `YOUR ORDER №${orderId} HAS BEEN RECEIVED. PLEASE AWAIT FURTHER NOTIFICATIONS`,
    orderNo: `ORDER №${orderId}`,
    totalLabel: 'TOTAL',
    sincerely: 'SINCERELY YOURS — 27 JWLR',
} : {
    notification: 'УВЕДОМЛЕНИЕ',
    intro: `ВАШ ЗАКАЗ №${orderId} ПРИНЯТ. ОЖИДАЙТЕ ДАЛЬНЕЙШИХ УВЕДОМЛЕНИЙ`,
    orderNo: `ЗАКАЗ №${orderId}`,
    totalLabel: 'ИТОГО',
    sincerely: 'ИСКРЕННЕ ВАШИ — 27 JWLR',
});

// Status copy in both languages. Add a status here = it notifies the customer.
const STATUS_NOTIFICATIONS = {
    paid: {
        ru: { subject: 'Оплата получена', heading: 'Оплата получена', body: 'Мы получили оплату по вашему заказу. Менеджер свяжется с вами для подтверждения деталей и передачи заказа в обработку.' },
        en: { subject: 'Payment received', heading: 'Payment received', body: 'We have received the payment for your order. A manager will contact you to confirm the details and move the order into processing.' },
    },
    shipped: {
        ru: { subject: 'Заказ передан в доставку', heading: 'Заказ в пути', body: 'Ваш заказ передан в службу доставки. В ближайшее время вы получите трек-номер для отслеживания.' },
        en: { subject: 'Order shipped', heading: 'Order on its way', body: 'Your order has been handed over to the courier. You will receive a tracking number shortly.' },
    },
    ready_for_pickup: {
        ru: { subject: 'Заказ готов к самовывозу', heading: 'Готов к самовывозу', body: 'Ваш заказ готов и ожидает вас в нашем магазине. Адрес и часы работы будут отправлены вам менеджером.' },
        en: { subject: 'Order ready for pickup', heading: 'Ready for pickup', body: 'Your order is ready and waiting at our store. The address and opening hours will be sent to you by a manager.' },
    },
    completed: {
        ru: { subject: 'Заказ выполнен', heading: 'Спасибо за заказ', body: 'Ваш заказ успешно выполнен. Будем рады видеть вас снова в 27 JWLR.' },
        en: { subject: 'Order completed', heading: 'Thank you for your order', body: 'Your order has been successfully completed. We would be delighted to see you again at 27 JWLR.' },
    },
    cancelled: {
        ru: { subject: 'Заказ отменён', heading: 'Заказ отменён', body: 'Ваш заказ был отменён. Если оплата была произведена — возврат средств будет осуществлён в течение нескольких рабочих дней. По любым вопросам обращайтесь к менеджеру.' },
        en: { subject: 'Order cancelled', heading: 'Order cancelled', body: 'Your order has been cancelled. If a payment was made, a refund will be issued within a few business days. For any questions, please contact a manager.' },
    },
};

const statusLabels = (orderId, lang) => (normLang(lang) === 'en' ? {
    greetingPrefix: 'Hello',
    orderNo: `ORDER №${orderId}`,
    totalLabel: 'TOTAL',
    sincerely: 'SINCERELY YOURS — 27 JWLR',
} : {
    greetingPrefix: 'Здравствуйте',
    orderNo: `ЗАКАЗ №${orderId}`,
    totalLabel: 'СУММА',
    sincerely: 'ИСКРЕННЕ ВАШИ — 27 JWLR',
});

/** True iff this status triggers a customer-facing email. */
export const statusNotifiesCustomer = (status) =>
    Object.prototype.hasOwnProperty.call(STATUS_NOTIFICATIONS, status);

// --- template-data builders (exported so the preview script can reuse) ----
export const buildConfirmationData = (order) => {
    const lang = normLang(order.language);
    return {
        lang,
        logoUrl: LOGO_URL,
        labels: confirmationLabels(order.id, lang),
        items: buildItems(order.items, lang),
        totalAmount: formatPrice(order.totalAmount, lang),
        footer: FOOTER,
    };
};

export const buildStatusData = (order, newStatus) => {
    const lang = normLang(order.language);
    const copy = STATUS_NOTIFICATIONS[newStatus]?.[lang];
    if (!copy) return null;
    const labels = statusLabels(order.id, lang);
    return {
        lang,
        logoUrl: LOGO_URL,
        heading: copy.heading,
        body: copy.body,
        greeting: `${labels.greetingPrefix}, ${order.customerName}.`,
        labels,
        totalAmount: formatPrice(order.totalAmount, lang),
        footer: FOOTER,
        _subject: copy.subject, // used by the caller for the email subject
    };
};

// --- core send helper (private) ------------------------------------------
const sendEmail = async ({ to, subject, templateName, data }) => {
    if (!to) throw new Error('sendEmail: `to` is required');
    if (!resend) throw new Error('sendEmail: RESEND_API_KEY is not configured');
    if (!process.env.EMAIL_FROM) throw new Error('sendEmail: EMAIL_FROM is not configured');

    const template = await loadTemplate(templateName);
    const html = template(data);

    const { data: result, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
    });

    if (error) {
        const err = new Error(`Resend API error: ${error.message || JSON.stringify(error)}`);
        err.code = error.name;
        throw err;
    }

    console.log(`✅  Email sent to ${to} (template=${templateName}, id=${result?.id})`);
    return result;
};

// --- public API ----------------------------------------------------------

/**
 * "Your order has been received" email, sent right after order creation.
 * Errors are swallowed — caller MUST use fire-and-forget.
 *
 * @param {object} order - Order with items eager-loaded, and each item's
 *   productDetails (Product) + its category (Category) eager-loaded, plus
 *   order.language. See createOrder's reload include.
 */
export const sendOrderConfirmationEmail = async (order) => {
    try {
        if (!order || !order.customerEmail) {
            console.warn('[EMAIL] sendOrderConfirmationEmail: missing order/email');
            return;
        }

        const lang = normLang(order.language);
        const data = buildConfirmationData(order);
        const subject = lang === 'en'
            ? `Your order №${order.id} has been received | 27 JWLR`
            : `Ваш заказ №${order.id} принят | 27 JWLR`;

        await sendEmail({
            to: order.customerEmail,
            subject,
            templateName: 'orderConfirmation',
            data,
        });
    } catch (err) {
        console.error(`[EMAIL] orderConfirmation failed for order ${order?.id}:`, err.message);
    }
};

/**
 * Status-change notification. Only sends for statuses in STATUS_NOTIFICATIONS;
 * silent otherwise. Errors swallowed — fire-and-forget.
 */
export const sendOrderStatusUpdateEmail = async (order, newStatus) => {
    try {
        if (!order || !order.customerEmail) {
            console.warn('[EMAIL] sendOrderStatusUpdateEmail: missing order/email');
            return;
        }

        const data = buildStatusData(order, newStatus);
        if (!data) return; // status with no customer email — silent skip.

        const lang = normLang(order.language);
        const subject = lang === 'en'
            ? `${data._subject} | Order №${order.id}`
            : `${data._subject} | Заказ №${order.id}`;

        await sendEmail({
            to: order.customerEmail,
            subject,
            templateName: 'orderStatusUpdate',
            data,
        });
    } catch (err) {
        console.error(`[EMAIL] orderStatusUpdate failed for order ${order?.id} (${newStatus}):`, err.message);
    }
};