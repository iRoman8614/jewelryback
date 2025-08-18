// src/services/emailService.js

import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Создаем "транспортер" для отправки писем через SMTP Timeweb
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true для порта 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Главная функция отправки писем
 * @param {string} to - Email получателя
 * @param {string} subject - Тема письма
 * @param {string} templateName - Имя файла шаблона (без .html)
 * @param {object} data - Данные для вставки в шаблон
 */
const sendEmail = async (to, subject, templateName, data) => {
    try {
        // Формируем путь к шаблону
        const templatePath = path.join(__dirname, '..', 'email-templates', `${templateName}.html`);

        // Читаем HTML-шаблон
        const source = await fs.readFile(templatePath, 'utf-8');

        // Компилируем шаблон с помощью Handlebars
        const template = handlebars.compile(source);
        const html = template(data);

        // Настройки письма
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: subject,
            html: html,
        };

        // Отправляем письмо
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to ${to}`);
    } catch (error) {
        console.error(`❌ Error sending email to ${to}:`, error);
        // В реальном проекте здесь можно добавить более сложную логику
        // например, повторную отправку или запись ошибки в лог-файл
    }
};

/**
 * Отправляет письмо-подтверждение о создании заказа
 * @param {object} order - Объект заказа из Sequelize (включая items)
 */
export const sendOrderConfirmationEmail = async (order) => {
    if (!order || !order.customerEmail) {
        console.error('sendOrderConfirmationEmail: Invalid order object or missing customer email.');
        return;
    }

    // Готовим данные для шаблона
    const templateData = {
        orderId: order.id,
        customerName: order.customerName,
        items: order.items.map(item => ({
            productName: item.productName,
            quantity: item.quantity,
            priceAtOrder: parseFloat(item.priceAtOrder).toFixed(2),
            // Предполагаем, что у товара есть изображение.
            // Вам нужно будет передать URL изображения товара в OrderItem при создании заказа.
            // imageUrl: item.productDetails?.mainImage || 'https://via.placeholder.com/100'
        })),
        totalAmount: parseFloat(order.totalAmount).toFixed(2),
        deliveryMethod: order.deliveryMethod,
        customerAddress: order.customerAddress,
    };

    const subject = `Ваш заказ №${order.id} принят | 27 JWLR`;

    await sendEmail(order.customerEmail, subject, 'orderConfirmation', templateData);
};

// Можно добавить и другие функции, например, для смены статуса
// export const sendOrderStatusUpdateEmail = async (order, newStatus) => { ... }