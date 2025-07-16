import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  MapPin,
  Coffee,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/reducerSlice/CartSlice";

const products = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe Beans - Floral & Citrusy",
    price: 450,
    image: "./image/product1.png",
    description:
      "A bright and complex coffee with pronounced floral notes and vibrant citrus acidity. Grown at high altitudes in the birthplace of coffee.",
    origin: "Yirgacheffe, Ethiopia",
    altitude: "1,700-2,200m",
    process: "Washed",
    roastLevel: "Light-Medium",
    notes: ["Floral", "Citrus", "Tea-like", "Bright"],
    rating: 4.8,
    inStock: true,
    weight: "250g",
    details: {
      story:
        "Sourced directly from smallholder farmers in the Yirgacheffe region, this coffee represents the pinnacle of Ethiopian coffee excellence. The unique terroir and traditional processing methods create a cup that's both complex and approachable.",
      brewingTips:
        "Best brewed with pour-over methods like V60 or Chemex. Use water at 200°F and a 1:16 ratio for optimal extraction.",
      certifications: ["Organic", "Fair Trade", "Single Origin"],
    },
  },
  {
    id: 2,
    name: "Colombian Supremo - Smooth & Balanced",
    price: 525,
    image: "./image/product2.png",
    description:
      "A well-balanced coffee with medium body and smooth finish. Perfect for those who enjoy a classic, approachable cup.",
    origin: "Huila, Colombia",
    altitude: "1,500-1,800m",
    process: "Fully Washed",
    roastLevel: "Medium",
    notes: ["Chocolate", "Caramel", "Balanced", "Smooth"],
    rating: 4.6,
    inStock: true,
    weight: "250g",
    details: {
      story:
        "From the mountainous region of Huila, this Supremo grade coffee represents the finest Colombian beans. Grown by cooperatives committed to sustainable farming practices.",
      brewingTips:
        "Excellent for espresso, drip, or French press. Medium grind works best with most brewing methods.",
      certifications: ["Rainforest Alliance", "Single Origin"],
    },
  },
  {
    id: 3,
    name: "Sumatra Mandheling - Earthy & Bold",
    price: 575,
    image: "./image/product3.png",
    description:
      "A full-bodied coffee with earthy, herbal notes and low acidity. Known for its unique wet-hulling process that creates distinctive flavors.",
    origin: "North Sumatra, Indonesia",
    altitude: "750-1,500m",
    process: "Wet-hulled (Giling Basah)",
    roastLevel: "Medium-Dark",
    notes: ["Earthy", "Herbal", "Full-body", "Low acidity"],
    rating: 4.5,
    inStock: true,
    weight: "250g",
    details: {
      story:
        "Processed using the traditional Giling Basah method unique to Indonesia, this coffee develops its characteristic earthy profile and full body that Sumatra is famous for.",
      brewingTips:
        "Perfect for French press or cold brew. The full body and low acidity make it ideal for darker roast preparations.",
      certifications: ["Organic", "Single Origin"],
    },
  },
  {
    id: 4,
    name: "Guatemalan Antigua - Rich & Velvety",
    price: 475,
    image: "./image/product4.png",
    description:
      "A rich, full-bodied coffee with chocolate and spice notes. Grown in volcanic soil that imparts unique mineral complexity.",
    origin: "Antigua, Guatemala",
    altitude: "1,500-1,700m",
    process: "Fully Washed",
    roastLevel: "Medium",
    notes: ["Chocolate", "Spice", "Velvety", "Rich"],
    rating: 4.7,
    inStock: true,
    weight: "250g",
    details: {
      story:
        "Cultivated in the shadow of three volcanoes, Antigua coffee benefits from rich volcanic soil and a unique microclimate that produces consistently exceptional beans.",
      brewingTips:
        "Excellent for espresso-based drinks. The rich body and chocolate notes make it perfect for cappuccinos and lattes.",
      certifications: ["Fair Trade", "Single Origin", "Shade Grown"],
    },
  },
  {
    id: 5,
    name: "Brazil Santos - Sweet & Nutty",
    price: 625,
    image: "./image/product5.png",
    description:
      "A sweet, nutty coffee with low acidity and medium body. Brazil's most famous coffee export with consistent quality.",
    origin: "São Paulo, Brazil",
    altitude: "800-1,200m",
    process: "Natural/Dry",
    roastLevel: "Medium",
    notes: ["Sweet", "Nutty", "Chocolate", "Low acidity"],
    rating: 4.4,
    inStock: true,
    weight: "250g",
    details: {
      story:
        "From the renowned Santos port region, this coffee represents Brazil's coffee heritage. Sun-dried to perfection, it develops natural sweetness and nutty characteristics.",
      brewingTips:
        "Versatile for all brewing methods. Particularly excellent in espresso blends due to its natural sweetness and crema production.",
      certifications: ["UTZ Certified", "Single Origin"],
    },
  },
  {
    id: 6,
    name: "Kenyan AA - Bright & Wine-like Acidity",
    price: 600,
    image: "./image/product6.png",
    description:
      "A bright, wine-like coffee with pronounced acidity and fruity notes. Kenya's highest grade beans with exceptional cup quality.",
    origin: "Central Province, Kenya",
    altitude: "1,500-2,100m",
    process: "Fully Washed",
    roastLevel: "Light-Medium",
    notes: ["Wine-like", "Bright", "Fruity", "Complex"],
    rating: 4.9,
    inStock: false,
    weight: "250g",
    details: {
      story:
        "Hand-picked at peak ripeness and processed using Kenya's renowned double fermentation method, resulting in the characteristic bright acidity and complex fruit notes.",
      brewingTips:
        "Best with pour-over methods that highlight the bright acidity. Try with Kalita Wave or V60 for optimal flavor extraction.",
      certifications: ["Fair Trade", "Single Origin", "AA Grade"],
    },
  },
  {
    id: 7,
    name: "Costa Rica Tarrazú - Clean & Citrusy",
    price: 500,
    image: "./image/product7.png",
    description:
      "A clean, bright coffee with citrus notes and medium body. Grown in one of Costa Rica's most prestigious coffee regions.",
    origin: "Tarrazú, Costa Rica",
    altitude: "1,200-1,700m",
    process: "Fully Washed",
    roastLevel: "Medium",
    notes: ["Clean", "Citrusy", "Bright", "Medium body"],
    rating: 4.6,
    inStock: true,
    weight: "250g",
    details: {
      story:
        "From the high mountains of Tarrazú, known for producing some of Costa Rica's finest coffees. The volcanic soil and cool climate create ideal growing conditions.",
      brewingTips:
        "Perfect for drip coffee and pour-over methods. The clean profile makes it excellent for showcasing brewing technique.",
      certifications: ["Rainforest Alliance", "Single Origin", "SHB"],
    },
  },
  {
    id: 8,
    name: "Honduras Marcala - Sweet & Full-bodied",
    price: 675,
    image: "./image/product8.png",
    description:
      "A sweet, full-bodied coffee with chocolate and caramel notes. Representing the emerging excellence of Honduran specialty coffee.",
    origin: "Marcala, Honduras",
    altitude: "1,300-1,700m",
    process: "Fully Washed",
    roastLevel: "Medium",
    notes: ["Sweet", "Full-bodied", "Chocolate", "Caramel"],
    rating: 4.5,
    inStock: true,
    weight: "250g",
    details: {
      story:
        "From the protected La Paz region, this coffee represents Honduras' growing reputation in specialty coffee. Carefully cultivated by dedicated farmer cooperatives.",
      brewingTips:
        "Great for espresso and milk-based drinks. The full body and sweet notes make it perfect for cappuccinos.",
      certifications: ["Organic", "Fair Trade", "Single Origin"],
    },
  },
];


