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