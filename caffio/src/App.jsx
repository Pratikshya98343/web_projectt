import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./pages/(user)/homepage/Homepage";
import Signin from "./pages/(user)/signin/Signin";
import Signup from "./pages/(user)/signup/Signup";
import About from "./pages/(user)/about/About";
import Menu from "./pages/(user)/menu/Menu";
import ProductSection from "./pages/(user)/product/Product";
import GallerySection from "./pages/(user)/gallery/Gallery";
import ContactSection from "./pages/(user)/contact/Contact";
import CaffioAddToCart from "./pages/(user)/cart/Cart";
import Admin from "./pages/(admin)/adminlogin/Admin";
import AccountProfile from "./pages/(user)/accountProfile/AccountProfile";
import AccountSetting from "./pages/(user)/accountSetting/AccountSetting";
import AdminDashboard from "./pages/(admin)/admindashboard/AdminDashboard";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* For public users */}
        <Route path="/" element={<MainLayout />}>
          <Route exact index element={<Homepage />} />

          <Route exact path="/about" element={<About />} />

          <Route exact path="/menu" element={<Menu />} />

          <Route exact path="/product" element={<ProductSection />} />

          <Route exact path="/gallery" element={<GallerySection />} />

          <Route exact path="/contact" element={<ContactSection />} />

          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/AccountProfile" element={<AccountProfile />} />
          <Route exact path="/account-settings" element={<AccountSetting />} />
          <Route exact path="/signup" element={<Signup />} />

          <Route exact path="/cart" element={<CaffioAddToCart />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route exact index element={<AdminDashboard />} />
          <Route exact path="/admin/login" element={<Admin />} />
        </Route>

        {/* For admin */}

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
    </Router>
  );
}

export default App;
