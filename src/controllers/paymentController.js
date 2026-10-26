// src/controllers/paymentController.js
//
// Публичные эндпоинты онлайн-оплаты + вебхук ЮKassa.
//   GET  /api/payments/orders/:orderId?token=…        — статус оплаты (страница возврата)
//   POST /api/payments/orders/:orderId/pay?token=…    — получить ссылку на оплату
//                                                       (существующую или новую попытку)
//   POST /api/payments/yookassa/webhook               — входящие уведомления ЮKassa

import crypto from 'crypto';
import net from 'net';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import PaymentEvent from '../models/PaymentEvent.js';
import { getPaymentConfig, isOnlinePaymentConfigured, YOOKASSA_WEBHOOK_NETWORKS } from '../config/payments.js';
import yookassa, { YooKassaError } from '../services/yookassaClient.js';
import {
    ensurePaymentForOrder,
    applyPaymentObject,
    applyRefundObject,
    syncPaymentRow,
} from '../services/paymentService.js';

// ─── доступ к заказу по публичному токену ─────────────────────────────────
const safeEqual = (a, b) => {
    const ba = Buffer.from(String(a || ''));
    const bb = Buffer.from(String(b || ''));
    return ba.length === bb.length && ba.length > 0 && crypto.timingSafeEqual(ba, bb);
};

const loadOrderByToken = async (req) => {
    const orderId = parseInt(req.params.orderId, 10);
    const token = (req.query.token || req.body?.token || '').toString();
    if (!Number.isInteger(orderId) || !token) return null;
    const order = await Order.findByPk(orderId);
    if (!order || !order.publicToken || !safeEqual(order.publicToken, token)) return null;
    return order;
};

const SYNC_THROTTLE_MS = 5000;

const publicStatus = async (order) => {
    const latest = await Payment.findOne({ where: { orderId: order.id }, order: [['attempt', 'DESC']] });
    const awaiting = order.status === 'awaiting_payment';
    const expired = order.paymentExpiresAt && new Date(order.paymentExpiresAt) < new Date();
    // succeeded | refunded | pending (покупатель на странице оплаты) |
    // canceled (попытка отменена) | unpaid (страница оплаты ещё не открыта —
    // например, ЮKassa была недоступна) | expired | cancelled
    let state;
    if (order.paidPaymentId) state = order.paymentStatus === 'refunded' ? 'refunded' : 'succeeded';
    else if (awaiting && latest && ['pending', 'waiting_for_capture'].includes(latest.status)) state = 'pending';
    else if (awaiting && latest?.status === 'canceled') state = 'canceled';
    else if (awaiting) state = 'unpaid';
    else if (order.paymentStatus === 'expired') state = 'expired';
    else state = 'cancelled';

    return {
        orderId: order.id,
        state,
        orderStatus: order.status,
        amount: order.totalAmount,
        language: order.language,
        paymentExpiresAt: order.paymentExpiresAt,
        canRetry: awaiting && !order.paidPaymentId && !expired && state !== 'pending',
        // Ссылку на незавершённый платёж отдаём, чтобы можно было вернуться к оплате.
        confirmationUrl: state === 'pending' && latest?.confirmationUrl ? latest.confirmationUrl : null,
    };
};

export const getOrderPaymentStatus = async (req, res, next) => {
    try {
        const order = await loadOrderByToken(req);
        if (!order) return res.status(404).json({ message: 'Order not found.' });

        // Если вебхук задерживается — сами спросим ЮKassa (не чаще раза в 5 с).
        if (isOnlinePaymentConfigured() && order.status === 'awaiting_payment' && !order.paidPaymentId) {
            const latest = await Payment.findOne({ where: { orderId: order.id }, order: [['attempt', 'DESC']] });
            const stale = !latest?.lastSyncedAt || Date.now() - new Date(latest.lastSyncedAt).getTime() > SYNC_THROTTLE_MS;
            if (latest?.externalId && ['pending', 'waiting_for_capture'].includes(latest.status) && stale) {
                try { await syncPaymentRow(latest); } catch (err) { console.error('[PAYMENT] status sync failed:', err.message); }
                await order.reload();
            }
        }
        res.json(await publicStatus(order));
    } catch (err) {
        next(err);
    }
};

