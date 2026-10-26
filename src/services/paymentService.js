// src/services/paymentService.js
//
// Онлайн-оплата заказов через ЮKassa (карта, СБП), возвраты, чеки 54-ФЗ.
//
// ЗАЩИТА ОТ ДВОЙНЫХ СПИСАНИЙ — несколько независимых слоёв:
//   1. Оформление заказа идемпотентно (orders.checkoutKey, см. orderController):
//      повторная отправка формы / перезагрузка → тот же заказ.
//   2. Создание платежа идёт под блокировкой строки заказа (SELECT … FOR UPDATE):
//      параллельные запросы ждут; если у заказа уже есть живой платёж — отдаём
//      его ссылку на оплату, новый НЕ создаём.
//   3. Каждый запрос в ЮKassa несёт Idempotence-Key, сохранённый в БД ДО запроса.
//      Потерянный ответ (5xx/таймаут) повторяется с тем же ключом → ЮKassa
//      вернёт тот же платёж, а не создаст второй.
//   4. Статус платежа берём ТОЛЬКО из API ЮKassa (GET), тело вебхука не доверяем.
//      Обработка идемпотентна: повторные вебхуки ничего не меняют.
//   5. Заказ оплачивает ровно один платёж (orders.paidPaymentId). Если пришла
//      ещё одна успешная оплата (покупатель оплатил старую и новую попытку) —
//      она автоматически возвращается.
//   6. Возврат: строка refunds создаётся под блокировкой заказа ДО запроса и
//      «занимает» сумму/позиции — двойной клик не вернёт деньги дважды.

import crypto from 'crypto';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import OrderStatusLog from '../models/OrderStatusLog.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import PaymentMethod from '../models/PaymentMethod.js';
import Payment from '../models/Payment.js';
import Refund from '../models/Refund.js';
import { getPaymentConfig, isOnlinePaymentConfigured } from '../config/payments.js';
import yookassa, { YooKassaError } from './yookassaClient.js';
import { restoreOrderItems, rereserveOrderItems, StockError } from './stockService.js';
import { revalidateFrontend } from './revalidateService.js';
import {
    sendPaymentSucceededEmail,
    sendRefundEmail,
    sendPaymentExpiredEmail,
    sendLatePaymentRefundEmail,
    sendDuplicatePaymentRefundEmail,
} from './emailService.js';

const MAX_PAYMENT_ATTEMPTS = 10;

// ─── деньги: считаем в копейках, чтобы не было ошибок округления ──────────
export const toKop = (v) => Math.round(Number(v || 0) * 100);
export const fromKop = (k) => (Math.round(k) / 100).toFixed(2);

export class PaymentError extends Error {
    constructor(message, statusCode = 400, code = null) {
        super(message);
        this.name = 'PaymentError';
        this.statusCode = statusCode;
        this.code = code;
    }
}

export const newPublicToken = () => crypto.randomBytes(24).toString('hex'); // 48 символов

// Ключ идемпотентности платежа: детерминирован для (заказ, попытка).
const paymentKey = (order, attempt) => `${String(order.publicToken).slice(0, 24)}-pay-${attempt}`;

const logStatus = (order, previousStatus, newStatus, comment, t, adminEmail = null) =>
    OrderStatusLog.create({
        orderId: order.id,
        adminId: null,
        adminEmail,
        previousStatus,
        newStatus,
        comment,
    }, { transaction: t });

// Запускаем действия ПОСЛЕ коммита (письма, ревалидация, вызовы API, которые
// не должны держать блокировки). Ошибки логируем, наружу не пробрасываем.
const runAfter = async (tasks) => {
    for (const task of tasks) {
        try { await task(); } catch (err) { console.error('[PAYMENT] post-commit task failed:', err.message); }
    }
};

// ─── чек 54-ФЗ ────────────────────────────────────────────────────────────
const itemDescription = (item) => {
    const base = item.productName || 'Товар';
    const withSize = item.size ? `${base}, размер ${item.size}` : base;
    return withSize.slice(0, 128);
};

/**
 * Позиции чека. lines: [{ item: OrderItem, quantity }]; includeDelivery — строка доставки.
 * mode: full_prepayment | full_payment.
 */
const buildReceiptItems = (order, lines, includeDelivery, mode) => {
    const cfg = getPaymentConfig();
    const out = lines.map(({ item, quantity }) => ({
        description: itemDescription(item),
        quantity: Number(quantity),
        amount: { value: fromKop(toKop(item.priceAtOrder)), currency: 'RUB' },
        vat_code: cfg.vatCode,
        payment_mode: mode,
        payment_subject: cfg.paymentSubject,
        measure: 'piece',
    }));
    if (includeDelivery && toKop(order.deliveryCost) > 0) {
        out.push({
            description: 'Доставка',
            quantity: 1,
            amount: { value: fromKop(toKop(order.deliveryCost)), currency: 'RUB' },
            vat_code: cfg.vatCode,
            payment_mode: mode,
            payment_subject: cfg.deliverySubject,
            measure: 'piece',
        });
    }
    return out;
};

