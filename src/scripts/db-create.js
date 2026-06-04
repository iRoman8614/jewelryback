// scripts/db-create.js
// One-shot schema creation for a FRESH deployment.
//
// Replaces the migration chain: the Sequelize models are the single source of
// truth for the schema (they already reflect the final post-migration state —
// no homepage alt fields, delivery_options has allowsPaymentOnDelivery).
//
// What it does:
//   1. Connects to the MySQL server (without a database) and CREATE DATABASE
//      IF NOT EXISTS with utf8mb4, so a brand-new server needs no manual step.
//   2. Defines all model associations (so foreign keys are built).
//   3. sync() — creates every table. By default it will NOT touch existing
//      tables. Pass --force to DROP and recreate everything (DANGER: wipes data).
//
// Usage:
//   node scripts/db-create.js            # create missing tables only
//   node scripts/db-create.js --force    # drop & recreate ALL tables
//
// This is a deploy-time command. The server itself never alters the schema.

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import defineAssociations from '../models/associations.js';
import { sessionStore } from '../config/session.js';

dotenv.config();

const FORCE = process.argv.includes('--force');

const ensureDatabaseExists = async () => {
    const dbName = process.env.DB_NAME;
    if (!dbName) throw new Error('DB_NAME is not set.');

    // Connect to the server WITHOUT selecting a database, just to create it.
    const admin = new Sequelize('', process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        dialect: 'mysql',
        logging: false,
    });

    try {
        await admin.query(
            `CREATE DATABASE IF NOT EXISTS \`${dbName}\` ` +
            `CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
        );
        console.log(`✅ Database "${dbName}" is present (created if it was missing).`);
    } finally {
        await admin.close();
    }
};

const run = async () => {
    try {
        await ensureDatabaseExists();

        await sequelize.authenticate();
        console.log('✅ Connected to the database.');

        defineAssociations();

        if (FORCE) {
            console.warn('⚠️  --force: dropping and recreating ALL tables. Existing data will be lost.');
        }

        await sequelize.sync({ force: FORCE });
        console.log(`✅ Schema created (${FORCE ? 'force recreate' : 'create missing only'}).`);

        // Session store table (Sessions) — used by the shared express-session.
        await sessionStore.sync();
        console.log('✅ Session store table ensured.');

        await sequelize.close();
        console.log('🎉 db-create finished.');
        process.exit(0);
    } catch (err) {
        console.error('❌ db-create failed:', err);
        process.exit(1);
    }
};

run();