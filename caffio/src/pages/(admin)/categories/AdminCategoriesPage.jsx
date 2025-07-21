import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2,
  Tag
} from 'lucide-react';

const AdminCategoriesPage = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  // Sample data for categories
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Coffee',
      description: 'Various coffee products',
      productsCount: 12,
      image: './image/category1.png',
      color: '#7C4A35'
    },
    {
      id: 2,
      name: 'Pastry',
      description: 'Fresh baked goods',
      productsCount: 8,
      image: './image/category2.png',
      color: '#D4A373'
    },
    {
      id: 3,
      name: 'Tea',
      description: 'Variety of teas',
      productsCount: 6,
      image: './image/category3.png',
      color: '#588157'
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: '',
    color: '#000000'
  });

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      const category = {
        id: categories.length + 1,
        ...newCategory,
        productsCount: 0
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', description: '', image: '', color: '#000000' });
      setShowAddCategoryModal(false);
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category);
    setShowAddCategoryModal(true);
  };

  const handleUpdateCategory = () => {
    setCategories(categories.map(c => 
      c.id === editingCategory.id 
        ? { ...editingCategory, ...newCategory }
        : c
    ));
    setEditingCategory(null);
    setNewCategory({ name: '', description: '', image: '', color: '#000000' });
    setShowAddCategoryModal(false);
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-10">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Categories Management</h2>
              <p className="text-gray-600 mt-1">Organize your products into categories</p>
            </div>
            <button
              onClick={() => setShowAddCategoryModal(true)}
              className="bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-12">
            {categories.map(category => (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative">
                  <div 
                    className="w-full h-32 flex items-center justify-center" 
                    style={{ backgroundColor: category.color }}
                  >
                    {category.image ? (
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="h-20 object-contain" 
                      />
                    ) : (
                      <Tag className="h-16 w-16 text-white opacity-60" />
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
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
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      <Modal
        isOpen={showAddCategoryModal}
        onClose={() => {
          setShowAddCategoryModal(false);
          setEditingCategory(null);
          setNewCategory({ name: '', description: '', image: '', color: '#000000' });
        }}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <textarea
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            rows="3"
          />
          <input
            type="url"
            placeholder="Image URL (optional)"
            value={newCategory.image}
            onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <div className="flex space-x-2 items-center">
            <label className="text-sm text-gray-700">Color:</label>
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
              className="h-8 w-8 border-0 p-0 rounded"
            />
          </div>
          <button
            onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminCategoriesPage;
