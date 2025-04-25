import React, { useState, useCallback } from 'react';
import { Label, DropZone, Box, Text, Input, Button, Icon } from '@adminjs/design-system';

import axios from 'axios';

const UploadImageInput = (props) => {
    const { property, record, onChange } = props;
    const currentImageUrl = record.params[property.path] || '';
    const [imageUrl, setImageUrl] = useState(currentImageUrl);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const onUpload = async (files) => {
        const file = files[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const newUrl = response.data.url;
            setImageUrl(newUrl);
            onChange(property.path, newUrl);
        } catch (err) {
            console.error("Upload failed:", err);
            const message = err.response?.data?.message || err.message || 'Upload failed';
            setError(message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = useCallback(() => {
        setImageUrl('');
        onChange(property.path, null);
    }, [onChange, property.path]);

    return (
        <Box marginBottom="lg">
            <Label htmlFor={property.path}>{property.label || property.path}</Label>
            <Box>
                {imageUrl ? (
                    <Box display="flex" alignItems="center">
                        <img src={imageUrl} alt={property.label || 'Uploaded image'} style={{ maxHeight: '100px', maxWidth: '200px', marginRight: '10px' }} />
                        <Button onClick={handleDelete} variant="danger" size="sm">
                            <Icon icon="TrashCan" /> Remove
                        </Button>
                    </Box>
                ) : (
                    <DropZone
                        onChange={onUpload}
                        validate={{ mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'], maxSize: 5 * 1024 * 1024 }}
                        uploading={isUploading}
                        multiple={false}
                    />
                )}
            </Box>
            {error && <Text color="danger">{error}</Text>}
        </Box>
    );
};

export default UploadImageInput;