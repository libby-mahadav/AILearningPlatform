import Sub_category from "../models/Sub_category";
import { AppError } from "../utils/AppError";

export const addSubCategory = async(name: string, categoryId: number)=>{
    const existingSub = await Sub_category.findOne({where: {name, categoryId}});
    if(existingSub) {throw new AppError("subCategory exists",400);}
    return await Sub_category.create({ name, categoryId });
};

export const getAllSubsByCategoryId = async( categoryId: number)=>{
    return await Sub_category.findAll({where:{categoryId}});
};