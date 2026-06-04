import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        // Port is configurable; fall back to MySQL default if not set.
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        dialect: 'mysql',
        // Explicit utf8mb4 so the runtime connection encodes multibyte
        // characters (emoji, full unicode) correctly. Without this the
        // connection uses the server's default collation and may corrupt or
        // reject such input.
        charset: 'utf8mb4',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
    }
);

export default sequelize;