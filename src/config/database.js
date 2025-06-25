import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
//
// dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        // port: 3306,
        dialect: 'mysql',
        // dialectOptions: {
        //     socketPath: null
        // },
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
    }
);

export default sequelize;
