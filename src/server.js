import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import mainRouter from './routes/index.js';
import uploadRoutes from './routes/uploadRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import path from 'path';
import rateLimit from 'express-rate-limit';
import { sessionMiddleware } from './config/session.js';
import { fileURLToPath } from 'url';

import defineAssociations from './models/associations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.set('trust proxy', 1);

app.disable('x-powered-by');

const whitelist = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

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

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
});

app.use(express.json({ limit: '30mb' }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(sessionMiddleware);

app.use('/api/uploads', uploadRoutes);

const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: 'Too many login attempts, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please slow down.' },
});

app.use('/api', apiLimiter, mainRouter);

app.use('/api', (req, res) => {
    res.status(404).json({ message: 'Not found.' });
});

app.get('/', (req, res) => {
    res.send('Jewelry Backend API Running!');
});

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connection has been established successfully.');

        defineAssociations();

        const adminLoginPath = '/admin/login';
        app.post(adminLoginPath, (req, res, next) => {
            const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || req.socket?.remoteAddress || req.connection?.socket?.remoteAddress || 'Unknown IP';
            const email = req.body?.email || 'Unknown Email';
            console.log(`[AUTH ATTEMPT] Time: ${new Date().toISOString()}, IP: ${ip}, Email: ${email}`);
            next();
        });
        app.post(adminLoginPath, adminLoginLimiter);

        const { default: setupAdminPanel } = await import('./admin.js');
        await setupAdminPanel(app);

        if (!setupAdminPanel.error) {
            app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
            const { startPaymentMaintenance } = await import('./services/paymentService.js');
            startPaymentMaintenance();
        } else {
            console.log('Server not started due to AdminJS setup error. Please check AdminJS logs.');
        }

    } catch (error) {
        console.error('Unable to start the server:', error);
        if (error.code !== 'ERR_MODULE_NOT_FOUND' || (error.message && !error.message.includes("'./admin.js'"))) {
            console.error(error.stack);
            process.exit(1);
        } else {
            console.warn("Admin panel setup file ('./admin.js') not found or failed to import, starting server without admin panel.");
            app.listen(PORT, () => console.log(`Server started W/O ADMIN PANEL on port: ${PORT}`));
        }
    }
};

start();