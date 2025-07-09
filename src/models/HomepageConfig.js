// src/models/HomepageConfig.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const HomepageConfig = sequelize.define('HomepageConfig', {
    text1_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text1_title_en: { type: DataTypes.TEXT, allowNull: true },
    text1_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text1_content_en: { type: DataTypes.TEXT, allowNull: true },
    image1_url: { type: DataTypes.TEXT, allowNull: true },
    image2_url: { type: DataTypes.TEXT, allowNull: true },
    image3_url: { type: DataTypes.TEXT, allowNull: true },
    image4_url: { type: DataTypes.TEXT, allowNull: true },
    image5_url: { type: DataTypes.TEXT, allowNull: true },
    image6_url: { type: DataTypes.TEXT, allowNull: true },
    text2_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text2_title_en: { type: DataTypes.TEXT, allowNull: true },
    text2_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text2_content_en: { type: DataTypes.TEXT, allowNull: true },
    image7_url: { type: DataTypes.TEXT, allowNull: true },
    image8_url: { type: DataTypes.TEXT, allowNull: true },
    image9_url: { type: DataTypes.TEXT, allowNull: true },
    image10_url: { type: DataTypes.TEXT, allowNull: true },
    text3_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text3_title_en: { type: DataTypes.TEXT, allowNull: true },
    text3_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text3_content_en: { type: DataTypes.TEXT, allowNull: true },
    image11_url: { type: DataTypes.TEXT, allowNull: true },
    image12_url: { type: DataTypes.TEXT, allowNull: true },
    image13_url: { type: DataTypes.TEXT, allowNull: true },
    image14_url: { type: DataTypes.TEXT, allowNull: true },
    text4_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text4_title_en: { type: DataTypes.TEXT, allowNull: true },
    text4_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text4_content_en: { type: DataTypes.TEXT, allowNull: true },
    image15_url: { type: DataTypes.TEXT, allowNull: true },
    image16_url: { type: DataTypes.TEXT, allowNull: true },
    image17_url: { type: DataTypes.TEXT, allowNull: true },
    text5_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text5_title_en: { type: DataTypes.TEXT, allowNull: true },
    text5_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text5_content_en: { type: DataTypes.TEXT, allowNull: true },
    image18_url: { type: DataTypes.TEXT, allowNull: true },
    image19_url: { type: DataTypes.TEXT, allowNull: true },
    image20_url: { type: DataTypes.TEXT, allowNull: true },
    image21_url: { type: DataTypes.TEXT, allowNull: true },
}, {
    timestamps: true,
    tableName: 'homepage_config'
});

export default HomepageConfig;