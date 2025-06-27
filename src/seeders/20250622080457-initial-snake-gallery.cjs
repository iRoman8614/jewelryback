'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('snake_config', [{
      // Все поля по умолчанию пустые
      image1_top: null, image1_bottom: null,
      image2_top: null, image2_bottom: null,
      image3_top: null, image3_bottom: null,
      image4_top: null, image4_bottom: null,
      image5_top: null, image5_bottom: null,
      image6_top: null, image6_bottom: null,
      image7_top: null, image7_bottom: null,
      image8_top: null, image8_bottom: null,
      image9_top: null, image9_bottom: null,
      image10_top: null, image10_bottom: null,
      image11_top: null, image11_bottom: null,
      image12_top: null, image12_bottom: null,
      createdAt: now,
      updatedAt: now,
    }], {});
    console.log('Initial snake gallery configuration seeded.');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('snake_config', null, {});
    console.log('Snake gallery configuration seed rolled back.');
  }
};
