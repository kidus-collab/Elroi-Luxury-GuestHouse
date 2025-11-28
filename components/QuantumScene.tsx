
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Beautiful images from Elroi Luxury Guesthouse
const heroImages = [
  "/images/hero-1.jpg",  // Wide living room view with green accents
  "/images/hero-2.jpg",  // Dining area with door view
  "/images/hero-3.jpg",  // Dining table with fruit basket
  "/images/hero-4.jpg",  // Full living and dining overview
];

export const HeroSlideshow: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds per image for better viewing
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-stone-900">
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 3,
            ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for smoother animation
          }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[index]}
            alt="Elroi Guest House"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-4">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-16 bg-elroi-gold opacity-100' : 'w-8 bg-white/40 hover:bg-white/60'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
