// src/services/videoService.js
//
// Перекодирование загруженных видео в формат, который играет везде и быстро:
//   • H.264 (main) + AAC в MP4 — Safari/iOS, Chrome/Android, десктоп.
//     HEVC/.mov с айфона и .webm проигрываются не везде.
//   • +faststart — индекс (moov) в начале файла: воспроизведение начинается
//     сразу, не дожидаясь загрузки всего ролика.
//   • длинная сторона ≤ 1280 px, CRF 27 — вместо 30–50 МБ обычно 2–6 МБ.
//   • постер (первый кадр) .jpg — показывается, пока видео грузится.
//
// Результат: <имя>-web.mp4 и <имя>-poster.jpg рядом с исходником.
// Требуется ffmpeg в контейнере (см. Dockerfile: apk add ffmpeg).

import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

const TIMEOUT_MS = 5 * 60 * 1000;

const run = (args) => new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args]);
    let stderr = '';
    proc.stderr.on('data', (d) => { stderr += d.toString(); });
    const timer = setTimeout(() => { proc.kill('SIGKILL'); reject(new Error('ffmpeg timeout')); }, TIMEOUT_MS);
    proc.on('error', (err) => { clearTimeout(timer); reject(err); });
    proc.on('close', (code) => {
        clearTimeout(timer);
        if (code === 0) resolve();
        else reject(new Error(`ffmpeg exited with ${code}: ${stderr.slice(-500)}`));
    });
});

let ffmpegChecked = null;
export const isFfmpegAvailable = async () => {
    if (ffmpegChecked !== null) return ffmpegChecked;
    ffmpegChecked = await new Promise((resolve) => {
        const p = spawn('ffmpeg', ['-version']);
        p.on('error', () => resolve(false));
        p.on('close', (code) => resolve(code === 0));
    });
    return ffmpegChecked;
};

export const isWebVideoName = (name) => /-web\.mp4$/i.test(name);
export const posterNameFor = (webName) => webName.replace(/-web\.mp4$/i, '-poster.jpg');

// Длинная сторона не больше 1280, обе стороны чётные (требование H.264).
const SCALE = "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'";

/**
 * Перекодировать видео. inputPath — абсолютный путь к исходнику.
 * Возвращает { webPath, posterPath } (абсолютные пути). Исходник не трогает.
 */
export const transcodeToWeb = async (inputPath) => {
    const dir = path.dirname(inputPath);
    const base = path.basename(inputPath, path.extname(inputPath)).replace(/-web$/i, '');
    const webPath = path.join(dir, `${base}-web.mp4`);
    const posterPath = path.join(dir, `${base}-poster.jpg`);
    const tmpPath = path.join(dir, `${base}-web.tmp.mp4`);

    await run([
        '-i', inputPath,
        '-map', '0:v:0', '-map', '0:a:0?',
        '-vf', SCALE,
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '27',
        '-profile:v', 'main', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
        '-movflags', '+faststart',
        '-f', 'mp4', tmpPath,
    ]);
    await fs.rename(tmpPath, webPath);

    try {
        await run(['-ss', '0.3', '-i', webPath, '-frames:v', '1', '-q:v', '4', posterPath]);
    } catch (err) {
        // ролик короче 0.3 с и т.п. — берём самый первый кадр
        await run(['-i', webPath, '-frames:v', '1', '-q:v', '4', posterPath]).catch(() => {});
    }
    return { webPath, posterPath };
};

export default { transcodeToWeb, isFfmpegAvailable, isWebVideoName, posterNameFor };
