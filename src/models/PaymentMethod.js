import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PaymentMethod = sequelize.define('PaymentMethod', {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    isForRussia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'True = для России, False = для остального мира'
    },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    // Онлайн-оплата через ЮKassa: bank_card | sbp | any. NULL — офлайн-способ
    // (оплата при получении и т.п.), работает старая логика без ЮKassa.
    yookassaMethod: {
        type: DataTypes.STRING(32),
        allowNull: true,
        defaultValue: null,
    },
}, {
    tableName: 'payment_methods',
    timestamps: true,
});

export default PaymentMethod;