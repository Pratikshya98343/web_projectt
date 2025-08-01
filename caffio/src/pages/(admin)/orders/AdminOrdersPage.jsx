import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Eye, Trash2 } from "lucide-react";
import api from "../../../api/axios";
import { OrderStatus } from "../../../lib/orderStatus";

const AdminOrdersPage = () => {
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setOrders(response.data.data || []);
      } else {
        console.error("Failed to fetch orders:", response);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      if (response.status === 200) {
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error("Failed to update order status:", response);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await api.delete(`/orders/${orderId}`);
        if (response.status === 200) {
          setOrders(orders.filter((order) => order.id !== orderId));
        } else {
          console.error("Failed to delete order:", response);
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      }
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

  const handleSetColor = (status) => {
    const statusObj = OrderStatus.find((s) => s.value === status);
    return statusObj ? statusObj.color : "gray";
  };

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    if (orderFilter === "all") return orders;
    return orders.filter((order) => order.status === orderFilter);
  }, [orders, orderFilter]);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Orders Management
              </h2>
              <p className="text-gray-600 mt-1">
                Track and manage customer orders
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {[{ label: "All", value: "all" }, ...OrderStatus]?.map(
                  (status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  )
                )}
              </select>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                {orders.filter((order) => order.status === "Pending").length}{" "}
                New Orders
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
                  {isLoading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8">
                        <div className="flex justify-center items-center space-x-2">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div>
                          <span className="text-gray-600">
                            Loading orders...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-8 text-gray-500"
                      >
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders?.map((order) => {
                      const color =
                        OrderStatus.find(
                          (status) => status.value === order.status
                        )?.color || "gray";
                      return (
                        <tr
                          key={order.id}
                          className="hover:bg-amber-50 transition-colors"
                        >
                          <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-amber-900">
                            #{order.id}
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.user.firstName} {order.user.lastName}
                          </td>
                          <td className="px-8 py-4 text-sm text-gray-900">
                            {order.items
                              .map(
                                (item) =>
                                  `${item.product.name} (${item.quantity})`
                              )
                              .join(", ")}
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-amber-600">
                            ${order.totalAmount}
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleUpdateOrderStatus(
                                  order.id,
                                  e.target.value
                                )
                              }
                              className={`px-3 py-1 text-xs font-medium rounded-full border-none focus:ring-2 focus:ring-amber-500 
                             bg-${color}-100 text-${color}-800`}
                            >
                              {OrderStatus?.map((status) => (
                                <option
                                  key={status.value}
                                  value={status.value}
                                  className="bg-white"
                                >
                                  {status.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </td>
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
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
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
              <h4 className="font-semibold text-gray-800 mb-2">
                Customer Information
              </h4>
              <p>
                <strong>Name:</strong> {selectedOrder.user.firstName}{" "}
                {selectedOrder.user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.user.email}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">
                Order Details
              </h4>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleTimeString()}
              </p>
              <p>
                <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-medium rounded-full bg-${handleSetColor(
                    selectedOrder.status
                  )}-100 text-${handleSetColor(selectedOrder.status)}-800`}
                >
                  {selectedOrder.status}
                </span>
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">
                Items Ordered
              </h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-amber-600">
                    ${selectedOrder.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {selectedOrder.notes && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Special Notes
                </h4>
                <p className="text-gray-700">{selectedOrder.notes}</p>
              </div>
            )}

            <div className="flex space-x-2">
              {selectedOrder.status === "pending" && (
                <button
                  onClick={() => {
                    handleUpdateOrderStatus(selectedOrder.id, "processing");
                    setShowOrderDetailsModal(false);
                  }}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black py-2 px-4 rounded-lg transition-colors"
                >
                  Start Processing
                </button>
              )}
              {selectedOrder.status === "processing" && (
                <button
                  onClick={() => {
                    handleUpdateOrderStatus(selectedOrder.id, "completed");
                    setShowOrderDetailsModal(false);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-black py-2 px-4 rounded-lg transition-colors"
                >
                  Mark Complete
                </button>
              )}
              {selectedOrder.status !== "completed" &&
                selectedOrder.status !== "cancelled" && (
                  <button
                    onClick={() => {
                      handleUpdateOrderStatus(selectedOrder.id, "cancelled");
                      setShowOrderDetailsModal(false);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-black py-2 px-4 rounded-lg transition-colors"
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