// src/models/MobileSliderConfig.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MobileSliderConfig = sequelize.define('MobileSliderConfig', {
    slide1_image: { type: DataTypes.TEXT, allowNull: true },
    slide2_image: { type: DataTypes.TEXT, allowNull: true },
    slide3_image: { type: DataTypes.TEXT, allowNull: true },
    slide4_image: { type: DataTypes.TEXT, allowNull: true },
}, {
    tableName: 'mobile_slider_config',
    timestamps: true,
});

export default MobileSliderConfig;