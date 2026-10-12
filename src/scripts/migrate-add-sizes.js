// src/scripts/migrate-add-sizes.js
//
// Миграция БЕЗ потери данных для поддержки размеров с остатком:
//   1) Products.sizes       JSON NULL   — остаток по размерам { "15": 2, ... }
//   2) order_items.size     VARCHAR NULL — выбранный размер в позиции заказа
//
// Только ADD COLUMN IF NOT EXISTS — существующие строки не трогаются.
// Идемпотентно: повторный запуск ничего не ломает (колонки уже есть → пропуск).
//
// Запуск на сервере:
//   docker compose exec backend node dist/scripts/migrate-add-sizes.js
import sequelize from '../config/database.js';

const columnExists = async (table, column) => {
    const [rows] = await sequelize.query(
        `SELECT COUNT(*) AS c FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
        { replacements: { t: table, c: column } },
    );
    return Number(rows[0].c) > 0;
};

const tableExists = async (table) => {
    const [rows] = await sequelize.query(
        `SELECT COUNT(*) AS c FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t`,
        { replacements: { t: table } },
    );
    return Number(rows[0].c) > 0;
};

async function run() {
    await sequelize.authenticate();

    // 1) Products.sizes
    if (!(await tableExists('Products'))) {
        console.error('❌ Таблица Products не найдена. Сначала подними бэк/создай схему.');
        process.exit(1);
    }
    if (await columnExists('Products', 'sizes')) {
        console.log('ℹ️  Products.sizes уже существует — пропуск.');
    } else {
        await sequelize.query('ALTER TABLE `Products` ADD COLUMN `sizes` JSON NULL');
        console.log('✅ Добавлена колонка Products.sizes (JSON).');
    }

    // 2) order_items.size
    if (!(await tableExists('order_items'))) {
        console.error('❌ Таблица order_items не найдена.');
        process.exit(1);
    }
    if (await columnExists('order_items', 'size')) {
        console.log('ℹ️  order_items.size уже существует — пропуск.');
    } else {
        await sequelize.query('ALTER TABLE `order_items` ADD COLUMN `size` VARCHAR(255) NULL');
        console.log('✅ Добавлена колонка order_items.size (VARCHAR).');
    }

    console.log('🎉 Миграция размеров завершена (данные не тронуты).');
}

run()
    .then(() => process.exit(0))
    .catch((e) => { console.error('❌', e.message || e); process.exit(1); });