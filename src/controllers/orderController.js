import sequelize from '../config/database.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import OrderStatusLog from '../models/OrderStatusLog.js';
import DeliveryOption from '../models/DeliveryOption.js';
import PaymentMethod from '../models/PaymentMethod.js';
import {
    sendOrderConfirmationEmail,
    sendOrderStatusUpdateEmail,
} from '../services/emailService.js';
import { revalidateFrontend } from '../services/revalidateService.js';
import { reserveItems, restoreOrderItems, StockError } from '../services/stockService.js';
import {
    ensurePaymentForOrder,
    createSettlementReceipt,
    newPublicToken,
    toKop,
    fromKop,
} from '../services/paymentService.js';
import { getPaymentConfig, isOnlinePaymentConfigured } from '../config/payments.js';
import { Op } from 'sequelize';

// Ключ идемпотентности оформления: фронт генерирует UUID и шлёт в заголовке
// Idempotency-Key (или в body.checkoutKey). Повтор с тем же ключом — тот же заказ.
const readCheckoutKey = (req) => {
    const raw = (req.get('Idempotency-Key') || req.body?.checkoutKey || '').toString().trim();
    return /^[A-Za-z0-9_-]{8,64}$/.test(raw) ? raw : null;
};

// Ответ на оформление. Старые поля заказа сохранены (совместимость с фронтом),
// добавлены publicToken и payment (ссылка на оплату для онлайн-заказов).
const orderResponse = (order, payment = null) => {
    const json = order.toJSON();
    delete json.checkoutKey;
    return { ...json, payment };
};

const paymentInfoForOrder = async (order) => {
    if (order.status !== 'awaiting_payment') {
        return order.paymentStatus ? { state: order.paidPaymentId ? 'paid' : 'not_payable' } : null;
    }
    try {
        const r = await ensurePaymentForOrder(order.id);
        return { state: r.state, confirmationUrl: r.confirmationUrl || null, error: r.error || null };
    } catch (err) {
        console.error(`[PAYMENT] could not prepare payment for order ${order.id}:`, err.message);
        return { state: 'error', confirmationUrl: null, error: 'payment_unavailable' };
    }
};

