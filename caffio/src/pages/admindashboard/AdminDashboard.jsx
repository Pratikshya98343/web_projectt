import React, { useState } from 'react';
import { 
  Coffee, 
  ShoppingCart, 
  Menu, 
  BarChart3, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign,
  Users,
  TrendingUp,
  Package,
  Eye,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingMenu, setEditingMenu] = useState(null);

  // Sample data - in a real app, this would come from an API
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Espresso',
      price: 2.50,
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=200&h=200&fit=crop',
      stock: 50
    },
    {
      id: 2,
      name: 'Cappuccino',
      price: 3.50,
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop',
      stock: 45
    },
    {
      id: 3,
      name: 'Croissant',
      price: 2.00,
      category: 'Pastry',
      image: 'https://images.unsplash.com/photo-1555507036-ae8c22d84d8c?w=200&h=200&fit=crop',
      stock: 20
    }
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Morning Special',
      description: 'Coffee + Pastry combo',
      price: 4.50,
      available: true
    },
    {
      id: 2,
      name: 'Afternoon Delight',
      description: 'Latte + Sandwich',
      price: 6.00,
      available: true
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+1234567890',
      items: [
        { name: 'Espresso', quantity: 1, price: 2.50 },
        { name: 'Croissant', quantity: 1, price: 2.00 }
      ],
      total: 4.50,
      status: 'Completed',
      time: '10:30 AM',
      date: '2025-07-14',
      paymentMethod: 'Card',
      notes: 'Extra hot please'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      customerPhone: '+1234567891',
      items: [
        { name: 'Cappuccino', quantity: 1, price: 3.50 },
        { name: 'Morning Special', quantity: 1, price: 4.50 }
      ],
      total: 8.00,
      status: 'Pending',
      time: '11:15 AM',
      date: '2025-07-14',
      paymentMethod: 'Cash',
      notes: 'Regular milk'
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      customerPhone: '+1234567892',
      items: [
        { name: 'Latte', quantity: 1, price: 3.00 },
        { name: 'Sandwich', quantity: 1, price: 2.50 }
      ],
      total: 5.50,
      status: 'In Progress',
      time: '11:45 AM',
      date: '2025-07-14',
      paymentMethod: 'Card',
      notes: 'No onions'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    stock: ''
  });

  const [newMenu, setNewMenu] = useState({
    name: '',
    description: '',
    price: '',
    available: true
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const product = {
        id: products.length + 1,
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock) || 0
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', price: '', category: '', image: '', stock: '' });
      setShowAddProductModal(false);
    }
  };

  const handleAddMenu = () => {
    if (newMenu.name && newMenu.description && newMenu.price) {
      const menu = {
        id: menuItems.length + 1,
        ...newMenu,
        price: parseFloat(newMenu.price)
      };
      setMenuItems([...menuItems, menu]);
      setNewMenu({ name: '', description: '', price: '', available: true });
      setShowAddMenuModal(false);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleDeleteMenu = (id) => {
    setMenuItems(menuItems.filter(m => m.id !== id));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowAddProductModal(true);
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setNewMenu(menu);
    setShowAddMenuModal(true);
  };

  const handleUpdateProduct = () => {
    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { ...editingProduct, ...newProduct, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock) }
        : p
    ));
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', category: '', image: '', stock: '' });
    setShowAddProductModal(false);
  };

  const handleUpdateMenu = () => {
    setMenuItems(menuItems.map(m => 
      m.id === editingMenu.id 
        ? { ...editingMenu, ...newMenu, price: parseFloat(newMenu.price) }
        : m
    ));
    setEditingMenu(null);
    setNewMenu({ name: '', description: '', price: '', available: true });
    setShowAddMenuModal(false);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const Sidebar = () => (
    <div className="m-0 box-border font-sans bg-gradient-to-b from-amber-900 to-amber-800 text-black min-h-screen p-5">
      <div className="max-w-6xl mx-auto px-1 py-30">
        <div className="flex items-center space-x-2 mb-8">
          <Coffee className="h-8 w-8 text-amber-200" />
          <h1 className="text-2xl font-bold">Caffio Admin</h1>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'bg-amber-700' : 'hover:bg-amber-700'
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'products' ? 'bg-amber-700' : 'hover:bg-amber-700'
            }`}
          >
            <Package className="h-5 w-5" />
            <span>Products</span>
          </button>
          
          <button
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'menu' ? 'bg-amber-700' : 'hover:bg-amber-700'
            }`}
          >
            <Menu className="h-5 w-5" />
            <span>Menu</span>
          </button>
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'orders' ? 'bg-amber-700' : 'hover:bg-amber-700'
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Orders</span>
          </button>
          
          <button
            onClick={() => alert('Logging out...')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-black-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );

