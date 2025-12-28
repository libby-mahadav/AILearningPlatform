import axios from 'axios';
import Prompt from '../models/Prompt';

export const createNewPrompt = async (userId: number, subCategoryId: number, categoryName: string, subCategoryName: string, question: string) => {
    
    // נשתמש בתשובת Mock כדי לעקוף את בעיית גוגל כרגע
    const mockAnswer = "זוהי תשובה זמנית לצורך בדיקת בסיס הנתונים.";

    // כאן התיקון הקריטי - התאמה לשמות השדות בשגיאה:
    const newPrompt = await Prompt.create({
        userId: userId,           // שיניתי מ-user_id ל-userId
        subCategoryId: subCategoryId, // שיניתי מ-sub_category_id ל-subCategoryId
        categoryId: 1,            // הוספתי כי ה-DB דורש categoryId (כרגע שמתי 1 כברירת מחדל)
        prompt: question,         // שיניתי מ-question ל-prompt
        answer: mockAnswer
    });

    return newPrompt;
};
// אם הAPI יעבוד אז להחזיר את הקוד הזה
// import OpenAI from 'openai';
// import Prompt from '../models/Prompt';

// console.log("THE KEY IS:", process.env.OPENAI_API_KEY);
// const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});

// export const createNewPrompt = async( userId: number, subCategoryId: number, categoryName: string, subCategoryName: string, question: string)=>{
//     const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//             {role: "system", content:`You are a teacher specialized in ${categoryName} - ${subCategoryName}.`},
//             {role: "user", content: question}
//         ],
//     });

//     const answer = response.choices[0].message.content || 'try again';

//     const newPrompt = await Prompt.create({
//         userId,
//         subCategoryId,
//         question,
//         answer
//     });
//     return newPrompt;
// }

// שליפת כל הפרומפטים של משתמש מסוים, כולל מידע על הקטגוריה
export const getUserPrompts = async (userId: number) => {
    return await Prompt.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']] // החדשים ביותר למעלה
    });
};