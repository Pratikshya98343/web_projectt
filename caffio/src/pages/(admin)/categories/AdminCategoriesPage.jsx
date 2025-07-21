import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Tag } from "lucide-react";
import { Modal } from "../../../components/Modal";
import api from "../../../api/axios";

const AdminCategoriesPage = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sample data for categories
  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleAddCategory = async () => {
    try {
      await api.post("/category", newCategory);
    } catch (err) {
      console.error("Error adding category:", err);
    } finally {
      fetchCategories();
      setShowAddCategoryModal(false);
      setNewCategory({
        name: "",
        description: "",
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const deleteCategory = confirm(
        "Are you sure you want to delete this category?"
      );
      if (!deleteCategory) return;
      await api.delete(`/category/${id}`);
    } catch (err) {
      console.error("Error deleting category:", err);
    } finally {
      fetchCategories();
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category);
    setShowAddCategoryModal(true);
  };

  const handleUpdateCategory = async () => {
    try {
      await api.patch(`/category/${editingCategory.id}`, newCategory);
    } catch (err) {
      console.error("Error updating category:", err);
    } finally {
      fetchCategories();
      setEditingCategory(null);
      setShowAddCategoryModal(false);
      setNewCategory({
        name: "",
        description: "",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, status } = await api.get("/category");
      if (status === 200) {
        setCategories(data?.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-10">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Categories Management
              </h2>
              <p className="text-gray-600 mt-1">
                Organize your products into categories
              </p>
            </div>
            <button
              onClick={() => setShowAddCategoryModal(true)}
              className="bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add Category</span>
            </button>
          </div>

          {!loading ? (
            categories?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-12">
                {categories?.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative">
                      <div
                        className="w-full h-32 flex items-center justify-center"
                        // style={{ backgroundColor: category.color }}
                      >
                        <img
                          src="/image/about.png"
                          className="h-44 object-cover w-full"
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-gray-500">
                          {category.productsCount} Products
                        </span>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors border border-blue-200"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="font-medium">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors border border-red-200"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="font-medium">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full text-center text-lg">
                No categories found
              </div>
            )
          ) : (
            <div className="w-full text-center text-lg">Loading...</div>
          )}
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      <Modal
        isOpen={showAddCategoryModal}
        onClose={() => {
          setShowAddCategoryModal(false);
          setEditingCategory(null);
          setNewCategory({
            name: "",
            description: "",
          });
        }}
        title={editingCategory ? "Edit Category" : "Add New Category"}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <textarea
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            rows="3"
          />

          <button
            onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
            className="w-full bg-amber-600 hover:bg-amber-700 text-black py-2 px-4 rounded-lg transition-colors"
          >
            {editingCategory ? "Update Category" : "Add Category"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminCategoriesPage;
