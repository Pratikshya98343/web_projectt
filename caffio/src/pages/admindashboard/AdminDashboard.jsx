import React, { useState } from 'react';
import {
  Coffee,
  Home,
  Package,
  Menu,
  Bell,
  Search,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  ShoppingCart,
  DollarSign,
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Espresso',
      price: 2.5,
      category: 'Coffee',
      stock: 45,
      description: 'Strong and rich espresso shot.',
      image: '/api/placeholder/100/100',
    },
    {
      id: 2,
      name: 'Cappuccino',
      price: 3.75,
      category: 'Coffee',
      stock: 32,
      description: 'Smooth cappuccino foam blend.',
      image: '/api/placeholder/100/100',
    },
    {
      id: 3,
      name: 'Croissant',
      price: 2.25,
      category: 'Pastry',
      stock: 28,
      description: 'Fresh buttery croissant.',
      image: '/api/placeholder/100/100',
    },
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Morning Blend',
      price: 2.99,
      category: 'Coffee',
      description: 'Our signature morning coffee blend.',
      available: true,
      image: '/api/placeholder/100/100',
    },
    {
      id: 2,
      name: 'Latte',
      price: 4.25,
      category: 'Coffee',
      description: 'Smooth and creamy latte.',
      available: true,
      image: '/api/placeholder/100/100',
    },
    {
      id: 3,
      name: 'Blueberry Muffin',
      price: 3.5,
      category: 'Pastry',
      description: 'Fresh baked blueberry muffin.',
      available: false,
      image: '/api/placeholder/100/100',
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: '#001',
      customer: 'Alice Johnson',
      items: '2 Lattes, 1 Croissant',
      total: '$11.25',
      status: 'Completed',
    },
    {
      id: '#002',
      customer: 'Bob Smith',
      items: '1 Espresso, 1 Muffin',
      total: '$6.00',
      status: 'Pending',
    },
    {
      id: '#003',
      customer: 'Carol Davis',
      items: '3 Cappuccinos',
      total: '$11.25',
      status: 'Completed',
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Coffee',
    stock: '',
    description: '',
    image: null,
  });

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    category: 'Coffee',
    description: '',
    available: true,
    image: null,
  });

  const [editingProductId, setEditingProductId] = useState(null);
  const [editingMenuItemId, setEditingMenuItemId] = useState(null);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'menu', label: 'Menu Items', icon: Menu },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    {id: 'logout', label: 'Logout', icon: LogOut}
  ];

  // Add new product
  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...newProduct,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          image: newProduct.image ? URL.createObjectURL(newProduct.image) : '/api/placeholder/100/100',
        },
      ]);
      resetProductForm();
    }
  };

  const resetProductForm = () => {
    setNewProduct({
      name: '',
      price: '',
      category: 'Coffee',
      stock: '',
      description: '',
      image: null,
    });
  };

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const startEditProduct = (product) => {
    setEditingProductId(product.id);
    setNewProduct({ ...product, image: null }); // Reset image input
  };

  const saveEditedProduct = () => {
    setProducts(
      products.map((p) =>
        p.id === editingProductId
          ? {
              ...newProduct,
              price: parseFloat(newProduct.price),
              stock: parseInt(newProduct.stock),
              image: newProduct.image ? URL.createObjectURL(newProduct.image) : p.image,
            }
          : p
      )
    );
    setEditingProductId(null);
    resetProductForm();
  };

  const toggleMenuAvailability = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const addMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price && newMenuItem.description) {
      setMenuItems([
        ...menuItems,
        {
          id: Date.now(),
          ...newMenuItem,
          price: parseFloat(newMenuItem.price),
          image: newMenuItem.image
            ? URL.createObjectURL(newMenuItem.image)
            : '/api/placeholder/100/100',
        },
      ]);
      resetMenuForm();
    }
  };

  const resetMenuForm = () => {
    setNewMenuItem({
      name: '',
      price: '',
      category: 'Coffee',
      description: '',
      available: true,
      image: null,
    });
  };

  const startEditMenuItem = (item) => {
    setEditingMenuItemId(item.id);
    setNewMenuItem({ ...item, image: null });
  };

  const saveEditedMenuItem = () => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === editingMenuItemId
          ? {
              ...newMenuItem,
              price: parseFloat(newMenuItem.price),
              image: newMenuItem.image
                ? URL.createObjectURL(newMenuItem.image)
                : item.image,
            }
          : item
      )
    );
    setEditingMenuItemId(null);
    resetMenuForm();
  };

  const DashboardContent = () => (
    <div className="space-y-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">$12,450</p>
            </div>
            <DollarSign className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Orders Today</p>
              <p className="text-2xl font-bold text-gray-800">156</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsContent = () => (
    <div className="space-y-6">
      {/* Add Product Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {editingProductId ? 'Edit Product' : 'Add New Product'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Coffee">Coffee</option>
              <option value="Pastry">Pastry</option>
              <option value="Snack">Snack</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={editingProductId ? saveEditedProduct : addProduct}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {editingProductId ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Current Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded mb-2" />
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">{product.name}</h4>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-1">Price: ${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mb-1">Stock: {product.stock}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => startEditProduct(product)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MenuContent = () => (
    <div className="space-y-6">
      {/* Add Menu Item Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {editingMenuItemId ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
            <input
              type="text"
              value={newMenuItem.name}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={newMenuItem.price}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={newMenuItem.category}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Coffee">Coffee</option>
              <option value="Pastry">Pastry</option>
              <option value="Snack">Snack</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available</label>
            <select
              value={newMenuItem.available}
              onChange={(e) =>
                setNewMenuItem({ ...newMenuItem, available: e.target.value === 'true' })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={newMenuItem.description}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewMenuItem({ ...newMenuItem, image: e.target.files[0] })
              }
              className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={editingMenuItemId ? saveEditedMenuItem : addMenuItem}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {editingMenuItemId ? 'Save Changes' : 'Add Menu Item'}
          </button>
        </div>
      </div>

      {/* Menu Items List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Current Menu Items</h3>
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded mb-2" />
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <span className="text-lg font-semibold text-amber-600">${item.price.toFixed(2)}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleMenuAvailability(item.id)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      item.available
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {item.available ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => startEditMenuItem(item)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setMenuItems(menuItems.filter((m) => m.id !== item.id));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const OrdersContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Items</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-800">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{order.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.items}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{order.total}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'products':
        return <ProductsContent />;
      case 'menu':
        return <MenuContent />;
      case 'orders':
        return <OrdersContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
     <div className="w-screen h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-25 px-2">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Coffee className="w-8 h-8 text-amber-600" />
              <h1 className="text-2xl font-bold text-gray-800">Caffio Admin</h1>
            </div>
          </div>

        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
       <aside className="w-64 bg-white shadow-sm h-170">
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-amber-100 text-amber-700 border-r-2 border-amber-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>

                    
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;