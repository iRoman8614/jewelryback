import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Admin = sequelize.define('Admin', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'admins'
});

// Добавим хук beforeCreate для автоматического хеширования (альтернатива ручному хешированию в сидере)
// Admin.beforeCreate(async (admin, options) => {
//   if (admin.hashedPassword) {
//     const bcrypt = await import('bcrypt');
//     const saltRounds = 10; // Рекомендуемое количество раундов
//     admin.hashedPassword = await bcrypt.hash(admin.hashedPassword, saltRounds);
//   }
// });
// Примечание: Хуки могут конфликтовать с @adminjs/passwords, лучше использовать хеширование через фичу.

export default Admin;