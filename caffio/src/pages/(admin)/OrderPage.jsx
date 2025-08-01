import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get("/order/all");
        setOrders(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch orders: " + err.message);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Order Page</h1>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Order Number</th>
              <th className="border border-gray-300 p-2">User ID</th>
              <th className="border border-gray-300 p-2">Total Amount</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border border-gray-300 p-2">{order.orderNumber}</td>
                <td className="border border-gray-300 p-2">{order.userId}</td>
                <td className="border border-gray-300 p-2">$ {order.totalAmount.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">{order.status}</td>
                <td className="border border-gray-300 p-2">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}