import * as categoryService from "../services/categoryService";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";

export const addCategory = catchAsync(async (req: Request, res: Response) => {
    const newCategory = await categoryService.createCategory(req.body.name);
    res.status(201).json({ status: 'success', data: { category: newCategory } });
});

export const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ status: 'success', data: { categories } });
});

// export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
//     const { name } = req.body.name; 
//     await categoryService.deleteCategory(name);

//     res.status(204).json({
//         status: 'success',
//         data: null 
//     });
// });



