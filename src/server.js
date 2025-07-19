// src/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import mainRouter from './routes/index.js';
import uploadRoutes from './routes/uploadRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import path from 'path';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';

import Category from './models/Category.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import OrderItem from './models/OrderItem.js';
import HomepageConfig from './models/HomepageConfig.js';
import OrderStatusLog from './models/OrderStatusLog.js';
import Admin from './models/Admin.js';
import Collection from './models/Collection.js';
import SnakeConfig from './models/SnakeConfig.js';
import DeliveryOption from './models/DeliveryOption.js';
import PaymentMethod from './models/PaymentMethod.js';
import MobileSliderConfig from './models/MobileSliderConfig.js';
import IconLinksConfig from './models/IconLinksConfig.js';
import ReelGalleryConfig from './models/ReelGalleryConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const whitelist = ['http://localhost:3000', 'https://jewelry-next.vercel.app', 'http://217.199.253.61', 'http://217.199.253.61:5000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};
app.use(cors(corsOptions));

app.use('/api/uploads', uploadRoutes);
app.use(express.json({ limit: '30mb' }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(session({
    secret: process.env.ADMIN_SESSION_SECRET || 'fallback-secret-key-for-dev-only!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.post('/admin/login', (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || req.socket?.remoteAddress || req.connection?.socket?.remoteAddress || 'Unknown IP';
    const email = req.body?.email || 'Unknown Email';
    console.log(`[AUTH ATTEMPT] Time: ${new Date().toISOString()}, IP: ${ip}, Email: ${email}`);
    next();
});

const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: 'Too many login attempts, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.post('/admin/login', adminLoginLimiter);

app.use('/api', mainRouter);

app.get('/', (req, res) => {
    res.send('💎 Jewelry Backend API Running!');
});

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Connection has been established successfully.');
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
            as: 'productDetails'
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
            as: 'changedByAdmin'
        });

        Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'SET NULL', onUpdate: 'CASCADE', as: 'products' });
        Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

        Category.hasMany(Collection, {
            foreignKey: 'categoryId',
            as: 'collections',
            allowNull: false,
            onDelete: 'CASCADE',
        });
        Collection.belongsTo(Category, {
            foreignKey: 'categoryId',
            as: 'category',
        });

        Collection.hasMany(Product, {
            foreignKey: 'collectionId',
            as: 'products',
            allowNull: true,
            onDelete: 'SET NULL',
        });
        Product.belongsTo(Collection, {
            foreignKey: 'collectionId',
            as: 'collection',
        });

        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({ alter: true });
            console.log('🔄 Development: Database synchronized with alter:true');
        }

        const { default: setupAdminPanel } = await import('./admin.js');
        await setupAdminPanel(app);

        if (!setupAdminPanel.error) {
            app.listen(PORT, () => console.log(`🚀 Server started on port: ${PORT}`));
        } else {
            console.log('🚦 Server not started due to AdminJS setup error. Please check AdminJS logs.');
        }

    } catch (error) {
        console.error('❌ Unable to start the server:', error);
        if (error.code !== 'ERR_MODULE_NOT_FOUND' || (error.message && !error.message.includes("'./admin.js'"))) {
            console.error(error.stack);
            process.exit(1);
        } else {
            console.warn("🟠 Admin panel setup file ('./admin.js') not found or failed to import, starting server without admin panel.");
            app.listen(PORT, () => console.log(`🚀 Server started W/O ADMIN PANEL on port: ${PORT}`));
        }
    }
};

start();