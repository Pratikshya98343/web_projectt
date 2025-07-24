import { Menu } from "../../models/menu/Menu.js";

/**
 * Create a new menu item
 */
const addMenu = async (req, res) => {
  try {
    const { title, description, price ,imageUrl, stock, isAvailable } = req.body;

    // Validate input
    if (!title || !description || price === undefined || stock === undefined || isAvailable === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMenu = await Menu.create({
      title,
      description,
      price,
      imageUrl,
      stock,
      isAvailable,
    });

    res.status(201).json({
      data: newMenu,
      message: "Menu item created successfully",
    });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ error: "Failed to add menu item" });
  }
};

/**
 * Get all menu items
 */
const getAllMenus = async (req, res) => {
  try {
    // Make sure Category is imported and defined when used here
    const menus = await Menu.findAll();

    if (!menus || menus.length === 0) {
      // Consider if 404 is appropriate if no items are found.
      // Often, an empty array is returned with 200 OK.
      // If no items *should* exist, 404 is fine. If it's normal to have zero, 200 with empty array is better.
      return res.status(200).json({ data: [], message: "No menu items found" }); // Changed to 200 OK with empty array
    }

    res.status(200).json({
      data: menus,
      message: "Menu items fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ error: "Failed to fetch menu items" }); // Add error.message for dev: error: "Failed to fetch menu items", details: error.message
  }
};

/**
 * Get a menu item by ID
 */
const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id, { include: Category });

    if (!menu) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json({
      data: menu,
      message: "Menu item fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
};

/**
 * Update a menu item
 */
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, categoryId, imageUrl, stock, isAvailable } = req.body;

    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    // Validate category if provided
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      menu.categoryId = categoryId;
    }

    // Update fields
    if (title) menu.title = title;
    if (description) menu.description = description;
    if (price !== undefined) menu.price = price;
    if (imageUrl) menu.imageUrl = imageUrl;
    if (stock !== undefined) menu.stock = stock;
    if (isAvailable !== undefined) menu.isAvailable = isAvailable;

    await menu.save();

    res.status(200).json({
      data: menu,
      message: "Menu item updated successfully",
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Failed to update menu item" });
  }
};

/**
 * Delete a menu item
 */
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);

    if (!menu) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    await menu.destroy();
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};

// Export the controller object
export const menuController = {
  addMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
};