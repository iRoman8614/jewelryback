// src/scripts/previewEmail.js
//
// Renders the email templates with mock data into ready-to-open HTML files,
// so you can preview them in WebStorm (right-click the generated file →
// "Open in Browser", or use the built-in HTML preview).
//
// Usage (from project root):
//   node src/scripts/previewEmail.js
//
// Output: ./email-preview/*.html  (orderConfirmation + orderStatusUpdate, RU/EN)
//
// Re-run after editing a template to refresh the preview.

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '..', 'email-templates');
const OUT_DIR = path.join(process.cwd(), 'email-preview');

// Provide a site URL so the logo (absolute URL) loads in the preview.
// Override by exporting PUBLIC_SITE_URL / EMAIL_LOGO_URL before running.
process.env.PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL || 'https://rbjwlr.ru';

// Import the service AFTER setting env (it reads PUBLIC_SITE_URL at load time).
const { buildConfirmationData, buildStatusData } = await import('../services/emailService.js');

// --- mock data (preview only) --------------------------------------------
// previewImage left empty on purpose → templates render the grey placeholder
// square, exactly like the design mockup.
const mockOrder = (lang) => ({
    id: 1042,
    language: lang,
    customerName: lang === 'en' ? 'John Smith' : 'Иван Петров',
    totalAmount: 198000,
    items: [
        { priceAtOrder: 33000, quantity: 1, productName: 'Метеор',
            productDetails: { name_ru: 'Метеор', name_en: 'Meteor', previewImage: '', category: { title_ru: 'Кольцо', name: 'Ring' } } },
        { priceAtOrder: 65000, quantity: 1, productName: 'Стоун Харт',
            productDetails: { name_ru: 'Стоун Харт', name_en: 'Stone Heart', previewImage: '', category: { title_ru: 'Кольцо', name: 'Ring' } } },
        { priceAtOrder: 100000, quantity: 1, productName: 'Таттлерс Дрим',
            productDetails: { name_ru: 'Таттлерс Дрим', name_en: 'Tattlers Dream', previewImage: '', category: { title_ru: 'Браслет', name: 'Bracelet' } } },
    ],
});

const compileTemplate = async (name) => {
    const src = await fs.readFile(path.join(TEMPLATES_DIR, `${name}.html`), 'utf-8');
    return handlebars.compile(src);
};

const run = async () => {
    await fs.mkdir(OUT_DIR, { recursive: true });

    const confirmTpl = await compileTemplate('orderConfirmation');
    const statusTpl = await compileTemplate('orderStatusUpdate');

    const jobs = [
        ['orderConfirmation.ru.html', confirmTpl(buildConfirmationData(mockOrder('ru')))],
        ['orderConfirmation.en.html', confirmTpl(buildConfirmationData(mockOrder('en')))],
        ['orderStatusUpdate.ru.html', statusTpl(buildStatusData(mockOrder('ru'), 'shipped'))],
        ['orderStatusUpdate.en.html', statusTpl(buildStatusData(mockOrder('en'), 'shipped'))],
    ];

    for (const [file, html] of jobs) {
        await fs.writeFile(path.join(OUT_DIR, file), html, 'utf-8');
        console.log(`  ✓ ${path.join('email-preview', file)}`);
    }
    console.log('\n✅  Previews generated in ./email-preview/ — open them in WebStorm.');
};

run().catch((err) => {
    console.error('❌ preview failed:', err);
    process.exit(1);
});