import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Label, Box, Text, Button, Icon } from '@adminjs/design-system';
import axios from 'axios';

// Не импортируем CSS здесь
import Cropper from 'react-cropper';

// --- Копируем содержимое файла cropper.min.css сюда, в виде строки ---
const CROPPER_CSS = `
.cropper-container{font-size:0;line-height:0;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;direction:ltr;touch-action:none}.cropper-container img{display:block;width:100%;min-width:0!important;height:100%;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{position:absolute;top:0;right:0;bottom:0;left:0}.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;width:100%;height:100%;outline:1px solid #39f;outline-color:rgba(51,153,255,.75);overflow:hidden}.cropper-dashed{position:absolute;display:block;border:0 dashed #eee;opacity:.5}.cropper-dashed.dashed-h{top:33.33333%;left:0;width:100%;height:33.33333%;border-top-width:1px;border-bottom-width:1px}.cropper-dashed.dashed-v{top:0;left:33.33333%;width:33.33333%;height:100%;border-right-width:1px;border-left-width:1px}.cropper-center{position:absolute;top:50%;left:50%;display:block;width:0;height:0;opacity:.75}.cropper-center:before,.cropper-center:after{position:absolute;display:block;background-color:#eee;content:' '}.cropper-center:before{top:0;left:-3px;width:7px;height:1px}.cropper-center:after{top:-3px;left:0;width:1px;height:7px}.cropper-face,.cropper-line,.cropper-point{position:absolute;display:block;width:100%;height:100%;opacity:.1}.cropper-face{top:0;left:0;background-color:#fff;cursor:move}.cropper-line{background-color:#39f}.cropper-line.line-e{top:0;right:-3px;width:5px;cursor:e-resize}.cropper-line.line-n{top:-3px;left:0;height:5px;cursor:n-resize}.cropper-line.line-w{top:0;left:-3px;width:5px;cursor:w-resize}.cropper-line.line-s{bottom:-3px;left:0;height:5px;cursor:s-resize}.cropper-point{width:5px;height:5px;background-color:#39f;opacity:.75}.cropper-point.point-e{top:50%;right:-3px;margin-top:-3px;cursor:e-resize}.cropper-point.point-n{top:-3px;left:50%;margin-left:-3px;cursor:n-resize}.cropper-point.point-w{top:50%;left:-3px;margin-top:-3px;cursor:w-resize}.cropper-point.point-s{bottom:-3px;left:50%;margin-left:-3px;cursor:s-resize}.cropper-point.point-ne{top:-3px;right:-3px;cursor:ne-resize}.cropper-point.point-nw{top:-3px;left:-3px;cursor:nw-resize}.cropper-point.point-sw{bottom:-3px;left:-3px;cursor:sw-resize}.cropper-point.point-se{bottom:-3px;right:-3px;cursor:se-resize}@media (min-width:768px){.cropper-point.point-e,.cropper-point.point-w{margin-top:-4px}.cropper-point.point-n,.cropper-point.point-s{margin-left:-4px}.cropper-point.point-ne,.cropper-point.point-nw,.cropper-point.point-se,.cropper-point.point-sw{width:7px;height:7px}.cropper-point.point-se{bottom:-4px;right:-4px}}@media (min-width:992px){.cropper-point.point-se{bottom:-5px;right:-5px}.cropper-point.point-e,.cropper-point.point-w{margin-top:-5px}.cropper-point.point-n,.cropper-point.point-s{margin-left:-5px}.cropper-point.point-ne,.cropper-point.point-nw,.cropper-point.point-se,.cropper-point.point-sw{width:9px;height:9px}}@media (min-width:1200px){.cropper-point.point-se{bottom:-6px;right:-6px}.cropper-point.point-e,.cropper-point.point-w{margin-top:-6px}.cropper-point.point-n,.cropper-point.point-s{margin-left:-6px}.cropper-point.point-ne,.cropper-point.point-nw,.cropper-point.point-se,.cropper-point.point-sw{width:11px;height:11px}}.cropper-crop-box{cursor:move}.cropper-crop-box.cropper-modal{opacity:.5}.cropper-hidden{display:none!important}.cropper-hide{position:absolute;display:block;width:0;height:0}.cropper-invisible{opacity:0}.cropper-bg{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1pAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC')}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}
`;

