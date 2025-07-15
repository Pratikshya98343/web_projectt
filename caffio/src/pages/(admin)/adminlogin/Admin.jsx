import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, User, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../../../api/axios';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  useEffect(() => {
    // Check if already logged in as admin
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (token && userRole === 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Submitting login form:', { email: formData.email });

    try {
      const loginResponse = await api.post('/auth/admin/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Login response:', loginResponse.data);
console.log('Login access token:', loginResponse.data?.data?.access_token);
      if (loginResponse.data?.data?.access_token) {
        const token = loginResponse.data.data.access_token;
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', 'admin');

        api.defaults.headers.common['Authorization'] = token;

        try {
          const testResponse = await api.get('/users');
          console.log('Test response:', testResponse.data);
          navigate('/admin');
        } catch (testError) {
          console.error('Failed to access protected route:', testError?.response?.data || testError);
          setError(`Login successful but failed to access admin features: ${testError?.response?.data?.message || testError.message}`);
        }
      } else {
        console.error('Invalid login response:', loginResponse.data);
        setError('Invalid login response - No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Failed to login. Please check your credentials.');
    }
  };

  

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#F5E6D3] via-[#DCC7B1] to-[#6F4E37] flex items-center justify-center relative overflow-hidden">
      
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

      {/* Main Login Container */}
      <div className="bg-white backdrop-blur-sm rounded-3xl shadow-2xl p-7 w-full max-w-lg relative border border-[#D2B48C] flex flex-col items-center justify-center">

        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#6F4E37] to-[#5D3A2A] rounded-full mb-4 shadow-lg">
            <Coffee className="w-10 h-10 text-black animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6F4E37] to-[#5D3A2A] bg-clip-text text-transparent mb-2">
            Caffio Admin
          </h1>
          <p className="text-gray-600 text-sm">
            Fuel your business with coffee analytics
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-8 w-full max-w-md">
          {/* Email Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-[#6F4E37] transition-all duration-200 bg-white/20 text-black placeholder-gray-400 text-base"
                placeholder="admin@caffio.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-[#6F4E37] transition-all duration-200 bg-white/20 text-black placeholder-gray-400 text-base"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                className="w-4 h-4 text-[#6F4E37] border-gray-300 rounded focus:ring-[#6F4E37] bg-white/20"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#6F4E37] hover:text-[#5D3A2A] transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm mb-4">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#6F4E37] to-[#5D3A2A] text-white py-4 rounded-lg font-medium hover:from-[#5D3A2A] hover:to-[#4B251C] focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg text-base"
          >
            Sign In to Dashboard
          </button>
        </div>

        {/* Coffee Steam Animation */}
        <div className="absolute -top-2 -right-2 w-8 h-8 opacity-20">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping delay-200 ml-2"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping delay-400 ml-1"></div>
        </div>
      </div>
    </div>
  );
}