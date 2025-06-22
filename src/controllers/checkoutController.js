// src/controllers/checkoutController.js
import DeliveryOption from '../models/DeliveryOption.js';
import PaymentMethod from '../models/PaymentMethod.js';

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

        const formatItem = (item) => ({
            id: item.id,
            value: item.slug,
            label: item.label,
            ...(item.price !== undefined && { price: item.price }),
        });

        const groupedData = {
            deliveryOptions: {
                ru: deliveryOptions.filter(d => d.isForRussia).map(formatItem),
                en: deliveryOptions.filter(d => !d.isForRussia).map(formatItem),
            },
            paymentMethods: {
                ru: paymentMethods.filter(p => p.isForRussia).map(formatItem),
                en: paymentMethods.filter(p => !p.isForRussia).map(formatItem),
            }
        };

        res.json(groupedData);

    } catch (error) {
        next(error);
    }
};