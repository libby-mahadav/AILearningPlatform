import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Category from "./Category";

export class SubCategory extends Model {

    public id!: number;
    public name!: string;
    public categoryId!: number;

}

SubCategory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'uniqueSubForEachCategory',
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'uniqueSubForEachCategory',
        references: {
            model: Category,
            key: 'id',
        }, 
    },
},
    {
        sequelize,
        tableName: "subCategories",
    });
export default SubCategory;

