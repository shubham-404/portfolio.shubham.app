"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [time, setTime] = useState(new Date());

  const navItems = [
    { label: "01 // Home", href: "/" },
    { label: "02 // About", href: "/about" },
    { label: "03 // Services", href: "/services" },
    { label: "04 // Projects", href: "/projects" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  };

  return (
    <aside className="hidden lg:flex flex-col justify-between w-80 border-r border-outline-variant bg-surface-container-low h-[90svh] max-h-[90svh] p-8 fixed left-0 top-20 overflow-y-auto z-20 scrollbar-thin">
      {/* Top Part: Branding Status */}
      <div className="space-y-8">
        <div>
          <span className="font-display text-xs uppercase text-outline tracking-[0.2em] block mb-2">SYSTEM PARAMETER</span>
          <div className="flex justify-between items-center bg-surface p-4 border border-outline-variant">
  <span className="font-sans text-xs font-semibold text-on-surface">
    STATUS
  </span>

  <span className="font-sans text-xs font-bold text-primary flex items-center gap-1">
    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
    ONLINE
  </span>
</div>
        </div>

        {/* Live ticking clock */}
        <div>
          <span className="font-display text-xs uppercase text-outline tracking-[0.2em] block mb-2">LOCAL DIAGNOSTICS</span>
          <div className="space-y-2 font-mono text-[11px] text-on-surface-variant leading-relaxed bg-surface p-4 border border-outline-variant">
            <div className="flex justify-between">
              <span>CLOCK:</span>
              <span className="text-on-surface font-semibold">{formatTime(time)}</span>
            </div>
            <div className="flex justify-between">
              <span>DATE:</span>
              <span className="text-on-surface font-semibold">{formatDate(time)}</span>
            </div>
            <div className="flex justify-between">
              <span>TIMEZONE:</span>
              <span className="text-on-surface font-semibold">IST (UTC+5.5)</span>
            </div>
          </div>
        </div>

        {/* Location Indicator */}
        <div>
          <span className="font-display text-xs uppercase text-outline tracking-[0.2em] block mb-2">LOCATION</span>
          <div className="p-4 border border-outline-variant bg-surface flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">location_on</span>
            <div>
              <p className="font-sans text-xs font-bold text-on-surface">MYSURU, INDIA</p>
              <p className="font-sans text-[10px] text-outline">Available for remote worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Part: Quick Links / Section Overview */}
      <div className="pt-3">
        <span className="font-display text-xs uppercase text-outline tracking-[0.2em] block">CURATED NAVIGATION</span>
        <div className="flex flex-col border border-outline-variant bg-surface divide-y divide-outline-variant font-display text-xs uppercase tracking-widest">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
        w-full py-3 px-4 text-left hover:bg-surface-container transition-colors
        ${isActive
                    ? "font-bold text-primary pl-6"
                    : "text-on-surface-variant"}
      `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Part: Academic Footprint */}
      <div className="pt-6 border-t border-outline-variant">
        <p className="font-display text-xs font-bold uppercase tracking-widest text-on-surface mb-1">
          NIE MYSURU
        </p>
        <p className="font-sans text-[11px] text-on-surface-variant leading-normal">
          B.E. Computer Science Student <br></br> Operations Lead @Anveshan.
        </p>
      </div>
    </aside>
  );
}
