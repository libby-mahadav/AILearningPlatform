import Category from "../models/Category";
import SubCategory from "../models/SubCategory";
import { AppError } from "../utils/AppError";

export const createCategory = async(name:string) =>{
   const existingCategory = await Category.findOne({ where: { name } });
   if (existingCategory) {
       throw new AppError("Category already exists", 400);
   }
   return await Category.create({ name });
}

export const getAllCategories = async() =>{
    return await Category.findAll({ include: [{ model: SubCategory, as: 'subCategories' }] });
}


// export const deleteCategory = async(name:string) =>{
//     const category = await Category.findOne({ where: { name } });
//     if (!category) {
//         throw new AppError("Category not found", 404);
//     }
//     await category.destroy();
//     return true;
// }

