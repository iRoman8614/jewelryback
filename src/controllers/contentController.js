import HomepageConfig from '../models/HomepageConfig.js';
import SnakeConfig from '../models/SnakeConfig.js';
import MobileSliderConfig from '../models/MobileSliderConfig.js';
import IconLinksConfig from '../models/IconLinksConfig.js';
import ReelGalleryConfig from '../models/ReelGalleryConfig.js';

export const getHomepageContent = async (req, res, next) => {
    try {
        const config = await HomepageConfig.findOne();
        if (!config) {
            return res.json({ paralaxSet1: [], paralaxSet2: [], paralaxSet3: [] });
        }
        const paralaxSet1 = [], paralaxSet2 = [], paralaxSet3 = [];

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

        const addImage = (arr, id, urlKey) => {
            if (config[urlKey]) {
                arr.push({ id, type: 'image', src: config[urlKey], alt: '' });
            }
        };
        addText(paralaxSet1, 0, 'text1_title', 'text1_content');
        for (let i = 1; i <= 6; i++) addImage(paralaxSet1, i, `image${i}_url`);
        addText(paralaxSet2, 7, 'text2_title', 'text2_content');
        for (let i = 7; i <= 10; i++) addImage(paralaxSet2, i, `image${i}_url`);
        addText(paralaxSet2, 12, 'text3_title', 'text3_content');
        for (let i = 11; i <= 14; i++) addImage(paralaxSet2, i, `image${i}_url`);
        addText(paralaxSet2, 17, 'text4_title', 'text4_content');
        for (let i = 15; i <= 17; i++) addImage(paralaxSet3, i, `image${i}_url`);
        addText(paralaxSet3, 21, 'text5_title', 'text5_content');
        for (let i = 18; i <= 21; i++) addImage(paralaxSet3, i, `image${i}_url`);
        res.json({ paralaxSet1, paralaxSet2, paralaxSet3 });
    } catch (error) {
        next(error);
    }
};

export const getSnakeContent = async (req, res, next) => {
    try {
        const config = await SnakeConfig.findOne();

        if (!config) {
            return res.json([]);
        }
        const existingPairs = [];
        for (let i = 1; i <= 12; i++) {
            const topImage = config[`image${i}_top`];
            const bottomImage = config[`image${i}_bottom`];
            if (topImage && bottomImage) {
                existingPairs.push({
                    top: topImage,
                    bottom: bottomImage,
                });
            }
        }
        if (existingPairs.length === 0) {
            return res.json([]);
        }
        const snakeImages = [];
        for (let i = 0; i < 12; i++) {
            const pair = existingPairs[i % existingPairs.length];

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
        if (!config) return res.json([]);

        const slides = [];
        for (let i = 1; i <= 4; i++) {
            const image = config[`slide${i}_image`];
            if (image) {
                slides.push({
                    id: `slide${i}`,
                    url: image,
                    alt: config[`slide${i}_alt`] || ''
                });
            }
        }
        res.json(slides);
    } catch (error) {
        next(error);
    }
};

export const getIconLinksContent = async (req, res, next) => {
    try {
        const config = await IconLinksConfig.findOne();
        if (!config) return res.json([]);

        const icons = [];
        for (let i = 1; i <= 4; i++) {
            const image = config[`icon${i}_image`];
            if (image) {
                icons.push({
                    id: `icon${i}`,
                    image: image,
                });
            }
        }
        res.json(icons);
    } catch (error) {
        next(error);
    }
};

export const getReelGalleryContent = async (req, res, next) => {
    try {
        const config = await ReelGalleryConfig.findOne();
        if (!config) return res.json([]);

        const images = [];
        for (let i = 1; i <= 16; i++) {
            const image = config[`image${i}`];
            if (image) {
                images.push(image);
            }
        }
        res.json(images);
    } catch (error) {
        next(error);
    }
};