const receiptSum = (items) => items.reduce((s, it) => s + toKop(it.amount.value) * it.quantity, 0);

const buildReceipt = (order, items) => {
    const cfg = getPaymentConfig();
    const receipt = { customer: { email: order.customerEmail }, items };
    if (cfg.taxSystemCode) receipt.tax_system_code = cfg.taxSystemCode;
    if (cfg.receiptTimezone) receipt.timezone = cfg.receiptTimezone;
    return receipt;
};

// ─── платёж ───────────────────────────────────────────────────────────────
const buildPaymentBody = (order, orderItems, row) => {
    const cfg = getPaymentConfig();
    const lines = orderItems.map((item) => ({ item, quantity: item.quantity }));
    const receiptItems = buildReceiptItems(order, lines, true, cfg.paymentMode);
    const itemsKop = receiptSum(receiptItems);
    const totalKop = toKop(order.totalAmount);
    if (itemsKop !== totalKop) {
        // Сумма чека обязана совпадать с суммой платежа — иначе ЮKassa отклонит.
        throw new PaymentError(`Order total ${fromKop(totalKop)} does not match items sum ${fromKop(itemsKop)}.`, 500, 'total_mismatch');
    }
    const body = {
        amount: { value: fromKop(totalKop), currency: 'RUB' },
        capture: true,
        confirmation: {
            type: 'redirect',
            return_url: `${cfg.siteUrl}${cfg.returnPath}?order=${order.id}&token=${order.publicToken}`,
            locale: order.language === 'en' ? 'en_US' : 'ru_RU',
        },
        description: `Заказ №${order.id}`.slice(0, 128),
        metadata: { orderId: String(order.id), paymentRowId: String(row.id) },
    };
    if (row.requestedMethod === 'bank_card' || row.requestedMethod === 'sbp') {
        body.payment_method_data = { type: row.requestedMethod };
    }
    if (cfg.receipts) body.receipt = buildReceipt(order, receiptItems);
    return body;
};

const applyRemoteFieldsToRow = (row, remote) => {
    row.externalId = row.externalId || remote.id;
    row.status = remote.status;
    row.paid = Boolean(remote.paid);
    row.methodType = remote.payment_method?.type || row.methodType;
    if (remote.confirmation?.confirmation_url) row.confirmationUrl = remote.confirmation.confirmation_url;
    row.refundedAmount = remote.refunded_amount?.value || row.refundedAmount || 0;
    row.cancellationParty = remote.cancellation_details?.party || null;
    row.cancellationReason = remote.cancellation_details?.reason || null;
    row.receiptRegistration = remote.receipt_registration || row.receiptRegistration;
    row.lastSyncedAt = new Date();
};

/**
 * Получить ссылку на оплату заказа. Если у заказа уже есть живой платёж —
 * вернётся его ссылка (новый НЕ создаётся). Новый платёж создаётся только
 * если прошлый отменён/не создался и заказ всё ещё ждёт оплаты.
 *
 * Возвращает { state, confirmationUrl?, error? }, state:
 *   pending | paid | expired | not_payable | error
 */
export const ensurePaymentForOrder = async (orderId) => {
    if (!isOnlinePaymentConfigured()) throw new PaymentError('Online payment is not configured.', 503, 'not_configured');

    let remoteToApply = null;
    const result = await sequelize.transaction(async (t) => {
        const order = await Order.findByPk(orderId, { transaction: t, lock: t.LOCK.UPDATE });
        if (!order) throw new PaymentError('Order not found.', 404);
        if (order.paidPaymentId || order.paymentStatus === 'succeeded') return { state: 'paid' };
        if (order.status !== 'awaiting_payment') {
            return { state: order.paymentStatus === 'expired' ? 'expired' : 'not_payable' };
        }
        if (order.paymentExpiresAt && new Date(order.paymentExpiresAt) < new Date()) return { state: 'expired' };

        const latest = await Payment.findOne({
            where: { orderId: order.id },
            order: [['attempt', 'DESC']],
            transaction: t,
            lock: t.LOCK.UPDATE,
        });

        // Уже есть живой платёж — отдаём его, ничего не создаём.
        if (latest && ['pending', 'waiting_for_capture'].includes(latest.status) && latest.confirmationUrl) {
            return { state: 'pending', confirmationUrl: latest.confirmationUrl };
        }
        if (latest && latest.status === 'succeeded') return { state: 'paid' };

        // 'creating' — прошлый запрос ушёл, но ответ неизвестен: повторяем с ТЕМ ЖЕ ключом.
        let row = latest && latest.status === 'creating' ? latest : null;
        if (!row) {
            const attempt = (latest?.attempt || 0) + 1;
            if (attempt > MAX_PAYMENT_ATTEMPTS) throw new PaymentError('Too many payment attempts for this order.', 429, 'too_many_attempts');
            const pm = await PaymentMethod.findOne({ where: { slug: order.paymentMethod }, transaction: t });
            row = await Payment.create({
                orderId: order.id,
                attempt,
                idempotenceKey: paymentKey(order, attempt),
                amount: order.totalAmount,
                currency: 'RUB',
                requestedMethod: pm?.yookassaMethod || 'any',
                status: 'creating',
            }, { transaction: t });
        }

        const items = await OrderItem.findAll({ where: { orderId: order.id }, order: [['id', 'ASC']], transaction: t });
        const body = buildPaymentBody(order, items, row);

        let remote;
        try {
            remote = await yookassa.createPayment(body, row.idempotenceKey);
        } catch (err) {
            row.lastError = String(err.message).slice(0, 2000);
            if (err instanceof YooKassaError && !err.retriable) {
                // Ошибка данных (4xx): эта попытка мертва, следующая получит новый ключ.
                row.status = 'failed';
            }
            await row.save({ transaction: t });
            console.error(`[PAYMENT] create payment for order ${order.id} failed:`, err.message);
            return { state: 'error', error: err.retriable === false ? 'payment_rejected' : 'payment_unavailable' };
        }

        applyRemoteFieldsToRow(row, remote);
        row.lastError = null;
        await row.save({ transaction: t });

        order.paymentStatus = 'pending';
        await order.save({ transaction: t });

        if (['succeeded', 'canceled', 'waiting_for_capture'].includes(remote.status)) remoteToApply = remote;
        return { state: 'pending', confirmationUrl: row.confirmationUrl };
    });

    if (remoteToApply) await applyPaymentObject(remoteToApply);
    return result;
};

