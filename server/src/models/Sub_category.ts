import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Category from "./Category";

export class Sub_category extends Model {

    public id!: number;
    public name!: string;
    public category_id!: number;

}

Sub_category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
},
    {
        sequelize,
        tableName: " subCategories",
    });
export default Sub_category;

