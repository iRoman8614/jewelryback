import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { Op } from 'sequelize';

export const getAllProducts = async (req, res, next) => {
    try {
        const categorySlug = req.query.category;
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 12;
        if (page < 1) page = 1;
        if (limit < 1) limit = 12;
        const offset = (page - 1) * limit;
        const options = {
            where: {
                isVisible: true,
            },
            limit: limit,
            offset: offset,
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name', 'slug'],
                },
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
            distinct: true,
        };
        if (categorySlug) {
            const category = await Category.findOne({
                where: { slug: categorySlug },
                attributes: ['id'],
            });

            if (category) {
                options.where.categoryId = category.id;
            } else {
                return res.json({
                    products: [],
                    totalProducts: 0,
                    totalPages: 0,
                    currentPage: page,
                });
            }
        }

        const { count, rows } = await Product.findAndCountAll(options);

        const totalPages = Math.ceil(count / limit);

        const formattedProducts = rows.map(product => ({
            id: product.id,
            image: product.image1 || '/placeholder.png',
            name: product.name,
            desc: product.category?.name || 'No Category',
            weight: product.weight,
            size: product.size,
            material: product.material,
            price: product.price,
            sku: product.sku,
            // Если нужны все картинки, можно добавить:
            // allImages: [product.image1, product.image2, product.image3, product.image4].filter(img => img)
        }));


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

export const getOneProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await Product.findOne({
            where: {
                id: productId,
                isVisible: true,
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name', 'slug'],
                },
            ],
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const formattedProduct = {
            id: product.id,
            name: product.name,
            desc: product.category?.name || 'No Category',
            weight: product.weight,
            size: product.size,
            material: product.material,
            price: product.price,
            description: product.description,
            sku: product.sku,
            previewImage: product.previewImage,
            images: [product.image1, product.image2, product.image3, product.image4].filter(img => img),
            category: product.category
        };

        res.json(formattedProduct);

    } catch (error) {
        next(error);
    }
};