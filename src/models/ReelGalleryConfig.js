// src/models/ReelGalleryConfig.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ReelGalleryConfig = sequelize.define('ReelGalleryConfig', {
    image1: { type: DataTypes.STRING, allowNull: true },
    image2: { type: DataTypes.STRING, allowNull: true },
    image3: { type: DataTypes.STRING, allowNull: true },
    image4: { type: DataTypes.STRING, allowNull: true },
    image5: { type: DataTypes.STRING, allowNull: true },
    image6: { type: DataTypes.STRING, allowNull: true },
    image7: { type: DataTypes.STRING, allowNull: true },
    image8: { type: DataTypes.STRING, allowNull: true },
    image9: { type: DataTypes.STRING, allowNull: true },
    image10: { type: DataTypes.STRING, allowNull: true },
    image11: { type: DataTypes.STRING, allowNull: true },
    image12: { type: DataTypes.STRING, allowNull: true },
    image13: { type: DataTypes.STRING, allowNull: true },
    image14: { type: DataTypes.STRING, allowNull: true },
    image15: { type: DataTypes.STRING, allowNull: true },
    image16: { type: DataTypes.STRING, allowNull: true },
}, {
    tableName: 'reel_gallery_config',
    timestamps: true,
});

export default ReelGalleryConfig;