export const createOrder = async (req, res, next) => {
    const {
        customerName, customerEmail, customerPhone, customerAddress,
        deliveryMethod, customerComment, paymentMethod,
        items,
    } = req.body;

    // Язык клиента для писем (фронт шлёт 'ru'/'en'); дефолт 'ru'.
    const language = (req.body.language === 'en') ? 'en' : 'ru';
    const checkoutKey = readCheckoutKey(req);

    // Validate BEFORE opening a transaction — invalid requests must not leave
    // a hanging transaction (mirrors the pattern used in updateOrderStatus).
    const name         = (customerName   ?? '').toString().trim();
    const email        = (customerEmail  ?? '').toString().trim();
    const phone        = (customerPhone  ?? '').toString().trim();
    const deliverySlug = (deliveryMethod ?? '').toString().trim();
    const paymentSlug  = (paymentMethod  ?? '').toString().trim();

    // Повторная отправка той же формы (двойной клик, перезагрузка, ретрай сети) —
    // отдаём уже созданный заказ и ту же ссылку на оплату. Новый НЕ создаём.
    if (checkoutKey) {
        const existing = await Order.findOne({ where: { checkoutKey } });
        if (existing) {
            return res.status(200).json(orderResponse(existing, await paymentInfoForOrder(existing)));
        }
    }

    if (!name)  return res.status(400).json({ message: 'customerName is required.' });
    if (!email) return res.status(400).json({ message: 'customerEmail is required.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'customerEmail has an invalid format.' });
    }
    if (!phone) return res.status(400).json({ message: 'customerPhone is required.' });

    const paymentOption = await PaymentMethod.findOne({ where: { slug: paymentSlug } });
    if (!paymentOption) {
        return res.status(400).json({ message: `Payment method "${paymentSlug}" not found.` });
    }
    const isOnline = Boolean(paymentOption.yookassaMethod);
    if (isOnline && !isOnlinePaymentConfigured()) {
        return res.status(503).json({ message: 'Онлайн-оплата временно недоступна. Выберите другой способ оплаты.' });
    }

    const transaction = await sequelize.transaction();
    let newOrder;
    let orderItemsData = [];
    let anySoldOut = false;
    try {
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new Error('Order must contain at least one item.');
        }

        // ВАЖНО: все запросы внутри транзакции — с { transaction }. Иначе каждый
        // параллельный заказ держит соединение транзакции и ждёт второе из пула —
        // при 5+ одновременных оформлениях пул исчерпывается и всё зависает.
        const deliveryOption = await DeliveryOption.findOne({ where: { slug: deliverySlug }, transaction });
        if (!deliveryOption) {
            throw new Error(`Delivery method "${deliverySlug}" not found.`);
        }
        const deliveryCost = deliveryOption.price;

        // Суммы считаем в копейках — без ошибок округления (сумма чека 54-ФЗ
        // обязана точно совпасть с суммой платежа).
        let totalKop = toKop(deliveryCost);
        const toReserve = [];

        for (const item of items) {
            // Validate the item shape BEFORE any stock math. Without this a
            // zero/negative/fractional quantity would corrupt totals, and a
            // negative quantity would actually INCREASE stock.
            const quantity = Number(item.quantity);
            if (!Number.isInteger(quantity) || quantity <= 0) {
                throw new Error(`Invalid quantity for product ${item.productId}: must be a positive integer.`);
            }
            if (item.productId === undefined || item.productId === null) {
                throw new Error('Each item must have a productId.');
            }
            toReserve.push({ productId: item.productId, quantity, size: item.size != null ? String(item.size) : null });
        }

        // Резерв остатков (по размеру или общий) под блокировкой строк товара.
        const reserved = await reserveItems(toReserve, transaction);
        anySoldOut = reserved.anySoldOut;

        for (const r of toReserve) {
            const product = await Product.findByPk(r.productId, { transaction });
            const sizes = product.sizes && typeof product.sizes === 'object' && !Array.isArray(product.sizes) ? product.sizes : null;
            const hasSizes = sizes && Object.keys(sizes).length > 0;
            totalKop += toKop(product.price) * r.quantity;
            orderItemsData.push({
                productId: product.id,
                quantity: r.quantity,
                priceAtOrder: product.price,
                productName: product.name_ru,
                productSku: product.sku,
                size: hasSizes ? r.size : null,
            });
        }

        newOrder = await Order.create({
            customerName: name, customerEmail: email, customerPhone: phone, customerAddress,
            deliveryMethod: deliverySlug, deliveryCost, customerComment, paymentMethod: paymentSlug,
            totalAmount: fromKop(totalKop),
            language,
            status: isOnline ? 'awaiting_payment' : 'new',
            publicToken: newPublicToken(),
            checkoutKey,
            paymentStatus: isOnline ? 'pending' : null,
            paymentExpiresAt: isOnline ? new Date(Date.now() + getPaymentConfig().ttlMinutes * 60 * 1000) : null,
        }, { transaction });

        for (const itemData of orderItemsData) {
            await OrderItem.create({ ...itemData, orderId: newOrder.id }, { transaction });
        }

        await OrderStatusLog.create({
            orderId: newOrder.id,
            adminId: null,
            previousStatus: null,
            newStatus: newOrder.status,
            comment: isOnline
                ? `Order created by customer, awaiting online payment (${paymentOption.yookassaMethod}).`
                : 'Order created by customer.',
        }, { transaction });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        // Гонка двух одинаковых запросов: второй упёрся в unique(checkoutKey) —
        // отдаём заказ, который успел создать первый.
        if (checkoutKey && error?.name === 'SequelizeUniqueConstraintError') {
            const existing = await Order.findOne({ where: { checkoutKey } });
            if (existing) return res.status(200).json(orderResponse(existing, await paymentInfoForOrder(existing)));
        }
        if (error instanceof StockError) return res.status(409).json({ message: error.message });
        return next(error);
    }

    // Fire-and-forget: сообщаем фронту обновить кэш затронутых товаров,
    // каталога и (если что-то распродано и ушло в архив) галереи.
    {
        const productTags = orderItemsData.map((it) => `product-${it.productId}`);
        const paths = anySoldOut ? ['/gallery'] : [];
        revalidateFrontend({ tags: ['products', ...productTags], paths });
    }

    if (newOrder.status === 'awaiting_payment') {
        // Онлайн-оплата: письмо уйдёт после успешной оплаты (с составом заказа).
        const payment = await paymentInfoForOrder(newOrder);
        await newOrder.reload();
        return res.status(201).json(orderResponse(newOrder, payment));
    }

    // Fire-and-forget email confirmation (офлайн-оплата — как раньше).
    Order.findByPk(newOrder.id, {
        include: [{
            model: OrderItem, as: 'items',
            include: [{
                model: Product, as: 'productDetails',
                include: [{ model: Category, as: 'category' }],
            }],
        }],
    })
        .then((orderWithItems) => sendOrderConfirmationEmail(orderWithItems))
        .catch((err) => {
            console.error(
                `[EMAIL] failed to reload order ${newOrder.id} for confirmation email:`,
                err.message,
            );
        });

    res.status(201).json(orderResponse(newOrder, null));
};

