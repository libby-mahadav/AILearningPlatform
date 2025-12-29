import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User";
import Category from "./Category";
import SubCategory from "./SubCategory";


export class Prompt extends Model {
    public id!: number;
    public userId!: string;
    public categoryId!: number;
    public subCategoryId!: number;
    public prompt!: string;
    public response!: string;
}
Prompt.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
    subCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SubCategory,
            key: 'id',
        },
    },
    prompt: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: "prompts",
    timestamps: true,
});

export default Prompt;