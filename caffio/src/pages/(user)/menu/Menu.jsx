import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/reducerSlice/CartSlice";
import api from "../../../api/axios";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/product");
        setMenuItems(data?.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBackToMenu = () => {
    setSelectedItem(null);
  };

  const handleAddToCart = (item) => {
    if (isLogin) {
      dispatch(addToCart(item.id));
      navigate("/cart");
    } else {
      navigate("/signin");
    }
  };

  // Detailed Item View
  if (selectedItem) {
    return (
      <section className="py-1">
        <div className="maxw-[1400px] mx-auto px-2 py-35">
          <button
            onClick={handleBackToMenu}
            className="inline-flex items-center gap-2 bg-[#8B4513] px-6 py-3 rounded-full font-semibold hover:bg-[#A0522D] transition-all duration-300 shadow-lg hover:shadow-xl mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Menu
          </button>
          <div className="bg-white rounded-4xl shadow-xl overflow-hidden">
            {/* Image  */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Image Section */}
              <div className="h-70 md:h-full bg-gray-100 flex justify-center items-center overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(selectedItem);
                  }}
                  className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-4 rounded-full font-semibold tracking-wide uppercase text-lg shadow-lg hover:from-[#A0522D] hover:to-[#CD853F] hover:-translate-y-1 transition mb-6"
                >
                  Add to Cart - NPR {selectedItem.price.toFixed(2)}
                </button>
                {/* Preparation Steps */}
                <div>
                  <h3 className="text-lg font-semibold text-[#333] mb-3">
                    Preparation Steps
                  </h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    {selectedItem.preparationSteps.map((step, index) => (
                      <li key={index} className="text-sm">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Main Menu View
  return (
    <section
      id="Menu"
      className="w-screen py-24 bg-gradient-to-br from-[#f8f5f2] to-white min-h-screen"
    >
      <div className="mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-[#8B4513] mb-16 pb-4">
          <h2 className="text-4xl font-bold text-[#333] uppercase tracking-widest">
            Menu
          </h2>
        </div>
        {/* Category Info */}
        <div className="mb-10">
          <h3 className="text-3xl font-bold text-[#8B4513] mb-2">
            Signature Collection
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl">
            Discover our premium coffee selection, carefully crafted by our
            master baristas. Each blend tells a unique story of flavor, aroma,
            and passion. Click on any item to see detailed preparation methods
            and ingredients.
          </p>
        </div>
        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <div className="h-56 bg-gray-100 flex justify-center items-center overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.755 2.855c-.996.599-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-semibold">{item.rating}</span>
                </div>
                <div className="absolute top-3 left-3 bg-[#8B4513] text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {typeof item.category === "object"
                    ? item.category.name || ""
                    : item.category}
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-[#333] mb-2 line-clamp-2">
                  {typeof item.name === "object"
                    ? item.name.name || ""
                    : item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {typeof item.description === "object"
                    ? item.description.text || ""
                    : item.description}
                </p>
                <div className="text-xl font-bold text-[#8B4513] mb-4">
                  NPR{" "}
                  {typeof item.price === "object"
                    ? item.price.value || ""
                    : item.price.toFixed(2)}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                    className="flex-1 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-2 rounded-full font-semibold tracking-wide uppercase text-sm shadow-md hover:from-[#A0522D] hover:to-[#CD853F] hover:-translate-y-1 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
