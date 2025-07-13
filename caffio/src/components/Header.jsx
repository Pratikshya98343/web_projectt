// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react"; // Import useState, useEffect, useRef
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi"; // Assuming react-icons/fi is installed

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null); // Ref for detecting clicks outside the menu

  useEffect(() => {
    // Check login status from localStorage when the component mounts
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu); // Toggle menu visibility
    } else {
      navigate("/signin"); // Navigate to sign-in if not logged in
    }
  };

  const handleAccountProfile = () => {
    setShowUserMenu(false); // Close menu
    navigate("/accountProfile"); 
  };

  const handleAccountSettings = () => {
    setShowUserMenu(false); // Close menu
    navigate("/account-settings"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Clear login status
    // In a real app, you'd also remove the auth token
    // localStorage.removeItem("authToken");
    setIsLoggedIn(false); // Update state
    setShowUserMenu(false); // Close menu
    navigate("/"); // Redirect to homepage or sign-in page
    window.location.reload(); // Optional: force a reload to update header
  };

  return (
    <nav className="w-full bg-[#271001] text-white p-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img
            src="image/logo.png"
            alt="Caffio Logo"
            className="w-20 h-20 rounded-full"
          />
        </Link>
      </div>

      <ul className="flex space-x-6 font-medium">
        <li>
          <Link
            to="/"
            className="text-white hover:text-slate-200 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-white hover:text-slate-200 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/menu"
            className="text-white hover:text-slate-200 transition-colors"
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            to="/product"
            className="text-white hover:text-slate-200 transition-colors"
          >
            Product
          </Link>
        </li>
        <li>
          <Link
            to="/gallery"
            className="text-white hover:text-slate-200 transition-colors"
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-white hover:text-slate-200 transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex space-x-6 pr-4 relative">
        <div
          className="flex items-center space-x-1 transition-colors cursor-pointer"
          onClick={handleUserIconClick}
        >
          <FiUser size={28} />
          {isLoggedIn && <span className="text-sm"></span>}
        </div>

        {showUserMenu && isLoggedIn && (
          <div
            ref={userMenuRef}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
          >
            <button
              onClick={handleAccountProfile}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Account
            </button>

            <button
              onClick={handleAccountSettings}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}

        <Link
          to="/cart"
          className="flex items-center space-x-1 transition-colors"
        >
          <FiShoppingCart size={28} className="ml-4" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
