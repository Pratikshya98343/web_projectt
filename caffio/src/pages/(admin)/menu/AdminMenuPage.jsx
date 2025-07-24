import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Modal } from "../../../components/Modal";
import api from "../../../api/axios";

const AdminMenuPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    imageUrl: "",
    imageFile: null,
    ingredients: [],
    brewTime: "",
    caffeine: "",
    temperature: "",
    rating: 4.5,
    nutritionalInfo: {
      calories: 0,
      protein: "0g",
      carbs: "0g",
      fat: "0g",
    },
    preparationSteps: [],
  });

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/category");
      setCategories(data?.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/product");
      setMenuItems(data?.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  const handleAddMenu = async () => {
    try {
      if (!newMenu.name || !newMenu.price || !newMenu.categoryId) {
        alert("Please fill in all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("name", newMenu.name);
      formData.append("description", newMenu.description);
      formData.append("price", newMenu.price);
      formData.append("categoryId", newMenu.categoryId);

      // Add the additional fields from the Product model
      formData.append("ingredients", JSON.stringify(newMenu.ingredients || []));
      formData.append("brewTime", newMenu.brewTime || "");
      formData.append("caffeine", newMenu.caffeine || "");
      formData.append("temperature", newMenu.temperature || "");
      formData.append("rating", newMenu.rating || 0);
      formData.append(
        "nutritionalInfo",
        JSON.stringify(newMenu.nutritionalInfo || {})
      );
      formData.append(
        "preparationSteps",
        JSON.stringify(newMenu.preparationSteps || [])
      );

      if (newMenu.imageFile) {
        formData.append("image", newMenu.imageFile);
      } else if (newMenu.imageUrl) {
        formData.append("image", newMenu.imageUrl);
      }

      await api.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowModal(false);
      resetForm();
      fetchMenus();
      alert("Menu item added successfully!");
    } catch (err) {
      console.error("Error adding menu item:", err);
      alert(
        `Failed to add menu item: ${err.response?.data?.error || err.message}`
      );
    }
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setNewMenu({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      categoryId: menu.categoryId,
      imageUrl: menu.image,
      imageFile: null,
      ingredients: JSON.parse(menu.ingredients) || [],
      brewTime: menu.brewTime || "",
      caffeine: menu.caffeine || "",
      temperature: menu.temperature || "",
      rating: menu.rating || 4.5,
      nutritionalInfo: JSON.parse(menu.nutritionalInfo) || {
        calories: 0,
        protein: "0g",
        carbs: "0g",
        fat: "0g",
      },
      preparationSteps: JSON.parse(menu.preparationSteps) || [],
    });
    setShowModal(true);
  };

  const handleUpdateMenu = async () => {
    try {
      if (!newMenu.name || !newMenu.price || !newMenu.categoryId) {
        alert("Please fill in all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("name", newMenu.name);
      formData.append("description", newMenu.description);
      formData.append("price", newMenu.price);
      formData.append("categoryId", newMenu.categoryId);

      // Add the additional fields from the Product model
      formData.append("ingredients", JSON.stringify(newMenu.ingredients || []));
      formData.append("brewTime", newMenu.brewTime || "");
      formData.append("caffeine", newMenu.caffeine || "");
      formData.append("temperature", newMenu.temperature || "");
      formData.append("rating", newMenu.rating || 0);
      formData.append(
        "nutritionalInfo",
        JSON.stringify(newMenu.nutritionalInfo || {})
      );
      formData.append(
        "preparationSteps",
        JSON.stringify(newMenu.preparationSteps || [])
      );

      if (newMenu.imageFile) {
        formData.append("image", newMenu.imageFile);
      } else if (
        newMenu.imageUrl &&
        !newMenu.imageUrl.includes(import.meta.env.VITE_BASE_URL)
      ) {
        formData.append("image", newMenu.imageUrl);
      }

      await api.patch(`/product/${editingMenu.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowModal(false);
      setEditingMenu(null);
      resetForm();
      fetchMenus();
      alert("Menu item updated successfully!");
    } catch (err) {
      console.error("Error updating menu item:", err);
      alert(
        `Failed to update menu item: ${
          err.response?.data?.error || err.message
        }`
      );
    }
  };

  const handleDeleteMenu = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/product/${id}`);
      fetchMenus();
      alert("Menu item deleted successfully!");
    } catch (err) {
      console.error("Error deleting menu item:", err);
      alert(
        `Failed to delete menu item: ${
          err.response?.data?.error || err.message
        }`
      );
    }
  };

  const resetForm = () => {
    setNewMenu({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      imageUrl: "",
      imageFile: null,
      stock: "",
      isAvailable: true,
      ingredients: [],
      brewTime: "",
      caffeine: "",
      temperature: "",
      rating: 4.5,
      nutritionalInfo: {
        calories: 0,
        protein: "0g",
        carbs: "0g",
        fat: "0g",
      },
      preparationSteps: [],
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Menu Management
            </h2>
            <p className="text-gray-600 mt-1">
              Manage your café menu offerings
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg transition-all"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add Menu Item</span>
          </button>
        </div>

        {!loading ? (
          menuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.description}
                    </p>
                    <p className="text-amber-600 font-semibold mb-2">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm mb-2">
                      Category: {item.category?.name || "N/A"}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handleEditMenu(item)}
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 flex items-center space-x-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(item.id)}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-100 flex items-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-lg mt-10">No menu items found</div>
          )
        ) : (
          <div className="text-center text-lg mt-10">Loading...</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingMenu(null);
          resetForm();
        }}
        name={editingMenu ? "Edit Menu Item" : "Add New Menu Item"}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="name"
            value={newMenu.name}
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={newMenu.description}
            onChange={(e) =>
              setNewMenu({ ...newMenu, description: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Price"
            value={newMenu.price}
            onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select
            value={newMenu.categoryId}
            onChange={(e) =>
              setNewMenu({ ...newMenu, categoryId: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Image URL"
              value={newMenu.imageUrl}
              onChange={(e) =>
                setNewMenu({ ...newMenu, imageUrl: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewMenu({
                  ...newMenu,
                  imageFile: e.target.files[0],
                  imageUrl: e.target.files[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : newMenu.imageUrl,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>


          {/* Additional fields from the Product model */}
          <h3 className="font-medium text-gray-700 mt-4">Additional Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Brew Time (e.g., '4-5 minutes')"
              value={newMenu.brewTime}
              onChange={(e) =>
                setNewMenu({ ...newMenu, brewTime: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="text"
              placeholder="Caffeine Level (e.g., 'High', 'Medium')"
              value={newMenu.caffeine}
              onChange={(e) =>
                setNewMenu({ ...newMenu, caffeine: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Temperature (e.g., 'Hot', 'Cold')"
              value={newMenu.temperature}
              onChange={(e) =>
                setNewMenu({ ...newMenu, temperature: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Rating (0-5)"
              value={newMenu.rating}
              onChange={(e) =>
                setNewMenu({ ...newMenu, rating: parseFloat(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <h4 className="font-medium text-gray-700">
            Ingredients (comma separated)
          </h4>
          <textarea
            placeholder="Enter ingredients separated by commas (e.g., 'Espresso, Steamed milk, Milk foam')"
            value={
              Array.isArray(newMenu.ingredients)
                ? newMenu.ingredients.join(", ")
                : ""
            }
            onChange={(e) =>
              setNewMenu({
                ...newMenu,
                ingredients: e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter((item) => item),
              })
            }
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <h4 className="font-medium text-gray-700">
            Preparation Steps (comma separated)
          </h4>
          <textarea
            placeholder="Enter preparation steps separated by commas"
            value={
              Array.isArray(newMenu.preparationSteps)
                ? newMenu.preparationSteps.join(", ")
                : ""
            }
            onChange={(e) =>
              setNewMenu({
                ...newMenu,
                preparationSteps: e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter((item) => item),
              })
            }
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <h4 className="font-medium text-gray-700">Nutritional Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Calories"
              value={newMenu.nutritionalInfo?.calories || 0}
              onChange={(e) =>
                setNewMenu({
                  ...newMenu,
                  nutritionalInfo: {
                    ...newMenu.nutritionalInfo,
                    calories: parseInt(e.target.value) || 0,
                  },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="text"
              placeholder="Protein (e.g., '8g')"
              value={newMenu.nutritionalInfo?.protein || ""}
              onChange={(e) =>
                setNewMenu({
                  ...newMenu,
                  nutritionalInfo: {
                    ...newMenu.nutritionalInfo,
                    protein: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="text"
              placeholder="Carbs (e.g., '24g')"
              value={newMenu.nutritionalInfo?.carbs || ""}
              onChange={(e) =>
                setNewMenu({
                  ...newMenu,
                  nutritionalInfo: {
                    ...newMenu.nutritionalInfo,
                    carbs: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="text"
              placeholder="Fat (e.g., '7g')"
              value={newMenu.nutritionalInfo?.fat || ""}
              onChange={(e) =>
                setNewMenu({
                  ...newMenu,
                  nutritionalInfo: {
                    ...newMenu.nutritionalInfo,
                    fat: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            onClick={editingMenu ? handleUpdateMenu : handleAddMenu}
            className="w-full bg-amber-600 hover:bg-amber-700 text-black py-2 px-4 rounded-lg transition"
          >
            {editingMenu ? "Update Menu" : "Add Menu"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminMenuPage;
