import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/reducerSlice/UserSlice";

const Header = () => {
  const { isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

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
    if (isLogin) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate("/signin");
    }
  };

  const handleAccountProfile = () => {
    setShowUserMenu(false);
    navigate("/accountProfile");
  };

  const handleAccountSettings = () => {
    setShowUserMenu(false);
    navigate("/account-settings");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowUserMenu(false);
    navigate("/");
    window.location.reload();
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
          <Link to="/" className="nav-link inline-block px-2 py-1">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link inline-block px-2 py-1">
            About
          </Link>
        </li>
        <li>
          <Link to="/menu" className="nav-link inline-block px-2 py-1">
            Menu
          </Link>
        </li>
        <li>
          <Link to="/product" className="nav-link inline-block px-2 py-1">
            Product
          </Link>
        </li>
        <li>
          <Link to="/gallery" className="nav-link inline-block px-2 py-1">
            Gallery
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link inline-block px-2 py-1">
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex space-x-6 pr-4 relative">
        <div
          className="flex items-center space-x-1 transition-colors cursor-pointer text-white hover:text-gray-200"
          onClick={handleUserIconClick}
        >
          {isLogin ? (
            <FiUser size={28} className="text-white" />
          ) : (
            <button>Login</button>
          )}
        </div>

        {showUserMenu && isLogin && (
          <div
            ref={userMenuRef}
            className="absolute top-full right-0 mt-2 w-48 bg-[#271001] rounded-md shadow-lg py-1 z-50"
          >
            <button
              onClick={handleAccountProfile}
              className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-amber-900"
            >
              Account
            </button>

            <button
              onClick={handleAccountSettings}
              className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-amber-900"
            >
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-amber-900"
            >
              Logout
            </button>
          </div>
        )}

        {isLogin && (
          <Link
            to="/cart"
            className="flex items-center space-x-1 transition-colors text-white hover:text-gray-200"
          >
            <FiShoppingCart size={28} className="ml-4 text-white" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