const DashboardContent = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-20 py-30">
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500 h-50 w-50">
        <div className="flex items-center">
          <DollarSign className="text-amber-600" />
          <div className="ml-2">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-800">$2,847</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
        <div className="flex items-center">
          <ShoppingCart className="h-30 w-90 text-green-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Customers</p>
            <p className="text-2xl font-bold text-gray-800">156</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-purple-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Growth</p>
            <p className="text-2xl font-bold text-gray-800">+12%</p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {orders.slice(0, 3).map(order => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.items.map(item => item.name).join(', ')}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-600">${order.total}</p>
                <p className="text-xs text-gray-500">{order.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Top Products</h3>
        <div className="space-y-3">
          {products.slice(0, 3).map(product => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="ml-3">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-600">${product.price}</p>
                <p className="text-xs text-gray-500">Stock: {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);


  const ProductsContent = () => (
    <div className="space-y-10 px-40 py-50">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold text-gray-800">Products Management</h2>
        <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-amber-600 hover:bg-amber-700 text-black px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-1 py-10">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-amber-600">${product.price}</span>
                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-black py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-black py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
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
  );

  const MenuContent = () => (
    <div className="space-y-6 px-70 py-40">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
        <button
          onClick={() => setShowAddMenuModal(true)}
          className="bg-amber-600 hover:bg-amber-700 text-black px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Menu</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-1 py-10">
        {menuItems.map(menu => (
          <div key={menu.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{menu.name}</h3>
                <p className="text-gray-600 mb-2">{menu.description}</p>
                <span className="text-xl font-bold text-amber-600">${menu.price}</span>
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-black py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDeleteMenu(menu.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-black py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const OrdersContent = () => (
    <div className="space-y-6 px-50 py-40">
      <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-10 w-full">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600">${order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className={`px-3 py-1 text-xs font-medium rounded-full border-none focus:ring-2 focus:ring-amber-500 ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewOrderDetails(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-black p-2 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'In Progress')}
                          className="bg-yellow-600 hover:bg-yellow-700 text-black p-2 rounded-lg transition-colors"
                          title="Start Processing"
                        >
                          <Clock className="h-4 w-4" />
                        </button>
                      )}
                      {order.status === 'In Progress' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Completed')}
                          className="bg-green-600 hover:bg-green-700 text-black p-2 rounded-lg transition-colors"
                          title="Mark Complete"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      {order.status !== 'Completed' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Cancelled')}
                          className="bg-red-600 hover:bg-red-700 text-black p-2 rounded-lg transition-colors"
                          title="Cancel Order"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="bg-gray-600 hover:bg-gray-700 text-black p-2 rounded-lg transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

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
    <div className="flex h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'products' && <ProductsContent />}
          {activeTab === 'menu' && <MenuContent />}
          {activeTab === 'orders' && <OrdersContent />}
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddProductModal}
        onClose={() => {
          setShowAddProductModal(false);
          setEditingProduct(null);
          setNewProduct({ name: '', price: '', category: '', image: '', stock: '' });
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <button
            onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </Modal>

      {/* Add Menu Modal */}
      <Modal
        isOpen={showAddMenuModal}
        onClose={() => {
          setShowAddMenuModal(false);
          setEditingMenu(null);
          setNewMenu({ name: '', description: '', price: '', available: true });
        }}
        title={editingMenu ? 'Edit Menu' : 'Add New Menu'}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Menu Name"
            value={newMenu.name}
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
            className="w-full px-10 py-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
            {editingMenu ? 'Update Menu' : 'Add Menu'}
          </button>
        </div>
      </Modal>

      {/* Order Details Modal */}
      <Modal
        isOpen={showOrderDetailsModal}
        onClose={() => {
          setShowOrderDetailsModal(false);
          setSelectedOrder(null);
        }}
        title={`Order Details - #${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Customer Information</h4>
              <p><strong>Name:</strong> {selectedOrder.customerName}</p>
              <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
              <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Order Details</h4>
              <p><strong>Date:</strong> {selectedOrder.date}</p>
              <p><strong>Time:</strong> {selectedOrder.time}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  selectedOrder.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  selectedOrder.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedOrder.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedOrder.status}
                </span>
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Items Ordered</h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-amber-600">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {selectedOrder.notes && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Special Notes</h4>
                <p className="text-gray-700">{selectedOrder.notes}</p>
              </div>
            )}

            <div className="flex space-x-2">
              {selectedOrder.status === 'Pending' && (
                <button
                  onClick={() => {
                    handleUpdateOrderStatus(selectedOrder.id, 'In Progress');
                    setShowOrderDetailsModal(false);
                  }}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Start Processing
                </button>
              )}
              {selectedOrder.status === 'In Progress' && (
                <button
                  onClick={() => {
                    handleUpdateOrderStatus(selectedOrder.id, 'Completed');
                    setShowOrderDetailsModal(false);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Mark Complete
                </button>
              )}
              {selectedOrder.status !== 'Completed' && selectedOrder.status !== 'Cancelled' && (
                <button
                  onClick={() => {
                    handleUpdateOrderStatus(selectedOrder.id, 'Cancelled');
                    setShowOrderDetailsModal(false);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;