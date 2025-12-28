import * as subsService from "../services/subCategoryService";
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

export const addSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { name, categoryId } = req.body;
    const subCategory = await subsService.addSubCategory(name, categoryId);
    res.status(201).json({ status: "success", data: { subCategory } });
});

export const getAllSubsByCategoryId = catchAsync(async (req: Request, res: Response) => {
   const subs = await subsService.getAllSubsByCategoryId(Number(req.params.categoryId));
    res.status(200).json({ status: 'success', data: subs });
});
   