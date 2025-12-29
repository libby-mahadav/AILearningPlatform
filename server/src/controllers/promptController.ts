import * as promptService from '../services/promptService';
import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';


export const newPrompt = catchAsync(async(req: Request, res: Response)=>{
const {userId, subCategoryId, categoryName, subCategoryName, question} = req.body;

const result = await promptService.createNewPrompt(
    userId,
    subCategoryId,
    categoryName,
    subCategoryName,
    question
);

res.status(201).json({
    status: 'success',
    data: result
});
 });

 export const getUserPromptsHandler = catchAsync(async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const prompts = await promptService.getUserPrompts(userId);
        
        res.status(200).json({
            status: "success",
            results: prompts.length,
            data: prompts
        });
});