/**
 * Применить актуальный объект платежа из API ЮKassa (после GET /payments/{id}).
 * Идемпотентно: можно вызывать сколько угодно раз.
 */
export const applyPaymentObject = async (remote) => {
    if (!remote?.id) return { result: 'ignored', note: 'no id' };
    const after = [];
    const outcome = await sequelize.transaction(async (t) => {
        let row = await Payment.findOne({ where: { externalId: remote.id }, transaction: t, lock: t.LOCK.UPDATE });
        const metaRowId = Number(remote.metadata?.paymentRowId);
        if (!row && metaRowId) {
            row = await Payment.findByPk(metaRowId, { transaction: t, lock: t.LOCK.UPDATE });
            if (row && row.externalId && row.externalId !== remote.id) row = null;
        }
        if (!row) return { result: 'ignored', note: `unknown payment ${remote.id}` };

        const order = await Order.findByPk(row.orderId, { transaction: t, lock: t.LOCK.UPDATE });
        if (!order) return { result: 'ignored', note: `order ${row.orderId} not found` };

        // Сумма и валюта должны совпадать с тем, что мы создавали.
        if (remote.amount?.currency !== 'RUB' || toKop(remote.amount?.value) !== toKop(row.amount)) {
            row.lastError = `Amount mismatch: remote ${remote.amount?.value} ${remote.amount?.currency}, expected ${row.amount} RUB`;
            row.lastSyncedAt = new Date();
            await row.save({ transaction: t });
            console.error(`[PAYMENT] ${row.lastError} (payment ${remote.id}, order ${order.id})`);
            return { result: 'error', note: row.lastError };
        }

        const wasDuplicate = row.isDuplicate;
        applyRemoteFieldsToRow(row, remote);

        if (remote.status === 'succeeded') {
            if (!row.succeededAt) row.succeededAt = remote.captured_at ? new Date(remote.captured_at) : new Date();

            if (order.paidPaymentId === row.id) {
                // уже учтено — повторный вебхук
            } else if (order.paidPaymentId && order.paidPaymentId !== row.id) {
                // Заказ уже оплачен другим платежом → это лишнее списание, возвращаем.
                row.isDuplicate = true;
                if (!wasDuplicate) {
                    after.push(() => createRefund({ paymentRowId: row.id, kind: 'duplicate', reason: 'Повторная оплата заказа' }));
                    await logStatus(order, order.status, order.status,
                        `Повторная оплата ${row.externalId} на ${row.amount} ₽ — будет возвращена автоматически.`, t);
                }
            } else if (order.status === 'cancelled') {
                // Оплата пришла после отмены. Истёк срок резерва → пробуем вернуть
                // заказ к жизни (если товар ещё есть). Отменил админ → не оживляем,
                // деньги возвращаем автоматически.
                const items = await OrderItem.findAll({ where: { orderId: order.id }, transaction: t });
                try {
                    if (order.paymentStatus !== 'expired') throw new StockError('Order was cancelled by admin');
                    await sequelize.transaction({ transaction: t }, async (sp) => {
                        await rereserveOrderItems(items, sp);
                    });
                    markPaid(order, row);
                    const prev = order.status;
                    order.status = 'paid';
                    await logStatus(order, prev, 'paid',
                        `Оплата ${row.externalId} поступила после отмены заказа; товар снова зарезервирован.`, t);
                    after.push(() => notifyPaid(order.id));
                    after.push(() => revalidateProducts(items));
                } catch (err) {
                    if (!(err instanceof StockError)) throw err;
                    row.isDuplicate = true;
                    if (!wasDuplicate) {
                        after.push(() => createRefund({ paymentRowId: row.id, kind: 'late', reason: 'Оплата после отмены заказа' }));
                        after.push(() => notifyLatePaymentRefund(order.id, row.amount));
                        await logStatus(order, order.status, order.status,
                            `Оплата ${row.externalId} поступила после отмены заказа${order.paymentStatus === 'expired' ? ', товара уже нет' : ' администратором'} — деньги будут возвращены автоматически.`, t);
                    }
                }
            } else {
                // Обычный случай: заказ ждал оплату.
                markPaid(order, row);
                if (order.status === 'awaiting_payment') {
                    order.status = 'paid';
                    await logStatus(order, 'awaiting_payment', 'paid',
                        `Оплачено через ЮKassa (${row.methodType || row.requestedMethod}), платёж ${row.externalId}.`, t);
                } else {
                    // Админ уже перевёл заказ дальше вручную — статус не трогаем.
                    await logStatus(order, order.status, order.status, `Получена оплата ЮKassa ${row.externalId}.`, t);
                }
                after.push(() => notifyPaid(order.id));
            }
        } else if (remote.status === 'canceled') {
            if (!order.paidPaymentId && order.status === 'awaiting_payment') {
                // Заказ продолжает ждать — покупатель может нажать «Оплатить снова»
                // до истечения срока резерва.
                order.paymentStatus = 'canceled';
            }
        } else if (remote.status === 'waiting_for_capture') {
            // Мы создаём платежи с capture:true, сюда попадать не должны. Но если
            // попали — подтверждаем, когда заказ ждёт оплату, иначе отменяем (деньги
            // разблокируются, списания не будет).
            const shouldCapture = !order.paidPaymentId && order.status === 'awaiting_payment';
            after.push(() => (shouldCapture
                ? yookassa.capturePayment(remote.id, { amount: remote.amount }, `${row.idempotenceKey}-cap`).then(applyPaymentObject)
                : yookassa.cancelPayment(remote.id, `${row.idempotenceKey}-cnl`).then(applyPaymentObject)));
        } else if (remote.status === 'pending') {
            if (!order.paidPaymentId && order.status === 'awaiting_payment') order.paymentStatus = 'pending';
        }

        await row.save({ transaction: t });
        await order.save({ transaction: t });
        return { result: 'processed', note: `payment ${remote.id} → ${remote.status}` };
    });
    await runAfter(after);
    return outcome;
};

