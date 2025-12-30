import * as promptService from '../services/promptService';
import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';


export const askAI =  catchAsync(async (req: Request, res: Response) => {
        const { subCategoryId, messages } = req.body;
        const userId = req.user.id;
        const lastMessage = messages[messages.length - 1].content;

        const reply = await promptService.getAIResponse(subCategoryId, messages)|| "";

        await promptService.savePromptToHistory(userId, subCategoryId, lastMessage, reply);

        res.status(200).json({
            status: "success",
            data: { reply }
        });
});

 export const getUserPromptsHandler = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user.id;
        const prompts = await promptService.getUserPrompts(userId);
        
        res.status(200).json({
            status: "success",
            results: prompts.length,
            data: prompts
        });
});

export const getAllUsersHistory = catchAsync(async(req:Request, res:Response)=>{
    const history = await promptService.getAllUsersHistory();
    res.status(200).json({
        status: "success",
        data: history
    });
});