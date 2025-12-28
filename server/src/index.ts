import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import sequelize from './config/db';

import './models/User';
import './models/Category';
import './models/Sub_category';
import './models/Prompt';
import './models/realationships';

import userRouter from './routes/userRoutes';

import { errorHandler } from './middlewares/errorMiddleware';
import { AppError } from './utils/AppError';
import { catchAsync } from './utils/catchAsync';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('WELCOME TO THE MINI API TEACHER');
});

app.use(errorHandler);

app.use((req: Request, res: Response, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const startServer = async () => {
        // Test the database connection
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        // check if data base tables are in sync with models
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

};

startServer();



