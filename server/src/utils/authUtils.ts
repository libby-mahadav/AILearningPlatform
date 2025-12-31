import jwt from 'jsonwebtoken';

console.log("JWT_SECRET:", process.env.JWT_SECRET);

export const signToken = (id: string, role: string): string =>{
    return jwt.sign(
        {id,role},
        process.env.JWT_SECRET || '',
        {expiresIn: '1d'}
    );
};