import { error } from "node:console";
import User from "../models/User";
import Prompt from "../models/Prompt";

export const createUser = async (userData: { id: string, name: string, phone: string, role?: 'admin' | 'user' }) => {
    const existingUser = await User.findByPk(userData.id);
    if (existingUser)
        throw new Error("user already exists");
    return await User.create(userData);
}

export const getAllUsersDetails = async () => {
    return await User.findAll({ include: [{ model: Prompt, as: 'history' }] });
}

export const getUserById = async (userId: string)=> {
    return await User.findByPk(userId, { include: [{ model: Prompt, as: 'history' }] });
}
