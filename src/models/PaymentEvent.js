import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Журнал входящих уведомлений ЮKassa (аудит + разбор проблем).
// Обработка уведомлений идемпотентна сама по себе (статус всегда
// перепроверяется запросом к API), журнал — только для истории.
const PaymentEvent = sequelize.define('PaymentEvent', {
    event: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    objectId: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    remoteIp: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    // processed | ignored | error
    result: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    payload: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
    },
}, {
    tableName: 'payment_events',
    timestamps: true,
    updatedAt: false,
    indexes: [{ fields: ['objectId'] }],
});

export default PaymentEvent;
