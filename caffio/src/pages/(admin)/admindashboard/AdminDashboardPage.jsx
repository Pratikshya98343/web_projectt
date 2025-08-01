import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Coffee, 
  ShoppingCart, 
  Menu as MenuIcon, 
  BarChart3, 
  Users,
  TrendingUp,
  Package,
} from 'lucide-react';
import api from '../../../api/axios';
import { useSelector } from 'react-redux';

const AdminDashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setOrders(response.data.data || []);
      } else {
        console.error('Failed to fetch orders:', response);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/product', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('fetchProducts response:', response);
      if (response.status === 200) {
        setProducts(response.data.data || []);
      } else {
        console.error('Failed to fetch products:', response);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Stat Card Component
  const StatCard = ({ title, value, change, color }) => (
    <div className={`bg-white rounded-lg shadow-md p-4 flex items-center space-x-4`}>
      <div className={`w-8 h-8 rounded-full bg-${color}-100 flex items-center justify-center`}>
        <span className={`text-${color}-600`}>$</span>
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-xs text-green-600">{change}</p>
      </div>
    </div>
  );

  // Order Item Component
  const OrderItem = ({ customerName, items, total, time }) => (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-2">
        <div className="bg-orange-100 p-1 rounded-full">
          <ShoppingCart className="h-4 w-4 text-orange-600" />
        </div>
        <div>
          <p className="font-medium text-gray-800">{customerName}</p>
          <p className="text-sm text-gray-600 truncate max-w-[150px]">{items.map((item) => item.product.name).join(", ")}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-orange-600">${total}</p>
        <p className="text-xs text-gray-500">{new Date(time).toLocaleTimeString()}</p>
      </div>
    </div>
  );

  // Product Item Component
  const ProductItem = ({ name, category, price, stock, image }) => (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-4">
        <img src={image} alt={name} className="w-12 h-12 rounded object-cover ring-1 ring-gray-200" />
        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-sm text-gray-600">{category?.name || "N/A"}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-orange-600">${price}</p>
        <p className="text-xs text-gray-500">Stock: {stock}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 p-8">
      <div className="flex-grow w-full h-full bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

        {/* Recent Orders & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <Link to="/admin/orders" className="text-sm font-medium text-orange-600 hover:text-orange-800">
                View All
              </Link>
            </div>
            <div>
              {orders.slice(0, 3).map((order) => (
                <OrderItem
                  key={order.id}
                  customerName={`${order.user.firstName} ${order.user.lastName}`}
                  items={order.items}
                  total={order.totalAmount}
                  time={order.createdAt}
                />
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Top Products</h3>
              <Link to="/admin/menu" className="text-sm font-medium text-orange-600 hover:text-orange-800">
                View All
              </Link>
            </div>
            <div>
              {products.slice(0, 3).map((product) => (
                <ProductItem
                  key={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  stock={product.stock}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;