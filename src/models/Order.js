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
            'new',
            'accepted',
            'paid',
            'processing',
            'shipped',
            'ready_for_pickup',
            'completed',
            'cancelled',
            'refunded'
        ),
        allowNull: false,
        defaultValue: 'Новый',
    },
}, {
    timestamps: true,
    tableName: 'orders',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
});

export default Order;