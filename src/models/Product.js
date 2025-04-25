import { DataTypes }  from 'sequelize';
import sequelize  from '../config/database.js';

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    // images: {
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     allowNull: true,
    //     defaultValue: [],
    //     validate: {
    //         maxFourImages(value) {
    //             if (value && value.length > 4) {
    //                 throw new Error('Product can have a maximum of 4 images.');
    //             }
    //         }
    //     }
    // },
    image1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image3: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image4: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    timestamps: true,
});

export default Product;