import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully! (This is a demo)');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-5"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-amber-800 container mx-auto px-6 py-12 relative z-10">   
          CONTACT US
        </h1>
        <div className="w-24 h-1 bg-orange-400 mx-auto rounded-full mb-6"></div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          We'd love to hear from you! Get in touch with us for any questions about our services, 
          reservations, or just to say hello.
        </p>
      </div>
      
      {/* Main Contact Container */}
      <div className="max-w-6xxl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info Section */}
          <div className="bg-orange-50 rounded-3xl p-12 shadow-lg">
            <h3 className="text-4xl font-bold text-gray-800 mb-10">Get In Touch</h3>
            
            {/* Map Container */}
            <div className="relative overflow-hidden rounded-xl mb-8">
              <img 
                src="/image/map.png" 
                alt="Caffio Location Map"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Additional Info */}
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl text-center shadow-sm">
                <p className="text-gray-600 text-lg leading-relaxed">
                  We're here to help! Send us a message using the form and we'll get back to you as soon as possible. 
                  For immediate assistance, please check our footer for contact details and business hours.
                </p>
              </div>
              
              <div className="p-6 bg-orange-100 rounded-xl text-center">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Special Events & Catering</h4>
                <p className="text-gray-600">
                  Planning a special event? We offer catering services and private bookings. 
                  Let us know your requirements in the message form!
                </p>
              </div>
            </div>
          </div>
          
          {/* Form Section */}
          <div className="bg-blue-50 rounded-3xl p-12 shadow-lg">
            <h2 className="text-4xl font-bold text-gray-800 mb-10">
              Send Us a Message
            </h2>
            
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-200"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-200"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-200"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-4 px-6 bg-orange-400 hover:bg-orange-500 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}