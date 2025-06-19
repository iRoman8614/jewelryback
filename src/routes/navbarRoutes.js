
import { Router } from 'express';
import { getNavigationStructure } from '../controllers/navbarController.js';

const router = Router();

router.get('/', getNavigationStructure);

export default router;