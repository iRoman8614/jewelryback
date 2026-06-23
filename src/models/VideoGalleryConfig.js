// src/models/VideoGalleryConfig.js
//
// Video half of the gallery (the photo half lives in ReelGalleryConfig).
// Singleton config row with up to 12 video slots. No preview defaultValue:
// a placeholder image is not a valid <video> source, so empty slots are
// simply skipped by the controller (the frontend video swiper can render a
// poster/placeholder for missing entries if desired).
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const VideoGalleryConfig = sequelize.define('VideoGalleryConfig', {
    video1:  { type: DataTypes.STRING, allowNull: true },
    video2:  { type: DataTypes.STRING, allowNull: true },
    video3:  { type: DataTypes.STRING, allowNull: true },
    video4:  { type: DataTypes.STRING, allowNull: true },
    video5:  { type: DataTypes.STRING, allowNull: true },
    video6:  { type: DataTypes.STRING, allowNull: true },
    video7:  { type: DataTypes.STRING, allowNull: true },
    video8:  { type: DataTypes.STRING, allowNull: true },
    video9:  { type: DataTypes.STRING, allowNull: true },
    video10: { type: DataTypes.STRING, allowNull: true },
    video11: { type: DataTypes.STRING, allowNull: true },
    video12: { type: DataTypes.STRING, allowNull: true },
}, {
    tableName: 'video_gallery_config',
    timestamps: true,
});

export default VideoGalleryConfig;