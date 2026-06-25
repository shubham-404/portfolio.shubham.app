"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoaderProps {
  key?: React.Key;
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing core workspace...');

  useEffect(() => {
    // Stage status texts
    const statuses = [
      'Establishing context...',
      'Synchronizing portfolio assets...',
      'Loading typographic frameworks...',
      'Rendering editorial grids...',
      'Initializing system components...',
      'Workspace active.',
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 2;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText(statuses[statuses.length - 1]);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }

        // Change status text depending on progress
        const stage = Math.floor((next / 100) * statuses.length);
        if (statuses[stage]) {
          setStatusText(statuses[stage]);
        }

        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-surface flex flex-col justify-between p-6 md:p-16 overflow-hidden">
      {/* Scanline Effect */}
      <div className="scanline-effect" />
      {/* Editorial Tech Grid overlay */}
      <div className="grid-overlay absolute inset-0 pointer-events-none opacity-40" />

      {/* Loader Header */}
      <div className="relative z-10 flex justify-between items-start border-b border-on-surface/10 pb-4">
        <div>
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">System Status</p>
          <p className="font-sans text-xs mt-1 font-medium tracking-tight text-primary">Core.Init() : Active</p>
        </div>
        <div className="text-right">
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Portfolio version</p>
          <p className="font-sans text-xs mt-1 font-medium tracking-tight">v. 2.0.26</p>
        </div>
      </div>

      {/* Main Big Counter */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="font-display text-[9vw] sm:text-[8vw] md:text-[6vw] font-bold tracking-tighter leading-none uppercase text-on-surface text-center"
          >
            shubham-404
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-2">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-xs sm:text-sm tracking-[0.4em] uppercase text-on-surface-variant text-center"
          >
            Crafting Code with Purpose.
          </motion.p>
        </div>
      </div>

      {/* Footer Progress Indicators */}
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="max-w-xs">
            <p className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Establishing Context</p>
            <p className="font-sans text-xs leading-normal text-on-surface/60 min-h-[36px]">
              {statusText}
            </p>
          </div>
          <div className="text-right select-none font-display font-bold text-5xl md:text-7xl leading-none tracking-tighter flex items-baseline">
            <span className="tabular-nums">{progress.toString().padStart(2, '0')}</span>
            <span className="text-2xl md:text-3xl ml-1 font-medium text-primary">%</span>
          </div>
        </div>

        {/* Dynamic loaded progress bar */}
        <div className="w-full h-[1px] bg-outline-variant relative">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-150 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Diagnostics console footprint */}
        <div className="flex flex-wrap justify-between gap-y-2 font-display text-[10px] uppercase tracking-tighter opacity-40">
          <span>Core.Init(Process_Secure_Buffers)</span>
          <span>Assets_Loaded: {progress === 100 ? 'TRUE' : 'FALSE'}</span>
          <span>Thread_Pool: 0xFD42A</span>
          <span>Since 2025</span>
        </div>
      </div>
    </div>
  );
}
