import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="w-screen h-screen mx-auto p-6 text-center py-50">
      <h1 className="text-4xl font-bold mb-6 text-green-600">Order Placed Successfully!</h1>
      <p className="mb-6">Thank you for your purchase. Your order has been received and is being processed.</p>
      <Link to="/menu" className="text-white bg-green-600 px-6 py-3 rounded hover:bg-green-700 transition">
        Continue Shopping
      </Link>
    </div>
  );
}
