import express from 'express';
import { getHomepageContent } from '../controllers/contentController.js';

const router = express.Router();

router.get('/homepage', getHomepageContent);

export default router;