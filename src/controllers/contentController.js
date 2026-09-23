import HomepageConfig from '../models/HomepageConfig.js';
import SnakeConfig from '../models/SnakeConfig.js';
import MobileSliderConfig from '../models/MobileSliderConfig.js';
import IconLinksConfig from '../models/IconLinksConfig.js';
import ReelGalleryConfig from '../models/ReelGalleryConfig.js';
import VideoGalleryConfig from '../models/VideoGalleryConfig.js';
import CustomConfig from '../models/CustomConfig.js';
import SalesPoint from '../models/SalesPoint.js';

// Shared placeholder used wherever an image slot is empty, so the frontend
// renders a complete layout even before the admin uploads real assets.
// The file must exist on the FRONTEND at public/previews/preview.png
// (served at /previews/preview.png). The data layer prepends the public origin.
const PREVIEW = '/previews/preview.png';

// width/left раньше были жёстко зашиты во фронтенде (home-page.data.js),
// подогнаны под макет из Figma. Теперь они редактируются в админке
// (HomepageConfig.image{N}_width / image{N}_left, text{N}_width / text{N}_left)
// и отдаются в API-ответе. ВАЖНО: Sequelize defaultValue из модели применяется
// только к НОВЫМ строкам (INSERT) — у уже существующей строки конфига после
// ALTER TABLE эти колонки будут NULL, пока админ их не заполнит. Поэтому здесь
// нужен JS-level фолбэк на те же значения, что были в старом хардкоде фронта —
// иначе после деплоя вёрстка временно "схлопнется" в 0%/auto до первого
// сохранения в админке.
const DEFAULT_LAYOUT = {
    text1: { width: '65%', left: '5%' },
    image1: { width: '27%', left: '65%' },
    image2: { width: '25%', left: '15%' },
    image3: { width: '29%', left: '55%' },
    image4: { width: '38%', left: '7%' },
    image5: { width: '31%', left: '5%' },
    image6: { width: '28%', left: '60%' },

    text2: { width: '80%', left: '10%' },
    image7: { width: '31%', left: '16%' },
    image8: { width: '23%', left: '65%' },
    image9: { width: '35%', left: '10%' },
    image10: { width: '23%', left: '60%' },

    text3: { width: '45%', left: '50%' },
    image11: { width: '25%', left: '12%' },
    image12: { width: '24%', left: '60%' },
    image13: { width: '24%', left: '20%' },
    image14: { width: '27%', left: '48%' },

    text4: { width: '70%', left: '15%' },
    image15: { width: '27%', left: '56%' },
    image16: { width: '36%', left: '8%' },
    image17: { width: '20%', left: '51%' },

    text5: { width: '45%', left: '50%' },
    image18: { width: '31%', left: '11%' },
    image19: { width: '30%', left: '55%' },
    image20: { width: '20%', left: '56%' },
    image21: { width: '30%', left: '55%' },
};

export const getHomepageContent = async (req, res, next) => {
    try {
        const config = await HomepageConfig.findOne();
        if (!config) {
            return res.json({ paralaxSet1: [], paralaxSet2: [], paralaxSet3: [], paralaxSet4: [] });
        }
        const paralaxSet1 = [], paralaxSet2 = [], paralaxSet3 = [], paralaxSet4 = [];

        const addText = (arr, id, key, titleKey, contentKey) => {
            const title_ru = config[`${titleKey}_ru`];
            const title_en = config[`${titleKey}_en`];
            const content_ru = config[`${contentKey}_ru`];
            const content_en = config[`${contentKey}_en`];
            if (content_ru || content_en) {
                const def = DEFAULT_LAYOUT[key] || {};
                arr.push({
                    id,
                    type: 'text',
                    title: { ru: title_ru, en: title_en },
                    content: { ru: content_ru, en: content_en },
                    width: config[`${key}_width`] || def.width,
                    left: config[`${key}_left`] || def.left,
                });
            }
        };

        // Homepage images are now preview-filled when empty: this keeps each
        // parallax set DENSE (every slot present), so the frontend's positional
        // merge maps each image to its correct position AND empty slots show the
        // placeholder instead of leaving holes. Upload a real image to override.
        const addImage = (arr, id, key, urlKey) => {
            const def = DEFAULT_LAYOUT[key] || {};
            arr.push({
                id,
                type: 'image',
                src: config[urlKey] || PREVIEW,
                alt: '',
                width: config[`${key}_width`] || def.width,
                left: config[`${key}_left`] || def.left,
            });
        };
        addText(paralaxSet1, 0, 'text1', 'text1_title', 'text1_content');
        for (let i = 1; i <= 6; i++) addImage(paralaxSet1, i, `image${i}`, `image${i}_url`);
        addText(paralaxSet2, 7, 'text2', 'text2_title', 'text2_content');
        for (let i = 7; i <= 10; i++) addImage(paralaxSet2, i, `image${i}`, `image${i}_url`);
        for (let i = 11; i <= 14; i++) addImage(paralaxSet2, i, `image${i}`, `image${i}_url`);
        addText(paralaxSet2, 17, 'text4', 'text4_title', 'text4_content');
        for (let i = 15; i <= 17; i++) addImage(paralaxSet3, i, `image${i}`, `image${i}_url`);
        addText(paralaxSet3, 21, 'text5', 'text5_title', 'text5_content');
        for (let i = 18; i <= 21; i++) addImage(paralaxSet3, i, `image${i}`, `image${i}_url`);
        addText(paralaxSet4, 12, 'text3', 'text3_title', 'text3_content');
        res.json({ paralaxSet1, paralaxSet2, paralaxSet3, paralaxSet4 });
    } catch (error) {
        next(error);
    }
};

export const getSnakeContent = async (req, res, next) => {
    try {
        const config = await SnakeConfig.findOne();

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

export const getSalesPointsContent = async (req, res, next) => {
    try {
        const points = await SalesPoint.findAll({
            where: { isEnabled: true },
            order: [['sortOrder', 'ASC'], ['id', 'ASC']],
        });
        res.json(points.map((p) => ({
            id: p.id,
            name: { ru: p.name_ru || '', en: p.name_en || p.name_ru || '' },
            logoUrl: p.logoImage || p.logoUrl || '',
            websiteUrl: p.websiteUrl || '',
            address: { ru: p.address_ru || '', en: p.address_en || p.address_ru || '' },
            mapEmbedUrl: p.mapEmbedUrl || '',
        })));
    } catch (error) {
        next(error);
    }
};