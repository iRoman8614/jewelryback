import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const ALLOWED = new Map([
    ['.jpg', 'image/jpeg'],
    ['.jpeg', 'image/jpeg'],
    ['.png', 'image/png'],
    ['.webp', 'image/webp'],
    ['.gif', 'image/gif'],
    ['.avif', 'image/avif'],
    ['.mp4', 'video/mp4'],
    ['.webm', 'video/webm'],
    ['.mov', 'video/quicktime'],
]);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname || '').toLowerCase();
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname || '').toLowerCase();
    const expectedMime = ALLOWED.get(extension);
    if (expectedMime && file.mimetype === expectedMime) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Allowed: jpg, png, webp, gif, avif, mp4, webm, mov.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 50,
        files: 1,
    }
});

export default upload;