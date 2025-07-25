import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import { Category } from "../category/Category.js";

export const Coffee = sequelize.define(
  "Coffee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories", // The table name in the database
        key: "id",
      },
      allowNull: false, // Every coffee dessert needs a category
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Coffee",
    timestamps: true,
  }
);
