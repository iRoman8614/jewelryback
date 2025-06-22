import Router from 'express';
import productRouter from './productRoutes.js';
import contentRouter from './contentRoutes.js';
import orderRouter from './orderRoutes.js'
import navbarRoutes from "./navbarRoutes.js";
import checkoutRouter from './checkoutRoutes.js';
import cleanupRouter from './cleanupRoutes.js';

const router = new Router();

router.use('/products', productRouter);
router.use('/content', contentRouter);
router.use('/orders', orderRouter);
router.use('/navigation', navbarRoutes)
router.use('/checkout', checkoutRouter);
router.use('/cleanup', cleanupRouter);

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Jewelry API v1' });
});


export default router;