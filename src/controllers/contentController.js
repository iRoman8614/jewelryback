import HomepageConfig from '../models/HomepageConfig.js';

export const getHomepageContent = async (req, res, next) => {
    try {
        const config = await HomepageConfig.findOne();

        if (!config) {
            console.warn('Homepage configuration not found in database.');
            return res.json({
                paralaxSet1: [],
                paralaxSet2: [],
                paralaxSet3: [],
            });
        }

        const paralaxSet1 = [];
        const paralaxSet2 = [];
        const paralaxSet3 = [];

        if (config.text1_content) paralaxSet1.push({ id: 0, type: 'text', title: config.text1_title || null, content: config.text1_content });
        if (config.image1_url) paralaxSet1.push({ id: 1, type: 'image', src: config.image1_url, alt: config.image1_alt || '' });
        if (config.image2_url) paralaxSet1.push({ id: 2, type: 'image', src: config.image2_url, alt: config.image2_alt || '' });
        if (config.image3_url) paralaxSet1.push({ id: 3, type: 'image', src: config.image3_url, alt: config.image3_alt || '' });
        if (config.image4_url) paralaxSet1.push({ id: 4, type: 'image', src: config.image4_url, alt: config.image4_alt || '' });
        if (config.image5_url) paralaxSet1.push({ id: 5, type: 'image', src: config.image5_url, alt: config.image5_alt || '' });
        if (config.image6_url) paralaxSet1.push({ id: 6, type: 'image', src: config.image6_url, alt: config.image6_alt || '' });

        if (config.text2_content) paralaxSet2.push({ id: 7, type: 'text', title: config.text2_title || null, content: config.text2_content });
        if (config.image7_url) paralaxSet2.push({ id: 8, type: 'image', src: config.image7_url, alt: config.image7_alt || '' });
        if (config.image8_url) paralaxSet2.push({ id: 9, type: 'image', src: config.image8_url, alt: config.image8_alt || '' });
        if (config.image9_url) paralaxSet2.push({ id: 10, type: 'image', src: config.image9_url, alt: config.image9_alt || '' });
        if (config.image10_url) paralaxSet2.push({ id: 11, type: 'image', src: config.image10_url, alt: config.image10_alt || '' });
        if (config.text3_content) paralaxSet2.push({ id: 12, type: 'text', title: config.text3_title || null, content: config.text3_content });
        if (config.image11_url) paralaxSet2.push({ id: 13, type: 'image', src: config.image11_url, alt: config.image11_alt || '' });
        if (config.image12_url) paralaxSet2.push({ id: 14, type: 'image', src: config.image12_url, alt: config.image12_alt || '' });
        if (config.image13_url) paralaxSet2.push({ id: 15, type: 'image', src: config.image13_url, alt: config.image13_alt || '' });
        if (config.image14_url) paralaxSet2.push({ id: 16, type: 'image', src: config.image14_url, alt: config.image14_alt || '' });
        if (config.text4_content) paralaxSet2.push({ id: 17, type: 'text', title: config.text4_title || null, content: config.text4_content });

        if (config.image15_url) paralaxSet3.push({ id: 18, type: 'image', src: config.image15_url, alt: config.image15_alt || '' });
        if (config.image16_url) paralaxSet3.push({ id: 19, type: 'image', src: config.image16_url, alt: config.image16_alt || '' });
        if (config.image17_url) paralaxSet3.push({ id: 20, type: 'image', src: config.image17_url, alt: config.image17_alt || '' });
        if (config.text5_content) paralaxSet3.push({ id: 21, type: 'text', title: config.text5_title || null, content: config.text5_content });
        if (config.image18_url) paralaxSet3.push({ id: 22, type: 'image', src: config.image18_url, alt: config.image18_alt || '' });
        if (config.image19_url) paralaxSet3.push({ id: 23, type: 'image', src: config.image19_url, alt: config.image19_alt || '' });
        if (config.image20_url) paralaxSet3.push({ id: 24, type: 'image', src: config.image20_url, alt: config.image20_alt || '' });
        if (config.image21_url) paralaxSet3.push({ id: 25, type: 'image', src: config.image21_url, alt: config.image21_alt || '' });

        res.json({
            paralaxSet1,
            paralaxSet2,
            paralaxSet3,
        });

    } catch (error) {
        next(error);
    }
};