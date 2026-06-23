import express from 'express';
import {
    getHomepageContent,
    getSnakeContent,
    getMobileSliderContent,
    getIconLinksContent,
    getReelGalleryContent,
    getVideoGalleryContent,
    getCustomContent,
} from '../controllers/contentController.js';

const router = express.Router();

router.get('/homepage', getHomepageContent);
router.get('/snake-gallery', getSnakeContent);
router.get('/mobile-slider', getMobileSliderContent);
router.get('/icon-links', getIconLinksContent);
router.get('/reel-gallery', getReelGalleryContent);   // PHOTO gallery
router.get('/video-gallery', getVideoGalleryContent); // VIDEO gallery
router.get('/custom', getCustomContent);             // Custom (КАСТОМ) block

export default router;