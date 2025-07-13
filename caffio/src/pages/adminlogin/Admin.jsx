import React, { useState } from 'react';
import { Coffee, User, Lock, Eye, EyeOff } from 'lucide-react';

export default function adminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Handle login logic here
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-600 flex items-center justify-center relative overflow-hidden">
      {/* Animated Coffee Beans Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-8 bg-white rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Login Container - Now full page with background */}
      <div className="bg-white backdrop-blur-sm rounded-3xl shadow-2xl p-7 w-full max-w-lg relative border border-white flex flex-col items-center justify-center">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-4 shadow-lg">
            <Coffee className="w-10 h-10 text-black animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent mb-2">
            Caffio Admin
          </h1>
          <p className="text-black text-sm"> {/* Changed text color to white */}
            Fuel your business with coffee analytics
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-8 w-full max-w-md"> {/* Added max-w-md for form width control */}
          {/* Email Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-black mb-3"> {/* Changed text color to white */}
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" /> {/* Adjusted icon color */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/20 text-white placeholder-gray-300 text-base" // Adjusted background, text, and placeholder colors
                placeholder="admin@caffio.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-black mb-3"> {/* Changed text color to white */}
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" /> {/* Adjusted icon color */}
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/20 text-white placeholder-gray-300 text-base" // Adjusted background, text, and placeholder colors
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors" // Adjusted icon color
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-amber-600 border-gray-500 rounded focus:ring-amber-500 bg-white/20" // Adjusted border and background
              />
              <span className="ml-2 text-sm text-black">Remember me</span> {/* Changed text color to white */}
            </label>
            <a href="#" className="text-sm text-amber-300 hover:text-amber-100 transition-colors"> {/* Adjusted link color */}
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg text-base"
          >
            Sign In to Dashboard
          </button>
        </div>

        {/* Coffee Steam Animation */}
        <div className="absolute -top-2 -right-2 w-8 h-8 opacity-20">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping animation-delay-200 ml-2"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping animation-delay-400 ml-1"></div>
        </div>
      </div>
    </div>
  );
}
