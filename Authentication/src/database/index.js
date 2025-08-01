
import { sequelize } from '../config/database.js';
import '../models/associations.js';

export const db = async () => {
  try {
    await sequelize.sync({ alter: true });

    await sequelize.query('UPDATE "Users" SET "firstName" = \'Unknown\' WHERE "firstName" IS NULL;');
    await sequelize.query('UPDATE "Users" SET "lastName" = \'Unknown\' WHERE "lastName" IS NULL;');

    console.log("database connected successfully");
  } catch (e) {
    console.error("Failed to connect database ", e)
  }
}
