// src/scripts/migrate-add-payments.js
//
// Миграция БЕЗ потери данных для онлайн-оплаты (ЮKassa):
//   1) orders: новые колонки оплаты (все NULL / DEFAULT 0) + уникальные индексы
//      publicToken, checkoutKey + индекс (status, paymentExpiresAt)
//   2) orders.status: в ENUM ДОПИСЫВАЕТСЯ значение 'awaiting_payment'
//      (существующие значения и данные не меняются)
//   3) order_items: restockedQuantity, refundedQuantity (DEFAULT 0)
//      + для уже отменённых заказов restockedQuantity = quantity
//        (их остаток уже был возвращён старой логикой — чтобы не вернуть дважды)
//   4) payment_methods.yookassaMethod (NULL = офлайн-способ, как сейчас)
//   5) новые таблицы payments, refunds, payment_events (CREATE IF NOT EXISTS)
//
// Ничего не удаляет и не переписывает. Идемпотентно: повторный запуск — пропуск.
//
// Запуск на сервере (ПОСЛЕ дампа БД и пересборки бэка):
//   docker compose exec backend node dist/scripts/migrate-add-payments.js --dry-run   # только показать план
//   docker compose exec backend node dist/scripts/migrate-add-payments.js
import sequelize from '../config/database.js';
import defineAssociations from '../models/associations.js';
import Payment from '../models/Payment.js';
import Refund from '../models/Refund.js';
import PaymentEvent from '../models/PaymentEvent.js';

const DRY = process.argv.includes('--dry-run');

const q = async (sql, opts) => {
    if (DRY) { console.log(`   [dry-run] ${sql.replace(/\s+/g, ' ').trim()}`); return [[], null]; }
    return sequelize.query(sql, opts);
};

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

const indexExists = async (table, index) => {
    const [rows] = await sequelize.query(
        `SELECT COUNT(*) AS c FROM information_schema.STATISTICS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND INDEX_NAME = :i`,
        { replacements: { t: table, i: index } },
    );
    return Number(rows[0].c) > 0;
};

const addColumn = async (table, column, ddl) => {
    if (await columnExists(table, column)) {
        console.log(`ℹ️  ${table}.${column} уже есть — пропуск.`);
        return false;
    }
    await q(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${ddl}`);
    console.log(DRY ? `➕ ${table}.${column} будет добавлена.` : `✅ ${table}.${column} добавлена.`);
    return true;
};

const addIndex = async (table, index, ddl) => {
    if (await indexExists(table, index)) {
        console.log(`ℹ️  индекс ${table}.${index} уже есть — пропуск.`);
        return;
    }
    await q(`ALTER TABLE \`${table}\` ADD ${ddl}`);
    console.log(DRY ? `➕ индекс ${table}.${index} будет добавлен.` : `✅ индекс ${table}.${index} добавлен.`);
};

// Дописать значение в ENUM, сохранив существующие значения, NOT NULL, DEFAULT и COLLATE.
const appendEnumValue = async (table, column, value) => {
    const [rows] = await sequelize.query(
        `SELECT COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT, COLLATION_NAME
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
        { replacements: { t: table, c: column } },
    );
    if (!rows.length) throw new Error(`${table}.${column} not found`);
    const { COLUMN_TYPE: type, IS_NULLABLE: nullable, COLUMN_DEFAULT: def, COLLATION_NAME: coll } = rows[0];
    const m = /^enum\((.*)\)$/i.exec(type);
    if (!m) throw new Error(`${table}.${column} is not ENUM: ${type}`);
    const values = m[1].match(/'((?:[^']|'')*)'/g).map((v) => v.slice(1, -1).replace(/''/g, "'"));
    if (values.includes(value)) {
        console.log(`ℹ️  ${table}.${column} уже содержит '${value}' — пропуск.`);
        return;
    }
    const list = [...values, value].map((v) => `'${v.replace(/'/g, "''")}'`).join(',');
    const parts = [`ENUM(${list})`];
    if (coll) parts.push(`COLLATE ${coll}`);
    parts.push(nullable === 'YES' ? 'NULL' : 'NOT NULL');
    if (def !== null && def !== undefined) parts.push(`DEFAULT '${String(def).replace(/'/g, "''")}'`);
    await q(`ALTER TABLE \`${table}\` MODIFY COLUMN \`${column}\` ${parts.join(' ')}`);
    console.log(`${DRY ? '➕' : '✅'} ${table}.${column}: ${DRY ? 'будет добавлено' : 'добавлено'} значение '${value}' (было: ${values.join(', ')}).`);
};

