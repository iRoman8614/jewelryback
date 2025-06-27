require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '12345678',
    database: process.env.DB_NAME || 'testback',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    charset: 'utf8mb4'
  },
  // Конфигурация для продакшена (будет использоваться в Docker-контейнере)
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    charset: 'utf8mb4'
  }
};