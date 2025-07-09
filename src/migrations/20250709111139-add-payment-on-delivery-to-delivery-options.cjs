'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('delivery_options', 'allowsPaymentOnDelivery', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'Разрешает ли этот способ доставки оплату при получении'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('delivery_options', 'allowsPaymentOnDelivery');
  }
};