import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';

export const protect = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in. Please log in to get access.', 401));
    }


    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; 
    next();
});

export const accessibility = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('you dont have access to this action', 403));
        }
        next();
    };
};