async function run() {
    await sequelize.authenticate();
    defineAssociations();
    if (DRY) console.log('🔎 DRY RUN — изменения НЕ применяются, только план.\n');

    for (const t of ['orders', 'order_items', 'payment_methods']) {
        if (!(await tableExists(t))) {
            console.error(`❌ Таблица ${t} не найдена — это не та база? Миграция остановлена.`);
            process.exit(1);
        }
    }

    // Счётчики «до» — для сверки после миграции.
    const [[before]] = await sequelize.query(
        'SELECT (SELECT COUNT(*) FROM orders) AS orders, (SELECT COUNT(*) FROM order_items) AS items, (SELECT COUNT(*) FROM payment_methods) AS pm',
    );

    // 1) orders — поля оплаты
    await addColumn('orders', 'publicToken', 'VARCHAR(64) NULL');
    await addColumn('orders', 'checkoutKey', 'VARCHAR(64) NULL');
    await addColumn('orders', 'paymentStatus', 'VARCHAR(32) NULL');
    await addColumn('orders', 'paidPaymentId', 'INT NULL');
    await addColumn('orders', 'paidAmount', 'DECIMAL(12,2) NULL');
    await addColumn('orders', 'paidAt', 'DATETIME NULL');
    await addColumn('orders', 'refundedAmount', 'DECIMAL(12,2) NOT NULL DEFAULT 0');
    await addColumn('orders', 'paymentExpiresAt', 'DATETIME NULL');
    await addColumn('orders', 'settlementReceiptId', 'VARCHAR(64) NULL');
    await addColumn('orders', 'settlementReceiptStatus', 'VARCHAR(32) NULL');
    await addIndex('orders', 'orders_public_token_unique', 'UNIQUE INDEX `orders_public_token_unique` (`publicToken`)');
    await addIndex('orders', 'orders_checkout_key_unique', 'UNIQUE INDEX `orders_checkout_key_unique` (`checkoutKey`)');
    await addIndex('orders', 'orders_status_payment_expires', 'INDEX `orders_status_payment_expires` (`status`, `paymentExpiresAt`)');

    // 2) orders.status += 'awaiting_payment'
    await appendEnumValue('orders', 'status', 'awaiting_payment');

    // 3) order_items — учёт возвратов на склад / денег
    const addedRestocked = await addColumn('order_items', 'restockedQuantity', 'INT NOT NULL DEFAULT 0');
    await addColumn('order_items', 'refundedQuantity', 'INT NOT NULL DEFAULT 0');
    if (addedRestocked) {
        // Только в том же запуске, где колонка создана (иначе — уже сделано).
        const [res] = await q(
            "UPDATE `order_items` oi JOIN `orders` o ON o.id = oi.orderId SET oi.restockedQuantity = oi.quantity WHERE o.status = 'cancelled'",
        );
        console.log(DRY ? '➕ order_items.restockedQuantity будет проставлен для отменённых заказов.' : `✅ order_items.restockedQuantity проставлен для отменённых заказов (${res?.affectedRows ?? 0} строк).`);
    }

    // 4) payment_methods.yookassaMethod
    await addColumn('payment_methods', 'yookassaMethod', 'VARCHAR(32) NULL DEFAULT NULL');

    // 5) новые таблицы (CREATE TABLE IF NOT EXISTS — существующие не трогаются)
    for (const [Model, table] of [[Payment, 'payments'], [Refund, 'refunds'], [PaymentEvent, 'payment_events']]) {
        if (await tableExists(table)) {
            console.log(`ℹ️  таблица ${table} уже есть — пропуск.`);
        } else if (DRY) {
            console.log(`   [dry-run] CREATE TABLE ${table}`);
        } else {
            await Model.sync();
            console.log(`✅ таблица ${table} создана.`);
        }
    }

    const [[after]] = await sequelize.query(
        'SELECT (SELECT COUNT(*) FROM orders) AS orders, (SELECT COUNT(*) FROM order_items) AS items, (SELECT COUNT(*) FROM payment_methods) AS pm',
    );
    console.log(`\nСверка строк: orders ${before.orders}→${after.orders}, order_items ${before.items}→${after.items}, payment_methods ${before.pm}→${after.pm}`);
    if (before.orders !== after.orders || before.items !== after.items || before.pm !== after.pm) {
        throw new Error('Количество строк изменилось — проверьте базу!');
    }
    console.log(DRY ? '🔎 DRY RUN завершён.' : '🎉 Миграция оплаты завершена (данные не тронуты).');
}

run()
    .then(() => process.exit(0))
    .catch((e) => { console.error('❌', e.message || e); process.exit(1); });