function markPaid(order, row) {
    order.paidPaymentId = row.id;
    order.paymentStatus = 'succeeded';
    order.paidAmount = row.amount;
    order.paidAt = row.succeededAt || new Date();
    order.paymentExpiresAt = null;
}

/** Перезапросить статус платежа в ЮKassa и применить. */
export const syncPaymentRow = async (row) => {
    if (!row?.externalId) return null;
    const remote = await yookassa.getPayment(row.externalId);
    return applyPaymentObject(remote);
};

/** Синхронизировать все незавершённые платежи заказа (кнопка в админке, страница статуса). */
export const syncOrderPayments = async (orderId) => {
    const rows = await Payment.findAll({
        where: { orderId, externalId: { [Op.ne]: null }, status: { [Op.in]: ['pending', 'waiting_for_capture', 'succeeded'] } },
    });
    for (const row of rows) {
        try { await syncPaymentRow(row); } catch (err) { console.error(`[PAYMENT] sync ${row.externalId} failed:`, err.message); }
    }
};

// ─── истечение срока оплаты ───────────────────────────────────────────────
export const expireOrder = async (orderId) => {
    const after = [];
    await sequelize.transaction(async (t) => {
        const order = await Order.findByPk(orderId, { transaction: t, lock: t.LOCK.UPDATE });
        if (!order || order.status !== 'awaiting_payment' || order.paidPaymentId) return;
        const items = await OrderItem.findAll({ where: { orderId: order.id }, transaction: t });
        const restored = await restoreOrderItems(items, t);
        order.status = 'cancelled';
        order.paymentStatus = 'expired';
        await order.save({ transaction: t });
        await logStatus(order, 'awaiting_payment', 'cancelled',
            'Оплата не поступила вовремя — заказ отменён автоматически, товар возвращён в продажу.', t);
        after.push(() => notifyExpired(order.id));
        if (restored.length) {
            after.push(() => revalidateFrontend({
                tags: ['products', ...restored.map((id) => `product-${id}`)],
                paths: ['/gallery'],
            }));
        }
    });
    await runAfter(after);
};

// ─── возвраты ─────────────────────────────────────────────────────────────
const parseItemsJson = (r) => {
    try { return JSON.parse(r.itemsJson || '[]'); } catch { return []; }
};

/**
 * Что ещё можно вернуть по заказу (для формы возврата в админке).
 */
