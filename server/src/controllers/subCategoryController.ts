import { Request, Response } from 'express';
import * as subsService from '../services/subCategoryService';
import { catchAsync } from '../utils/catchAsync';

export const addSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { name, categoryId } = req.body;
    const subCategory = await subsService.addSubCategory(name, categoryId);
    
    res.status(201).json({ 
        status: "success", 
        data: { subCategory } 
    });
});

// get all categories