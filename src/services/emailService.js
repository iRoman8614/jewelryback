// src/services/emailService.js
// import nodemailer from 'nodemailer'; // Пример

// const transporter = nodemailer.createTransport({ /* ... ваша конфигурация ... */ });

export const sendOrderStatusUpdateEmail = async (customerEmail, orderId, newStatus) => {
    console.log(`SIMULATING: Sending email to ${customerEmail} for order ${orderId}, new status: ${newStatus}`);
    // try {
    //   await transporter.sendMail({
    //     from: '"Jewelry Shop" <noreply@yourshop.com>',
    //     to: customerEmail,
    //     subject: `Статус вашего заказа #${orderId} изменен`,
    //     html: `<p>Здравствуйте!</p><p>Статус вашего заказа #${orderId} изменен на: <b>${newStatus}</b>.</p><p>С уважением, команда Jewelry Shop.</p>`,
    //   });
    //   console.log(`Email sent to ${customerEmail} for order ${orderId}, status ${newStatus}`);
    // } catch (error) {
    //   console.error(`Failed to send email for order ${orderId}:`, error);
    // }
};

// Экспортируем по умолчанию, если это единственная функция, или как именованный экспорт
export default sendOrderStatusUpdateEmail;