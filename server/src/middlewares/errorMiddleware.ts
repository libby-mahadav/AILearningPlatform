import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    
    logger.error(`[${req.method}] ${req.originalUrl} - ${err.message}`);
    
    if (err.stack) {
        logger.error(`Stack: ${err.stack}`);
    }

    res.status(statusCode).json({
        status: 'error',
        message: err.isOperational ? err.message : 'Internal Server Error',
    });
};