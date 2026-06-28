import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created upload directory: ${uploadDir}`);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

// Фильтр файлов: изображения (включая GIF) + короткие видео для галереи.
const ALLOWED_MIME = new Set([
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif',
    'video/mp4', 'video/webm', 'video/quicktime', // .mp4 / .webm / .mov
]);

const fileFilter = (req, file, cb) => {
    // Любая картинка проходит (как раньше), плюс явно разрешённые видео-типы.
    if (file.mimetype.startsWith('image/') || ALLOWED_MIME.has(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Allowed: images, GIF, and mp4/webm/mov video.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        // Изображения лёгкие, но видео-галерея грузит короткие ролики до ~25 МБ.
        // 50 МБ — запас. ВАЖНО: держать в синхроне с nginx client_max_body_size
        // (50m) и MAX_FILE_SIZE_MB в UploadGifOrVideo.jsx, иначе файл отобьётся
        // на другом уровне с непонятной ошибкой.
        fileSize: 1024 * 1024 * 50,
        files: 1,
    }
});

export default upload;