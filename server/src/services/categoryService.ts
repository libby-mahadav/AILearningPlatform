import Category from "../models/Category";

export const createCategory = async(name:string) =>{
   //const existingCategory = Category.findOne()
}

export const getAllCategories = async() =>{
    return Category.findAll();
}


export const deleteCategory = async(name:string) =>{
  
}
