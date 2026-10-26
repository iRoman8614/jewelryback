import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Попытка оплаты заказа в ЮKassa. У заказа может быть несколько попыток
// (первая отменена → покупатель нажал «Оплатить снова»), но оплачивает заказ
// ровно одна (orders.paidPaymentId). Любая «лишняя» успешная оплата
// автоматически возвращается (см. paymentService).
const Payment = sequelize.define('Payment', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    provider: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: 'yookassa',
    },
    attempt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    // Ключ идемпотентности запроса создания платежа — уникален.
    idempotenceKey: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
    },
    // id платежа в ЮKassa (появляется после ответа API).
    externalId: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: true,
    },
    // creating (запрос отправлен, ответ неизвестен) | pending |
    // waiting_for_capture | succeeded | canceled
    status: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: 'creating',
    },
    paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'RUB',
    },
    refundedAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
    },
    // Запрошенный способ (bank_card / sbp / any) и фактический из ответа ЮKassa.
    requestedMethod: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    methodType: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    confirmationUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // Платёж — «лишний» (заказ уже оплачен другим платежом / заказ отменён
    // и товара больше нет). Такой платёж возвращается автоматически.
    isDuplicate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    cancellationParty: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    cancellationReason: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    receiptRegistration: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    lastError: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    lastSyncedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    succeededAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'payments',
    timestamps: true,
    indexes: [{ fields: ['orderId'] }, { fields: ['status'] }],
});

export default Payment;
