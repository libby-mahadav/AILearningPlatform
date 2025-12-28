import { Sub_category } from '../models/Sub_category';
import { AppError } from '../utils/AppError';

export const addSubCategory = async(name: string, categoryId: number)=>{
    // שימי לב: אנחנו מחפשים לפי category_id
    const existingSub = await Sub_category.findOne({
        where: { 
            name, 
            category_id: categoryId 
        }
    });

    if(existingSub) {
        throw new AppError("subCategory exists", 400);
    }

    // כאן הקסם: אנחנו אומרים ל-Sequelize שהערך שקיבלנו מה-Controller (categoryId)
    // צריך להיכנס לעמודה שנקראת category_id
    return await Sub_category.create({ 
        name, 
        category_id: categoryId 
    });
};