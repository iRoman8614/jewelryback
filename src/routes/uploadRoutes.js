import express from 'express';
import multer from 'multer';
import uploadMiddleware from '../middleware/uploadMiddleware.js';
import { isAdminAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin-only: uploads write files to disk. An open endpoint lets anyone fill
// the disk. isAdminAuthenticated requires the shared session, so this router
// MUST be mounted AFTER sessionMiddleware in server.js.
router.post('/', isAdminAuthenticated, uploadMiddleware.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// Error handler for multer/upload failures. `multer` is now imported (it was
// referenced here before without an import → ReferenceError on any error).
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
        return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
    next();
});

export default router;