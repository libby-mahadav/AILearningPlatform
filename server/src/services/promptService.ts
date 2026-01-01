import OpenAI from 'openai';
import Prompt from '../models/Prompt';
import SubCategory from '../models/SubCategory';
import User from '../models/User';
import Category from '../models/Category';
import {logger} from '../utils/logger';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // ודאי שיש לך מפתח ב-env
});

export const getAIResponse = async (subCategoryId: number, messages: any[]) => {
    const subCategory = await SubCategory.findOne({ where: { id: subCategoryId } });
    logger.info(`[AI-LOG] Sending prompt to OpenAI for SubCategory ID: ${subCategoryId}`);
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful and professional teacher. Your goal is to teach the student about ${subCategory?.name}. Be clear, encouraging, and patient.`
                },
                ...messages
            ],
        });
        logger.info(`[AI-LOG] Successfully received answer from OpenAI.`);
        return response.choices[0].message.content;
    } catch (error: any) {
        logger.error(`[AI-ERROR] Failed to get response from OpenAI: ${error.message}`);
        const lastUserMessage = messages[messages.length - 1]?.content || "your question";

        return `hi! im your AI teacher im glad to explain you all about ${subCategory?.name}.
    right now i'm offline but i see you asked : "${lastUserMessage}"`
    }
};
export const savePromptToHistory = async (userId: string, subCategoryId: number, question: string, answer: string) => {
    const subCategory = await SubCategory.findByPk(subCategoryId);
    const newPrompt =  await Prompt.create({
        userId,
        subCategoryId,
        categoryId: subCategory?.categoryId,
        prompt: question,
        response: answer
    });
    logger.info(`[DB-LOG] Prompt history saved for User ID: ${userId}, Prompt ID: ${newPrompt.id}`);
    return newPrompt;
    
}

export const getUserPrompts = async (userId: number) => {
    return await Prompt.findAll({
        where: { userId: userId },
        include: [
            {
                model: SubCategory,
                attributes: ['name']
            }
        ],
        order: [['createdAt', 'DESC']] // בונוס: מציג את ההיסטוריה מהחדש לישן
    });
};

export const getAllUsersHistory = async () => {
    return await Prompt.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['name', 'phone']
            },
            {
                model: SubCategory,
                attributes: ['name'],
                // הקישור הנכון: הקטגוריה נמצאת בתוך התת-קטגוריה
                include: [
                    {
                        model: Category,
                        as: 'category', // חייב להתאים ל-alias שהגדרת ב-relationships
                        attributes: ['name']
                    }
                ]
            }
        ],
        order: [['createdAt', 'DESC']]
    });
};