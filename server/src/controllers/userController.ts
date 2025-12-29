import * as userService from '../services/userService';
import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import jwt from 'jsonwebtoken';


export const register = catchAsync(async (req: Request, res: Response) => {
        
        const newUser = await userService.createUser(req.body);
        const token = jwt.sign(
                { id: newUser.id, role: newUser.role },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '1d' }
        );
        res.status(201).json({
                status: 'success',
                token,
                data: {
                        user: newUser
                }
        });
});

export const login = catchAsync(async (req: Request, res: Response, next: any) => {
        const { id } = req.body;
        if (!id) { return next(new AppError('please enter your id', 400)); }
        const user = await userService.getUserById(id);
        if(!user) { return next(new AppError('no user found did you register?', 404)); }
       
        const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
    );

    res.status(200).json({
        status: 'success',
        token,
        data: { user }
    });
});

        export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
                const users = await userService.getAllUsersDetails();
                res.status(200).json(users);
        });