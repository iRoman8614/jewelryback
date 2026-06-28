// src/models/associations.js
// Single source of truth for model associations.
//
// Previously these were declared inline inside server.js. They are needed in
// THREE places now: the running server, the db-create script (sync() builds
// foreign keys from these associations), and anywhere else models are loaded.
// Importing this module guarantees the relationships are registered exactly
// once and identically everywhere.

import sequelize from '../config/database.js';

import Category from './Category.js';
import Product from './Product.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import HomepageConfig from './HomepageConfig.js';
import OrderStatusLog from './OrderStatusLog.js';
import Admin from './Admin.js';
import Collection from './Collection.js';
import SnakeConfig from './SnakeConfig.js';
import DeliveryOption from './DeliveryOption.js';
import PaymentMethod from './PaymentMethod.js';
import MobileSliderConfig from './MobileSliderConfig.js';
import IconLinksConfig from './IconLinksConfig.js';
import ReelGalleryConfig from './ReelGalleryConfig.js';
import VideoGalleryConfig from './VideoGalleryConfig.js';
import CustomConfig from './CustomConfig.js';
import SalesPoint from './SalesPoint.js';

let defined = false;

export const defineAssociations = () => {
    if (defined) return; // idempotent — safe to call from multiple entry points
    defined = true;

    Order.hasMany(OrderItem, {
        foreignKey: 'orderId',
        as: 'items',
        onDelete: 'CASCADE',
    });
    OrderItem.belongsTo(Order, {
        foreignKey: 'orderId',
    });

    Product.hasMany(OrderItem, {
        foreignKey: 'productId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
    OrderItem.belongsTo(Product, {
        foreignKey: 'productId',
        as: 'productDetails',
    });

    Order.hasMany(OrderStatusLog, {
        foreignKey: 'orderId',
        as: 'statusHistory',
        onDelete: 'CASCADE',
    });
    OrderStatusLog.belongsTo(Order, {
        foreignKey: 'orderId',
    });

    Admin.hasMany(OrderStatusLog, {
        foreignKey: 'adminId',
        as: 'statusChangesMade',
        onDelete: 'SET NULL',
    });
    OrderStatusLog.belongsTo(Admin, {
        foreignKey: 'adminId',
        as: 'changedByAdmin',
    });

    Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'SET NULL', onUpdate: 'CASCADE', as: 'products' });
    Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

    Category.hasMany(Collection, {
        foreignKey: 'categoryId',
        as: 'collections',
        onDelete: 'CASCADE',
    });
    Collection.belongsTo(Category, {
        foreignKey: 'categoryId',
        as: 'category',
    });

    Collection.hasMany(Product, {
        foreignKey: 'collectionId',
        as: 'products',
        onDelete: 'SET NULL',
    });
    Product.belongsTo(Collection, {
        foreignKey: 'collectionId',
        as: 'collection',
    });
};

export const models = {
    Admin, Category, Collection, DeliveryOption, PaymentMethod,
    Product, Order, OrderItem, OrderStatusLog,
    HomepageConfig, IconLinksConfig, MobileSliderConfig,
    ReelGalleryConfig, VideoGalleryConfig, SnakeConfig, CustomConfig,
    SalesPoint,
};

export { sequelize };
export default defineAssociations;