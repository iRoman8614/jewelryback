'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('icon_links_config', [{
      icon1_image: null,
      icon2_image: null,
      icon3_image: null,
      icon4_image: null,
      createdAt: now, updatedAt: now,
    }], {});
    console.log('Initial icon links configuration seeded.');
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('icon_links_config', null, {});
  }
};