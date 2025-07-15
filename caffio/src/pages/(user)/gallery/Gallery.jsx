import React, { useState, useEffect } from 'react';

const galleryItemsData = [
  {
    src: '/image/gallery1.png',
    alt: 'Perfect Espresso',
    title: 'Perfect Espresso',
    description: 'The heart of every great coffee experience',
  },
  {
    src: '/image/menu10.png',
    alt: 'Latte Art Mastery',
    title: 'Latte Art Mastery',
    description: 'Where artistry meets flavor',
  },
  {
    src: '/image/gallery3.png',
    alt: 'Warm Atmosphere',
    title: 'Warm Atmosphere',
    description: 'A space designed for connection',
  },
  {
    src: '/image/gallery4.png',
    alt: 'Coffee Shop Interior',
    title: 'Coffee Shop Interior',
    description: 'Modern design meets comfort',
  },
  {
    src: '/image/gallery5.png',
    alt: 'Cold Brew Excellence',
    title: 'Cold Brew Excellence',
    description: '18 hours of patient perfection',
  },
  {
    src: '/image/gallery6.png',
    alt: 'Pour Over Ritual',
    title: 'Pour Over Ritual',
    description: 'Precision in every drop',
  },
  {
    src: '/image/gallery7.png',
    alt: 'Reading Corner',
    title: 'Reading Corner',
    description: 'Your sanctuary of solitude',
  },
  {
    src: '/image/gallery8.png',
    alt: "Barista's Stage",
    title: "Barista's Stage",
    description: 'Watch the magic unfold',
  },
  {
    src: '/image/gallery9.png',
    alt: 'Coffee Bean Selection',
    title: 'Coffee Bean Selection',
    description: 'Premium beans from around the world',
  },
  {
    src: '/image/gallery10.png',
    alt: 'Coffee Roasting',
    title: 'Coffee Roasting',
    description: 'Freshly roasted to perfection',
  },
];

export default function GallerySection() {
  const [modalImage, setModalImage] = useState(null);

  const handleOpenModal = (image) => {
    setModalImage(image);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setModalImage(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Custom keyframes for modal animation
  const modalKeyframes = `
    @keyframes modalAppear {
      0% {
        opacity: 0;
        transform: scale(0.5) rotate(-10deg);
      }
      100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }
  `;

  return (
    <>
      <style>{modalKeyframes}</style>
      <section className="text-center py-20 px-5 bg-gradient-to-b from-black to-amber-950" id="Gallery">
        <h2 className="container mx-auto px-6 py-12 relative z-10 text-5xl md:text-6xl lg:text-8xl font-light tracking-widest mb-4 bg-gradient-to-r from-yellow-600 via-yellow-100 to-yellow-600 bg-clip-text text-transparent animate-pulse">
          Gallery
        </h2>
        <p className="text-lg opacity-80 max-w-xl mx-auto leading-relaxed text-white">
          Discover the artistry and passion behind every cup. From handcrafted beverages to cozy moments, explore the visual story of our coffee sanctuary.
        </p>
      </section>

      <section className="px-5 pb-24 bg-gradient-to-b from-amber-950 to-black">
        <div className="max-w-full mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          {galleryItemsData.map((item, index) => (
            <div
              key={index}
              className="mb-6 rounded-2xl overflow-hidden relative cursor-pointer transition-transform duration-500 hover:scale-105 hover:rotate-1 bg-white/5 backdrop-blur border border-yellow-700/10 hover:shadow-2xl hover:shadow-yellow-600/30 hover:z-10"
              onClick={() => handleOpenModal(item)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto transition-transform duration-700 sepia-20 contrast-110 hover:sepia-0 hover:contrast-125 hover:brightness-110 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/90 via-amber-800/80 to-black/90 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center px-5 transform translate-y-5 hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl mb-2 text-white drop-shadow-md">{item.title}</h3>
                  <p className="text-white/90 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-xl"
          onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
        >
          <div className="relative max-w-[90%] max-h-[90%] rounded-3xl overflow-hidden shadow-2xl"
               style={{ animation: 'modalAppear 0.8s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <button
              className="absolute top-5 right-5 bg-gradient-to-br from-yellow-600 to-yellow-200 w-12 h-12 rounded-full text-amber-900 text-2xl font-bold cursor-pointer transition-transform hover:scale-125 hover:rotate-90 shadow-lg z-10"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              src={modalImage.src}
              alt={modalImage.alt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}