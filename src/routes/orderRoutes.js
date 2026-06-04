import express from 'express';
import { createOrder, updateOrderStatus, getOrdersByStatus, getOrdersByMultipleStatuses } from '../controllers/orderController.js';
import { isAdminAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Admin-only: reading order lists exposes customer PII (names, totals,
// items), so every read endpoint is guarded. Only order CREATION is public
// (guest checkout). ---

// Order lists / filters (admin dashboard).
router.get('/filter', isAdminAuthenticated, getOrdersByMultipleStatuses);

// Orders by a single status. The previous explicit '/status/new' route was
// removed: it pointed at the same controller but never passed a `status`
// param, so the controller read `req.params.status === undefined`. The
// parametrized route below already covers '/status/new' correctly.
router.get('/status/:status', isAdminAuthenticated, getOrdersByStatus);

// --- Public: guest checkout creates an order. ---
router.post('/', createOrder);

// --- Admin-only: changing an order's status. ---
router.put('/:orderId/status', isAdminAuthenticated, updateOrderStatus);

export default router;