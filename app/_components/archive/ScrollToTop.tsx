"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 10, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full border border-on-surface bg-surface text-on-surface flex items-center justify-center cursor-pointer shadow-md hover:bg-on-surface hover:text-surface transition-colors duration-300 active:scale-95 group"
          aria-label="Scroll to top"
        >
          <span className="material-symbols-outlined transition-transform duration-300 group-hover:-translate-y-0.5">
            arrow_upward
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
