import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2,
} from 'lucide-react';

const AdminMenuPage = () => {
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Chocolate Mocha Black Coffee Premium Blend",
      price: 2.50,
      category: 'Coffee',
      image: "./image/menu5.png",
      stock: 50,
      description: "Rich, dark coffee with chocolate undertones",
      available: true
    },
    {
      id: 2,
      name: "Vanilla Latte Smooth Coffee with Premium Milk",
      price: 2.50,
      category: 'Coffee',
      image: "./image/menu3.png",
      stock: 50,
      description: "Creamy latte with a hint of vanilla",
      available: true
    },
    {
      id: 3,
      name: "Caramel Macchiato Black Coffee with Sweet Touch",
      price: 2.50,
      category: 'Coffee',
      image: "./image/menu6.png",
      stock: 50,
      description: "Sweet caramel blended with espresso and milk",
      available: true
    },
  ]);

  const [newMenu, setNewMenu] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
    available: true
  });

  const handleAddMenu = () => {
    if (newMenu.name && newMenu.description && newMenu.price) {
      const menu = {
        id: menuItems.length + 1,
        ...newMenu,
        price: parseFloat(newMenu.price),
        stock: parseInt(newMenu.stock) || 0
      };
      setMenuItems([...menuItems, menu]);
      setNewMenu({ name: '', description: '', price: '', category: '', image: '', stock: '', available: true });
      setShowAddMenuModal(false);
    }
  };

  const handleDeleteMenu = (id) => {
    setMenuItems(menuItems.filter(m => m.id !== id));
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setNewMenu(menu);
    setShowAddMenuModal(true);
  };

  const handleUpdateMenu = () => {
    setMenuItems(menuItems.map(m => 
      m.id === editingMenu.id 
        ? { ...editingMenu, ...newMenu, price: parseFloat(newMenu.price), stock: parseInt(newMenu.stock) || 0 }
        : m
    ));
    setEditingMenu(null);
    setNewMenu({ name: '', description: '', price: '', category: '', image: '', stock: '', available: true });
    setShowAddMenuModal(false);
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
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Menu Management</h2>
              <p className="text-gray-600 mt-1">Manage your menu items and availability</p>
            </div>
            <button
              onClick={() => setShowAddMenuModal(true)}
              className="bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add Menu Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2 py-10 max-w-[1400px] mx-auto">
            {menuItems.map(menu => (
              <div key={menu.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img 
                    src={menu.image || 'https://via.placeholder.com/400x200'} 
                    alt={menu.name} 
                    className="w-full h-56 object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
                    {menu.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{menu.name}</h3>
                      <p className="text-gray-600 mb-2">{menu.description}</p>
                      <span className="text-xl font-bold text-amber-600">${menu.price.toFixed(2)}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      menu.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {menu.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditMenu(menu)}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors border border-blue-200"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteMenu(menu.id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors border border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Menu Modal */}
      <Modal
        isOpen={showAddMenuModal}
        onClose={() => {
          setShowAddMenuModal(false);
          setEditingMenu(null);
          setNewMenu({ name: '', description: '', price: '', category: '', image: '', stock: '', available: true });
        }}
        title={editingMenu ? 'Edit Menu Item' : 'Add New Menu Item'}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Menu Item Name"
            value={newMenu.name}
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <textarea
            placeholder="Description"
            value={newMenu.description}
            onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            rows="3"
          />
          <input
            type="number"
            placeholder="Price"
            value={newMenu.price}
            onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Category"
            value={newMenu.category}
            onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={newMenu.image}
            onChange={(e) => setNewMenu({ ...newMenu, image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newMenu.stock}
            onChange={(e) => setNewMenu({ ...newMenu, stock: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="available"
              checked={newMenu.available}
              onChange={(e) => setNewMenu({ ...newMenu, available: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <label htmlFor="available" className="text-sm text-gray-700">Available</label>
          </div>
          <button
            onClick={editingMenu ? handleUpdateMenu : handleAddMenu}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {editingMenu ? 'Update Menu Item' : 'Add Menu Item'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminMenuPage;
