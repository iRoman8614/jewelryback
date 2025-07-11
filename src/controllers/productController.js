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

export const getAllProducts = async (req, res, next) => {
    try {
        const {
            category: categorySlug,
            collection: collectionSlug,
            sort,
        } = req.query;

        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 12;
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
            const category = await Category.findOne({ where: { slug: categorySlug } });
            if (!category) {
                const err = new Error('Category not found');
                err.statusCode = 404;
                return next(err);
            }
            options.include[0].where = { slug: categorySlug };
            options.include[0].required = true;
        }

        if (collectionSlug) {
            const collection = await Collection.findOne({ where: { slug: collectionSlug } });
            if (!collection) {
                const err = new Error('Collection not found');
                err.statusCode = 404;
                return next(err);
            }
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

export const getArchivedProducts = async (req, res, next) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 12;
        if (page < 1) page = 1;

        const offset = (page - 1) * limit;

        const { count, rows } = await Product.findAndCountAll({
            where: { isVisible: false },
            limit: limit,
            offset: offset,
            order: [['updatedAt', 'DESC']],
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
            totalPages: totalPages,
            currentPage: page,
        });

    } catch (error) {
        next(error);
    }
}

export const getFeaturedProducts = async (req, res, next) => {
    try {
        const query = `
            SELECT previewImage, name_ru, name_en FROM (
                SELECT
                    previewImage,
                    name_ru,
                    name_en,
                    categoryId,
                    ROW_NUMBER() OVER (PARTITION BY categoryId ORDER BY createdAt DESC) as rn
                FROM Products
                WHERE isVisible = true AND previewImage IS NOT NULL
            ) AS RankedProducts
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
            const err = new Error('Product not found');
            err.statusCode = 404;
            return next(err);
        }

        const formattedProduct = {
            id: product.id,
            isVisible: product.isVisible,
            stockQuantity: product.stockQuantity,
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
                product.image1,
                product.image2,
                product.image3,
                product.image4
            ].filter(Boolean),
        };

        res.json(formattedProduct);

    } catch (error) {
        next(error);
    }
};