"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SectionLoaderProps {
  title: string;
  statusText: string;
}

export default function SectionLoader({ title, statusText }: SectionLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const safeProgress = Math.min(progress, 100);

  return (
    <div className="relative border border-outline-variant bg-surface-container-low p-8 md:p-12 overflow-hidden my-6">
      {/* Scanline Effect */}
      <div className="scanline-effect" />
      {/* Editorial Tech Grid overlay */}
      <div className="grid-overlay absolute inset-0 pointer-events-none opacity-20" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-display text-xs uppercase tracking-widest text-primary font-bold">
              SYSTEM FETCHING // {title}
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold uppercase text-on-surface">
            {statusText}
          </h3>
          <p className="font-mono text-[11px] text-outline uppercase tracking-wider">
            GET_ASSETS_PAYLOAD :: THREAD_POOL_ACTIVE
          </p>
        </div>

        <div className="text-right font-display font-bold text-5xl md:text-6xl tracking-tighter tabular-nums flex items-baseline shrink-0">
          <span>{safeProgress.toString().padStart(2, '0')}</span>
          <span className="text-xl ml-1 font-medium text-primary">%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-[1px] bg-outline-variant mt-8 relative">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-150 ease-out" 
          style={{ width: `${safeProgress}%` }}
        />
      </div>

      <div className="flex justify-between font-mono text-[9px] text-outline uppercase tracking-tighter pt-2 select-none">
        <span>EST_CON_ID :: 0x8F9A</span>
        <span>STATUS: {safeProgress === 100 ? 'READY' : 'FETCHING'}</span>
      </div>
    </div>
  );
}