export const getRefundInfo = async (orderId) => {
    const order = await Order.findByPk(orderId);
    if (!order) throw new PaymentError('Order not found.', 404);
    const items = await OrderItem.findAll({ where: { orderId }, order: [['id', 'ASC']] });
    const payments = await Payment.findAll({ where: { orderId }, order: [['attempt', 'ASC']] });
    const refunds = await Refund.findAll({ where: { orderId }, order: [['id', 'ASC']] });
    const paid = order.paidPaymentId ? payments.find((p) => p.id === order.paidPaymentId) : null;

    const active = refunds.filter((r) => r.status !== 'canceled' && r.kind === 'order');
    const taken = {};
    let deliveryTaken = false;
    for (const r of active) {
        for (const it of parseItemsJson(r)) taken[it.orderItemId] = (taken[it.orderItemId] || 0) + Number(it.quantity);
        if (r.includesDelivery) deliveryTaken = true;
    }
    const reservedKop = paid
        ? refunds.filter((r) => r.paymentId === paid.id && r.status !== 'canceled').reduce((s, r) => s + toKop(r.amount), 0)
        : 0;

    return {
        orderId: order.id,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paidAmount: order.paidAmount,
        refundedAmount: order.refundedAmount,
        remainingAmount: paid ? fromKop(toKop(paid.amount) - reservedKop) : '0.00',
        canRefund: Boolean(paid) && toKop(paid.amount) - reservedKop > 0,
        deliveryCost: order.deliveryCost,
        deliveryRefundable: Boolean(paid) && !deliveryTaken && toKop(order.deliveryCost) > 0,
        items: items.map((it) => ({
            id: it.id,
            productName: it.productName,
            size: it.size,
            quantity: it.quantity,
            price: it.priceAtOrder,
            refundableQuantity: Math.max(0, it.quantity - (taken[it.id] || 0)),
        })),
        payments: payments.map((p) => ({
            id: p.id, attempt: p.attempt, externalId: p.externalId, status: p.status, amount: p.amount,
            method: p.methodType || p.requestedMethod, refundedAmount: p.refundedAmount, isDuplicate: p.isDuplicate,
            isPrimary: p.id === order.paidPaymentId, createdAt: p.createdAt,
        })),
        refunds: refunds.map((r) => ({
            id: r.id, externalId: r.externalId, status: r.status, kind: r.kind, amount: r.amount,
            includesDelivery: r.includesDelivery, restock: r.restock, reason: r.reason,
            adminEmail: r.adminEmail, createdAt: r.createdAt, lastError: r.lastError,
        })),
    };
};

/**
 * Создать возврат.
 *   kind 'order'     — возврат по заказу (админ). full:true — всё, что осталось;
 *                      иначе itemIds (позиции целиком) и/или includeDelivery.
 *                      restock — вернуть позиции на склад.
 *   kind 'duplicate' — полный возврат повторной оплаты paymentRowId (автоматически);
 *   kind 'late'      — полный возврат оплаты, пришедшей после отмены (товара нет).
 */
