'use strict';
const bcrypt = require('bcryptjs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
    // -------------------------------
    const saltRounds = 10;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('ADMIN_EMAIL or ADMIN_PASSWORD environment variables are not set or .env not loaded. Cannot seed initial admin.');
      throw new Error('Missing Admin Credentials in .env for seeder');
    }

    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
    const now = new Date();

    await queryInterface.bulkInsert('admins', [{
      email: adminEmail,
      hashedPassword: hashedPassword,
      createdAt: now,
      updatedAt: now,
    }], {});

    console.log(`Initial admin created: ${adminEmail}`);
  },

  async down (queryInterface, Sequelize) {
    require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await queryInterface.bulkDelete('admins', { email: adminEmail }, {});
      console.log(`Initial admin ${adminEmail} deleted.`);
    } else {
      console.warn('ADMIN_EMAIL not found in .env, cannot undo admin seed by email.');
    }
  }
};