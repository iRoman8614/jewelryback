import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define('Category', {
    // Поле name из сидера будет использоваться как title_en
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    title_ru: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    subtitle_ru: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    subtitle_en: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description_ru: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description_en: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    timestamps: true,
});

export default Category;