export const createRefund = async ({
    orderId = null, paymentRowId = null, kind = 'order', full = false,
    itemIds = [], includeDelivery = false, restock = false, reason = null, adminEmail = null,
}) => {
    if (!isOnlinePaymentConfigured()) throw new PaymentError('Online payment is not configured.', 503, 'not_configured');
    const cfg = getPaymentConfig();
    const after = [];

    const result = await sequelize.transaction(async (t) => {
        let paymentRow;
        let order;
        const isAuto = kind !== 'order';
        if (isAuto) {
            paymentRow = await Payment.findByPk(paymentRowId, { transaction: t, lock: t.LOCK.UPDATE });
            if (!paymentRow) throw new PaymentError('Payment not found.', 404);
            order = await Order.findByPk(paymentRow.orderId, { transaction: t, lock: t.LOCK.UPDATE });
        } else {
            order = await Order.findByPk(orderId, { transaction: t, lock: t.LOCK.UPDATE });
            if (!order) throw new PaymentError('Order not found.', 404);
            if (!order.paidPaymentId) throw new PaymentError('Заказ не оплачен онлайн — возвращать нечего.', 409);
            paymentRow = await Payment.findByPk(order.paidPaymentId, { transaction: t, lock: t.LOCK.UPDATE });
        }
        if (!paymentRow || paymentRow.status !== 'succeeded' || !paymentRow.externalId) {
            throw new PaymentError('Нет успешного платежа для возврата.', 409);
        }

        const existing = await Refund.findAll({
            where: { paymentId: paymentRow.id, status: { [Op.ne]: 'canceled' } },
            transaction: t,
            lock: t.LOCK.UPDATE,
        });
        if (existing.some((r) => r.status === 'creating')) {
            throw new PaymentError('Предыдущий возврат ещё обрабатывается. Подождите минуту и обновите страницу.', 409, 'refund_in_progress');
        }
        const reservedKop = existing.reduce((s, r) => s + toKop(r.amount), 0);
        const paymentKop = toKop(paymentRow.amount);
        const remainingKop = paymentKop - reservedKop;
        if (remainingKop <= 0) throw new PaymentError('По этому платежу уже всё возвращено.', 409);

        let amountKop;
        let lines = [];
        let withDelivery = false;

        if (isAuto) {
            amountKop = remainingKop;
        } else {
            const items = await OrderItem.findAll({ where: { orderId: order.id }, order: [['id', 'ASC']], transaction: t });
            const taken = {};
            let deliveryTaken = false;
            for (const r of existing.filter((x) => x.kind === 'order')) {
                for (const it of parseItemsJson(r)) taken[it.orderItemId] = (taken[it.orderItemId] || 0) + Number(it.quantity);
                if (r.includesDelivery) deliveryTaken = true;
            }
            const wanted = full ? items.map((i) => i.id) : (itemIds || []).map(Number);
            for (const item of items) {
                if (!wanted.includes(item.id)) continue;
                const qty = Math.max(0, item.quantity - (taken[item.id] || 0));
                if (qty > 0) lines.push({ item, quantity: qty });
            }
            withDelivery = (full || includeDelivery) && !deliveryTaken && toKop(order.deliveryCost) > 0;
            amountKop = lines.reduce((s, l) => s + toKop(l.item.priceAtOrder) * l.quantity, 0)
                + (withDelivery ? toKop(order.deliveryCost) : 0);
            if (amountKop <= 0) throw new PaymentError('Не выбраны позиции для возврата (или они уже возвращены).', 400);
            if (amountKop > remainingKop) throw new PaymentError('Сумма возврата больше остатка по платежу.', 409);
        }
        if (amountKop < 100) throw new PaymentError('Минимальная сумма возврата — 1 ₽.', 400);

        const body = {
            payment_id: paymentRow.externalId,
            amount: { value: fromKop(amountKop), currency: 'RUB' },
            description: (reason || `Возврат по заказу №${order.id}`).slice(0, 250),
        };
        // Полный возврат всего платежа — чек ЮKassa сформирует по исходному.
        // Частичный — передаём возвращаемые позиции.
        const isWholePayment = reservedKop === 0 && amountKop === paymentKop;
        if (cfg.receipts && !isWholePayment) {
            const receiptItems = buildReceiptItems(order, lines, withDelivery, cfg.paymentMode);
            if (receiptSum(receiptItems) !== amountKop) {
                throw new PaymentError('Сумма позиций чека возврата не совпадает с суммой возврата.', 500);
            }
            body.receipt = buildReceipt(order, receiptItems);
        }

        const refund = await Refund.create({
            orderId: order.id,
            paymentId: paymentRow.id,
            idempotenceKey: crypto.randomUUID(),
            status: 'creating',
            kind,
            amount: fromKop(amountKop),
            itemsJson: JSON.stringify(lines.map((l) => ({
                orderItemId: l.item.id, quantity: l.quantity, amount: fromKop(toKop(l.item.priceAtOrder) * l.quantity),
            }))),
            includesDelivery: withDelivery,
            restock: kind === 'order' ? Boolean(restock) : false,
            reason,
            adminEmail,
            requestJson: JSON.stringify(body),
        }, { transaction: t });

        return sendRefundRequest(refund, t, after);
    });
    await runAfter(after);
    return result;
};

// Отправить (или повторить с тем же ключом и телом) запрос возврата.
async function sendRefundRequest(refund, t, after) {
    let remote;
    try {
        remote = await yookassa.createRefund(JSON.parse(refund.requestJson), refund.idempotenceKey);
    } catch (err) {
        refund.lastError = String(err.message).slice(0, 2000);
        if (err instanceof YooKassaError && !err.retriable) {
            refund.status = 'canceled';
            refund.cancellationReason = 'request_rejected';
        }
        await refund.save({ transaction: t });
        console.error(`[REFUND] refund ${refund.id} (order ${refund.orderId}) failed:`, err.message);
        return { state: refund.status === 'canceled' ? 'rejected' : 'unknown', refundId: refund.id, error: err.message };
    }
    await applyRefundFields(refund, remote, t, after);
    return { state: refund.status, refundId: refund.id };
}

async function applyRefundFields(refund, remote, t, after) {
    refund.externalId = refund.externalId || remote.id;
    refund.status = remote.status;
    refund.cancellationReason = remote.cancellation_details?.reason || null;
    refund.lastError = null;
    if (remote.status === 'succeeded' && !refund.effectsAppliedAt) {
        await applyRefundEffects(refund, t, after);
    }
    await refund.save({ transaction: t });
}

