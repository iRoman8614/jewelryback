import express from 'express';
import uploadMiddleware from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', uploadMiddleware.single('file'), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
        return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
    next();
});


export default router;