export const updateOrderStatus = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { orderId } = req.params;
        const { newStatus, adminComment } = req.body;
        const adminId = req.user?.id || null;
        const adminEmail = req.user?.email || null;

        if (!newStatus) {
            await transaction.rollback();
            return res.status(400).json({ message: 'New status is required.' });
        }

        // Validate against the statuses defined on the Order model's ENUM, so an
        // arbitrary/unknown status can't be written.
        const allowedStatuses = Order.rawAttributes.status.values;
        if (!allowedStatuses.includes(newStatus)) {
            await transaction.rollback();
            return res.status(400).json({
                message: `Invalid status "${newStatus}". Allowed: ${allowedStatuses.join(', ')}.`,
            });
        }

        const order = await Order.findByPk(orderId, { transaction, lock: transaction.LOCK.UPDATE });
        if (!order) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Order not found.' });
        }

        const previousStatus = order.status;
        let restoredProductIds = [];
        if (previousStatus === newStatus) {
            await transaction.commit();
            return res.status(200).json({ message: 'Status is already set to this value.', order });
        }

        // Оплаченный онлайн заказ нельзя просто «отменить» или пометить возвратом —
        // деньги останутся у магазина. Сначала возврат через действие «Возврат».
        if (['cancelled', 'refunded'].includes(newStatus)
            && ['succeeded', 'partially_refunded'].includes(order.paymentStatus)) {
            await transaction.rollback();
            return res.status(409).json({
                message: 'Заказ оплачен онлайн. Сначала оформите возврат денег (Orders → заказ → «Возврат»), затем меняйте статус.',
            });
        }
        if (newStatus === 'awaiting_payment') {
            await transaction.rollback();
            return res.status(400).json({ message: 'Статус «awaiting_payment» выставляется только автоматически.' });
        }

        if (newStatus === 'cancelled' && previousStatus !== 'cancelled') {
            const orderItems = await OrderItem.findAll({
                where: { orderId: order.id },
                transaction
            });
            // Возврат остатка (по размеру или общий). Уже возвращённые единицы
            // (restockedQuantity) повторно не возвращаются.
            restoredProductIds = await restoreOrderItems(orderItems, transaction);
            if (order.status === 'awaiting_payment' && !order.paidPaymentId) {
                order.paymentStatus = 'canceled';
                order.paymentExpiresAt = null;
            }
        }

        order.status = newStatus;
        await order.save({ transaction });

        await OrderStatusLog.create({
            orderId: order.id,
            adminId: adminId,
            adminEmail: adminEmail,
            previousStatus: previousStatus,
            newStatus: newStatus,
            comment: adminComment || `Status changed by admin ${adminId || 'system'}.`,
        }, { transaction });

        await transaction.commit();

        // Если отмена вернула товары в продажу — освежаем их карточки, каталог
        // и галерею (товар уходит из архива). Fire-and-forget.
        if (restoredProductIds.length > 0) {
            revalidateFrontend({
                tags: ['products', ...restoredProductIds.map((id) => `product-${id}`)],
                paths: ['/gallery'],
            });
        }

        // Чек зачёта предоплаты (54-ФЗ) — при передаче товара покупателю.
        if (order.paidPaymentId && newStatus === getPaymentConfig().settlementStatus) {
            createSettlementReceipt(order.id).catch((err) =>
                console.error(`[RECEIPT] settlement for order ${order.id} failed:`, err.message));
        }

        // Fire-and-forget status notification. emailService internally
        // decides whether the new status warrants a customer email
        // (see STATUS_NOTIFICATIONS in emailService.js); silent for
        // accepted/processing/refunded. Для онлайн-оплаты письмо «оплачено»
        // уже ушло автоматически — дублировать при ручном 'paid' не нужно.
        if (!(newStatus === 'paid' && order.paidPaymentId)) {
            sendOrderStatusUpdateEmail(order, newStatus);
        }

        res.json({ message: 'Order status updated successfully.', order });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

