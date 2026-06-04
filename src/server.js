// src/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import mainRouter from './routes/index.js';
import uploadRoutes from './routes/uploadRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import path from 'path';
import rateLimit from 'express-rate-limit';
// Single shared session middleware (also used by AdminJS) — see config/session.js
import { sessionMiddleware } from './config/session.js';
import { fileURLToPath } from 'url';

// Models + their associations are loaded from a single module so that the
// server, the db-create script, and the db-seed script all register the exact
// same relationships. Importing this also imports every model.
import defineAssociations from './models/associations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const whitelist = ['http://localhost:3000', 'https://jewelry-next.vercel.app', 'http://217.199.253.61', 'http://217.199.253.61:5000', 'https://27jwlr.store']
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

app.use(express.json({ limit: '30mb' }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(sessionMiddleware);

// Mounted AFTER sessionMiddleware: the upload route is now admin-guarded and
// needs the session to be available.
app.use('/api/uploads', uploadRoutes);

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: 'Too many login attempts, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api', mainRouter);

app.get('/', (req, res) => {
    res.send('💎 Jewelry Backend API Running!');
});

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Connection has been established successfully.');

        // Register model associations. The schema itself is created/updated
        // out-of-band by the deploy-time scripts (npm run db:create / db:seed),
        // NOT by the server — so there is no sequelize.sync() here. A running
        // (and possibly multi-instance) server must never mutate the schema.
        defineAssociations();

        // Logging and rate-limiter MUST be registered before setupAdminPanel
        // mounts the AdminJS router — only then do they actually intercept
        // login POSTs. adminJs.options.loginPath defaults to '/admin/login'.
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