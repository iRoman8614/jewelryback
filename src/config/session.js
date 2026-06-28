// src/config/session.js
//
// SINGLE source of truth for HTTP sessions.
//
// Why this file exists:
//   AdminJS (@adminjs/express buildAuthenticatedRouter) mounts its OWN
//   express-session internally, using `cookieName` as the cookie name and
//   `cookiePassword` as the secret. Previously the app also mounted a SECOND,
//   separate express-session in server.js with a different cookie name and the
//   default in-memory store. The two sessions never shared state, so the admin
//   user written by AdminJS (req.session.adminUser) was invisible to the /api
//   routes — isAdminAuthenticated always returned 401.
//
//   The fix: ONE shared store (persisted in the existing MySQL database via
//   connect-session-sequelize) plus the SAME cookie name and secret on both
//   sides. Then AdminJS and /api read/write the exact same session row, and
//   req.session.adminUser is available everywhere after a form login.
//
// Security hardening (previously missing):
//   - secret comes from env with NO insecure fallback; the process refuses to
//     start in production without it.
//   - saveUninitialized: false (don't create sessions for anonymous visitors).
//   - httpOnly, sameSite, and secure cookies in production.

import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import sequelize from './database.js';

const isProd = process.env.NODE_ENV === 'production';

// --- secret: required, no fallback ---------------------------------------
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;
if (!SESSION_SECRET) {
    if (isProd) {
        throw new Error(
            'ADMIN_SESSION_SECRET is not set. Refusing to start in production without a session secret.'
        );
    }
    // In development we warn loudly but allow a clearly-marked dev-only value so
    // local work isn't blocked. This value is NEVER used in production.
    console.warn('⚠️  ADMIN_SESSION_SECRET is not set — using an INSECURE dev-only secret.');
}
const effectiveSecret = SESSION_SECRET || 'insecure-dev-only-secret-do-not-use-in-prod';

// Shared cookie name. AdminJS overrides its cookie name with `cookieName`, so
// we pass this same value there to keep a single cookie/session.
export const SESSION_COOKIE_NAME = 'jewelry.sid';
export const SESSION_SECRET_VALUE = effectiveSecret;

// --- shared store: one row per session, persisted in MySQL ----------------
const SequelizeStore = connectSessionSequelize(session.Store);

export const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: 'Sessions',
    // sweep expired sessions every 15 minutes
    checkExpirationInterval: 15 * 60 * 1000,
    // session TTL in ms (matches cookie maxAge below)
    expiration: 1000 * 60 * 60 * 24,
});

// Options object reused by BOTH express-session (server.js) and AdminJS.
export const sessionOptions = {
    store: sessionStore,
    secret: effectiveSecret,
    name: SESSION_COOKIE_NAME,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax',
        //secure: isProd && process.env.SESSION_COOKIE_INSECURE !== 'true', // HTTPS-only cookies in production
        secure: isProd,
    },
};

// Ready-to-use middleware for the main app.
export const sessionMiddleware = session(sessionOptions);

export default sessionMiddleware;