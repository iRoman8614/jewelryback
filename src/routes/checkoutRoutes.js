import { Router } from 'express';
import { getAllCheckoutOptions, getCartDetails } from '../controllers/checkoutController.js';

const router = Router();

router.get('/all-options', getAllCheckoutOptions);
router.post('/cart', getCartDetails);

export default router;