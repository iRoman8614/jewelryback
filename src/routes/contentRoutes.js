import express from 'express';
import { getHomepageContent, getSnakeContent } from '../controllers/contentController.js';

const router = express.Router();

router.get('/homepage', getHomepageContent);
router.get('/snake-gallery', getSnakeContent);

export default router;