async function applyRefundEffects(refund, t, after) {
    refund.effectsAppliedAt = new Date();
    const order = await Order.findByPk(refund.orderId, { transaction: t, lock: t.LOCK.UPDATE });
    const paymentRow = await Payment.findByPk(refund.paymentId, { transaction: t, lock: t.LOCK.UPDATE });
    if (paymentRow) {
        paymentRow.refundedAmount = fromKop(toKop(paymentRow.refundedAmount) + toKop(refund.amount));
        await paymentRow.save({ transaction: t });
    }
    if (!order) return;

    if (refund.kind === 'order') {
        const lines = parseItemsJson(refund);
        const items = await OrderItem.findAll({ where: { orderId: order.id }, transaction: t });
        const byId = Object.fromEntries(items.map((i) => [i.id, i]));
        const qtyMap = {};
        for (const l of lines) {
            const it = byId[l.orderItemId];
            if (!it) continue;
            it.refundedQuantity = Math.min(it.quantity, (it.refundedQuantity || 0) + Number(l.quantity));
            await it.save({ transaction: t });
            qtyMap[it.id] = Number(l.quantity);
        }
        let restored = [];
        if (refund.restock && Object.keys(qtyMap).length) {
            restored = await restoreOrderItems(items.filter((i) => qtyMap[i.id]), t, qtyMap);
        }

        order.refundedAmount = fromKop(toKop(order.refundedAmount) + toKop(refund.amount));
        const fully = toKop(order.refundedAmount) >= toKop(order.paidAmount);
        const prev = order.status;
        order.paymentStatus = fully ? 'refunded' : 'partially_refunded';
        if (fully) order.status = 'refunded';
        await order.save({ transaction: t });
        await logStatus(order, prev, order.status,
            `${fully ? 'Полный' : 'Частичный'} возврат ${refund.amount} ₽ (ЮKassa ${refund.externalId})${refund.restock ? ', товар возвращён на склад' : ''}${refund.reason ? `. Причина: ${refund.reason}` : ''}.`,
            t, refund.adminEmail);
        after.push(() => notifyRefund(order.id, refund.id));
        if (restored.length) {
            after.push(() => revalidateFrontend({ tags: ['products', ...restored.map((id) => `product-${id}`)], paths: ['/gallery'] }));
        }
    } else {
        await logStatus(order, order.status, order.status,
            `Автовозврат лишней оплаты ${refund.amount} ₽ выполнен (ЮKassa ${refund.externalId}).`, t);
        // Про оплату после отмены покупатель уже предупреждён письмом при обнаружении.
        if (refund.kind === 'duplicate') after.push(() => notifyDuplicateRefund(order.id, refund.amount));
    }
}

/** Применить актуальный объект возврата из API (GET /refunds/{id}). Идемпотентно. */
export const applyRefundObject = async (remote) => {
    if (!remote?.id) return { result: 'ignored' };
    const after = [];
    const outcome = await sequelize.transaction(async (t) => {
        const refund = await Refund.findOne({ where: { externalId: remote.id }, transaction: t, lock: t.LOCK.UPDATE });
        if (!refund) return { result: 'ignored', note: `unknown refund ${remote.id}` };
        await applyRefundFields(refund, remote, t, after);
        return { result: 'processed', note: `refund ${remote.id} → ${remote.status}` };
    });
    await runAfter(after);
    return outcome;
};

// ─── чек зачёта предоплаты (54-ФЗ, при передаче товара) ───────────────────
export const createSettlementReceipt = async (orderId) => {
    const cfg = getPaymentConfig();
    if (!isOnlinePaymentConfigured() || !cfg.receipts || cfg.paymentMode !== 'full_prepayment') return { state: 'skipped' };
    return sequelize.transaction(async (t) => {
        const order = await Order.findByPk(orderId, { transaction: t, lock: t.LOCK.UPDATE });
        if (!order || !order.paidPaymentId || order.settlementReceiptId) return { state: 'skipped' };
        const paymentRow = await Payment.findByPk(order.paidPaymentId, { transaction: t });
        if (!paymentRow?.externalId) return { state: 'skipped' };

        const items = await OrderItem.findAll({ where: { orderId: order.id }, order: [['id', 'ASC']], transaction: t });
        const lines = items
            .map((item) => ({ item, quantity: item.quantity - (item.refundedQuantity || 0) }))
            .filter((l) => l.quantity > 0);
        const refunds = await Refund.findAll({ where: { orderId: order.id, kind: 'order', status: 'succeeded' }, transaction: t });
        const deliveryRefunded = refunds.some((r) => r.includesDelivery);
        const receiptItems = buildReceiptItems(order, lines, !deliveryRefunded, 'full_payment');
        const sumKop = receiptSum(receiptItems);
        if (sumKop <= 0) return { state: 'skipped' };

        const body = {
            customer: { email: order.customerEmail },
            payment_id: paymentRow.externalId,
            type: 'payment',
            send: true,
            items: receiptItems,
            settlements: [{ type: 'prepayment', amount: { value: fromKop(sumKop), currency: 'RUB' } }],
        };
        if (cfg.taxSystemCode) body.tax_system_code = cfg.taxSystemCode;
        if (cfg.receiptTimezone) body.timezone = cfg.receiptTimezone;

        try {
            const remote = await yookassa.createReceipt(body, `${String(order.publicToken).slice(0, 24)}-settle`);
            order.settlementReceiptId = remote.id;
            order.settlementReceiptStatus = remote.status;
            await order.save({ transaction: t });
            await logStatus(order, order.status, order.status, `Отправлен чек зачёта предоплаты (ЮKassa ${remote.id}).`, t);
            return { state: remote.status };
        } catch (err) {
            console.error(`[RECEIPT] settlement receipt for order ${order.id} failed:`, err.message);
            order.settlementReceiptStatus = 'error';
            await order.save({ transaction: t });
            return { state: 'error', error: err.message };
        }
    });
};

// ─── фоновое обслуживание (раз в несколько минут) ─────────────────────────
let maintenanceRunning = false;

