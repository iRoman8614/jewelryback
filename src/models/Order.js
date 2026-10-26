import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    customerPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    deliveryMethod: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    deliveryCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
    customerComment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Язык клиента на момент заказа — чтобы письма (подтверждение и смены
    // статуса) уходили на нужном языке. Шлёт фронт в payload; дефолт 'ru'.
    language: {
        type: DataTypes.ENUM('ru', 'en'),
        allowNull: false,
        defaultValue: 'ru',
    },
    totalAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(
            'new',
            'accepted',
            'paid',
            'processing',
            'shipped',
            'ready_for_pickup',
            'completed',
            'cancelled',
            'refunded',
            // Онлайн-оплата: заказ создан, товар зарезервирован, ждём оплату
            // в ЮKassa. После оплаты → 'paid', по истечении срока → 'cancelled'.
            'awaiting_payment'
        ),
        allowNull: false,
        defaultValue: 'new',
    },

    // ─── Онлайн-оплата (ЮKassa). Все поля NULL/0 для старых заказов. ───────
    // Случайный токен для публичной страницы статуса оплаты (без него по
    // номеру заказа ничего не узнать).
    publicToken: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: true,
    },
    // Ключ идемпотентности оформления заказа (присылает фронт). Повторная
    // отправка формы с тем же ключом возвращает ТОТ ЖЕ заказ, а не создаёт новый.
    checkoutKey: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: true,
    },
    // null — оплата не онлайн (старая логика).
    // pending | succeeded | canceled | expired | partially_refunded | refunded
    paymentStatus: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    // id строки payments, которой заказ фактически оплачен.
    paidPaymentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    paidAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
    },
    paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    refundedAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
    },
    // До какого момента держим резерв товара под неоплаченный заказ.
    paymentExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    // Чек зачёта предоплаты (54-ФЗ, при передаче товара).
    settlementReceiptId: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    settlementReceiptStatus: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'orders',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
});

export default Order;