import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, X, Coffee, Leaf, Sun, Moon, Droplets } from 'lucide-react';

const CaffioAddToCart = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const products = [
    {
      id: 'espresso',
      name: 'Espresso Blend',
      description: 'Rich, bold flavor with chocolate notes. Perfect for morning energy boost.',
      price: 24.99,
      icon: <Coffee className="w-12 h-12 text-amber-200" />,
      gradient: 'from-amber-800 to-amber-600'
    },
    {
      id: 'colombian',
      name: 'Colombian Supreme',
      description: 'Smooth, well-balanced coffee with caramel sweetness and nutty undertones.',
      price: 28.99,
      icon: <Coffee className="w-12 h-12 text-orange-200" />,
      gradient: 'from-orange-800 to-orange-600'
    },
    {
      id: 'dark',
      name: 'Dark Roast',
      description: 'Intense, smoky flavor with low acidity. For those who love strong coffee.',
      price: 26.99,
      icon: <Moon className="w-12 h-12 text-gray-200" />,
      gradient: 'from-gray-800 to-gray-600'
    },
    {
      id: 'light',
      name: 'Light Roast',
      description: 'Bright, floral notes with high acidity. Perfect for pour-over brewing.',
      price: 22.99,
      icon: <Sun className="w-12 h-12 text-yellow-200" />,
      gradient: 'from-yellow-700 to-yellow-500'
    },
    {
      id: 'honey',
      name: 'Honey Process',
      description: 'Naturally sweet with honey-like flavors and tropical fruit notes.',
      price: 32.99,
      icon: <Droplets className="w-12 h-12 text-amber-300" />,
      gradient: 'from-amber-700 to-yellow-600'
    },
    {
      id: 'organic',
      name: 'Organic Blend',
      description: 'Sustainably sourced, organic certified beans with earthy, complex flavors.',
      price: 29.99,
      icon: <Leaf className="w-12 h-12 text-green-200" />,
      gradient: 'from-green-800 to-green-600'
    }
  ];

  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  const changeQuantity = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + change)
    }));
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(prev => prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart(prev => [...prev, { ...product, quantity }]);
    }
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-amber-400/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      
      <div className={`w-full h-48 bg-gradient-to-br ${product.gradient} rounded-xl mb-6 flex items-center justify-center relative overflow-hidden`}>
        {product.icon}
        <div className="absolute inset-0 bg-black/10 rounded-xl"></div>
      </div>
      
      <h3 className="text-xl font-bold text-amber-200 mb-3">{product.name}</h3>
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">{product.description}</p>
      <div className="text-2xl font-bold text-orange-400 mb-6">${product.price.toFixed(2)}</div>
      
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => changeQuantity(product.id, -1)}
          className="w-10 h-10 bg-amber-600 hover:bg-amber-500 text-amber-900 rounded-full flex items-center justify-center font-bold transition-all duration-200 hover:scale-110"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-xl font-bold text-white min-w-8 text-center">
          {quantities[product.id]}
        </span>
        <button
          onClick={() => changeQuantity(product.id, 1)}
          className="w-10 h-10 bg-amber-600 hover:bg-amber-500 text-amber-900 rounded-full flex items-center justify-center font-bold transition-all duration-200 hover:scale-110"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg active:transform active:translate-y-0"
      >
        Add to Cart
      </button>
    </div>
  );

  const CartItem = ({ item }) => (
    <div className="flex items-center gap-4 py-4 border-b border-white/10">
      <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center`}>
        {React.cloneElement(item.icon, { className: "w-6 h-6 text-white" })}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-amber-200">{item.name}</h4>
        <p className="text-orange-400">${item.price.toFixed(2)} × {item.quantity}</p>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className=" w-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white relative">
      {/* Header */}
      <div className="text-center py-34 px-4">
        <h1 className="text-5xl font-bold text-amber-200 mb-4 drop-shadow-lg">
          ☕ CAFFIO
        </h1>
        <p className="text-xl text-amber-300/80">Premium Coffee Experience</p>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-6 right-6 bg-amber-600 hover:bg-amber-500 text-amber-900 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-40"
      >
        <ShoppingCart className="w-6 h-6" />
        {getCartItemCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {getCartItemCount()}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-amber-900 to-orange-900 shadow-2xl transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/20">
              <h2 className="text-2xl font-bold text-amber-200">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-amber-200 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <Coffee className="w-16 h-16 text-amber-300/50 mx-auto mb-4" />
                  <p className="text-amber-300/70">Your cart is empty</p>
                </div>
              ) : (
                cart.map(item => <CartItem key={item.id} item={item} />)
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/20">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-orange-400">
                    Total: ${getCartTotal().toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert('Proceeding to checkout... Thank you for choosing Caffio!');
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Animation */}
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600/90 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg z-50 transition-all duration-300 ${showSuccess ? 'opacity-100 scale-110' : 'opacity-0 scale-100 pointer-events-none'}`}>
        ✓ Added to Cart!
      </div>
    </div>
  );
};

export default CaffioAddToCart;