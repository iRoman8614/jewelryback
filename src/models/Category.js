import DataTypes from 'sequelize';
import sequelize  from '../config/database.js';

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    timestamps: true,
});

export default Category;