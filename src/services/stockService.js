// src/services/stockService.js
//
// Резерв и возврат остатков товара. Всегда вызывать ВНУТРИ транзакции —
// товар блокируется SELECT ... FOR UPDATE, параллельные заказы ждут друг друга.
//
// Учёт возвратов на склад ведётся по позиции заказа (order_items.restockedQuantity),
// поэтому одну и ту же единицу нельзя вернуть дважды (отмена после возврата,
// повторный вебхук, истечение срока оплаты после ручной отмены и т.п.).

import Product from '../models/Product.js';

const sizesOf = (product) => {
    const s = product.sizes && typeof product.sizes === 'object' && !Array.isArray(product.sizes)
        ? { ...product.sizes }
        : null;
    return s && Object.keys(s).length > 0 ? s : null;
};

const sumSizes = (sizes) => Object.values(sizes).reduce((s, n) => s + (Number(n) || 0), 0);

export class StockError extends Error {
    constructor(message) {
        super(message);
        this.name = 'StockError';
        this.statusCode = 409;
    }
}

/**
 * Списать остаток под позиции. items: [{ productId, quantity, size }].
 * Бросает StockError, если чего-то не хватает (транзакцию откатит вызывающий).
 * Возвращает { anySoldOut, productIds }.
 */
export const reserveItems = async (items, transaction) => {
    let anySoldOut = false;
    const productIds = [];
    for (const item of items) {
        const quantity = Number(item.quantity);
        const product = await Product.findByPk(item.productId, { transaction, lock: transaction.LOCK.UPDATE });
        if (!product) throw new StockError(`Product with ID ${item.productId} not found.`);

        const sizes = sizesOf(product);
        if (sizes) {
            const key = item.size != null ? String(item.size) : null;
            if (!key || !(key in sizes)) throw new StockError(`Size is required for product ${product.name_ru}.`);
            const available = Number(sizes[key]) || 0;
            if (available < quantity) {
                throw new StockError(`Not enough stock for product ${product.name_ru} (size ${key}). Available: ${available}, Requested: ${quantity}`);
            }
            sizes[key] = available - quantity;
            product.sizes = sizes;
            product.changed('sizes', true);
            product.stockQuantity = sumSizes(sizes);
        } else {
            if (product.stockQuantity < quantity) {
                throw new StockError(`Not enough stock for product ${product.name_ru}. Available: ${product.stockQuantity}, Requested: ${quantity}`);
            }
            product.stockQuantity -= quantity;
        }
        if (product.stockQuantity === 0) {
            product.isVisible = false;
            anySoldOut = true;
        }
        await product.save({ transaction });
        productIds.push(product.id);
    }
    return { anySoldOut, productIds };
};

/**
 * Вернуть на склад позиции заказа (OrderItem-инстансы).
 * quantities: { [orderItemId]: qty } — сколько вернуть; без него — всё, что
 * ещё не возвращено. Обновляет order_items.restockedQuantity.
 * Возвращает массив productId, которые изменились.
 */
export const restoreOrderItems = async (orderItems, transaction, quantities = null) => {
    const restored = [];
    for (const item of orderItems) {
        const notRestocked = Math.max(0, item.quantity - (item.restockedQuantity || 0));
        const want = quantities ? Math.min(Number(quantities[item.id]) || 0, notRestocked) : notRestocked;
        if (want <= 0) continue;

        const product = item.productId
            ? await Product.findByPk(item.productId, { transaction, lock: transaction.LOCK.UPDATE })
            : null;

        if (product) {
            const sizes = sizesOf(product);
            if (sizes && item.size != null && String(item.size) in sizes) {
                const key = String(item.size);
                sizes[key] = (Number(sizes[key]) || 0) + want;
                product.sizes = sizes;
                product.changed('sizes', true);
                product.stockQuantity = sumSizes(sizes);
            } else {
                product.stockQuantity += want;
            }
            if (product.isVisible === false) product.isVisible = true;
            await product.save({ transaction });
            restored.push(product.id);
        }
        item.restockedQuantity = (item.restockedQuantity || 0) + want;
        await item.save({ transaction });
    }
    return restored;
};

/**
 * Снова зарезервировать ранее возвращённые на склад позиции (оплата пришла
 * после отмены заказа по таймауту). Всё или ничего: при нехватке — StockError.
 */
export const rereserveOrderItems = async (orderItems, transaction) => {
    const toReserve = orderItems
        .filter((it) => (it.restockedQuantity || 0) > 0 && it.productId)
        .map((it) => ({ productId: it.productId, quantity: it.restockedQuantity, size: it.size }));
    const res = await reserveItems(toReserve, transaction);
    for (const it of orderItems) {
        if ((it.restockedQuantity || 0) > 0) {
            it.restockedQuantity = 0;
            await it.save({ transaction });
        }
    }
    return res;
};

export default { reserveItems, restoreOrderItems, rereserveOrderItems };
