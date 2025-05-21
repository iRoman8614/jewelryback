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
    totalAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(
            'Новый',
            'Принят',
            'Оплачен',
            'В сборке',
            'Передан в доставку',
            'Готов к самовывозу',
            'Завершен',
            'Отменен',
            'Возврат'
        ),
        allowNull: false,
        defaultValue: 'Новый',
    },
}, {
    timestamps: true,
    tableName: 'orders'
});

export default Order;