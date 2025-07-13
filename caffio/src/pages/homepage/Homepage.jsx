import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const backgroundImages = [
  'image/welcome1.png',
  'image/welcome2.png',
  'image/welcome3.png',
];

const Welcome = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); 

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % backgroundImages.length);
    }, 1500);

    return () => clearInterval(slideTimer);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setCursorPos({
      x: clientX - window.innerWidth / 2,
      y: clientY - window.innerHeight / 1,
    });
  };

  return (
    <section
      className="h-screen w-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-amber-900 to-black"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0">
        {backgroundImages.map((imagePath, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url(${imagePath})`,
              transform: `scale(${idx === activeSlide ? 1.05 : 1.1}) translate(${cursorPos.x * 0.01}px, ${cursorPos.y * 0.01}px)`
            }}
          />
        ))}

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-amber-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-9">
        <div className="text-center max-w-5xl">

          {/* Coffee Icon */}
          <div className="mb-6 relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <span className="text-3xl" role="img" aria-label="coffee">☕</span>
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto border-2 border-amber-400 rounded-full animate-ping opacity-20" />
          </div>

          {/* Welcome Title */}
          <h1 className="text-7xl md:text-8xl font-black text-white mb-6 relative">
            <span className="inline-block transform hover:scale-105 transition-transform duration-300 cursor-default">
              Welcome
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300 cursor-default">
              to Caffio
            </span>
          </h1>

          {/* Tagline */}
          <div className="relative mb-8">
            <p className="text-2xl md:text-3xl text-amber-100 font-light tracking-wide">
              Where Every Cup Tells a Story
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Premium Beans', 'Artisan Roasted', 'Fresh Daily'].map((badge, position) => (
              <div
                key={badge}
                className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${position * 0.2}s` }}
              >
                {badge}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Menu Button */}
            <button
              className="group relative px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              onClick={() => navigate('/menu')} // Navigate to Menu page
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Explore Menu
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>

            {/* Gallery Button */}
            <button
              className="group relative px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              onClick={() => navigate('/gallery')} // Navigate to Gallery page
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                View Gallery
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;