export const runPaymentMaintenance = async () => {
    if (!isOnlinePaymentConfigured() || maintenanceRunning) return;
    maintenanceRunning = true;
    try {
        const now = Date.now();
        const twoMinAgo = new Date(now - 2 * 60 * 1000);

        // 1) Платежи, ответ на создание которых потерялся.
        const creating = await Payment.findAll({ where: { status: 'creating', createdAt: { [Op.lt]: new Date(now - 60 * 1000) } }, limit: 50 });
        for (const row of creating) {
            const order = await Order.findByPk(row.orderId);
            if (order && order.status === 'awaiting_payment') {
                try { await ensurePaymentForOrder(order.id); } catch (err) { console.error('[MAINT] ensure payment:', err.message); }
            } else {
                // Заказ уже не ждёт оплату — повторно платёж не создаём. Если он всё же
                // был создан и оплачен, вебхук найдёт строку по metadata.paymentRowId.
                row.status = 'failed';
                row.lastError = 'Order no longer awaiting payment';
                await row.save();
            }
        }

        // 2) Незавершённые платежи без свежей синхронизации (на случай потерянного вебхука).
        const stale = await Payment.findAll({
            where: {
                status: { [Op.in]: ['pending', 'waiting_for_capture'] },
                externalId: { [Op.ne]: null },
                [Op.or]: [{ lastSyncedAt: null }, { lastSyncedAt: { [Op.lt]: twoMinAgo } }],
                createdAt: { [Op.lt]: twoMinAgo },
            },
            limit: 50,
        });
        for (const row of stale) {
            try { await syncPaymentRow(row); } catch (err) { console.error('[MAINT] sync payment:', err.message); }
        }

        // 3) Заказы с истёкшим сроком оплаты: последняя проверка в ЮKassa, затем отмена.
        const expired = await Order.findAll({
            where: { status: 'awaiting_payment', paymentExpiresAt: { [Op.lt]: new Date(now) } },
            limit: 50,
        });
        for (const order of expired) {
            try {
                await syncOrderPayments(order.id);
                await expireOrder(order.id);
            } catch (err) { console.error(`[MAINT] expire order ${order.id}:`, err.message); }
        }

        // 4) Возвраты: потерянные ответы (повтор с тем же ключом) и pending.
        const refundsCreating = await Refund.findAll({ where: { status: 'creating', createdAt: { [Op.lt]: new Date(now - 60 * 1000) } }, limit: 50 });
        for (const r of refundsCreating) {
            const after = [];
            try {
                await sequelize.transaction(async (t) => {
                    const fresh = await Refund.findByPk(r.id, { transaction: t, lock: t.LOCK.UPDATE });
                    if (fresh && fresh.status === 'creating') await sendRefundRequest(fresh, t, after);
                });
                await runAfter(after);
            } catch (err) { console.error('[MAINT] retry refund:', err.message); }
        }
        const refundsPending = await Refund.findAll({ where: { status: 'pending', externalId: { [Op.ne]: null } }, limit: 50 });
        for (const r of refundsPending) {
            try { await applyRefundObject(await yookassa.getRefund(r.externalId)); } catch (err) { console.error('[MAINT] sync refund:', err.message); }
        }
    } catch (err) {
        console.error('[MAINT] payment maintenance failed:', err.message);
    } finally {
        maintenanceRunning = false;
    }
};

export const startPaymentMaintenance = (intervalMs = 3 * 60 * 1000) => {
    if (!isOnlinePaymentConfigured()) {
        console.log('ℹ️  Online payments (YooKassa) are not configured — maintenance job is off.');
        return null;
    }
    console.log('✅  YooKassa payments enabled, maintenance job every', Math.round(intervalMs / 1000), 's');
    const timer = setInterval(runPaymentMaintenance, intervalMs);
    timer.unref?.();
    setTimeout(runPaymentMaintenance, 15 * 1000).unref?.();
    return timer;
};

// ─── уведомления ──────────────────────────────────────────────────────────
const loadOrderForEmail = (orderId) => Order.findByPk(orderId, {
    include: [{
        model: OrderItem, as: 'items',
        include: [{ model: Product, as: 'productDetails', include: [{ model: Category, as: 'category' }] }],
    }],
});

async function notifyPaid(orderId) {
    const order = await loadOrderForEmail(orderId);
    const payment = order?.paidPaymentId ? await Payment.findByPk(order.paidPaymentId) : null;
    await sendPaymentSucceededEmail(order, payment);
}
async function notifyRefund(orderId, refundId) {
    const order = await Order.findByPk(orderId);
    const refund = await Refund.findByPk(refundId);
    await sendRefundEmail(order, refund);
}
async function notifyExpired(orderId) {
    await sendPaymentExpiredEmail(await Order.findByPk(orderId));
}
async function notifyDuplicateRefund(orderId, amount) {
    await sendDuplicatePaymentRefundEmail(await Order.findByPk(orderId), amount);
}
async function notifyLatePaymentRefund(orderId, amount) {
    await sendLatePaymentRefundEmail(await Order.findByPk(orderId), amount);
}
function revalidateProducts(items) {
    const ids = [...new Set(items.map((i) => i.productId).filter(Boolean))];
    revalidateFrontend({ tags: ['products', ...ids.map((id) => `product-${id}`)], paths: ['/gallery'] });
}
