"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType, Service, Project } from './types';
import Tooltip from './_components/Tooltip';
import Link from 'next/link';

interface HomeViewProps {
  onChangeView: (view: ViewType) => void;
}

let hasShownBanner = false;

export default function HomeView({ onChangeView }: HomeViewProps) {
  const [bannerVisible, setBannerVisible] = useState(!hasShownBanner);
  const [services, setServices] = useState<Service[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!bannerVisible) return;
    hasShownBanner = true;
    const timer = setTimeout(() => {
      setBannerVisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [bannerVisible]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/data/services.json');
        if (!res.ok) {
          throw new Error('Failed to load services.');
        }
        const data = await res.json();
        setServices(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProjects = async () => {
      try {
        const res = await fetch('/data/projects.json');
        if (!res.ok) {
          throw new Error('Failed to load projects.');
        }
        const data: Project[] = await res.json();
        setFeaturedProjects(data.filter((p) => p.featured));
      } catch (err) {
        console.error(err);
      }
    };

    fetchServices();
    fetchProjects();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-16 py-8"
    >
      {/* Structural Status Banner / Progress bar from screenshot 5 */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.section 
            initial={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, border: 'none', transition: { duration: 0.6, ease: 'easeInOut' } }}
            className="border border-outline-variant bg-surface-container-low p-6 md:p-8 overflow-hidden relative"
          >
            <button 
              onClick={() => setBannerVisible(false)}
              className="absolute top-3 right-3 text-on-surface-variant hover:text-primary transition-colors text-xs font-mono uppercase tracking-widest cursor-pointer"
            >
              [Dismiss]
            </button>
            <div className="max-w-[800px] mx-auto space-y-4 text-center">
              <h2 className="font-display text-lg font-bold text-on-surface uppercase tracking-widest">
                EDITORIAL TECH PORTFOLIO
              </h2>
              <div className="h-px bg-outline-variant opacity-25 w-full" />
              
              <div className="flex justify-between items-end text-xs font-display uppercase tracking-wider font-semibold">
                <span>Core Experience Progress</span>
                <span className="text-primary font-bold">100%</span>
              </div>
              
              {/* Real progress bar */}
              <div className="w-full h-3 bg-surface border border-outline-variant rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-primary"
                />
              </div>

              <div className="flex justify-between font-mono text-[10px] text-on-surface-variant uppercase tracking-tighter pt-1 select-none">
                <span>System Active</span>
                <span>EST. 2024</span>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Hero Header Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 border-b border-outline-variant pb-16">
        <div className="col-span-12 md:col-span-8 flex flex-col justify-between">
          <div className="space-y-6">
            <span className="font-display text-xs uppercase border border-on-surface px-4 py-1.5 rounded-full inline-block tracking-widest">
              Selected Works 24/25
            </span>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-none font-bold uppercase tracking-tighter text-on-surface">
              DIGITAL <br />
              CRAFTSMAN
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 mt-12">
            <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed max-w-md">
              Specializing in the intersection of structural software architecture and sophisticated visual design. Currently exploring the boundaries of web-based editorial experiences.
            </p>
            
            <Tooltip content="Explore my services and catalog">
              <a
                href="#services"
                className="w-16 h-16 border border-on-surface rounded-full flex items-center justify-center hover:bg-on-surface hover:text-surface transition-colors duration-500 cursor-pointer group shrink-0"
              >
                <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:translate-y-1">
                  arrow_downward
                </span>
              </a>
            </Tooltip>
          </div>
        </div>

        {/* Location box matching screenshot 5 green accent */}
        <div className="col-span-12 md:col-span-4 bg-primary text-on-primary p-8 flex flex-col justify-center items-center text-center relative overflow-hidden h-[240px] md:h-auto min-h-[200px]">
          <div className="grid-overlay absolute inset-0 pointer-events-none opacity-15" />
          <div className="relative z-10 space-y-2">
            <span className="font-display text-xs uppercase tracking-[0.2em] opacity-75">Now Located In</span>
            <p className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight">
              MYSURU
            </p>
            <span className="font-sans text-xs uppercase tracking-widest opacity-80 block">India</span>
          </div>
        </div>
      </section>

      {/* Highlighted Services Section */}
      <div id="services" className="dummy w-full h-[3rem]"></div>
      <section className="space-y-8">
        <div className="border-b border-on-surface pb-3 flex justify-between items-end">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-on-surface">
            Core Services
          </h2>
          <Link href="/services"   
            className="font-display text-xs font-bold uppercase tracking-widest text-primary hover:underline cursor-pointer flex items-center gap-1.5"
          >
            <span>View All Services</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant border border-outline-variant">
          {services.map((svc, idx) => (
            <Link href={`/services`}
              className="bg-surface p-8 hover:bg-surface-container transition-colors duration-500 cursor-pointer flex flex-col justify-between h-56 group"
            >
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
                  {svc.icon}
                </span>
                <span className="font-display text-xs text-outline font-bold">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold uppercase text-on-surface group-hover:text-primary transition-colors">
                  {svc.title}
                </h3>
                <p className="font-sans text-xs text-on-surface-variant mt-2">
                  {svc.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Editorial Split Grid from screenshot 5 */}
      <section className="space-y-8">
        <div className="border-b border-on-surface pb-3">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-on-surface">
            Featured Endeavors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant border border-outline-variant">
          {featuredProjects.map((proj) => (
            <Link href={`/projects/${proj.id}`}
              key={proj.id}
              className="bg-surface p-6 sm:p-10 hover:bg-surface-container transition-colors duration-500 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-surface-container-highest mb-8 overflow-hidden border border-outline-variant">
                  <img 
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-102 group-hover:grayscale-0" 
                    src={proj.image}
                    alt={proj.title} 
                  />
                </div>
                <h3 className="font-display text-3xl font-bold uppercase text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {proj.title}
                </h3>
                <p className="font-display text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  {proj.tags.join(' / ').toUpperCase()}
                </p>
              </div>
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-outline-variant/30 select-none">
                <span className="font-display text-sm font-bold tracking-widest text-primary">VIEW SPECS</span>
                <span className="font-display text-2xl font-bold text-outline-variant">{proj.id}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA / Hire Quick Trigger */}
      <section className="bg-surface-container border border-outline-variant p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-on-surface">
            Have a project in mind?
          </h2>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed max-w-lg">
            Let's leverage modern technical architecture and pristine editorial design systems to build your next-gen SaaS product.
          </p>
        </div>
        <Link
          href="/hire-me"
           
          className="bg-secondary text-surface hover:bg-primary font-display text-sm font-semibold uppercase tracking-[0.2em] py-5 px-8 flex items-center gap-3 transition-colors shrink-0 cursor-pointer"
        >
          <span>Get In Touch</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </section>
    </motion.div>
  );
}
