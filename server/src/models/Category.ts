import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Category extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
}

Category.init({
    id: {
        type :DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,

    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true,
    },
}, {
    sequelize,
    tableName : "categories",
});
export default Category;