'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('homepage_config', [{
      text1_title_ru: null, text1_title_en: null, text1_content_ru: null, text1_content_en: null,
      image1_url: null, image1_alt: '', image2_url: null, image2_alt: '', image3_url: null, image3_alt: '',
      image4_url: null, image4_alt: '', image5_url: null, image5_alt: '', image6_url: null, image6_alt: '',
      text2_title_ru: null, text2_title_en: null, text2_content_ru: null, text2_content_en: null,
      image7_url: null, image7_alt: '', image8_url: null, image8_alt: '', image9_url: null, image9_alt: '',
      image10_url: null, image10_alt: '',
      text3_title_ru: null, text3_title_en: null, text3_content_ru: null, text3_content_en: null,
      image11_url: null, image11_alt: '', image12_url: null, image12_alt: '', image13_url: null, image13_alt: '',
      image14_url: null, image14_alt: '',
      text4_title_ru: null, text4_title_en: null, text4_content_ru: null, text4_content_en: null,
      image15_url: null, image15_alt: '', image16_url: null, image16_alt: '', image17_url: null, image17_alt: '',
      text5_title_ru: null, text5_title_en: null, text5_content_ru: null, text5_content_en: null,
      image18_url: null, image18_alt: '', image19_url: null, image19_alt: '', image20_url: null, image20_alt: '',
      image21_url: null, image21_alt: '',
      createdAt: now, updatedAt: now,
    }], {});
    console.log('Initial homepage configuration seeded.');
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('homepage_config', null, {});
  }
};