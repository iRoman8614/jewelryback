// src/models/ReelGalleryConfig.js
//
// Photo half of the gallery (the video half lives in VideoGalleryConfig).
// Singleton config row with up to 12 image slots.
//
// Every slot defaults to a shared preview placeholder so that a freshly
// seeded database renders a complete gallery on the frontend BEFORE the admin
// uploads any real photos. Uploading a real image in the admin overwrites the
// placeholder for that slot.
//
// IMPORTANT: the placeholder file must exist on the FRONTEND at
//   public/previews/preview.png   (served at the URL /previews/preview.png)
// The data layer prepends the public origin, so store only the leading-slash
// path here.
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PREVIEW = '/previews/preview.png';

const ReelGalleryConfig = sequelize.define('ReelGalleryConfig', {
    image1:  { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image2:  { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image3:  { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image4:  { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image5:  { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image6:  { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image7:  { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image8:  { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image9:  { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image10: { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image11: { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
    image12: { type: DataTypes.STRING, allowNull: true, defaultValue: PREVIEW },
}, {
    tableName: 'reel_gallery_config',
    timestamps: true,
});

export default ReelGalleryConfig;