import { Link, useNavigate } from "react-router-dom"; // Link is imported but not used
import { MdLocationOn } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";

const Footer = () => {
  const navigate = useNavigate(); // useNavigate is used for handleCartClick, but handleCartClick is not called anywhere in the Footer component

  const handleCartClick = () => {
    navigate('/cart');
  };
  return (
    <footer id="contact" className="bg-[#1a0e0a] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          <div className="footer-section"> {/* 'footer-section' is a custom class, ensure it's defined in your CSS if it's meant to apply specific styles */}
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="flex items-center gap-2">
              <MdLocationOn className='h-5 w-5 text-white'/>
              Kirtipur, Kathmandu
            </p>
            <p className="flex items-center gap-2 mt-2">
              <IoCall className='h-5 w-5 text-white'/>
              +977 9712345678
            </p>
            <p className="flex items-center gap-2 mt-2">
             <IoMdMailUnread className='h-5 w-5 text-white'/>
             caffio@gmail.com
            </p>
          </div>

          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <p>Monday - Friday: 6AM - 9PM</p>
            <p>Saturday: 7AM - 10PM</p>
            <p>Sunday: 8AM - 8PM</p>
          </div>

          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <p>Stay connected for daily specials</p>
            <p>and coffee inspiration!</p>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm text-gray-400">
          © 2024 Caffio Coffee Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;