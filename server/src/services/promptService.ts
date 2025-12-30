import OpenAI from 'openai';
import Prompt from '../models/Prompt';
import SubCategory from '../models/SubCategory';
import User from '../models/User';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // ודאי שיש לך מפתח ב-env
});

export const getAIResponse = async (subCategoryId: number, messages: any[]) => {
  const subCategory = await SubCategory.findOne({where: {id: subCategoryId}});
    try{
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { 
                role: "system", 
                content: `You are a helpful and professional teacher. Your goal is to teach the student about ${subCategory?.name}. Be clear, encouraging, and patient.` 
            },
            ...messages // כל היסטוריית הצ'אט כדי שיזכור מה נאמר
        ],
    });

    return response.choices[0].message.content;
}catch(error: any){
    const lastUserMessage = messages[messages.length - 1]?.content || "your question";

    return `hi! im your AI teacher im glad to explain you all about ${subCategory?.name}.
    right now i'm offline but i see you asked : "${lastUserMessage}"`
}
};
export const savePromptToHistory = async ( userId: string, subCategoryId: number, question: string, answer: string) => {
  const subCategory = await SubCategory.findByPk(subCategoryId);
    return await Prompt.create({
        userId,
        subCategoryId,
        categoryId: subCategory?.categoryId,
        prompt: question,
        response: answer
    });
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

export const getAllUsersHistory = async()=>{
return await Prompt.findAll({
        include: [
            { model: User, as: 'user', attributes: ['name', 'phone'] }, // חשוב: כדי לראות מי המשתמש ששאל
            { model: SubCategory, attributes: ['name'] }
        ],
        order: [['createdAt', 'DESC']]
    });
};