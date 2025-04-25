// src/models/HomepageConfig.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const HomepageConfig = sequelize.define('HomepageConfig', {
    text1_title:   { type: DataTypes.STRING, allowNull: true },
    text1_content: { type: DataTypes.TEXT, allowNull: true }, // id: 0
    image1_url: { type: DataTypes.STRING, allowNull: true }, // id: 1
    image1_alt: { type: DataTypes.STRING, allowNull: true },
    image2_url: { type: DataTypes.STRING, allowNull: true }, // id: 2
    image2_alt: { type: DataTypes.STRING, allowNull: true },
    image3_url: { type: DataTypes.STRING, allowNull: true }, // id: 3
    image3_alt: { type: DataTypes.STRING, allowNull: true },
    image4_url: { type: DataTypes.STRING, allowNull: true }, // id: 4
    image4_alt: { type: DataTypes.STRING, allowNull: true },
    image5_url: { type: DataTypes.STRING, allowNull: true }, // id: 5
    image5_alt: { type: DataTypes.STRING, allowNull: true },
    image6_url: { type: DataTypes.STRING, allowNull: true }, // id: 6
    image6_alt: { type: DataTypes.STRING, allowNull: true },
    text2_title:   { type: DataTypes.STRING, allowNull: true },// id: 7 (title)
    text2_content: { type: DataTypes.TEXT, allowNull: true },  // id: 7 (content)
    image7_url: { type: DataTypes.STRING, allowNull: true }, // id: 8
    image7_alt: { type: DataTypes.STRING, allowNull: true },
    image8_url: { type: DataTypes.STRING, allowNull: true }, // id: 9
    image8_alt: { type: DataTypes.STRING, allowNull: true },
    image9_url: { type: DataTypes.STRING, allowNull: true }, // id: 10
    image9_alt: { type: DataTypes.STRING, allowNull: true },
    image10_url: { type: DataTypes.STRING, allowNull: true }, // id: 11
    image10_alt: { type: DataTypes.STRING, allowNull: true },
    text3_title:   { type: DataTypes.STRING, allowNull: true },
    text3_content: { type: DataTypes.TEXT, allowNull: true }, // id: 12
    image11_url: { type: DataTypes.STRING, allowNull: true }, // id: 13
    image11_alt: { type: DataTypes.STRING, allowNull: true },
    image12_url: { type: DataTypes.STRING, allowNull: true }, // id: 14
    image12_alt: { type: DataTypes.STRING, allowNull: true },
    image13_url: { type: DataTypes.STRING, allowNull: true }, // id: 15
    image13_alt: { type: DataTypes.STRING, allowNull: true },
    image14_url: { type: DataTypes.STRING, allowNull: true }, // id: 16
    image14_alt: { type: DataTypes.STRING, allowNull: true },
    text4_title:   { type: DataTypes.STRING, allowNull: true },// id: 17 (title)
    text4_content: { type: DataTypes.TEXT, allowNull: true },  // id: 17 (content)
    image15_url: { type: DataTypes.STRING, allowNull: true }, // id: 18
    image15_alt: { type: DataTypes.STRING, allowNull: true },
    image16_url: { type: DataTypes.STRING, allowNull: true }, // id: 19
    image16_alt: { type: DataTypes.STRING, allowNull: true },
    image17_url: { type: DataTypes.STRING, allowNull: true }, // id: 20
    image17_alt: { type: DataTypes.STRING, allowNull: true },
    text5_title:   { type: DataTypes.STRING, allowNull: true },// id: 21 (title)
    text5_content: { type: DataTypes.TEXT, allowNull: true },  // id: 21 (content)
    image18_url: { type: DataTypes.STRING, allowNull: true }, // id: 22
    image18_alt: { type: DataTypes.STRING, allowNull: true },
    image19_url: { type: DataTypes.STRING, allowNull: true }, // id: 23
    image19_alt: { type: DataTypes.STRING, allowNull: true },
    image20_url: { type: DataTypes.STRING, allowNull: true }, // id: 24
    image20_alt: { type: DataTypes.STRING, allowNull: true },
    image21_url: { type: DataTypes.STRING, allowNull: true }, // id: 25
    image21_alt: { type: DataTypes.STRING, allowNull: true },
}, {
    timestamps: true,
    tableName: 'homepage_config'
});

export default HomepageConfig;