import express from 'express';
import { getHomepageContent, getSnakeContent, getMobileSliderContent, getIconLinksContent, getReelGalleryContent } from '../controllers/contentController.js';

const router = express.Router();

router.get('/homepage', getHomepageContent);
router.get('/snake-gallery', getSnakeContent);
router.get('/mobile-slider', getMobileSliderContent);
router.get('/icon-links', getIconLinksContent);
router.get('/reel-gallery', getReelGalleryContent);

export default router;