const UploadImageInput = (props) => {
    const { property, record, onChange } = props;

    // --- Логика внедрения CSS ---
    useEffect(() => {
        const styleId = 'cropper-styles';
        // Проверяем, не были ли стили уже добавлены
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = CROPPER_CSS;
            document.head.appendChild(style);
        }
    }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании компонента

    const currentImageUrl = record.params[property.path] || '';
    const [imageUrl, setImageUrl] = useState(currentImageUrl);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const cropperRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleSelectImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onFileSelected = (event) => {
        event.preventDefault();
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImageToCrop(reader.result);
            };
            reader.readAsDataURL(file);
        }
        event.target.value = null;
    };

    const onCropAndUpload = () => {
        if (!cropperRef.current?.cropper) return;
        setIsUploading(true);
        setError(null);
        cropperRef.current.cropper.getCroppedCanvas().toBlob(async (blob) => {
            if (!blob) {
                setError('Could not process image.');
                setIsUploading(false);
                return;
            }
            const formData = new FormData();
            formData.append('file', blob, `cropped-${Date.now()}.png`);
            try {
                const response = await axios.post('/api/uploads', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                const newUrl = response.data.url;
                setImageUrl(newUrl);
                setImageToCrop(null);
                onChange(property.path, newUrl);
            } catch (err) {
                const message = err.response?.data?.message || 'Upload failed';
                setError(message);
            } finally {
                setIsUploading(false);
            }
        }, 'image/png');
    };

    const handleCancelCrop = () => {
        setImageToCrop(null);
    };

    const handleDelete = useCallback(() => {
        setImageUrl('');
        onChange(property.path, null);
    }, [onChange, property.path]);

    return (
        <Box marginBottom="lg">
            <Label htmlFor={property.path}>{property.label || property.path}</Label>
            <Box>
                {imageUrl && (
                    <Box display="flex" alignItems="center">
                        <img src={imageUrl} alt="Uploaded" style={{ maxHeight: '100px', maxWidth: '200px', marginRight: '10px' }} />
                        <Button onClick={handleDelete} variant="danger" size="sm" type="button">
                            <Icon icon="TrashCan" /> Remove
                        </Button>
                    </Box>
                )}
                {!imageUrl && imageToCrop && (
                    <Box>
                        <Box display="flex" flexDirection={['column', 'row']} mx={-2} style={{ maxWidth: '800px' }}>
                            <Box flex={1} px={2}>
                                <Cropper
                                    ref={cropperRef}
                                    src={imageToCrop}
                                    style={{ height: 400, width: '100%' }}
                                    // aspectRatio={1 / 1}
                                    preview=".img-preview"
                                    guides={true}
                                    viewMode={1}
                                    responsive={true}
                                    checkOrientation={false}
                                />
                            </Box>
                            <Box flex={1} px={2} mt={[3, 0]}>
                                <Label>Preview</Label>
                                <div
                                    className="img-preview"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        overflow: 'hidden',
                                        border: '1px solid #ddd',
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box mt="lg" display="flex">
                            <Button onClick={onCropAndUpload} variant="primary" disabled={isUploading} type="button">
                                {isUploading ? <Icon icon="Loader" spin /> : 'Crop & Upload'}
                            </Button>
                            <Button onClick={handleCancelCrop} variant="secondary" ml="md" type="button">
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                )}
                {!imageUrl && !imageToCrop && (
                    <Box>
                        <Button onClick={handleSelectImageClick} type="button">
                            <Icon icon="Image" /> Select Image
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={onFileSelected}
                            accept="image/png, image/jpeg, image/webp, image/gif"
                        />
                    </Box>
                )}
            </Box>
            {error && <Text color="danger" mt="md">{error}</Text>}
        </Box>
    );
};

export default UploadImageInput;