export default function ProductSection() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Detailed Product View (similar to menu's detailed view)
  if (selectedProduct) {
    return (
      <section className="py-1">
        <div className="w-screen  bg-gradient-to-br from-amber-50 to-orange-100 py-50 px-4">
          <button
            onClick={handleBackToProducts}
            className="inline-flex items-center gap-2 bg-amber-800 text-black px-6 py-3 rounded-full font-semibold hover:bg-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl mb-8"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>

          <div className="bg-white rounded-4xl shadow-xl overflow-hidden">
            {/* Image and Details Section */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Image Section */}
              <div className="h-70 md:h-full bg-gray-100 flex justify-center items-center overflow-hidden relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(selectedProduct.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                    favorites.includes(selectedProduct.id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={
                      favorites.includes(selectedProduct.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
                {!selectedProduct.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedProduct.roastLevel}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-yellow-400"
                    />
                    <span className="text-sm font-semibold">
                      {selectedProduct.rating}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedProduct.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {selectedProduct.name}
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  {selectedProduct.description}
                </p>
                <div className="text-3xl font-bold text-amber-800 mb-8">
                  NPR {selectedProduct.price.toFixed(2)}
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MapPin size={24} className="mx-auto mb-2 text-amber-800" />
                    <div className="text-sm font-semibold text-gray-700">
                      Origin
                    </div>
                    <div className="text-xs text-gray-600">
                      {selectedProduct.origin}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Coffee size={24} className="mx-auto mb-2 text-amber-800" />
                    <div className="text-sm font-semibold text-gray-700">
                      Process
                    </div>
                    <div className="text-xs text-gray-600">
                      {selectedProduct.process}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-amber-800 mb-1">
                      {selectedProduct.altitude}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      Altitude
                    </div>
                    <div className="text-xs text-gray-600">
                      {selectedProduct.weight}
                    </div>
                  </div>
                </div>

                {/* Tasting Notes */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Tasting Notes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.notes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.details.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    if (isLogin) {
                      dispatch(addToCart(selectedProduct.id));
                    } else {
                      navigate("/signin");
                    }
                  }}
                  disabled={!selectedProduct.inStock}
                  className={`w-full py-4 rounded-full font-semibold tracking-wide uppercase text-lg shadow-lg transition mb-6 ${
                    selectedProduct.inStock
                      ? "bg-gradient-to-r from-amber-800 to-amber-900 text-white hover:from-amber-900 hover:to-amber-800 hover:-translate-y-1"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {selectedProduct.inStock
                    ? `Add to Cart - NPR ${selectedProduct.price.toFixed(2)}`
                    : "Out of Stock"}
                </button>

                {/* Story */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Our Story
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedProduct.details.story}
                  </p>
                </div>

                {/* Brewing Tips */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Brewing Tips
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedProduct.details.brewingTips}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Main Products View (similar to menu's main view)
  return (
    <section
      id="product"
      className="py-24 bg-gradient-to-br from-orange-50 to-white min-h-screen relative overflow-hidden"
    >
      <div className="mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-amber-800 mb-16 pb-4">
          <h2 className="text-4xl font-bold text-amber-800 uppercase tracking-widest">
            Products
          </h2>
        </div>

        {/* Category Info */}
        <div className="mb-10">
          <h3 className="text-3xl font-bold text-amber-800 mb-2">
            Signature Bean Collection
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl">
            Explore our finest selection of whole coffee beans sourced from top
            regions around the world. Perfectly roasted for flavor, aroma, and
            depth. Click on any product to see detailed information and brewing
            tips.
          </p>
        </div>

        {/* Product Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="h-56 bg-gray-100 flex justify-center items-center overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star
                    size={12}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                  <span className="text-xs font-semibold">
                    {product.rating}
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-amber-800 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {product.roastLevel}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className={`absolute top-12 right-3 p-2 rounded-full transition-colors ${
                    favorites.includes(product.id)
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart
                    size={16}
                    fill={
                      favorites.includes(product.id) ? "currentColor" : "none"
                    }
                  />
                </button>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="text-xl font-bold text-amber-800 mb-4">
                  NPR {product.price.toFixed(2)}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isLogin) {
                        if (product.inStock) {
                          dispatch(addToCart(product.id));
                        }
                      } else {
                        navigate("/signin");
                      }
                    }}
                    disabled={!product.inStock}
                    className={`flex-1 py-2 rounded-full font-semibold tracking-wide uppercase text-sm shadow-md transition ${
                      product.inStock
                        ? "bg-gradient-to-r from-amber-800 to-amber-900 text-white hover:from-amber-900 hover:to-amber-800 hover:-translate-y-1"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button
                    onClick={() => handleProductClick(product)}
                    className="px-4 py-2 border-2 border-amber-800 text-amber-800 rounded-full font-semibold text-sm hover:bg-amber-800 hover:text-black transition"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating coffee beans */}
      {[10, 20, 30, 50, 70, 80].map((left, i) => (
        <div
          key={i}
          className="absolute w-2 h-3 bg-amber-800 rounded-full opacity-10"
          style={{
            left: `${left}%`,
            animation: `float 15s linear infinite ${i * 3}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          from {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10%,
          90% {
            opacity: 0.1;
          }
          to {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
