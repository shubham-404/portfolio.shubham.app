"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/dist/client/components/navigation';
import Link from 'next/link';
import Tooltip from './Tooltip';


export default function Header()  {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const pathname = usePathname();
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant h-20 flex justify-between items-center px-6 md:px-16 transition-all duration-300">
        <Link href="/" 
          className="font-display text-2xl sm:text-3xl font-bold tracking-tighter text-on-surface uppercase hover:opacity-80 transition-opacity select-none"
        >
          shubham-404
        </Link>

        {/* Desktop Web Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-display text-sm font-semibold uppercase tracking-widest">
          {navItems.map((item) => {
const isSelected = pathname === item.href;            return (
              <Tooltip key={item.href} content={`Navigate to ${item.label}`} position="bottom">
                <Link
                  href={item.href}
                  className={`relative pb-1 cursor-pointer transition-colors duration-300 ${
                    isSelected ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {item.label}
                  {isSelected && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute left-0 bottom-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </Tooltip>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Tooltip content="Reach out for custom collaborations" position="bottom">
            <Link
              href="/hire-me"
              className={`font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 transition-all duration-300 ${
                pathname === '/hire-me'
                  ? 'bg-primary text-surface'
                  : 'bg-secondary text-on-secondary hover:bg-primary'
              }`}
            >
              Hire Me
            </Link>
          </Tooltip>
        </div>

        {/* Mobile Navigation Trigger */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(true);
          }}
          className="md:hidden flex items-center justify-center p-2 text-on-surface hover:text-primary transition-colors"
          aria-label="Open navigation menu"
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </Link>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-surface z-50 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center px-6 h-20 border-b border-outline-variant">
              <span className="font-display text-2xl font-bold tracking-tighter text-on-surface uppercase">
                shubham-404
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-on-surface hover:text-primary transition-colors"
                aria-label="Close navigation menu"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>

            {/* Main Links */}
            <div className="flex-grow flex flex-col justify-center px-10 gap-8">
              {navItems.map((item, index) => {
                const isSelected = pathname === item.href;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left font-display text-4xl sm:text-5xl uppercase tracking-tight font-bold w-fit transition-colors ${
                      isSelected ? 'text-primary' : 'text-on-surface hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Panel */}
            <div className="px-6 py-12 border-t border-outline-variant bg-surface-container-low flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-xs uppercase text-outline tracking-widest">HQ Location</span>
                  <span className="font-sans text-sm font-medium text-on-surface-variant">Mysuru, India</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-xs uppercase text-outline tracking-widest">Status</span>
                  <span className="font-sans text-sm font-medium text-on-surface-variant flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Open to projects
                  </span>
                </div>
              </div>

              <Link
                href="/hire-me"
                className="w-full py-5 bg-secondary hover:bg-primary text-surface font-display text-sm font-semibold uppercase tracking-[0.2em] transition-all flex justify-between items-center px-8"
              >
                <span>Hire Me</span>
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
