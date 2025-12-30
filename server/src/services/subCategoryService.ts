import SubCategory from '../models/SubCategory';
import { AppError } from '../utils/AppError';

export const addSubCategory = async (name: string, categoryId: number) => {
    const existingSub = await SubCategory.findOne({
        where: {
            name,
            categoryId: categoryId
        }
    });

    if (existingSub) {
        throw new AppError("subCategory exists", 400);
    }
    return await SubCategory.create({
        name,
        categoryId: categoryId
    });
};

export const getSubsByCategoryId = async (categoryId: number) => {
    const subs = await SubCategory.findAll({ where: { categoryId: categoryId } });
    if(subs) return subs;
    throw new AppError("category not found", 404);

}
