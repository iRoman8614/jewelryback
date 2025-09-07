import React, { useState, useRef, useEffect } from 'react';
import { Label, Box, Text, Button, Icon, Loader } from '@adminjs/design-system';
import axios from 'axios';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const UploadGifOrVideo = (props) => {
    const { property, record, onChange } = props;

    const ffmpegRef = useRef(new FFmpeg());
    const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

    const initialUrl = record.params[property.path] || '';
    const [currentFileUrl, setCurrentFileUrl] = useState(initialUrl);

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const [isProcessing, setIsProcessing] = useState(false);
    const [processingMessage, setProcessingMessage] = useState('');
    const [error, setError] = useState(null);

    const fileInputRef = useRef(null);
    const MAX_VIDEO_DURATION = 10;

    useEffect(() => {
        const loadFFmpeg = async () => {
            const ffmpeg = ffmpegRef.current;
            ffmpeg.on('log', ({ message }) => {
                // Можно использовать для дебага, если нужно
                console.log(message);
            });
            await ffmpeg.load();
            setFfmpegLoaded(true);
        };
        loadFFmpeg();
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleSelectFileClick = () => {
        fileInputRef.current?.click();
    };

    const resetState = () => {
        setSelectedFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
        setError(null);
        setIsProcessing(false);
        setProcessingMessage('');
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const onFileSelected = async (event) => {
        resetState();
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/gif') && !file.type.startsWith('video/')) {
            setError('Please select a GIF or a video file.');
            return;
        }

        if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                if (video.duration > MAX_VIDEO_DURATION) {
                    setError(`Video is too long. Maximum duration is ${MAX_VIDEO_DURATION} seconds.`);
                    resetState();
                } else {
                    setSelectedFile(file);
                    setPreviewUrl(URL.createObjectURL(file));
                }
            };
            video.src = URL.createObjectURL(file);
        } else {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const convertVideoToGif = async (videoFile) => {
        if (!ffmpegLoaded) {
            setError('Converter is not ready yet. Please wait a moment.');
            return null;
        }
        const ffmpeg = ffmpegRef.current;
        setProcessingMessage('Converting video to GIF...');

        await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));

        await ffmpeg.exec(['-i', 'input.mp4', '-t', String(MAX_VIDEO_DURATION), '-vf', 'fps=15,scale=480:-1:flags=lanczos', 'output.gif']);

        const data = await ffmpeg.readFile('output.gif');
        const gifBlob = new Blob([data.buffer], { type: 'image/gif' });
        return new File([gifBlob], `converted-${Date.now()}.gif`, { type: 'image/gif' });
    };

    const uploadFile = async (fileToUpload) => {
        const formData = new FormData();
        formData.append('file', fileToUpload);

        try {
            const response = await axios.post('/api/uploads', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const newUrl = response.data.url;

            onChange(property.path, newUrl);
            setCurrentFileUrl(newUrl);
            resetState();
        } catch (err) {
            const message = err.response?.data?.message || 'Upload failed';
            setError(message);
        } finally {
            setIsProcessing(false);
            setProcessingMessage('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setError(null);
        setIsProcessing(true);

        if (selectedFile.type.startsWith('video/')) {
            const gifFile = await convertVideoToGif(selectedFile);
            if (gifFile) {
                setProcessingMessage('Uploading converted GIF...');
                await uploadFile(gifFile);
            } else {
                setIsProcessing(false);
            }
        } else {
            setProcessingMessage('Uploading GIF...');
            await uploadFile(selectedFile);
        }
    };

    const handleDelete = () => {
        onChange(property.path, null);
        setCurrentFileUrl('');
        resetState();
    };

    return (
        <Box marginBottom="lg">
            <Label htmlFor={property.path}>{property.label || property.path}</Label>
            {currentFileUrl && !selectedFile && (
                <Box>
                    <img src={currentFileUrl} alt="Current file" style={{ maxHeight: '150px', maxWidth: '300px', marginBottom: '10px' }} />
                    <Button onClick={handleDelete} variant="danger" size="sm" type="button">
                        <Icon icon="TrashCan" /> Remove
                    </Button>
                </Box>
            )}

            {!currentFileUrl && (
                <Box>
                    {previewUrl && (
                        <Box mb="md">
                            {selectedFile?.type.startsWith('video/') ? (
                                <video src={previewUrl} style={{ maxHeight: '200px', maxWidth: '400px' }} controls />
                            ) : (
                                <img src={previewUrl} alt="Preview" style={{ maxHeight: '150px', maxWidth: '300px' }} />
                            )}
                        </Box>
                    )}

                    {!isProcessing && !previewUrl && (
                        <Button onClick={handleSelectFileClick} type="button">
                            <Icon icon="Image" /> Select GIF or Video (max 10s)
                        </Button>
                    )}

                    {previewUrl && !isProcessing && (
                        <Box display="flex" alignItems="center">
                            <Button onClick={handleUpload} variant="primary" type="button">
                                <Icon icon="Upload" /> {selectedFile?.type.startsWith('video/') ? 'Convert & Upload' : 'Upload GIF'}
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
                        accept="image/gif,video/mp4,video/webm,video/quicktime"
                    />
                </Box>
            )}

            {error && <Text color="danger" mt="md">{error}</Text>}
        </Box>
    );
};

export default UploadGifOrVideo;