export const getOrdersByStatus = async (req, res, next) => {
    try {
        const { status } = req.params;
        const limit = parseInt(req.query.limit) || 5;
        let sortBy = 'createdAt';
        let sortDirection = 'DESC';

        if (req.query.sort) {
            const sortParts = req.query.sort.split('_');
            if (sortParts.length === 2 && ['asc', 'desc'].includes(sortParts[1].toLowerCase())) {
                if (Order.rawAttributes[sortParts[0]]) {
                    sortBy = sortParts[0];
                    sortDirection = sortParts[1].toUpperCase();
                }
            } else if (Order.rawAttributes[req.query.sort]) {
                sortBy = req.query.sort;
            }
        }

        if (!['ASC', 'DESC'].includes(sortDirection)) {
            return res.status(400).json({ message: 'Invalid sortDirection value.' });
        }

        const orders = await Order.findAll({
            where: { status: status },
            limit: limit,
            order: [[sortBy, sortDirection]],
            include: [{
                model: OrderItem,
                as: 'items',
                attributes: ['productName', 'quantity'],
            }],
            attributes: ['id', 'createdAt', 'customerName', 'totalAmount', 'status']
        });

        res.json({ orders });

    } catch (error) {
        next(error);
    }
};

export const getOrdersByMultipleStatuses = async (req, res, next) => {
    try {
        let statuses = req.query.status;
        if (statuses && !Array.isArray(statuses)) {
            statuses = [statuses];
        }
        if (!statuses || statuses.length === 0) {
            return res.status(400).json({ message: 'At least one status parameter is required.' });
        }

        const limit = parseInt(req.query.limit) || 10;
        const sortBy = req.query.sortBy || 'updatedAt';
        const sortDirection = (req.query.sortDirection || 'ASC').toUpperCase();

        if (!['ASC', 'DESC'].includes(sortDirection)) {
            return res.status(400).json({ message: 'Invalid sortDirection value.' });
        }
        const validOrderFields = Object.keys(Order.rawAttributes);
        if (!validOrderFields.includes(sortBy)) {
            return res.status(400).json({ message: `Invalid sortBy field: ${sortBy}` });
        }

        const orders = await Order.findAll({
            where: {
                status: {
                    [Op.in]: statuses,
                },
            },
            limit: limit,
            order: [[sortBy, sortDirection]],
            include: [{
                model: OrderItem,
                as: 'items',
                attributes: ['id', 'productName', 'quantity'],
            }],
            attributes: ['id', 'createdAt', 'updatedAt', 'customerName', 'totalAmount', 'status'],
        });
        res.json({ orders });
    } catch (error) {
        next(error);
    }
};