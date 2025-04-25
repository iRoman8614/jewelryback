// src/routes/index.js
import Router from 'express';
const router = new Router();

// Импортируем и используем другие роутеры по мере их создания
// const productRouter = require('./productRoutes');
// const orderRouter = require('./orderRoutes');
// const contentRouter = require('./contentRoutes');
// const adminRouter = require('./adminRoutes');

// router.use('/products', productRouter); // Например: /api/products/...
// router.use('/orders', orderRouter);     // Например: /api/orders/...
// router.use('/content', contentRouter);   // Например: /api/content/...
// router.use('/admin', adminRouter);     // Например: /api/admin/...

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Jewelry API v1' });
});


export default router;