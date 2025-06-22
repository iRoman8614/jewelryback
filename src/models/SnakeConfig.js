import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SnakeConfig = sequelize.define('SnakeGalleryConfig', {
    image1_top: { type: DataTypes.STRING, allowNull: true },
    image1_bottom: { type: DataTypes.STRING, allowNull: true },
    image2_top: { type: DataTypes.STRING, allowNull: true },
    image2_bottom: { type: DataTypes.STRING, allowNull: true },
    image3_top: { type: DataTypes.STRING, allowNull: true },
    image3_bottom: { type: DataTypes.STRING, allowNull: true },
    image4_top: { type: DataTypes.STRING, allowNull: true },
    image4_bottom: { type: DataTypes.STRING, allowNull: true },
    image5_top: { type: DataTypes.STRING, allowNull: true },
    image5_bottom: { type: DataTypes.STRING, allowNull: true },
    image6_top: { type: DataTypes.STRING, allowNull: true },
    image6_bottom: { type: DataTypes.STRING, allowNull: true },
    image7_top: { type: DataTypes.STRING, allowNull: true },
    image7_bottom: { type: DataTypes.STRING, allowNull: true },
    image8_top: { type: DataTypes.STRING, allowNull: true },
    image8_bottom: { type: DataTypes.STRING, allowNull: true },
    image9_top: { type: DataTypes.STRING, allowNull: true },
    image9_bottom: { type: DataTypes.STRING, allowNull: true },
    image10_top: { type: DataTypes.STRING, allowNull: true },
    image10_bottom: { type: DataTypes.STRING, allowNull: true },
    image11_top: { type: DataTypes.STRING, allowNull: true },
    image11_bottom: { type: DataTypes.STRING, allowNull: true },
    image12_top: { type: DataTypes.STRING, allowNull: true },
    image12_bottom: { type: DataTypes.STRING, allowNull: true },
}, {
    tableName: 'snake_config',
    timestamps: true,
});

export default SnakeConfig;