// src/scripts/transcode-videos.js
//
// Однократно перекодировать УЖЕ загруженные видео галереи (Video Gallery
// video1..video12) в лёгкий H.264 MP4 с быстрым стартом + постер.
//
// Что меняет: в таблице video_gallery_config ссылка /uploads/x.mov →
// /uploads/x-web.mp4. Исходные файлы НЕ удаляются (можно удалить вручную
// после проверки). Схема БД не меняется. Повторный запуск пропускает уже
// перекодированные ролики.
//
// Запуск (после пересборки бэка с ffmpeg):
//   docker compose exec backend node dist/scripts/transcode-videos.js --dry-run
//   docker compose exec backend node dist/scripts/transcode-videos.js

import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import sequelize from '../config/database.js';
import VideoGalleryConfig from '../models/VideoGalleryConfig.js';
import { transcodeToWeb, isFfmpegAvailable, isWebVideoName } from '../services/videoService.js';

const DRY = process.argv.includes('--dry-run');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');
const mb = (n) => `${(n / 1048576).toFixed(1)} MB`;

async function run() {
    await sequelize.authenticate();
    if (!DRY && !(await isFfmpegAvailable())) {
        throw new Error('ffmpeg не найден в контейнере — пересоберите бэк (Dockerfile: apk add ffmpeg).');
    }
    const configs = await VideoGalleryConfig.findAll();
    if (!configs.length) { console.log('Видео-галерея пуста — делать нечего.'); return; }

    let done = 0; let skipped = 0; let failed = 0;
    for (const config of configs) {
        for (let i = 1; i <= 12; i++) {
            const field = `video${i}`;
            const url = config[field];
            if (!url) continue;
            const name = path.basename(url);
            if (!url.startsWith('/uploads/') || isWebVideoName(name)) {
                console.log(`ℹ️  ${field}: ${url} — уже перекодировано, пропуск.`);
                skipped++; continue;
            }
            const input = path.join(UPLOAD_DIR, name);
            let size;
            try { size = (await fs.stat(input)).size; } catch {
                console.log(`⚠️  ${field}: файла ${name} нет на диске — пропуск.`);
                failed++; continue;
            }
            if (DRY) { console.log(`➕ ${field}: ${name} (${mb(size)}) будет перекодировано.`); continue; }

            const t0 = Date.now();
            try {
                const { webPath } = await transcodeToWeb(input);
                const after = (await fs.stat(webPath)).size;
                config[field] = `/uploads/${path.basename(webPath)}`;
                await config.save();
                console.log(`✅ ${field}: ${name} ${mb(size)} → ${path.basename(webPath)} ${mb(after)} (${((Date.now() - t0) / 1000).toFixed(0)} с)`);
                done++;
            } catch (err) {
                console.error(`❌ ${field}: ${name} — ошибка: ${err.message}`);
                failed++;
            }
        }
    }
    console.log(DRY ? '\n🔎 DRY RUN завершён.' : `\nГотово: перекодировано ${done}, пропущено ${skipped}, ошибок ${failed}.`);
}

run()
    .then(() => process.exit(0))
    .catch((e) => { console.error('❌', e.message || e); process.exit(1); });
