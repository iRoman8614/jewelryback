import PaymentMethod from '../models/PaymentMethod.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import DeliveryOption from '../models/DeliveryOption.js';
import { Op } from 'sequelize';

export const getAllCheckoutOptions = async (req, res, next) => {
    try {
        const deliveryOptions = await DeliveryOption.findAll({
            where: { isEnabled: true },
            order: [['price', 'ASC']],
        });

        const paymentMethods = await PaymentMethod.findAll({
            where: { isEnabled: true },
            order: [['createdAt', 'ASC']],
        });

        const formatDeliveryOption = (item) => ({
            id: item.id,
            value: item.slug,
            label: item.label,
            price: item.price,
            allowsPaymentOnDelivery: item.allowsPaymentOnDelivery,
        });

        const formatPaymentMethod = (item) => ({
            id: item.id,
            value: item.slug,
            label: item.label,
        });

        const groupedData = {
            deliveryOptions: {
                ru: deliveryOptions.filter(d => d.isForRussia).map(formatDeliveryOption),
                en: deliveryOptions.filter(d => !d.isForRussia).map(formatDeliveryOption),
            },
            paymentMethods: {
                ru: paymentMethods.filter(p => p.isForRussia).map(formatPaymentMethod),
                en: paymentMethods.filter(p => !p.isForRussia).map(formatPaymentMethod),
            }
        };

        res.json(groupedData);

    } catch (error) {
        next(error);
    }
};

export const getCartDetails = async (req, res, next) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ message: 'Items array is required.' });
        }

        if (items.length === 0) {
            return res.json([]);
        }

        const productIds = items.map(item => item.productId);

        const products = await Product.findAll({
            where: {
                id: {
                    [Op.in]: productIds
                }
            },
            include: [{
                model: Category,
                as: 'category',
                required: true
            }]
        });

        const productMap = products.reduce((map, product) => {
            map[product.id] = product;
            return map;
        }, {});

        const cartDetails = productIds
            .map(id => productMap[id])
            .filter(Boolean)
            .map(product => ({
                id: product.id,
                sku: product.sku,
                name: {
                    ru: product.name_ru,
                    en: product.name_en
                },
                type: {
                    ru: product.category.title_ru,
                    en: product.category.name
                },
                price: parseFloat(product.price),
                image: product.previewImage,
                isAvailable: product.isVisible && product.stockQuantity > 0,
                stockQuantity: product.stockQuantity
            }));

        res.json(cartDetails);

    } catch (error) {
        next(error);
    }
};