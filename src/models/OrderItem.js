import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OrderItem = sequelize.define('OrderItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    priceAtOrder: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productSku: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Выбранный покупателем размер (для размерных товаров). null — безразмерный.
    size: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Сколько единиц этой позиции уже вернули на склад (отмена / возврат /
    // истёкшая оплата). Защищает от двойного возврата остатка.
    restockedQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    // Сколько единиц уже возвращено покупателю деньгами (возвраты ЮKassa).
    refundedQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    tableName: 'order_items'
});

export default OrderItem;