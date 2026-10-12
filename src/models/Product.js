import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
    name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description_ru: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description_en: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    material_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    material_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Остаток по размерам: JSON-объект { "15": 2, "16.5": 1, ... }.
    // Ключи — только заданные размеры из фиксированной сетки 15..23 (шаг 0.5).
    // Пусто/null = БЕЗРАЗМЕРНЫЙ товар → работает общий stockQuantity (старая логика).
    sizes: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
    },
    stockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    previewImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image3: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image4: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    timestamps: true,
});

export default Product;