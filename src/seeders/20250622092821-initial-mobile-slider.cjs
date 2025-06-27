'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('mobile_slider_config', [{
      slide1_image: null,
      slide2_image: null,
      slide3_image: null,
      slide4_image: null,
      createdAt: now, updatedAt: now,
    }], {});
    console.log('Initial mobile slider configuration seeded.');
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mobile_slider_config', null, {});
  }
};