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
        defaultValue: true,
        comment: 'True = для России, False = для остального мира'
    },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'payment_methods',
    timestamps: true,
});

export default PaymentMethod;