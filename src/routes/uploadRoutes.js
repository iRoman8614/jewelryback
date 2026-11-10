import express from 'express';
import multer from 'multer';
import uploadMiddleware from '../middleware/uploadMiddleware.js';
import { isAdminAuthenticated } from '../middleware/authMiddleware.js';
import fs from 'fs/promises';
import path from 'path';
import { transcodeToWeb, isFfmpegAvailable } from '../services/videoService.js';

const router = express.Router();

// Admin-only: uploads write files to disk. An open endpoint lets anyone fill
// the disk. isAdminAuthenticated requires the shared session, so this router
// MUST be mounted AFTER sessionMiddleware in server.js.
router.post('/', isAdminAuthenticated, uploadMiddleware.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    // Видео перекодируем в лёгкий H.264 MP4 с быстрым стартом (играет на всех
    // телефонах). Если ffmpeg нет или он упал — отдаём исходник, как раньше.
    if (req.file.mimetype.startsWith('video/') && await isFfmpegAvailable()) {
        const started = Date.now();
        try {
            const { webPath } = await transcodeToWeb(req.file.path);
            const [{ size: before }, { size: after }] = await Promise.all([fs.stat(req.file.path), fs.stat(webPath)]);
            await fs.unlink(req.file.path).catch(() => {});
            console.log(`[upload] video ${req.file.filename}: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB in ${((Date.now() - started) / 1000).toFixed(1)} s`);
            return res.json({ url: `/uploads/${path.basename(webPath)}` });
        } catch (err) {
            console.error(`[upload] video transcode failed for ${req.file.filename}:`, err.message);
            return res.json({ url: `/uploads/${req.file.filename}`, warning: 'Video was saved without conversion.' });
        }
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