import React from 'react';

export default function About() {
  return (
    <section id="About" className="relative min-h-screen bg-gradient-to-br from-[#2C1810] via-[#8B4513] to-[#D2691E] text-white overflow-hidden pt-24">
   
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-200 rounded-full blur-2xl animate-bounce"></div>
      </div>
      <div className="container mx-auto px-6 py-12 relative z-10"> 
        {/* Hero Title */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-orange-200 via-white to-orange-300 bg-clip-text text-transparent animate-pulse">
            ABOUT US
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Enhanced Text Section */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-orange-400 to-yellow-400 rounded-full"></div>
              <div className="pl-8">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-orange-200">Our Story</h3>
                <p className="text-xl md:text-2xl leading-relaxed mb-6 text-gray-100">
                  Founded in <span className="text-orange-300 font-bold text-3xl">2015</span>, Caffio has been serving the finest coffee experiences to our community. We source our beans directly from sustainable farms around the world, ensuring every cup supports both quality and ethical practices.
                </p>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-100">
                  Our master baristas are passionate about their craft, creating not just beverages, but <span className="text-yellow-300 font-semibold">moments of joy</span> in every cup. Whether you're starting your day or taking a peaceful break, we're here to make it special.
                </p>
              </div>
            </div>
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-orange-400/20 hover:bg-black/30 transition-all duration-300">
                <div className="text-4xl font-black text-orange-300 mb-2">9+</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Years Strong</div>
              </div>
              <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-orange-400/20 hover:bg-black/30 transition-all duration-300">
                <div className="text-4xl font-black text-yellow-300 mb-2">50K+</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Happy Customers</div>
              </div>
              <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-orange-400/20 hover:bg-black/30 transition-all duration-300">
                <div className="text-4xl font-black text-orange-200 mb-2">25+</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Coffee Varieties</div>
              </div>
            </div>
          </div>
          {/* Enhanced Image Section */}
          <div className="relative">
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative bg-black rounded-3xl overflow-hidden">
                <img
                  src="image/about.png"
                  alt="Artisan coffee brewing process"
                  className="w-full h-[600px] object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Floating text overlay */}
                <div className="absolute bottom-6 left-6 right-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30">
                    <h4 className="text-2xl font-bold text-orange-200 mb-2">Crafted with Passion</h4>
                    <p className="text-gray-200">Every cup tells a story of dedication, quality, and love for the perfect brew.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Mission Section */}
        <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-12 border border-orange-400/20 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold mb-8 text-orange-200">Our Mission</h3>
            <p className="text-2xl md:text-3xl leading-relaxed text-gray-100 max-w-4xl mx-auto mb-12">
              To create <span className="text-yellow-300 font-bold">extraordinary coffee experiences</span> that bring people together, support sustainable farming practices, and celebrate the artistry of coffee craftsmanship in every single cup we serve.
            </p>
          </div>
          {/* Mission Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-orange-200 mb-4">Quality Excellence</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                We meticulously select and roast premium beans to ensure every cup delivers an exceptional taste experience that exceeds expectations.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-green-200 mb-4">Sustainability</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                We partner with ethical farms and implement eco-friendly practices to protect our planet while supporting coffee-growing communities worldwide.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16,4C18.11,4 20.11,4.87 21.66,6.38C23.22,7.89 24.1,9.89 24.1,12C24.1,14.11 23.22,16.11 21.66,17.62C20.11,19.13 18.11,20 16,20H8C5.87,20 3.84,19.16 2.34,17.66C0.84,16.16 0,14.13 0,12C0,9.87 0.84,7.84 2.34,6.34C3.84,4.84 5.87,4 8,4H16M16,6H8C6.67,6 5.4,6.53 4.46,7.46C3.53,8.4 3,9.67 3,11C3,12.33 3.53,13.6 4.46,14.54C5.4,15.47 6.67,16 8,16H16C17.33,16 18.6,15.47 19.54,14.54C20.47,13.6 21,12.33 21,11C21,9.67 20.47,8.4 19.54,7.46C18.6,6.53 17.33,6 16,6Z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-purple-200 mb-4">Community</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                We create warm, welcoming spaces where relationships flourish, conversations flow, and every guest becomes part of our extended coffee family.
              </p>
            </div>
          </div>
        </div>
        {/* Values Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 backdrop-blur-sm rounded-3xl p-8 border border-orange-400/20">
            <h4 className="text-3xl font-bold text-orange-200 mb-6">Our Values</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-xl font-semibold text-white">Passion for Perfection</span>
                  <p className="text-gray-300 mt-1">Every detail matters in our pursuit of the perfect cup</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-xl font-semibold text-white">Authentic Relationships</span>
                  <p className="text-gray-300 mt-1">Building genuine connections with our customers and partners</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-xl font-semibold text-white">Innovation & Tradition</span>
                  <p className="text-gray-300 mt-1">Honoring classic techniques while embracing new possibilities</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-sm rounded-3xl p-8 border border-green-400/20">
            <h4 className="text-3xl font-bold text-green-200 mb-6">Our Promise</h4>
            <div className="space-y-6">
              <p className="text-xl text-gray-100 leading-relaxed">
                When you choose Caffio, you're not just buying coffee – you're investing in a movement that values quality, sustainability, and community impact.
              </p>
              <div className="bg-black/30 rounded-2xl p-6 border border-green-400/20">
                <p className="text-lg text-green-100 italic text-center">
                  "Every bean tells a story, every cup creates a moment, and every visit builds a lasting memory."
                </p>
                <p className="text-sm text-green-300 text-center mt-3">— The Caffio Team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}