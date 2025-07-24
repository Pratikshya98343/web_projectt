import express from "express";
import { menuController } from "../../controller/menu/menuController.js";

const menuRouter = express.Router();

// Create a new menu item
menuRouter.post("/", menuController.addMenu);

// Get all menu items
menuRouter.get("/", menuController.getAllMenus);

// Get a menu item by ID
menuRouter.get("/:id", menuController.getMenuById);

// Update a menu item
menuRouter.patch("/:id", menuController.updateMenu);

// Delete a menu item
menuRouter.delete("/:id", menuController.deleteMenu);

export { menuRouter }; 