import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Collection = sequelize.define('Collection', {
    // Имя НЕ уникально: у коллекций может совпадать название (RU/EN).
    // Уникальность обеспечивает только slug (ниже).
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
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true,
    tableName: 'collections'
});

export default Collection;