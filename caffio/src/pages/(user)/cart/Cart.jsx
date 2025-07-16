import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "../../../redux/reducerSlice/CartSlice";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-50 px-4">
      <h1 className="text-4xl font-bold text-[#8B4513] mb-8">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl text-gray-600 mb-4">Your cart is empty</h2>
          <Link
            to="/menu"
            className="inline-block bg-[#8B4513] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A0522D] transition"
          >
            Browse Menu
          </Link>
          
          <Link
            to="/menu"
            className="inline-block bg-[#8B4513] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A0522D] transition"
          >
            BrowseProduct
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md flex flex-col md:flex-row gap-6 p-4 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#8B4513] mb-1">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-semibold">
                    Price: NPR {item.price}
                  </span>
                  <span className="text-sm font-semibold">
                    Total: NPR {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateCartItemQuantity({ itemId: item.id, change: -1 })
                      )
                    }
                  >
                    −
                  </button>
                  <span className="text-md">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateCartItemQuantity({ itemId: item.id, change: 1 })
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="ml-4 px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4">
              Total Amount: NPR {totalAmount.toFixed(2)}
            </h2>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