export const payOrder = async (req, res, next) => {
    try {
        const order = await loadOrderByToken(req);
        if (!order) return res.status(404).json({ message: 'Order not found.' });
        const result = await ensurePaymentForOrder(order.id);
        await order.reload();
        const status = await publicStatus(order);
        if (result.state === 'error') {
            return res.status(502).json({ ...status, message: 'Payment service is temporarily unavailable. Please try again.' });
        }
        res.json({ ...status, confirmationUrl: result.confirmationUrl || status.confirmationUrl });
    } catch (err) {
        next(err);
    }
};

// ─── вебхук ──────────────────────────────────────────────────────────────
const blockList = (() => {
    const bl = new net.BlockList();
    for (const cidr of YOOKASSA_WEBHOOK_NETWORKS) {
        const [addr, prefix] = cidr.split('/');
        bl.addSubnet(addr, Number(prefix), net.isIPv6(addr) ? 'ipv6' : 'ipv4');
    }
    return bl;
})();

export const isYooKassaIp = (ipRaw) => {
    if (!ipRaw) return false;
    const ip = String(ipRaw).replace(/^::ffff:/, '');
    try {
        if (net.isIPv4(ip)) return blockList.check(ip, 'ipv4');
        if (net.isIPv6(ip)) return blockList.check(ip, 'ipv6');
    } catch { /* ignore */ }
    return false;
};

export const yookassaWebhook = async (req, res) => {
    const cfg = getPaymentConfig();
    const ip = req.ip;
    const body = req.body || {};
    const event = String(body.event || '').slice(0, 64);
    const objectId = body.object?.id ? String(body.object.id).slice(0, 64) : null;
    const ipOk = isYooKassaIp(ip);

    let log = null;
    try {
        log = await PaymentEvent.create({
            event: event || 'unknown',
            objectId,
            remoteIp: String(ip || '').slice(0, 64),
            payload: JSON.stringify(body).slice(0, 100000),
        });
    } catch (err) {
        console.error('[WEBHOOK] failed to log event:', err.message);
    }
    const finish = async (result, note) => {
        if (log) { try { await log.update({ result, note: note ? String(note).slice(0, 2000) : null }); } catch { /* ignore */ } }
    };

    if (!ipOk) {
        console.warn(`[WEBHOOK] notification from non-YooKassa IP ${ip} (event=${event}, object=${objectId})`);
        if (cfg.strictWebhookIp) {
            await finish('ignored', `rejected: IP ${ip} is not in YooKassa list`);
            return res.status(403).json({ message: 'Forbidden' });
        }
    }
    if (body.type !== 'notification' || !event || !objectId) {
        await finish('ignored', 'malformed notification');
        return res.status(200).json({ ok: true });
    }
    if (!isOnlinePaymentConfigured()) {
        await finish('ignored', 'online payments are not configured');
        return res.status(200).json({ ok: true });
    }

    try {
        // Телу уведомления не доверяем: берём актуальный объект из API ЮKassa.
        let outcome;
        if (event.startsWith('payment.')) {
            outcome = await applyPaymentObject(await yookassa.getPayment(objectId));
        } else if (event.startsWith('refund.')) {
            outcome = await applyRefundObject(await yookassa.getRefund(objectId));
        } else {
            outcome = { result: 'ignored', note: `event ${event} is not handled` };
        }
        await finish(outcome.result, outcome.note);
        return res.status(200).json({ ok: true });
    } catch (err) {
        // 404 из API — объекта нет (чужой/подделанный id): повторять бессмысленно.
        if (err instanceof YooKassaError && err.status === 404) {
            await finish('ignored', `object not found in YooKassa: ${err.message}`);
            return res.status(200).json({ ok: true });
        }
        console.error(`[WEBHOOK] processing ${event} ${objectId} failed:`, err.message);
        await finish('error', err.message);
        // Не 200 → ЮKassa повторит уведомление (в течение 24 часов).
        return res.status(500).json({ message: 'Temporary error' });
    }
};
