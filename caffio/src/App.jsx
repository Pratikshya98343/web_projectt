import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/about/About";
import Menu from "./pages/menu/Menu";
import ProductSection from "./pages/product/Product";
import GallerySection from "./pages/gallery/Gallery";
import ContactSection from "./pages/contact/Contact";
import CaffioAddToCart from "./pages/cart/Cart";
import Admin from "./pages/adminlogin/Admin"; 
import AccountProfile from "./pages/AccountProfile/AccountProfile";
import AccountSetting from "./pages/AccountSetting/AccountSetting";

function App() {
  return (
    <Router>
      <Header /> {/* Header will appear on all pages */}
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={<Homepage />} />

        {/* About Route */}
        <Route path="/about" element={<About />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/product" element={<ProductSection />} />

        <Route path="/gallery" element={<GallerySection />} />

        <Route path="/contact" element={<ContactSection />} />

        {/* Signin Route */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/adminlogin" element={<Admin />} />
        <Route path="/AccountProfile" element={<AccountProfile />} />
        <Route path="/account-settings" element={<AccountSetting />} />

        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} />

        <Route path="/cart" element={<CaffioAddToCart />} />

        {/* 404 Page Not Found Route */}
        <Route
          path="*"
          element={
            <div className="fixed inset-0 bg-red-100 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <p className="text-xl text-red-500">Page Not Found</p>
                <p className="text-red-400 mt-2">
                  The page you're looking for doesn't exist.
                </p>
              </div>
            </div>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;