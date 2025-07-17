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
    ingredients: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    brewTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caffeine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nutritionalInfo: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    preparationSteps: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Coffee",
    timestamps: true,
  }
);

// Define associations
Coffee.belongsTo(Category, {
  foreignKey: "categoryId", // The foreign key in CoffeeDessert
  as: "category", // Alias for the association
});

Category.hasMany(Coffee, {
  foreignKey: "categoryId",
  as: "desserts", // Alias for the association
});
