import express from 'express';
import { createOrder, updateOrderStatus, getOrdersByStatus, getOrdersByMultipleStatuses } from '../controllers/orderController.js';
import { isAdminAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', createOrder);

router.put('/:orderId/status', isAdminAuthenticated, updateOrderStatus);
router.get('/status/:status', getOrdersByStatus);
router.get('/filter', getOrdersByMultipleStatuses);

export default router;