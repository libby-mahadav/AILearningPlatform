import { SubCategory } from '../models/SubCategory';
import { AppError } from '../utils/AppError';

export const addSubCategory = async(name: string, categoryId: number)=>{
    // שימי לב: אנחנו מחפשים לפי category_id
    const existingSub = await SubCategory.findOne({
        where: { 
            name, 
            categoryId: categoryId 
        }
    });

    if(existingSub) {
        throw new AppError("subCategory exists", 400);
    }

    // כאן הקסם: אנחנו אומרים ל-Sequelize שהערך שקיבלנו מה-Controller (categoryId)
    // צריך להיכנס לעמודה שנקראת categoryId
    return await SubCategory.create({ 
        name, 
        categoryId: categoryId 
    });
};