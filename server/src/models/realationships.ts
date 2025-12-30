
import User from './User';
import Prompt from './Prompt';
import Category from './Category';
import SubCategory from './SubCategory';


User.hasMany(Prompt, { foreignKey: 'userId', as: 'history' });
Prompt.belongsTo(User, { foreignKey: 'userId', as: 'user' });


Category.hasMany(SubCategory, { foreignKey: 'categoryId', as: 'subCategories' });
SubCategory.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });


Prompt.belongsTo(SubCategory, { foreignKey: 'subCategoryId' });
SubCategory.hasMany(Prompt, { foreignKey: 'subCategoryId' });

export { User, Prompt, Category, SubCategory };