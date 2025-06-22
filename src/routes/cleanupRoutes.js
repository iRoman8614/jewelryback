import { Router } from 'express';
import { cleanupUnusedImages } from '../controllers/cleanupController.js';
import { isAdminAuthenticated } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/unused-images-test', isAdminAuthenticated, cleanupUnusedImages);

export default router;