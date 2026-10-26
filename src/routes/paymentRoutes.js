import express from 'express';
import rateLimit from 'express-rate-limit';
import { getOrderPaymentStatus, payOrder, yookassaWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Страница статуса опрашивает раз в несколько секунд — лимит щедрый.
const statusLimiter = rateLimit({ windowMs: 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false });
// Создание/получение ссылки на оплату — строже.
const payLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });

router.get('/orders/:orderId', statusLimiter, getOrderPaymentStatus);
router.post('/orders/:orderId/pay', payLimiter, payOrder);

// Вебхук ЮKassa: без лимита (повторы ЮKassa не должны упираться в 429).
router.post('/yookassa/webhook', yookassaWebhook);

export default router;
