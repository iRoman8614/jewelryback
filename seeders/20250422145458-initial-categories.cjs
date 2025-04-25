'use strict';

const generateSlug = (name) => {
  return name.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    const categories = [
      { name: 'Rings', slug: generateSlug('Rings') },
      { name: 'Pendants', slug: generateSlug('Pendants') },
      { name: 'Bracelets', slug: generateSlug('Bracelets') },
      { name: 'Earrings', slug: generateSlug('Earrings') },
    ];

    const categoriesWithTimestamps = categories.map(cat => ({
      ...cat,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert('Categories', categoriesWithTimestamps, {});
    console.log('English categories seeded successfully!');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {
      slug: ['rings', 'pendants', 'bracelets', 'earrings']
    }, {});
    console.log('English categories seed rolled back!');
  }
};