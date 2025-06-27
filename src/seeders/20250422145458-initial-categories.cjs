'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const generateSlug = (name) => {
      return name.toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '');
    };

    const now = new Date();
    const categories = [
      {
        name: 'Rings',
        title_ru: 'Кольца',
        slug: generateSlug('Rings')
      },
      {
        name: 'Bracelets',
        title_ru: 'Браслеты',
        slug: generateSlug('Bracelets')
      },
      {
        name: 'Earrings',
        title_ru: 'Серьги',
        slug: generateSlug('Earrings')
      },
      {
        name: 'Pendants',
        title_ru: 'Подвески',
        slug: generateSlug('Pendants')
      },
      {
        name: 'Necklaces',
        title_ru: 'Ожерелья',
        slug: generateSlug('Necklaces')
      },
    ];

    const categoriesWithTimestamps = categories.map(cat => ({
      ...cat,
      // Описания и подзаголовки будут NULL, их можно будет заполнить в админке.
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert('Categories', categoriesWithTimestamps, {});
    console.log('✅ Basic categories seeded with required names (EN/RU) and slugs!');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {
      slug: ['rings', 'pendants', 'bracelets', 'earrings', 'necklaces']
    }, {});
    console.log('↩️ Basic categories seed rolled back!');
  }
};'use strict';

const generateSlug = (name) => {
  return name.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Создаем категории с минимальным набором обязательных полей:
    // name (для title_en), title_ru и slug.
    const categories = [
      {
        name: 'Rings',
        title_ru: 'Кольца',
        slug: generateSlug('Rings')
      },
      {
        name: 'Bracelets',
        title_ru: 'Браслеты',
        slug: generateSlug('Bracelets')
      },
      {
        name: 'Earrings',
        title_ru: 'Серьги',
        slug: generateSlug('Earrings')
      },
      {
        name: 'Pendants',
        title_ru: 'Подвески',
        slug: generateSlug('Pendants')
      },
      {
        name: 'Necklaces',
        title_ru: 'Ожерелья',
        slug: generateSlug('Necklaces')
      },
    ];

    const categoriesWithTimestamps = categories.map(cat => ({
      ...cat,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert('Categories', categoriesWithTimestamps, {});
    console.log('✅ Basic categories seeded with required names (EN/RU) and slugs!');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {
      slug: ['rings', 'pendants', 'bracelets', 'earrings', 'necklaces']
    }, {});
    console.log('↩️ Basic categories seed rolled back!');
  }
};