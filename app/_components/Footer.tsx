import React from 'react';
import Tooltip from './Tooltip';
import { ViewType } from '../types';

interface FooterProps {
  onChangeView?: (view: ViewType) => void;
}

export default function Footer({ onChangeView }: FooterProps) {
  const socialLinks = [
    { label: 'Github', url: 'https://github.com/shubham-404', icon: 'code' },
    { label: 'Email', url: 'mailto:shubh.shubhamkrsingh@gmail.com', icon: 'mail' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shubham-k-singh', icon: 'link' },
  ];

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-16 py-10 gap-6 z-10 relative">
      <div className="flex flex-col items-center md:items-start gap-1">
        <div className="font-display text-xl sm:text-2xl font-bold text-on-surface uppercase tracking-tighter select-none">
          shubham-404
        </div>
        <p className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant leading-none">
          © 2024 shubham-404. ENGINEERED WITH PRECISION.
        </p>
      </div>
      
      {/* Calming Hire Me button in the footer */}
      {onChangeView && (
        <Tooltip content="Launch connection terminal" position="top">
          <button
            onClick={() => onChangeView('hire-me')}
            className="px-6 py-3 border border-on-surface text-on-surface hover:bg-primary hover:text-surface hover:border-primary font-display text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer"
          >
            Hire Me
          </button>
        </Tooltip>
      )}

      <ul className="flex gap-6 font-display text-xs uppercase tracking-widest font-semibold">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <Tooltip content={`Visit ${link.label}`} position="top">
              <a 
                href={link.url}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-on-surface hover:text-primary transition-colors duration-300 flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined text-[14px]">north_east</span>
              </a>
            </Tooltip>
          </li>
        ))}
      </ul>
    </footer>
  );
}
