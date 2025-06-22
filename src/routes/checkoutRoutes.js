import { Router } from 'express';
import { getAllCheckoutOptions } from '../controllers/checkoutController.js';

const router = Router();

router.get('/all-options', getAllCheckoutOptions);

export default router;