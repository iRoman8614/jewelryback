import React, { useState, useRef, useEffect } from 'react';
import { Label, Box, Text, Button, Icon, Loader } from '@adminjs/design-system';
import axios from 'axios';

// Прямая загрузка видео/GIF БЕЗ конвертации в браузере.
// Раньше компонент гонял видео через ffmpeg.wasm → GIF, но ffmpeg.load() без
// cross-origin-изоляции не поднимался, и видео не сохранялись. Видео-галерея
// рендерит <video>, поэтому конвертация в GIF не нужна — грузим файл как есть.

const MAX_VIDEO_DURATION = 60;        // сек — под вертикальные ролики ~25-30с
const MAX_FILE_SIZE_MB = 50;            // МБ — должно совпадать с лимитом multer + nginx
const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogg)$/i;

const isVideoUrl = (url) => VIDEO_EXT.test(url || '');

const UploadGifOrVideo = (props) => {
    const { property, record, onChange } = props;

    const initialUrl = record.params[property.path] || '';
    const [currentFileUrl, setCurrentFileUrl] = useState(initialUrl);

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const [isProcessing, setIsProcessing] = useState(false);
    const [processingMessage, setProcessingMessage] = useState('');
    const [error, setError] = useState(null);

    const fileInputRef = useRef(null);

    // Чистим objectURL превью при размонтировании / смене файла.
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleSelectFileClick = () => {
        fileInputRef.current?.click();
    };

    // Полный сброс. ВАЖНО: тут обнуляется input.value (это стирает выбранный
    // FileList!), поэтому resetState НЕЛЬЗЯ вызывать в начале onFileSelected —
    // только из Cancel / Remove / после успешной загрузки, когда файл уже считан.
    const resetState = () => {
        setSelectedFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
        setError(null);
        setIsProcessing(false);
        setProcessingMessage('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const onFileSelected = async (event) => {
        const input = event.target;
        const file = input.files?.[0];

        // Лог СНАЧАЛА — до любых мутаций инпута, чтобы всегда видеть факт выбора.
        console.log('[upload] selected:', file?.name, file?.type,
            file ? (file.size / 1048576).toFixed(1) + 'MB' : '(no file)');

        // Мягкий сброс прошлого превью/ошибки. НЕ трогаем input.value здесь:
        // input.value = '' очищает input.files, и только что выбранный файл
        // потеряется ещё до чтения → «выбрал файл и тишина» (это и был баг).
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
        setSelectedFile(null);
        setError(null);
        setIsProcessing(false);
        setProcessingMessage('');

        if (!file) return;

        const isGif = file.type === 'image/gif';
        const isVideo = file.type.startsWith('video/');

        if (!isGif && !isVideo) {
            setError('Please select a GIF or a video file (mp4/webm/mov).');
            if (input) input.value = '';
            return;
        }

        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            const mb = (file.size / (1024 * 1024)).toFixed(1);
            setError(`File is too large (${mb} MB). Maximum is ${MAX_FILE_SIZE_MB} MB.`);
            if (input) input.value = '';
            return;
        }

        // Принимаем файл: превью + кнопка Upload. input.value чистим ТОЛЬКО
        // здесь — файл уже зафиксирован в state (объект File живёт сам по себе).
        const accept = () => {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            if (input) input.value = '';
        };

        if (!isVideo) {
            accept();
            return;
        }

        // Для видео пытаемся прочитать длительность, НО не блокируемся на этом:
        // у части MP4 (iCloud / moov в конце файла) onloadedmetadata не
        // срабатывает и не даёт onerror — раньше это «вешало» выбор файла.
        // Поэтому ставим таймаут: не прочли за 3с → грузим как есть.
        let settled = false;
        const probe = document.createElement('video');
        probe.preload = 'metadata';
        const finish = (tooLong) => {
            if (settled) return;
            settled = true;
            try { window.URL.revokeObjectURL(probe.src); } catch (e) {}
            if (tooLong) {
                console.warn('[upload] video too long');
                setError(`Video is too long. Maximum duration is ${MAX_VIDEO_DURATION} seconds.`);
                if (input) input.value = '';
            } else {
                accept();
            }
        };
        probe.onloadedmetadata = () => {
            console.log('[upload] duration:', probe.duration);
            finish(Number.isFinite(probe.duration) && probe.duration > MAX_VIDEO_DURATION + 0.5);
        };
        probe.onerror = () => { console.warn('[upload] metadata read error — uploading as-is'); finish(false); };
        setTimeout(() => { if (!settled) { console.warn('[upload] metadata timeout — uploading as-is'); finish(false); } }, 3000);
        probe.src = URL.createObjectURL(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setError(null);
        setIsProcessing(true);
        setProcessingMessage('Uploading...');

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('/api/uploads', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            });
            const newUrl = response.data.url;
            onChange(property.path, newUrl);
            setCurrentFileUrl(newUrl);
            resetState();
        } catch (err) {
            const message = err.response?.data?.message || 'Upload failed';
            console.error('[upload] failed:', err.response?.status, message);
            setError(message);
            setIsProcessing(false);
            setProcessingMessage('');
        }
    };

    const handleDelete = () => {
        onChange(property.path, null);
        setCurrentFileUrl('');
        resetState();
    };

    const selectedIsVideo = selectedFile?.type.startsWith('video/');

    return (
        <Box marginBottom="lg">
            <Label htmlFor={property.path}>{property.label || property.path}</Label>

            {currentFileUrl && !selectedFile && (
                <Box>
                    {isVideoUrl(currentFileUrl) ? (
                        <video
                            src={currentFileUrl}
                            style={{ maxHeight: '200px', maxWidth: '400px', marginBottom: '10px', display: 'block' }}
                            controls
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img src={currentFileUrl} alt="Current file" style={{ maxHeight: '150px', maxWidth: '300px', marginBottom: '10px' }} />
                    )}
                    <Button onClick={handleDelete} variant="danger" size="sm" type="button">
                        <Icon icon="TrashCan" /> Remove
                    </Button>
                </Box>
            )}

            {!currentFileUrl && (
                <Box>
                    {previewUrl && (
                        <Box mb="md">
                            {selectedIsVideo ? (
                                <video src={previewUrl} style={{ maxHeight: '200px', maxWidth: '400px' }} controls muted loop playsInline />
                            ) : (
                                <img src={previewUrl} alt="Preview" style={{ maxHeight: '150px', maxWidth: '300px' }} />
                            )}
                        </Box>
                    )}

                    {!isProcessing && !previewUrl && (
                        <Button onClick={handleSelectFileClick} type="button">
                            <Icon icon="Image" /> Select GIF or Video (max 60s)
                        </Button>
                    )}

                    {previewUrl && !isProcessing && (
                        <Box display="flex" alignItems="center">
                            <Button onClick={handleUpload} variant="primary" type="button">
                                <Icon icon="Upload" /> Upload
                            </Button>
                            <Button onClick={resetState} variant="text" ml="md" type="button">
                                Cancel
                            </Button>
                        </Box>
                    )}

                    {isProcessing && (
                        <Box display="flex" alignItems="center">
                            <Loader />
                            <Text ml="md">{processingMessage || 'Processing...'}</Text>
                        </Box>
                    )}

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={onFileSelected}
                        accept="image/gif,video/mp4,video/webm,video/quicktime,video/x-m4v"
                    />
                </Box>
            )}

            {error && <Text color="danger" mt="md">{error}</Text>}
        </Box>
    );
};

export default UploadGifOrVideo;