import sequelize from '../config/database.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';
import OrderStatusLog from '../models/OrderStatusLog.js';
import { Op } from 'sequelize';
// import sendOrderStatusUpdateEmail from '../services/emailService.js'; // "Хвост" для email

export const createOrder = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const {
            customerName, customerEmail, customerPhone, customerAddress,
            deliveryMethod, deliveryCost = 0, customerComment, paymentMethod,
            items,
        } = req.body;
        let calculatedTotalAmount = parseFloat(deliveryCost) || 0;
        const orderItemsData = [];
        for (const item of items) {
            const product = await Product.findByPk(item.productId, { transaction });
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found.`);
            }
            if (product.stockQuantity < item.quantity) {
                throw new Error(`Not enough stock for product ${product.name} (ID: ${item.productId}). Available: ${product.stockQuantity}, Requested: ${item.quantity}`);
            }
            calculatedTotalAmount += product.price * item.quantity;
            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                priceAtOrder: product.price,
                productName: product.name,
                productSku: product.sku,
            });
            product.stockQuantity -= item.quantity;
            await product.save({ transaction });
        }
        const newOrder = await Order.create({
            customerName, customerEmail, customerPhone, customerAddress,
            deliveryMethod, deliveryCost: parseFloat(deliveryCost) || 0,
            customerComment, paymentMethod,
            totalAmount: calculatedTotalAmount,
            status: 'Новый',
        }, { transaction });
        for (const itemData of orderItemsData) {
            await OrderItem.create({
                ...itemData,
                orderId: newOrder.id,
            }, { transaction });
        }
        await OrderStatusLog.create({
            orderId: newOrder.id,
            adminId: null,
            previousStatus: null,
            newStatus: 'Новый',
            comment: 'Order created by customer.',
        }, { transaction });
        await transaction.commit();

        // Хвост для уведомлений
        // await sendOrderStatusUpdateEmail(newOrder.email, newOrder.id, 'Новый');

        res.status(201).json(newOrder);

    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

export const
    updateOrderStatus = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { orderId } = req.params;
        const { newStatus, adminComment } = req.body;
        const adminId = req.user?.id || null;
        const adminEmail = req.user?.email || null
        if (!newStatus) {
            return res.status(400).json({ message: 'New status is required.' });
        }
        const order = await Order.findByPk(orderId, { transaction });
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        const previousStatus = order.status;
        if (previousStatus === newStatus) {
            await transaction.commit();
            return res.status(200).json({ message: 'Status is already set to this value.', order });
        }
        order.status = newStatus;
        await order.save({ transaction });
        await OrderStatusLog.create({
            orderId: order.id,
            adminId: adminId,
            adminEmail: adminEmail,
            previousStatus: previousStatus,
            newStatus: newStatus,
            comment: adminComment || `Status changed by admin ${adminId || 'system'}.`,
        }, { transaction });

        await transaction.commit();
        res.json({ message: 'Order status updated successfully.', order });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

export const getOrdersByStatus = async (req, res, next) => {
    try {
        const { status } = req.params; // Статус из URL (напр., 'Новый')
        const limit = parseInt(req.query.limit) || 5; // Лимит по умолчанию
        let sortBy = 'createdAt'; // Поле по умолчанию
        let sortDirection = 'DESC'; // Направление по умолчанию

        if (req.query.sort) {
            const sortParts = req.query.sort.split('_');
            if (sortParts.length === 2 && ['asc', 'desc'].includes(sortParts[1].toLowerCase())) {
                if (Order.rawAttributes[sortParts[0]]) {
                    sortBy = sortParts[0];
                    sortDirection = sortParts[1].toUpperCase();
                } else {
                    console.warn(`Sort field "${sortParts[0]}" does not exist in Order model. Defaulting to createdAt.`);
                }
            } else if (Order.rawAttributes[req.query.sort]) {
                sortBy = req.query.sort;
            } else {
                console.warn(`Invalid sort parameter: "${req.query.sort}". Defaulting to createdAt DESC.`);
            }
        }

        if (!['ASC', 'DESC'].includes(sortDirection)) {
            return res.status(400).json({ message: 'Invalid sortDirection value.' });
        }

        const orders = await Order.findAll({
            where: { status: status },
            limit: limit,
            order: [[sortBy, sortDirection]],
            include: [{
                model: OrderItem,
                as: 'items',
                attributes: ['productName', 'quantity'],
            }],
            attributes: ['id', 'createdAt', 'customerName', 'totalAmount', 'status']
        });

        res.json({ orders });

    } catch (error) {
        next(error);
    }
};

export const getOrdersByMultipleStatuses = async (req, res, next) => {
    try {
        let statuses = req.query.status;
        if (statuses && !Array.isArray(statuses)) {
            statuses = [statuses];
        }
        if (!statuses || statuses.length === 0) {
            return res.status(400).json({ message: 'At least one status parameter is required.' });
        }
        const limit = parseInt(req.query.limit) || 10;
        const sortBy = req.query.sortBy || 'updatedAt';
        const sortDirection = (req.query.sortDirection || 'ASC').toUpperCase();

        if (!['ASC', 'DESC'].includes(sortDirection)) {
            return res.status(400).json({ message: 'Invalid sortDirection value.' });
        }
        const validOrderFields = Object.keys(Order.rawAttributes);
        if (!validOrderFields.includes(sortBy)) {
            return res.status(400).json({ message: `Invalid sortBy field: ${sortBy}` });
        }
        const orders = await Order.findAll({
            where: {
                status: {
                    [Op.in]: statuses,
                },
            },
            limit: limit,
            order: [[sortBy, sortDirection]],
            include: [{
                model: OrderItem,
                as: 'items',
                attributes: ['id', 'productName', 'quantity'],
            }],
            attributes: ['id', 'createdAt', 'updatedAt', 'customerName', 'totalAmount', 'status'],
        });
        res.json({ orders });
    } catch (error) {
        next(error);
    }
};