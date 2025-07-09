'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log('Starting migration to remove alt fields from homepage_config...');
      const columnsToRemove = [];
      for (let i = 1; i <= 21; i++) {
        columnsToRemove.push(`image${i}_alt`);
      }
      for (const column of columnsToRemove) {
        console.log(`Removing column: ${column}`);
        await queryInterface.removeColumn('homepage_config', column, { transaction });
      }

      await transaction.commit();
      console.log('Migration successful: All alt fields have been removed.');
    } catch (err) {
      await transaction.rollback();
      console.error('Migration failed:', err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log('Starting rollback to add alt fields back to homepage_config...');
      const columnsToAdd = [];
      for (let i = 1; i <= 21; i++) {
        columnsToAdd.push(`image${i}_alt`);
      }
      for (const column of columnsToAdd) {
        console.log(`Adding column back: ${column}`);
        await queryInterface.addColumn('homepage_config', column, {
          type: Sequelize.TEXT,
          allowNull: true,
        }, { transaction });
      }

      await transaction.commit();
      console.log('Rollback successful: All alt fields have been added back.');
    } catch (err) {
      await transaction.rollback();
      console.error('Rollback failed:', err);
      throw err;
    }
  }
};