import React, { useState } from 'react';
import { 
  Eye, 
  Trash2,
} from 'lucide-react';

const AdminOrdersPage = () => {
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState('all');

  // Sample data for orders
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
              <h2 className="text-3xl font-bold text-gray-800">Orders Management</h2>
              <p className="text-gray-600 mt-1">Track and manage customer orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All Orders</option>
                <option value="new">New Orders</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                {orders.filter(order => order.status === 'Pending').length} New Orders
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 w-full max-w-[1400px] mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-100">
                  {orders
                    .filter(order => {
                      switch(orderFilter) {
                        case 'new': return order.status === 'Pending';
                        case 'in-progress': return order.status === 'In Progress';
                        case 'completed': return order.status === 'Completed';
                        case 'cancelled': return order.status === 'Cancelled';
                        default: return true;
                      }
                    })
                    .map(order => (
                      <tr key={order.id} className="hover:bg-amber-50 transition-colors">
                        <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-amber-900">
                          #{order.id}
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                        <td className="px-8 py-4 text-sm text-gray-900">
                          {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-amber-600">${order.total}</td>
                        <td className="px-8 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className={`px-3 py-1 text-xs font-medium rounded-full border-none focus:ring-2 focus:ring-amber-500 ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                              order.status === 'In Progress' ? 'bg-amber-200 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewOrderDetails(order)}
                              className="bg-amber-100 hover:bg-amber-200 text-black p-2 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="bg-amber-700 hover:bg-amber-800 text-black p-2 rounded-lg transition-colors"
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
            {orders.filter(order => {
              switch(orderFilter) {
                case 'new': return order.status === 'Pending';
                case 'in-progress': return order.status === 'In Progress';
                case 'completed': return order.status === 'Completed';
                case 'cancelled': return order.status === 'Cancelled';
                default: return true;
              }
            }).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No orders found for the selected filter
              </div>
            )}
          </div>
        </div>
      </div>

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

export default AdminOrdersPage;
