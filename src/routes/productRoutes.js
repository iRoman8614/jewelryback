import express from 'express';
import {
    getAllProducts,
    getOneProduct,
    getArchivedProducts,
    getFeaturedProducts
} from '../controllers/productController.js';

const router = express.Router();

router.get('/featured', getFeaturedProducts);

router.get('/archive', getArchivedProducts);

router.get('/', getAllProducts);

router.get('/:id', getOneProduct);

export default router;