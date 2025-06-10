import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Collection = sequelize.define('Collection', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
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