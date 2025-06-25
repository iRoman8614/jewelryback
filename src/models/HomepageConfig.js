// src/models/HomepageConfig.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const HomepageConfig = sequelize.define('HomepageConfig', {
    // --- Text Block 1 ---
    text1_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text1_title_en: { type: DataTypes.TEXT, allowNull: true },
    text1_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text1_content_en: { type: DataTypes.TEXT, allowNull: true },
    // --- Image Block 1 ---
    image1_url: { type: DataTypes.TEXT, allowNull: true },
    image1_alt: { type: DataTypes.TEXT, allowNull: true },
    image2_url: { type: DataTypes.TEXT, allowNull: true },
    image2_alt: { type: DataTypes.TEXT, allowNull: true },
    image3_url: { type: DataTypes.TEXT, allowNull: true },
    image3_alt: { type: DataTypes.TEXT, allowNull: true },
    image4_url: { type: DataTypes.TEXT, allowNull: true },
    image4_alt: { type: DataTypes.TEXT, allowNull: true },
    image5_url: { type: DataTypes.TEXT, allowNull: true },
    image5_alt: { type: DataTypes.TEXT, allowNull: true },
    image6_url: { type: DataTypes.TEXT, allowNull: true },
    image6_alt: { type: DataTypes.TEXT, allowNull: true },
    // --- Text Block 2 ---
    text2_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text2_title_en: { type: DataTypes.TEXT, allowNull: true },
    text2_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text2_content_en: { type: DataTypes.TEXT, allowNull: true },
    // --- Image Block 2 ---
    image7_url: { type: DataTypes.TEXT, allowNull: true },
    image7_alt: { type: DataTypes.TEXT, allowNull: true },
    image8_url: { type: DataTypes.TEXT, allowNull: true },
    image8_alt: { type: DataTypes.TEXT, allowNull: true },
    image9_url: { type: DataTypes.TEXT, allowNull: true },
    image9_alt: { type: DataTypes.TEXT, allowNull: true },
    image10_url: { type: DataTypes.TEXT, allowNull: true },
    image10_alt: { type: DataTypes.TEXT, allowNull: true },
    // --- Text Block 3 ---
    text3_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text3_title_en: { type: DataTypes.TEXT, allowNull: true },
    text3_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text3_content_en: { type: DataTypes.TEXT, allowNull: true },
    // --- Image Block 3 ---
    image11_url: { type: DataTypes.TEXT, allowNull: true },
    image11_alt: { type: DataTypes.TEXT, allowNull: true },
    image12_url: { type: DataTypes.TEXT, allowNull: true },
    image12_alt: { type: DataTypes.TEXT, allowNull: true },
    image13_url: { type: DataTypes.TEXT, allowNull: true },
    image13_alt: { type: DataTypes.TEXT, allowNull: true },
    image14_url: { type: DataTypes.TEXT, allowNull: true },
    image14_alt: { type: DataTypes.TEXT, allowNull: true },
    // --- Text Block 4 ---
    text4_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text4_title_en: { type: DataTypes.TEXT, allowNull: true },
    text4_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text4_content_en: { type: DataTypes.TEXT, allowNull: true },
    // --- Image Block 4 ---
    image15_url: { type: DataTypes.TEXT, allowNull: true },
    image15_alt: { type: DataTypes.TEXT, allowNull: true },
    image16_url: { type: DataTypes.TEXT, allowNull: true },
    image16_alt: { type: DataTypes.TEXT, allowNull: true },
    image17_url: { type: DataTypes.TEXT, allowNull: true },
    image17_alt: { type: DataTypes.TEXT, allowNull: true },
    // --- Text Block 5 ---
    text5_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text5_title_en: { type: DataTypes.TEXT, allowNull: true },
    text5_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text5_content_en: { type: DataTypes.TEXT, allowNull: true },
    // --- Image Block 5 ---
    image18_url: { type: DataTypes.TEXT, allowNull: true },
    image18_alt: { type: DataTypes.TEXT, allowNull: true },
    image19_url: { type: DataTypes.TEXT, allowNull: true },
    image19_alt: { type: DataTypes.TEXT, allowNull: true },
    image20_url: { type: DataTypes.TEXT, allowNull: true },
    image20_alt: { type: DataTypes.TEXT, allowNull: true },
    image21_url: { type: DataTypes.TEXT, allowNull: true },
    image21_alt: { type: DataTypes.TEXT, allowNull: true },
}, {
    timestamps: true,
    tableName: 'homepage_config'
});

export default HomepageConfig;