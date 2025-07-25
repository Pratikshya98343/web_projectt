import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../redux/reducerSlice/CartSlice";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePlaceOrder = async () => {
    if (!shippingAddress.trim() || !paymentMethod.trim()) {
      setError("Please provide both shipping address and payment method.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod,
      };
      const response = await api.post("/orders", orderData);
      if (response.status === 201) {
        dispatch(clearCart());
        navigate("/order-success");
      } else {
        setError("Failed to place order. Please try again.");
      }
    } catch (err) {
      setError("Error placing order: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen p-6 py-32">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="mb-4">
        <label htmlFor="shippingAddress" className="block font-semibold mb-1">
          Shipping Address
        </label>
        <textarea
          id="shippingAddress"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          rows={3}
          placeholder="Enter your shipping address"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="paymentMethod" className="block font-semibold mb-1">
          Payment Method
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">Select a payment method</option>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash_on_delivery">Cash on Delivery</option>
        </select>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading || cartItems.length === 0}
        className="bg-green-600 text-black px-6 py-3 rounded disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
