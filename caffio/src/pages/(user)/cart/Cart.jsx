import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "../../../redux/reducerSlice/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { menuItems } from "../../(user)/menu/Menu"; // Import your menu data

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const cartWithDetails = cartItems.map((cartItem) => {
    const product = menuItems.find((item) => item.id === cartItem.id);
    if (!product) {
      console.warn(`Product not found for cart item ID: ${cartItem.id}`);
      return null;
    }
    return {
      ...cartItem,
      ...product,
    };
  }).filter(Boolean); // Remove null values

  console.log("Cart with details:", cartWithDetails);

  const totalAmount = cartWithDetails.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleQuantityChange = (itemId, change) => {
    const currentItem = cartItems.find(item => item.id === itemId);
    const newQuantity = (currentItem?.quantity || 1) + change;
    
    if (newQuantity <= 0) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(updateCartItemQuantity({ itemId, change }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleContinueShopping = () => {
    navigate("/menu");
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-50 px-4">
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
              <h2 className="text-2xl text-gray-600 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">
                Add some delicious coffee to your cart and enjoy our premium blends!
              </p>
              <Link
                to="/menu"
                className="inline-block bg-[#8B4513] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#A0522D] transition"
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
                          e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                        }}
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-[#8B4513] text-white px-2 py-1 rounded-full text-xs font-semibold">
                              {item.category}
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
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.755 2.855c-.996.599-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-sm font-semibold">{item.rating}</span>
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
                              NPR {item.price}
                            </span>
                            <span className="text-sm text-gray-500">
                              × {item.quantity || 1}
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              NPR {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                            </span>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition text-[#8B4513] font-bold"
                              >
                                −
                              </button>
                              <span className="text-lg font-semibold min-w-[2rem] text-center">
                                {item.quantity || 1}
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
                              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
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
                <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartWithDetails.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-800 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          NPR {item.price} × {item.quantity || 1}
                        </p>
                      </div>
                      <span className="font-bold text-[#8B4513]">
                        NPR {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">NPR {totalAmount.toFixed(2)}</span>
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
                    onClick={() => {
                      // Add your checkout logic here
                      alert('Proceeding to checkout...');
                    }}
                    className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-3 rounded-full font-semibold hover:from-[#A0522D] hover:to-[#CD853F] transition transform hover:scale-105"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <button
                    onClick={handleClearCart}
                    className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition"
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