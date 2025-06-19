import { Op, Sequelize } from 'sequelize';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Collection from '../models/Collection.js';
import sequelize from '../config/database.js';

const formatProduct = (product) => ({
    id: product.id,
    sku: product.sku,
    name: {
        ru: product.name_ru,
        en: product.name_en,
    },
    price: product.price,
    previewImage: product.previewImage,
    category: product.category ? product.category.slug : null,
    collection: product.collection ? product.collection.slug : null,
    size: product.size,
    weight: product.weight,
    material: {
        ru: product.material_ru,
        en: product.material_en,
    },
});

// --- ОСНОВНОЙ КОНТРОЛЛЕР ДЛЯ КАТАЛОГА ---
export const getAllProducts = async (req, res, next) => {
    try {
        const {
            category: categorySlug,
            collection: collectionSlug,
            sort,
        } = req.query;

        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 12; // По умолчанию 12
        if (page < 1) page = 1;

        const offset = (page - 1) * limit;

        const options = {
            where: { isVisible: true },
            limit: limit,
            offset: offset,
            include: [
                { model: Category, as: 'category', attributes: ['slug'] },
                { model: Collection, as: 'collection', attributes: ['slug'] },
            ],
            order: [['createdAt', 'DESC']],
            distinct: true,
        };

        if (categorySlug) {
            options.include[0].where = { slug: categorySlug };
            options.include[0].required = true;
        }

        if (collectionSlug) {
            options.include[1].where = { slug: collectionSlug };
            options.include[1].required = true;
        }

        if (sort) {
            if (sort === 'price_asc') {
                options.order = [['price', 'ASC']];
            }
            if (sort === 'price_desc') {
                options.order = [['price', 'DESC']];
            }
        }

        const { count, rows } = await Product.findAndCountAll(options);

        const totalPages = Math.ceil(count / limit);
        const formattedProducts = rows.map(formatProduct);

        res.json({
            products: formattedProducts,
            totalProducts: count,
            totalPages: totalPages,
            currentPage: page,
        });
    } catch (error) {
        next(error);
    }
};

// --- КОНТРОЛЛЕР ДЛЯ АРХИВНЫХ ТОВАРОВ (С ПАГИНАЦИЕЙ) ---
export const getArchivedProducts = async (req, res, next) => {
    try {
        // --- ДОБАВЛЕНО ---
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 12; // По умолчанию 12
        if (page < 1) page = 1;

        const offset = (page - 1) * limit;
        // ------------------

        const { count, rows } = await Product.findAndCountAll({
            where: { isVisible: false },
            limit: limit,   // <-- ИЗМЕНЕНО
            offset: offset, // <-- ИЗМЕНЕНО
            order: [['updatedAt', 'DESC']],
            // Добавляем include, чтобы формат был таким же, как у обычных товаров
            include: [
                { model: Category, as: 'category', attributes: ['slug'] },
                { model: Collection, as: 'collection', attributes: ['slug'] },
            ],
            distinct: true,
        });

        const totalPages = Math.ceil(count / limit);
        const formattedProducts = rows.map(formatProduct);

        res.json({
            products: formattedProducts,
            totalProducts: count,
            totalPages: totalPages, // <-- ИЗМЕНЕНО
            currentPage: page,      // <-- ИЗМЕНЕНО
        });

    } catch (error) {
        next(error);
    }
}

// --- КОНТРОЛЛЕР ДЛЯ ИЗБРАННЫХ/СЛУЧАЙНЫХ ТОВАРОВ ---
export const getFeaturedProducts = async (req, res, next) => {
    try {
        const query = `
            WITH RankedProducts AS (
                SELECT
                    "previewImage",
                    "name_ru",
                    "name_en",
                    "categoryId",
                    ROW_NUMBER() OVER (PARTITION BY "categoryId" ORDER BY "createdAt" DESC) as rn
                FROM "Products"
                WHERE "isVisible" = true AND "previewImage" IS NOT NULL
            )
            SELECT
                "previewImage",
                "name_ru",
                "name_en"
            FROM RankedProducts
            WHERE rn = 1
            LIMIT 6;
        `;

        const products = await sequelize.query(query, {
            type: Sequelize.QueryTypes.SELECT
        });

        const formatted = products.map(p => ({
            url: p.previewImage,
            alt: {
                ru: p.name_ru,
                en: p.name_en,
            }
        }));

        res.json(formatted);

    } catch (error) {
        next(error);
    }
}

export const getOneProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({
            where: { id: id },
            include: [
                { model: Category, as: 'category' },
                { model: Collection, as: 'collection' }
            ],
        });

        if (!product) {
            // Если товар не найден, возвращаем 404
            const err = new Error('Product not found');
            err.statusCode = 404;
            return next(err);
        }

        // Форматируем под новый мокап
        const formattedProduct = {
            id: product.id,
            name: { ru: product.name_ru, en: product.name_en },
            type: {
                ru: product.category.title_ru,
                en: product.category.name
            },
            collection: product.collection ? {
                ru: product.collection.name_ru,
                en: product.collection.name_en,
            } : null,
            price: `${new Intl.NumberFormat('ru-RU').format(product.price)} ₽`,
            description: {
                ru: product.description_ru,
                en: product.description_en
            },
            materials: {
                ru: product.material_ru,
                en: product.material_en
            },
            // Секция details - это по сути те же данные, но с лейблами.
            // Это лучше делать на фронтенде, но если нужно на бэке, вот как это сделать:
            details: {
                size: {
                    label: { ru: 'РАЗМЕР', en: 'SIZE' },
                    value: product.size
                },
                weight: {
                    label: { ru: 'ВЕС', en: 'WEIGHT' },
                    value: product.weight ? `${product.weight} г` : null
                },
                material: {
                    label: { ru: 'МАТЕРИАЛЫ', en: 'MATERIALS' },
                    value: {
                        ru: product.material_ru.toUpperCase().replace(/, /g, '\n'),
                        en: product.material_en.toUpperCase().replace(/, /g, '\n')
                    }
                },
                price: {
                    label: { ru: 'ЦЕНА', en: 'PRICE' },
                    value: `${Math.round(product.price / 1000)}K`
                }
            },
            images: [
                product.previewImage,
                product.image1,
                product.image2,
                product.image3,
                product.image4
            ].filter(Boolean), // .filter(Boolean) убирает null и пустые строки
        };

        res.json(formattedProduct);

    } catch (error) {
        next(error);
    }
};