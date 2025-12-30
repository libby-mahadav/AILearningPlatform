import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { AppError } from '../utils/AppError';


export const validate = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { 
            abortEarly: false, 
            allowUnknown: false 
        });

        if (error) {
            const message = error.details.map(el => el.message).join(', ');
            return next(new AppError(message, 400));
        }

        next();
    };
};