import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Collection = sequelize.define('Collection', {
    name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name_en: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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