import express from 'express';
import { createOrder, updateOrderStatus, getOrdersByStatus, getOrdersByMultipleStatuses } from '../controllers/orderController.js';
import { isAdminAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/filter', getOrdersByMultipleStatuses);

router.get('/status/new', getOrdersByStatus);

router.get('/status/:status', getOrdersByStatus);

// 4. Остальные роуты
router.post('/', createOrder);
router.put('/:orderId/status', isAdminAuthenticated, updateOrderStatus);

export default router;