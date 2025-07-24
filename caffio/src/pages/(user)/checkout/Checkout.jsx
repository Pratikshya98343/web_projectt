import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Smartphone, 
  Wallet,
  Coffee,
  Truck,
  Shield,
  Check
} from 'lucide-react';

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Ethiopian Single Origin',
      description: 'Rich, fruity notes with chocolate undertones',
      price: 24.99,
      quantity: 2,
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Colombian Supreme',
      description: 'Smooth, balanced flavor with caramel finish',
      price: 22.50,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'French Roast Dark',
      description: 'Bold, intense flavor with smoky notes',
      price: 19.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1695936/pexels-photo-1695936.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ]);

  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 8.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const validateForm = () => {
    const newErrors = {};
    
    if (!customerInfo.email) newErrors.email = 'Email is required';
    if (!customerInfo.firstName) newErrors.firstName = 'First name is required';
    if (!customerInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!customerInfo.address) newErrors.address = 'Address is required';
    if (!customerInfo.city) newErrors.city = 'City is required';
    if (!customerInfo.state) newErrors.state = 'State is required';
    if (!customerInfo.zipCode) newErrors.zipCode = 'ZIP code is required';

    if (paymentMethod === 'card') {
      if (!cardInfo.number) newErrors.cardNumber = 'Card number is required';
      if (!cardInfo.expiry) newErrors.expiry = 'Expiry date is required';
      if (!cardInfo.cvv) newErrors.cvv = 'CVV is required';
      if (!cardInfo.name) newErrors.cardName = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Order placed successfully! Thank you for choosing Caffio.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-600 p-2 rounded-full">
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-orange-900">Caffio</h1>
            </div>
            <div className="text-sm text-gray-600">
              Secure Checkout
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-orange-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-3">
                    <span className="text-orange-600 font-bold text-sm">1</span>
                  </div>
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.firstName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.lastName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-orange-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-3">
                    <span className="text-orange-600 font-bold text-sm">2</span>
                  </div>
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.address ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.city ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="New York"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <select
                        value={customerInfo.state}
                        onChange={(e) => setCustomerInfo({...customerInfo, state: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.state ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select State</option>
                        <option value="NY">New York</option>
                        <option value="CA">California</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                      </select>
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={customerInfo.zipCode}
                        onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.zipCode ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="10001"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-orange-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-3">
                    <span className="text-orange-600 font-bold text-sm">3</span>
                  </div>
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-orange-500 bg-orange-50 text-orange-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span className="font-medium">Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple')}
                      className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                        paymentMethod === 'apple' 
                          ? 'border-orange-500 bg-orange-50 text-orange-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Smartphone className="h-5 w-5" />
                      <span className="font-medium">Apple Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                        paymentMethod === 'paypal' 
                          ? 'border-orange-500 bg-orange-50 text-orange-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Wallet className="h-5 w-5" />
                      <span className="font-medium">PayPal</span>
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                            errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                              errors.expiry ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="MM/YY"
                          />
                          {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                              errors.cvv ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="123"
                          />
                          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                            errors.cardName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-orange-100 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-orange-600" />
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-medium px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-orange-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    Shipping
                    {shipping === 0 && (
                      <span className="ml-2 text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full">
                        FREE
                      </span>
                    )}
                  </span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 text-green-700">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">Secure & Encrypted Checkout</span>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-xs text-green-600">
                  <div className="flex items-center space-x-1">
                    <Check className="h-3 w-3" />
                    <span>256-bit SSL</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="h-3 w-3" />
                    <span>Free shipping over $50</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleSubmit}
                disabled={isProcessing || cartItems.length === 0}
                className="w-full mt-6 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Place Order • $${total.toFixed(2)}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;