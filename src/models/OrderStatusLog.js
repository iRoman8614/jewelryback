import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OrderStatusLog = sequelize.define('OrderStatusLog', {
    previousStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    newStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    changedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    adminEmail: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
    updatedAt: false,
    tableName: 'order_status_logs'
});

export default OrderStatusLog;