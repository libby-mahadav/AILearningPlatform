import {Sequelize} from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'myDataBase',
    process.env.DB_USER || 'myUser',
    process.env.DB_PASSWORD || 'myPassword',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port:5432,
        logging: false,
    }
);

export default sequelize;