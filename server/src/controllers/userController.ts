import * as userService from '../services/userService';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { signToken } from '../utils/authUtils';

export const register = catchAsync(async (req: Request, res: Response) => {
    const newUser = await userService.createUser(req.body);
    const token = signToken(newUser.id, newUser.role);
    res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getUserById(req.body.id);
    if (!user) return next(new AppError('No user found, did you register?', 404));
    const token = signToken(user.id, user.role);
    res.status(200).json({ status: 'success', token, data: { user } });
});

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsersDetails();
    res.status(200).json(users);
});