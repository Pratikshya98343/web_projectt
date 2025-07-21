import React, { useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import {
  Settings,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserCircle,
  Shield,
  BarChart3,
  ShoppingCart,
  Package,
  Coffee,
  Tag,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/reducerSlice/UserSlice";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleProfileClick = () => {
    navigate("/admin/AdminProfile");
  };

  const handleSettingsClick = () => {
    navigate("/admin/settings");
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate("/admin/login");
  };

  return (
    <header
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
      style={{ margin: 0, padding: 0 }}
    >
      <div className="max-w-full mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Mobile Menu */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex-shrink-0 flex items-center ml-4 md:ml-0">
              <div className="bg-amber-700 rounded-lg p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                Admin Dashboard
              </span>
            </div>
          </div>

          {/* Right side - Profile */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                <User size={18} className="text-amber-800" />
              </div>
              <span className="hidden md:block text-sm font-medium">
                John Doe
              </span>
              <ChevronDown size={16} />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 overflow-hidden">
                <div className="py-1">
                  <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100 bg-amber-50">
                    <div className="font-medium text-amber-900">John Doe</div>
                    <div className="text-amber-700 text-xs mt-1">
                      admin@company.com
                    </div>
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 text-left transition-colors"
                  >
                    <UserCircle size={16} className="mr-3 text-amber-600" />
                    Profile
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 text-left transition-colors"
                  >
                    <Settings size={16} className="mr-3 text-amber-600" />
                    Settings
                  </button>
                  <div className="border-t border-gray-100 mt-1">
                    <button
                      onClick={handleLogoutClick}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left transition-colors"
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Admin Sidebar Component
const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      name: "Dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
      url: "/admin",
    },
    {
      name: "Categories",
      icon: <Tag className="h-5 w-5" />,
      url: "/admin/categories",
    },
    {
      name: "Menu",
      icon: <Coffee className="h-5 w-5" />,
      url: "/admin/menu",
    },
    {
      name: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      url: "/admin/orders",
    },
    {
      name: "Profile",
      icon: <UserCircle className="h-5 w-5" />,
      url: "/admin/AdminProfile",
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      url: "/admin/settings",
    },
  ];

  return (
    <div className="w-72 m-0 box-border font-sans bg-gradient-to-b from-amber-900 to-amber-800 text-white min-h-screen p-5 shadow-xl">
      <div className="max-w-6xl mx-auto px-1 py-30">
        <div className="flex items-center space-x-2 mb-10 border-b border-amber-700 pb-4">
          <Coffee className="h-10 w-10 text-amber-200" />
          <h1 className="text-2xl font-bold text-amber-100">Caffio Admin</h1>
        </div>

        <nav className="flex flex-col gap-6">
          {tabs.map((tab) => (
            <Link
              to={tab.url}
              className={`w-full !flex items-center space-x-3 px-5 py-3.5 rounded-lg transition-all duration-300 ${
                currentPath === tab.url
                  ? "bg-amber-700 shadow-lg border-l-4 border-amber-300 !text-amber-200 font-medium"
                  : "hover:bg-amber-700/60 hover:border-l-4 hover:border-amber-300/60 !text-white"
              }`}
            >
              {tab.icon}
              <span>{tab?.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-16 pt-4 border-t border-amber-700/50">
          <div className="text-amber-200/70 text-xs">
            <p>© 2025 Caffio Admin</p>
            <p className="mt-1">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const path = useLocation().pathname;

  // Don't show sidebar on login page
  const isLoginPage = path.includes("login");

  if (isLoginPage) {
    return (
      <div
        className="min-h-screen bg-gray-50 w-screen"
        style={{ margin: 0, padding: 0, scrollbarWidth: "none" }}
      >
        <Outlet />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 w-screen flex"
      style={{ margin: 0, padding: 0, scrollbarWidth: "none" }}
    >
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 bg-gray-50 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
