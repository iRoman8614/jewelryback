import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Возврат денег по платежу ЮKassa. Строка создаётся ДО запроса к API
// (status = creating) под блокировкой заказа — повторный клик «Вернуть»
// не может создать второй возврат: сумма уже «занята» этой строкой.
const Refund = sequelize.define('Refund', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idempotenceKey: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
    },
    externalId: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: true,
    },
    // creating | pending | succeeded | canceled
    status: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: 'creating',
    },
    // order — возврат по заказу (меняет статус заказа, возвращает товар);
    // duplicate — автоматический возврат лишней оплаты.
    kind: {
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: 'order',
    },
    amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    // JSON (строкой): [{ orderItemId, quantity, amount }], и includesDelivery.
    itemsJson: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    includesDelivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    restock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    // Когда применены последствия возврата (refundedQuantity, склад, статус
    // заказа, письмо). Повторный вебхук ничего не применит дважды.
    effectsAppliedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    reason: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    adminEmail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cancellationReason: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    // Тело запроса в ЮKassa: если ответ потерялся (5xx/таймаут), запрос
    // повторяется с ТЕМ ЖЕ ключом и ТЕМ ЖЕ телом — второго возврата не будет.
    requestJson: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    lastError: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'refunds',
    timestamps: true,
    indexes: [{ fields: ['orderId'] }, { fields: ['paymentId'] }, { fields: ['status'] }],
});

export default Refund;
