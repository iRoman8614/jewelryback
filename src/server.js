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
import HomepageConfig from './models/HomepageConfig.js';
import Admin from './models/Admin.js'; // <-- Импорт модели Admin


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(session({
    secret: process.env.ADMIN_SESSION_SECRET || 'fallback-secret-key-replace-in-prod!',
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
app.use('/api/uploads', uploadRoutes);

app.get('/', (req, res) => {
    res.send('💎 Jewelry Backend API Running!');
});

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Connection has been established successfully.');
        Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
        Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
        await sequelize.sync({ alter: true });
        console.log('🔄 Database synchronized');
        const { default: setupAdminPanel } = await import('./admin.js');
        await setupAdminPanel(app);
        app.listen(PORT, () => console.log(`🚀 Server started on port: ${PORT}`));
    } catch (error) {
        console.error('❌ Unable to start the server:', error);
        if (error.code !== 'ERR_MODULE_NOT_FOUND') {
            console.error(error.stack);
            process.exit(1);
        } else {
            console.warn("🟠 Admin panel setup file ('./admin.js') not found or failed to import, starting server without admin panel.");
            app.listen(PORT, () => console.log(`🚀 Server started W/O ADMIN PANEL on port: ${PORT}`));
        }
    }
};

start();