// src/models/CustomConfig.js
//
// Singleton config for the "Custom" (КАСТОМ) homepage block:
//   - 3 images
//   - one text block in RU/EN (the heading itself stays hardcoded on the frontend)
//
// The 3 image slots default to the shared preview placeholder so the block
// renders on the frontend before the admin uploads real images. The placeholder
// file must exist on the FRONTEND at public/previews/preview.png.
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PREVIEW = '/previews/preview.png';

const CustomConfig = sequelize.define('CustomConfig', {
    image1_url: { type: DataTypes.TEXT, allowNull: true, defaultValue: PREVIEW },
    image2_url: { type: DataTypes.TEXT, allowNull: true, defaultValue: PREVIEW },
    image3_url: { type: DataTypes.TEXT, allowNull: true, defaultValue: PREVIEW },
    text_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text_content_en: { type: DataTypes.TEXT, allowNull: true },
}, {
    tableName: 'custom_config',
    timestamps: true,
});

export default CustomConfig;