import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure categories are unique
    },
  },
  {
    sequelize,
    modelName: "Category",
    timestamps: true, // Optional: No timestamps needed for categories
  }
);
