// src/pages/CartPage.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "../../../redux/reducerSlice/CartSlice";
import { Link, useNavigate } from "react-router-dom";

// Import both data sources
import { menuItems } from "../../(user)/menu/Menu";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Combine all available items into one lookup list
  const allAvailableItems = [...menuItems];

  // Enrich cart items with full details from either products or menuItems
  const cartWithDetails = cartItems
    .map((cartItem) => {
      const product = allAvailableItems.find((item) => item.id === cartItem.id);
      if (!product) {
        console.warn(`Product not found for ID: ${cartItem.id}`);
        return null;
      }
      return {
        ...cartItem,
        ...product,
      };
    })
    .filter(Boolean);

  const totalAmount = cartWithDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (itemId, change) => {
    dispatch(updateCartItemQuantity({ itemId, change }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleContinueShopping = () => {
    navigate("/Product");
    navigate("/Menu");
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#8B4513]">🛒 Your Cart</h1>
          <button
            onClick={handleContinueShopping}
            className="bg-[#8B4513] text-black px-6 py-2 rounded-full font-semibold hover:bg-[#A0522D] transition"
          >
            Continue Shopping
          </button>
        </div>

        {cartWithDetails.length === 0 ? (
          <div className="text-center mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl text-gray-600 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Add some delicious coffee to your cart and enjoy our premium
                blends!
              </p>

              <Link
                to="/Menu"
                className="inline-block bg-[#8B4513] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#A0522D] transition"
              >
                Browse Menu
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartWithDetails.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="md:w-48 h-48 bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=Coffee+Item";
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-[#8B4513] text-white px-2 py-1 rounded-full text-xs font-semibold">
                              {item.roastLevel || item.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 text-yellow-400"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006..."
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-sm font-semibold">
                                {item.rating}
                              </span>
                            </div>
                          </div>
                          <h2 className="text-xl font-bold text-[#8B4513] mb-2">
                            {item.name}
                          </h2>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-lg font-bold text-[#8B4513]">
                              NPR {item.price.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500">
                              × {item.quantity}
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              NPR {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition text-[#8B4513] font-bold"
                              >
                                −
                              </button>
                              <span className="text-lg font-semibold min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition text-[#8B4513] font-bold"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-black rounded-full font-semibold hover:bg-red-600 transition"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  {cartWithDetails.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-800 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          NPR {item.price} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-[#8B4513]">
                        NPR {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">
                      NPR {totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span className="font-semibold">NPR 50.00</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold text-[#8B4513] border-t pt-2">
                    <span>Total:</span>
                    <span>NPR {(totalAmount + 50).toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-3 rounded-full font-semibold hover:from-[#A0522D] hover:to-[#CD853F] transition transform hover:scale-105"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={handleClearCart}
                    className="w-full bg-red-500 text-black py-3 rounded-full font-semibold hover:bg-red-600 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
