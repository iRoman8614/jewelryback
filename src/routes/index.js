import Router from 'express';
import productRouter from './productRoutes.js';
import contentRouter from './contentRoutes.js';

const router = new Router();

router.use('/products', productRouter);
router.use('/content', contentRouter);

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Jewelry API v1' });
});


export default router;