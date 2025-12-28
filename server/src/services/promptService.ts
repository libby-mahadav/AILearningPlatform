import OpenAI from 'openai';
import Prompt from '../models/Prompt';

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});

export const createNewPrompt = async( userId: number, subCategoryId: number, categoryName: string, subCategoryName: string, question: string)=>{
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content:`You are a teacher specialized in ${categoryName} - ${subCategoryName}.`},
            {role: "user", content: question}
        ],
    });

    const answer = response.choices[0].message.content || 'try again';

    const newPrompt = await Prompt.create({
        userId,
        subCategoryId,
        question,
        answer
    });
    return newPrompt;
}