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
    title: "",
    description: "",
    price: "",
    categoryId: "",
    imageUrl: "",
    stock: "",
    isAvailable: true,
  });

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/menu");
      setMenuItems(data?.data || []);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/category");
      setCategories(data?.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  const handleAddMenu = async () => {
    try {
      await api.post("/menu", newMenu);
    } catch (err) {
      console.error("Error adding menu item:", err);
    } finally {
      fetchMenus();
      setShowModal(false);
      resetForm();
    }
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setNewMenu({
      title: menu.title,
      description: menu.description,
      price: menu.price,
      categoryId: menu.categoryId,
      imageUrl: menu.imageUrl,
      stock: menu.stock,
      isAvailable: menu.isAvailable,
    });
    setShowModal(true);
  };

  const handleUpdateMenu = async () => {
    try {
      await api.patch(`/menu/${editingMenu.id}`, newMenu);
    } catch (err) {
      console.error("Error updating menu item:", err);
    } finally {
      fetchMenus();
      setEditingMenu(null);
      setShowModal(false);
      resetForm();
    }
  };

  const handleDeleteMenu = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/menu/${id}`);
    } catch (err) {
      console.error("Error deleting menu item:", err);
    } finally {
      fetchMenus();
    }
  };

  const resetForm = () => {
    setNewMenu({
      title: "",
      description: "",
      price: "",
      categoryId: "",
      imageUrl: "",
      stock: "",
      isAvailable: true,
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Menu Management</h2>
            <p className="text-gray-600 mt-1">Manage your café menu offerings</p>
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
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.description}
                    </p>
                    <p className="text-amber-600 font-semibold mb-2">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm mb-2">
                      Category: {item.Category?.name || "N/A"}
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
        title={editingMenu ? "Edit Menu Item" : "Add New Menu Item"}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newMenu.title}
            onChange={(e) => setNewMenu({ ...newMenu, title: e.target.value })}
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
            type="number"
            placeholder="Stock"
            value={newMenu.stock}
            onChange={(e) => setNewMenu({ ...newMenu, stock: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newMenu.isAvailable}
              onChange={(e) =>
                setNewMenu({ ...newMenu, isAvailable: e.target.checked })
              }
            />
            <label>Available</label>
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
