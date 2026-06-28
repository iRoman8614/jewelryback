// src/models/SalesPoint.js
//
// Точки продаж (магазины-партнёры), где представлены изделия 27 JWLR.
// Обычная многострочная таблица: каждая точка — отдельная запись.
//
// Двуязычность как у Category (title_ru / *_en): name и address хранятся в двух
// колонках. Фронт (ContactsClient.pick) сам выбирает язык с фолбэком на ru.
//
// Логотип можно задать ДВУМЯ способами (любой на выбор):
//   logoImage — загруженный через админку файл (/uploads/...), кропер;
//   logoUrl   — внешняя ссылка (напр. avatars.mds.yandex.net/...).
// Контроллер отдаёт фронту loaded-файл в приоритете, иначе внешнюю ссылку.
//
// mapEmbedUrl — Яндекс.Карта: полный <iframe src="..."> ИЛИ просто ссылка
//               (фронт извлекает src и рендерит карту; только карт-домены).
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SalesPoint = sequelize.define('SalesPoint', {
    name_ru:     { type: DataTypes.STRING, allowNull: false },
    name_en:     { type: DataTypes.STRING, allowNull: true },
    logoImage:   { type: DataTypes.TEXT, allowNull: true },   // загруженный файл /uploads/...
    logoUrl:     { type: DataTypes.TEXT, allowNull: true },   // ИЛИ внешняя ссылка
    websiteUrl:  { type: DataTypes.STRING(512), allowNull: true },
    address_ru:  { type: DataTypes.TEXT, allowNull: true },
    address_en:  { type: DataTypes.TEXT, allowNull: true },
    mapEmbedUrl: { type: DataTypes.TEXT, allowNull: true },
    sortOrder:   { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isEnabled:   { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
    tableName: 'sales_points',
    timestamps: true,
});

export default SalesPoint;