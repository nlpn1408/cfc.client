// components/Slideshow.js
"use client";
import { useState } from 'react';

const images = [
  '/product/product4.png',
  '/product/product2.png',
  // Add more images as needed
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden">
        <img src={images[currentIndex]} alt={`Slideshow image ${currentIndex + 1}`} className="w-full h-96 object-cover transition-all duration-500"/>
      </div>

      {/* Navigation Buttons */}
      <button onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-md opacity-25 hover:opacity-100 transition">
        &#8249;
      </button>
      <button onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-md opacity-25 hover:opacity-100 transition">
        &#8250;
      </button>
    </div>
  );
}
