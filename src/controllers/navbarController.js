import Category from '../models/Category.js';
import Collection from '../models/Collection.js';

export const getNavigationStructure = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            attributes: [
                'slug',
                ['name', 'title_en'],
                'title_ru',
                'subtitle_en',
                'subtitle_ru',
                'description_en',
                'description_ru'
            ],
            include: [{
                model: Collection,
                as: 'collections',
                attributes: ['slug', 'name_ru', 'name_en', 'description_ru', 'description_en'],
                required: false,
            }],
            order: [
                ['createdAt', 'ASC'],
                [{ model: Collection, as: 'collections' }, 'createdAt', 'ASC']
            ]
        });

        const result = categories.map(category => {
            const cat = category.get({ plain: true });
            return {
                slug: cat.slug,
                title: {
                    ru: cat.title_ru || null,
                    en: cat.title_en || null
                },
                subtitle: {
                    ru: cat.subtitle_ru || null,
                    en: cat.subtitle_en || null
                },
                description: {
                    ru: cat.description_ru || null,
                    en: cat.description_en || null
                },
                collections: cat.collections.map(collection => ({
                    slug: collection.slug,
                    name: {
                        ru: collection.name_ru || null,
                        en: collection.name_en || null
                    },
                    description: {
                        ru: collection.description_ru || null,
                        en: collection.description_en || null,
                    }
                }))
            };
        });

        res.json(result);

    } catch (error) {
        next(error);
    }
};