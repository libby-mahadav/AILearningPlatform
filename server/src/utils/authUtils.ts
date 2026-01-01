import jwt from 'jsonwebtoken';
import {logger} from '../utils/logger';

logger.info("JWT_SECRET:", process.env.JWT_SECRET);

export const signToken = (id: string, role: string): string =>{
    return jwt.sign(
        {id,role},
        process.env.JWT_SECRET || '',
        {expiresIn: '1d'}
    );
};