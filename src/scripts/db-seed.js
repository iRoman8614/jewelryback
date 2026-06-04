// scripts/db-seed.js
// One-shot data population for a fresh deployment.
//
// Consolidates every file that used to live in src/seeders/* into a single
// idempotent script: running it twice will NOT create duplicates.
//
// Seeds:
//   - 5 base categories (Rings, Bracelets, Earrings, Pendants, Necklaces)
//   - one singleton row for each config table (homepage, snake, mobile slider,
//     icon links, reel gallery) — note: homepage alt fields are gone in the
//     final schema, so they are NOT inserted here
//   - the initial admin from ADMIN_EMAIL / ADMIN_PASSWORD
//
// Usage:
//   node scripts/db-seed.js
//
// Run AFTER scripts/db-create.js. Deploy-time command only.

import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import defineAssociations, { models, sequelize } from '../models/associations.js';

dotenv.config();

const {
    Admin, Category,
    HomepageConfig, IconLinksConfig, MobileSliderConfig,
    ReelGalleryConfig, SnakeConfig,
} = models;

const generateSlug = (name) =>
    name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

const seedCategories = async () => {
    const categories = [
        { name: 'Rings', title_ru: 'Кольца' },
        { name: 'Bracelets', title_ru: 'Браслеты' },
        { name: 'Earrings', title_ru: 'Серьги' },
        { name: 'Pendants', title_ru: 'Подвески' },
        { name: 'Necklaces', title_ru: 'Ожерелья' },
    ];

    for (const cat of categories) {
        const slug = generateSlug(cat.name);
        // findOrCreate keyed on slug (unique) → idempotent.
        const [, created] = await Category.findOrCreate({
            where: { slug },
            defaults: { name: cat.name, title_ru: cat.title_ru, slug },
        });
        console.log(`  category "${cat.name}": ${created ? 'created' : 'already exists'}`);
    }
    console.log('✅ Categories seeded.');
};

// Each config table is a singleton: ensure exactly one row exists.
const seedSingleton = async (Model, label) => {
    const count = await Model.count();
    if (count === 0) {
        await Model.create({});
        console.log(`✅ ${label}: initial row created.`);
    } else {
        console.log(`  ${label}: already has ${count} row(s), skipped.`);
    }
};

const seedAdmin = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error('ADMIN_EMAIL / ADMIN_PASSWORD must be set in .env to seed the initial admin.');
    }

    const existing = await Admin.findOne({ where: { email: adminEmail } });
    if (existing) {
        console.log(`  admin "${adminEmail}": already exists, skipped.`);
        return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await Admin.create({ email: adminEmail, hashedPassword });
    console.log(`✅ Initial admin created: ${adminEmail}`);
};

const run = async () => {
    try {
        await sequelize.authenticate();
        defineAssociations();
        console.log('✅ Connected. Seeding…');

        await seedCategories();
        await seedSingleton(HomepageConfig, 'homepage_config');
        await seedSingleton(SnakeConfig, 'snake_config');
        await seedSingleton(MobileSliderConfig, 'mobile_slider_config');
        await seedSingleton(IconLinksConfig, 'icon_links_config');
        await seedSingleton(ReelGalleryConfig, 'reel_gallery_config');
        await seedAdmin();

        await sequelize.close();
        console.log('🎉 db-seed finished.');
        process.exit(0);
    } catch (err) {
        console.error('❌ db-seed failed:', err);
        process.exit(1);
    }
};

run();