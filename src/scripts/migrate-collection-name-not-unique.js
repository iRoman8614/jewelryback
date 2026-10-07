// src/scripts/migrate-collection-name-not-unique.js
//
// Миграция БЕЗ потери данных: у коллекций разрешаем одинаковое ИМЯ (name_ru/
// name_en), но ОБЯЗАТЕЛЬНО разные slug.
//
// Что делает:
//   1) снимает уникальные индексы, построенные ТОЛЬКО по name_ru / name_en
//      (включая дубликаты вида name_ru_2, созданные повторными sync());
//   2) гарантирует, что уникальный индекс на slug на месте (создаёт, если нет);
//   3) печатает итоговый список индексов для контроля.
//
// Работает только с индексами (DDL ALTER TABLE ... DROP/ADD INDEX) — строки
// таблицы не читаются и не меняются, потери данных нет. Идемпотентно: повторный
// запуск ничего не ломает.
//
// Запуск на сервере:
//   docker compose exec backend node dist/scripts/migrate-collection-name-not-unique.js
import sequelize from '../config/database.js';

const TABLE = 'collections';
const NAME_COLS = ['name_ru', 'name_en'];

async function run() {
    await sequelize.authenticate();

    const [rows] = await sequelize.query(
        `SELECT INDEX_NAME, COLUMN_NAME, NON_UNIQUE
         FROM information_schema.STATISTICS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t`,
        { replacements: { t: TABLE } },
    );

    if (!rows.length) {
        console.error(`❌ Таблица "${TABLE}" не найдена. Сначала подними бэк и создай схему.`);
        process.exit(1);
    }

    // Группируем колонки по имени индекса.
    const byIndex = new Map();
    for (const r of rows) {
        if (!byIndex.has(r.INDEX_NAME)) {
            byIndex.set(r.INDEX_NAME, { unique: Number(r.NON_UNIQUE) === 0, cols: [] });
        }
        byIndex.get(r.INDEX_NAME).cols.push(r.COLUMN_NAME);
    }

    // Дропаем уникальные индексы, ВСЕ колонки которых — это только name_ru/name_en.
    // (Составной индекс, где есть slug, не трогаем — на всякий случай.)
    const toDrop = [];
    for (const [name, info] of byIndex) {
        if (name === 'PRIMARY' || !info.unique) continue;
        const touchesName = info.cols.some((c) => NAME_COLS.includes(c));
        const onlyName = info.cols.every((c) => NAME_COLS.includes(c));
        if (touchesName && onlyName) toDrop.push(name);
    }

    if (!toDrop.length) {
        console.log('ℹ️  Уникальных индексов на name_ru/name_en нет — уже снято.');
    } else {
        for (const idx of toDrop) {
            console.log(`→ DROP UNIQUE INDEX \`${idx}\``);
            await sequelize.query(`ALTER TABLE \`${TABLE}\` DROP INDEX \`${idx}\``);
        }
        console.log(`✅ Уникальность имён снята (индексов удалено: ${toDrop.length}).`);
    }

    // Гарантируем уникальный индекс на slug.
    const slugUnique = [...byIndex.values()].some(
        (i) => i.unique && i.cols.length === 1 && i.cols[0] === 'slug',
    );
    if (slugUnique) {
        console.log('✅ Уникальный индекс на slug уже есть.');
    } else {
        console.log('→ ADD UNIQUE INDEX on slug');
        await sequelize.query(
            `ALTER TABLE \`${TABLE}\` ADD UNIQUE INDEX \`collections_slug_unique\` (\`slug\`)`,
        );
        console.log('✅ Добавлен уникальный индекс на slug.');
    }

    // Контроль: что осталось.
    const [after] = await sequelize.query(
        `SELECT INDEX_NAME, GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS cols, MIN(NON_UNIQUE) AS nu
         FROM information_schema.STATISTICS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t
         GROUP BY INDEX_NAME`,
        { replacements: { t: TABLE } },
    );
    console.log('Индексы collections после миграции:');
    for (const r of after) {
        console.log(`  ${r.INDEX_NAME} [${r.cols}] unique=${Number(r.nu) === 0}`);
    }

    console.log('🎉 Миграция collections завершена.');
}

run()
    .then(() => process.exit(0))
    .catch((e) => { console.error('❌', e.message || e); process.exit(1); });