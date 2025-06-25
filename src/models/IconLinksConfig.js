// src/models/IconLinksConfig.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const IconLinksConfig = sequelize.define('IconLinksConfig', {
    icon1_image: { type: DataTypes.TEXT, allowNull: true },
    icon2_image: { type: DataTypes.TEXT, allowNull: true },
    icon3_image: { type: DataTypes.TEXT, allowNull: true },
    icon4_image: { type: DataTypes.TEXT, allowNull: true },
}, {
    tableName: 'icon_links_config',
    timestamps: true,
});

export default IconLinksConfig;