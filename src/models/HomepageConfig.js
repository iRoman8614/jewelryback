// src/models/HomepageConfig.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// width/left для каждого текстового и графического блока раньше были жёстко
// зашиты во фронтенде (src/lib/home-page.data.js), подогнаны под макет из
// Figma. По просьбе — переносим их под управление админки: контент-менеджер
// сможет двигать/растягивать блоки без деплоя фронта.
// ВАЖНО: эти колонки добавляются АДДИТИВНО (новые nullable-поля), никакие
// существующие данные/колонки не трогаются и не теряются. Дефолты ниже равны
// текущим хардкодным значениям из home-page.data.js — визуально на сайте
// ничего не изменится, пока администратор не отредактирует значения вручную.

const HomepageConfig = sequelize.define('HomepageConfig', {
    text1_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text1_title_en: { type: DataTypes.TEXT, allowNull: true },
    text1_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text1_content_en: { type: DataTypes.TEXT, allowNull: true },
    text1_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '65%' },
    text1_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '5%' },

    image1_url: { type: DataTypes.TEXT, allowNull: true },
    image1_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '27%' },
    image1_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '65%' },

    image2_url: { type: DataTypes.TEXT, allowNull: true },
    image2_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '25%' },
    image2_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '15%' },

    image3_url: { type: DataTypes.TEXT, allowNull: true },
    image3_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '29%' },
    image3_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '55%' },

    image4_url: { type: DataTypes.TEXT, allowNull: true },
    image4_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '38%' },
    image4_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '7%' },

    image5_url: { type: DataTypes.TEXT, allowNull: true },
    image5_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '31%' },
    image5_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '5%' },

    image6_url: { type: DataTypes.TEXT, allowNull: true },
    image6_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '28%' },
    image6_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '60%' },

    text2_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text2_title_en: { type: DataTypes.TEXT, allowNull: true },
    text2_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text2_content_en: { type: DataTypes.TEXT, allowNull: true },
    text2_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '80%' },
    text2_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '10%' },

    image7_url: { type: DataTypes.TEXT, allowNull: true },
    image7_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '31%' },
    image7_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '16%' },

    image8_url: { type: DataTypes.TEXT, allowNull: true },
    image8_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '23%' },
    image8_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '65%' },

    image9_url: { type: DataTypes.TEXT, allowNull: true },
    image9_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '35%' },
    image9_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '10%' },

    image10_url: { type: DataTypes.TEXT, allowNull: true },
    image10_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '23%' },
    image10_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '60%' },

    text3_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text3_title_en: { type: DataTypes.TEXT, allowNull: true },
    text3_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text3_content_en: { type: DataTypes.TEXT, allowNull: true },
    text3_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '45%' },
    text3_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '50%' },

    image11_url: { type: DataTypes.TEXT, allowNull: true },
    image11_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '25%' },
    image11_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '12%' },

    image12_url: { type: DataTypes.TEXT, allowNull: true },
    image12_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '24%' },
    image12_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '60%' },

    image13_url: { type: DataTypes.TEXT, allowNull: true },
    image13_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '24%' },
    image13_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '20%' },

    image14_url: { type: DataTypes.TEXT, allowNull: true },
    image14_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '27%' },
    image14_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '48%' },

    text4_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text4_title_en: { type: DataTypes.TEXT, allowNull: true },
    text4_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text4_content_en: { type: DataTypes.TEXT, allowNull: true },
    text4_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '70%' },
    text4_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '15%' },

    image15_url: { type: DataTypes.TEXT, allowNull: true },
    image15_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '27%' },
    image15_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '56%' },

    image16_url: { type: DataTypes.TEXT, allowNull: true },
    image16_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '36%' },
    image16_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '8%' },

    image17_url: { type: DataTypes.TEXT, allowNull: true },
    image17_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '20%' },
    image17_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '51%' },

    text5_title_ru: { type: DataTypes.TEXT, allowNull: true },
    text5_title_en: { type: DataTypes.TEXT, allowNull: true },
    text5_content_ru: { type: DataTypes.TEXT, allowNull: true },
    text5_content_en: { type: DataTypes.TEXT, allowNull: true },

    image18_url: { type: DataTypes.TEXT, allowNull: true },
    image18_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '31%' },
    image18_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '11%' },

    image19_url: { type: DataTypes.TEXT, allowNull: true },
    image19_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '30%' },
    image19_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '55%' },

    image20_url: { type: DataTypes.TEXT, allowNull: true },
    image20_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '20%' },
    image20_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '56%' },

    image21_url: { type: DataTypes.TEXT, allowNull: true },
    image21_width: { type: DataTypes.STRING, allowNull: true, defaultValue: '30%' },
    image21_left: { type: DataTypes.STRING, allowNull: true, defaultValue: '55%' },
}, {
    timestamps: true,
    tableName: 'homepage_config'
});

export default HomepageConfig;