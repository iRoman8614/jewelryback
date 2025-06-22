'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('reel_gallery_config', [{
      image1: null, image2: null, image3: null, image4: null,
      image5: null, image6: null, image7: null, image8: null,
      image9: null, image10: null, image11: null, image12: null,
      image13: null, image14: null, image15: null, image16: null,
      createdAt: now, updatedAt: now,
    }], {});
    console.log('Initial reel gallery configuration seeded.');
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reel_gallery_config', null, {});
  }
};