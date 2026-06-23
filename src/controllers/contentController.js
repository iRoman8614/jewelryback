import HomepageConfig from '../models/HomepageConfig.js';
import SnakeConfig from '../models/SnakeConfig.js';
import MobileSliderConfig from '../models/MobileSliderConfig.js';
import IconLinksConfig from '../models/IconLinksConfig.js';
import ReelGalleryConfig from '../models/ReelGalleryConfig.js';
import VideoGalleryConfig from '../models/VideoGalleryConfig.js';
import CustomConfig from '../models/CustomConfig.js';

// Shared placeholder used wherever an image slot is empty, so the frontend
// renders a complete layout even before the admin uploads real assets.
// The file must exist on the FRONTEND at public/previews/preview.png
// (served at /previews/preview.png). The data layer prepends the public origin.
const PREVIEW = '/previews/preview.png';

export const getHomepageContent = async (req, res, next) => {
    try {
        const config = await HomepageConfig.findOne();
        if (!config) {
            return res.json({ paralaxSet1: [], paralaxSet2: [], paralaxSet3: [], paralaxSet4: [] });
        }
        const paralaxSet1 = [], paralaxSet2 = [], paralaxSet3 = [], paralaxSet4 = [];

        const addText = (arr, id, titleKey, contentKey) => {
            const title_ru = config[`${titleKey}_ru`];
            const title_en = config[`${titleKey}_en`];
            const content_ru = config[`${contentKey}_ru`];
            const content_en = config[`${contentKey}_en`];
            if (content_ru || content_en) {
                arr.push({
                    id,
                    type: 'text',
                    title: { ru: title_ru, en: title_en },
                    content: { ru: content_ru, en: content_en }
                });
            }
        };

        // Homepage images are now preview-filled when empty: this keeps each
        // parallax set DENSE (every slot present), so the frontend's positional
        // merge maps each image to its correct position AND empty slots show the
        // placeholder instead of leaving holes. Upload a real image to override.
        const addImage = (arr, id, urlKey) => {
            arr.push({ id, type: 'image', src: config[urlKey] || PREVIEW, alt: '' });
        };
        addText(paralaxSet1, 0, 'text1_title', 'text1_content');
        for (let i = 1; i <= 6; i++) addImage(paralaxSet1, i, `image${i}_url`);
        addText(paralaxSet2, 7, 'text2_title', 'text2_content');
        for (let i = 7; i <= 10; i++) addImage(paralaxSet2, i, `image${i}_url`);
        for (let i = 11; i <= 14; i++) addImage(paralaxSet2, i, `image${i}_url`);
        addText(paralaxSet2, 17, 'text4_title', 'text4_content');
        for (let i = 15; i <= 17; i++) addImage(paralaxSet3, i, `image${i}_url`);
        addText(paralaxSet3, 21, 'text5_title', 'text5_content');
        for (let i = 18; i <= 21; i++) addImage(paralaxSet3, i, `image${i}_url`);
        addText(paralaxSet4, 12, 'text3_title', 'text3_content');
        res.json({ paralaxSet1, paralaxSet2, paralaxSet3, paralaxSet4 });
    } catch (error) {
        next(error);
    }
};

export const getSnakeContent = async (req, res, next) => {
    try {
        const config = await SnakeConfig.findOne();

        // Collect only fully-filled pairs (both top & bottom present).
        const existingPairs = [];
        if (config) {
            for (let i = 1; i <= 12; i++) {
                const topImage = config[`image${i}_top`];
                const bottomImage = config[`image${i}_bottom`];
                if (topImage && bottomImage) {
                    existingPairs.push({ top: topImage, bottom: bottomImage });
                }
            }
        }

        // Empty admin → fall back to a single preview pair. This guarantees the
        // endpoint always returns 12 full pairs and never an empty array, which
        // previously crashed the homepage's category selector.
        const sourcePairs = existingPairs.length > 0
            ? existingPairs
            : [{ top: PREVIEW, bottom: PREVIEW }];

        const snakeImages = [];
        for (let i = 0; i < 12; i++) {
            const pair = sourcePairs[i % sourcePairs.length];
            snakeImages.push({
                id: `s${i + 1}`,
                top: pair.top,
                bottom: pair.bottom,
            });
        }

        res.json(snakeImages);
    } catch (error) {
        next(error);
    }
};

export const getMobileSliderContent = async (req, res, next) => {
    try {
        const config = await MobileSliderConfig.findOne();

        const slides = [];
        for (let i = 1; i <= 4; i++) {
            slides.push({
                id: `slide${i}`,
                url: config?.[`slide${i}_image`] || PREVIEW,
                alt: config?.[`slide${i}_alt`] || ''
            });
        }
        res.json(slides);
    } catch (error) {
        next(error);
    }
};

export const getIconLinksContent = async (req, res, next) => {
    try {
        const config = await IconLinksConfig.findOne();

        const icons = [];
        for (let i = 1; i <= 4; i++) {
            icons.push({
                id: `icon${i}`,
                image: config?.[`icon${i}_image`] || PREVIEW,
            });
        }
        res.json(icons);
    } catch (error) {
        next(error);
    }
};

// PHOTO half of the gallery. Returns up to 12 image URLs; empty slots fall
// back to the preview placeholder so the swiper always has a full set.
export const getReelGalleryContent = async (req, res, next) => {
    try {
        const config = await ReelGalleryConfig.findOne();

        const images = [];
        for (let i = 1; i <= 12; i++) {
            images.push(config?.[`image${i}`] || PREVIEW);
        }
        res.json(images);
    } catch (error) {
        next(error);
    }
};

// VIDEO half of the gallery. Returns only real video URLs (no preview
// placeholder — a still image is not a valid <video> source). Empty slots are
// skipped; an empty array is a valid response the frontend should tolerate.
export const getVideoGalleryContent = async (req, res, next) => {
    try {
        const config = await VideoGalleryConfig.findOne();
        if (!config) return res.json([]);

        const videos = [];
        for (let i = 1; i <= 12; i++) {
            const video = config[`video${i}`];
            if (video) {
                videos.push(video);
            }
        }
        res.json(videos);
    } catch (error) {
        next(error);
    }
};
// "Custom" (КАСТОМ) homepage block: 3 images + one RU/EN text block.
// The heading stays hardcoded on the frontend. Images fall back to the preview
// placeholder so the block renders before the admin uploads anything.
export const getCustomContent = async (req, res, next) => {
    try {
        const config = await CustomConfig.findOne();
        res.json({
            images: [
                config?.image1_url || PREVIEW,
                config?.image2_url || PREVIEW,
                config?.image3_url || PREVIEW,
            ],
            text: {
                ru: config?.text_content_ru || '',
                en: config?.text_content_en || '',
            },
        });
    } catch (error) {
        next(error);
    }
};