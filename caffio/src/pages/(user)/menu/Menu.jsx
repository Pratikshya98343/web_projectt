import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/reducerSlice/CartSlice";

export const menuItems = [
  {
    id: 1,
    name: "Classic Espresso Single Shot Premium Blend",
    price: 450,
    image: "./image/menu1.png",
    category: "Espresso",
    description:
      "Rich and bold single shot espresso made from our premium blend of Ethiopian and Colombian beans.",
    ingredients: ["Premium espresso beans", "Filtered water"],
    brewTime: "25-30 seconds",
    caffeine: "High",
    temperature: "Hot",
    rating: 4.8,
    nutritionalInfo: {
      calories: 5,
      protein: "0.1g",
      carbs: "0g",
      fat: "0g",
    },
    preparationSteps: [
      "Grind 18-20g of premium espresso beans to fine consistency",
      "Tamp the grounds evenly in the portafilter",
      "Extract shot for 25-30 seconds",
      "Serve immediately in preheated cup",
    ],
  },
  {
    id: 2,
    name: "Cappuccino White Foam Coffee for Everyone",
    price: 525,
    image: "./image/menu2.png",
    category: "Milk Coffee",
    description:
      "Perfect balance of espresso, steamed milk, and velvety foam topped with a delicate art design.",
    ingredients: [
      "Espresso shot",
      "Steamed milk",
      "Milk foam",
      "Optional: cocoa powder",
    ],
    brewTime: "3-4 minutes",
    caffeine: "Medium",
    temperature: "Hot",
    rating: 4.7,
    nutritionalInfo: {
      calories: 120,
      protein: "6g",
      carbs: "9g",
      fat: "6g",
    },
    preparationSteps: [
      "Pull a perfect espresso shot into a 6oz cup",
      "Steam milk to 150-160°F creating microfoam",
      "Pour steamed milk maintaining foam layer",
      "Top with foam and optional latte art",
    ],
  },
  {
    id: 3,
    name: "Vanilla Latte Smooth Coffee with Premium Milk",
    price: 575,
    image: "./image/menu3.png",
    category: "Flavored Coffee",
    description:
      "Creamy latte infused with premium vanilla syrup and topped with smooth steamed milk.",
    ingredients: [
      "Espresso shot",
      "Steamed milk",
      "Vanilla syrup",
      "Milk foam",
    ],
    brewTime: "4-5 minutes",
    caffeine: "Medium",
    temperature: "Hot",
    rating: 4.6,
    nutritionalInfo: {
      calories: 190,
      protein: "8g",
      carbs: "24g",
      fat: "7g",
    },
    preparationSteps: [
      "Add vanilla syrup to bottom of cup",
      "Pull espresso shot over syrup",
      "Steam milk to create smooth texture",
      "Pour steamed milk creating layers",
    ],
  },
  {
    id: 4,
    name: "Americano Light Brown Coffee for Daily Energy",
    price: 475,
    image: "./image/menu4.png",
    category: "Black Coffee",
    description:
      "Classic Americano with perfect balance of espresso and hot water for a smooth, energizing drink.",
    ingredients: ["Double espresso shot", "Hot water"],
    brewTime: "2-3 minutes",
    caffeine: "High",
    temperature: "Hot",
    rating: 4.5,
    nutritionalInfo: {
      calories: 10,
      protein: "0.3g",
      carbs: "0g",
      fat: "0g",
    },
    preparationSteps: [
      "Pull double espresso shot",
      "Add hot water (1:2 ratio)",
      "Stir gently to combine",
      "Serve in large cup",
    ],
  },
  {
    id: 5,
    name: "Chocolate Mocha Black Coffee Premium Blend",
    price: 625,
    image: "./image/menu5.png",
    category: "Specialty",
    description:
      "Rich chocolate mocha with premium dark chocolate and perfectly balanced espresso.",
    ingredients: [
      "Espresso shot",
      "Dark chocolate syrup",
      "Steamed milk",
      "Whipped cream",
      "Cocoa powder",
    ],
    brewTime: "5-6 minutes",
    caffeine: "Medium",
    temperature: "Hot",
    rating: 4.9,
    nutritionalInfo: {
      calories: 290,
      protein: "9g",
      carbs: "35g",
      fat: "12g",
    },
    preparationSteps: [
      "Add chocolate syrup to cup",
      "Pull espresso shot over chocolate",
      "Steam milk to creamy consistency",
      "Top with whipped cream and cocoa powder",
    ],
  },
  {
    id: 6,
    name: "Caramel Macchiato Black Coffee with Sweet Touch",
    price: 600,
    image: "./image/menu6.png",
    category: "Specialty",
    description:
      "Layered macchiato with vanilla steamed milk, espresso, and rich caramel drizzle.",
    ingredients: [
      "Espresso shot",
      "Vanilla syrup",
      "Steamed milk",
      "Caramel sauce",
    ],
    brewTime: "4-5 minutes",
    caffeine: "Medium",
    temperature: "Hot",
    rating: 4.7,
    nutritionalInfo: {
      calories: 250,
      protein: "8g",
      carbs: "32g",
      fat: "9g",
    },
    preparationSteps: [
      "Add vanilla syrup to cup",
      "Steam milk with vanilla",
      "Pour milk leaving space for espresso",
      "Top with espresso and caramel drizzle",
    ],
  },
  {
    id: 7,
    name: "Cold Brew Brown Coffee for Summer Refreshment",
    price: 500,
    image: "./image/menu7.png",
    category: "Cold Coffee",
    description:
      "Smooth cold brew coffee steeped for 12 hours, perfect for hot summer days.",
    ingredients: ["Cold brew concentrate", "Filtered water", "Ice cubes"],
    brewTime: "12 hours steep",
    caffeine: "High",
    temperature: "Cold",
    rating: 4.4,
    nutritionalInfo: {
      calories: 5,
      protein: "0.3g",
      carbs: "0g",
      fat: "0g",
    },
    preparationSteps: [
      "Coarse grind coffee beans",
      "Steep in cold water for 12-24 hours",
      "Filter concentrate",
      "Serve over ice with water",
    ],
  },
  {
    id: 8,
    name: "Coffee Frappuccino Iced Coffee Special Edition",
    price: 675,
    image: "./image/menu8.png",
    category: "Frozen",
    description:
      "Blended iced coffee with milk, ice, and topped with whipped cream for the ultimate treat.",
    ingredients: [
      "Espresso shot",
      "Milk",
      "Ice",
      "Sugar syrup",
      "Whipped cream",
    ],
    brewTime: "3-4 minutes",
    caffeine: "Medium",
    temperature: "Frozen",
    rating: 4.8,
    nutritionalInfo: {
      calories: 320,
      protein: "6g",
      carbs: "45g",
      fat: "14g",
    },
    preparationSteps: [
      "Brew strong espresso and cool",
      "Blend with milk, ice, and syrup",
      "Pour into glass",
      "Top with whipped cream",
    ],
  },
  {
    id: 9,
    name: "Turkish Coffee Traditional Ground Coffee Premium",
    price: 550,
    image: "./image/menu9.png",
    category: "Traditional",
    description:
      "Authentic Turkish coffee prepared the traditional way with finely ground beans and served with delight.",
    ingredients: [
      "Finely ground coffee",
      "Water",
      "Sugar (optional)",
      "Turkish delight",
    ],
    brewTime: "5-7 minutes",
    caffeine: "High",
    temperature: "Hot",
    rating: 4.6,
    nutritionalInfo: {
      calories: 15,
      protein: "0.2g",
      carbs: "2g",
      fat: "0g",
    },
    preparationSteps: [
      "Mix finely ground coffee with cold water",
      "Heat slowly in traditional pot (cezve)",
      "Bring to gentle boil, forming foam",
      "Serve in small cups with Turkish delight",
    ],
  },
  {
    id: 10,
    name: "Affogato Coffee Ice Cream Dessert Special",
    price: 725,
    image: "./image/menu10.png",
    category: "Dessert",
    description:
      "Italian dessert combining hot espresso poured over premium vanilla ice cream.",
    ingredients: [
      "Hot espresso shot",
      "Premium vanilla ice cream",
      "Optional: amaretto",
    ],
    brewTime: "2-3 minutes",
    caffeine: "Medium",
    temperature: "Hot & Cold",
    rating: 4.9,
    nutritionalInfo: {
      calories: 180,
      protein: "4g",
      carbs: "18g",
      fat: "10g",
    },
    preparationSteps: [
      "Scoop premium vanilla ice cream into glass",
      "Pull fresh hot espresso shot",
      "Pour hot espresso over ice cream",
      "Serve immediately with spoon",
    ],
  },
  {
    id: 11,
    name: "Premium House Blend Dark Roast Coffee",
    price: 650,
    image: "./image/menu11.png",
    category: "House Special",
    description:
      "Our signature dark roast blend with rich, bold flavors and smoky undertones.",
    ingredients: ["House blend dark roast beans", "Filtered water"],
    brewTime: "4-6 minutes",
    caffeine: "High",
    temperature: "Hot",
    rating: 4.7,
    nutritionalInfo: {
      calories: 5,
      protein: "0.3g",
      carbs: "0g",
      fat: "0g",
    },
    preparationSteps: [
      "Grind beans to medium-coarse",
      "Use pour-over or French press method",
      "Brew with 200°F water",
      "Serve immediately",
    ],
  },
  {
    id: 12,
    name: "Specialty Single Origin Ethiopian Coffee Bean",
    price: 775,
    image: "./image/menu12.png",
    category: "Single Origin",
    description:
      "Rare Ethiopian single origin with floral notes, bright acidity, and complex flavor profile.",
    ingredients: ["Single origin Ethiopian beans", "Filtered water"],
    brewTime: "4-5 minutes",
    caffeine: "Medium-High",
    temperature: "Hot",
    rating: 4.8,
    nutritionalInfo: {
      calories: 5,
      protein: "0.3g",
      carbs: "0g",
      fat: "0g",
    },
    preparationSteps: [
      "Grind beans just before brewing",
      "Use pour-over method for best extraction",
      "Maintain water temperature at 195-205°F",
      "Enjoy the complex flavor notes",
    ],
  },
];

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            {/* Image and Details Section */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Image Section */}
              <div className="h-70 md:h-full bg-gray-100 flex justify-center items-center overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Details Section */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#8B4513] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedItem.category}
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
                    <span className="text-sm font-semibold">
                      {selectedItem.rating}
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-[#333] mb-4">
                  {selectedItem.name}
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  {selectedItem.description}
                </p>
                <div className="text-3xl font-bold text-[#8B4513] mb-8">
                  NPR {selectedItem.price.toFixed(2)}
                </div>
                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mx-auto mb-2 text-[#8B4513]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-sm font-semibold text-gray-700">
                      Brew Time
                    </div>
                    <div className="text-xs text-gray-600">
                      {selectedItem.brewTime}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 mx-auto mb-2 text-[#8B4513]"
                    >
                      <path d="M4.755 1.947a.75.75 0 011.06 0l3.5 3.5a.75.75 0 01-1.06 1.06L5.81 4.061a.75.75 0 010-1.06zM15.255 1.947a.75.75 0 011.06 0l3.5 3.5a.75.75 0 01-1.06 1.06L16.31 4.061a.75.75 0 010-1.06z" />
                    </svg>
                    <div className="text-sm font-semibold text-gray-700">
                      Caffeine
                    </div>
                    <div className="text-xs text-gray-600">
                      {selectedItem.caffeine}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mx-auto mb-2 text-[#8B4513]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75A2.25 2.25 0 019 6.75v3.375m3-6.75h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25h-9.75a2.25 2.25 0 01-2.25-2.25V9.375c0-.621.504-1.125 1.125-1.125H9m3-6.75h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25h-9.75a2.25 2.25 0 01-2.25-2.25V9.375c0-.621.504-1.125 1.125-1.125H9"
                      />
                    </svg>
                    <div className="text-sm font-semibold text-gray-700">
                      Temp
                    </div>
                    <div className="text-xs text-gray-600">
                      {selectedItem.temperature}
                    </div>
                  </div>
                </div>
                {/* Ingredients */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#333] mb-3">
                    Ingredients
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedItem.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                {/* Nutritional Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#333] mb-3">
                    Nutritional Information
                  </h3>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-[#8B4513]">
                        {selectedItem.nutritionalInfo.calories}
                      </div>
                      <div className="text-xs text-gray-600">Calories</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-[#8B4513]">
                        {selectedItem.nutritionalInfo.protein}
                      </div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-[#8B4513]">
                        {selectedItem.nutritionalInfo.carbs}
                      </div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-[#8B4513]">
                        {selectedItem.nutritionalInfo.fat}
                      </div>
                      <div className="text-xs text-gray-600">Fat</div>
                    </div>
                  </div>
                </div>
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
      className="py-24 bg-gradient-to-br from-[#f8f5f2] to-white min-h-screen"
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
                  {item.category}
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-[#333] mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="text-xl font-bold text-[#8B4513] mb-4">
                  NPR {item.price.toFixed(2)}
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
                  <button
                    onClick={() => handleItemClick(item)}
                    className="px-4 py-2 border-2 border-[#8B4513] text-[#8B4513] rounded-full font-semibold text-sm hover:bg-[#8B4513] hover:text-black transition"
                  >
                    Details
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