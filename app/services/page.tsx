"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Service, ViewType } from '../types';
import Tooltip from '../_components/Tooltip';
import Link from 'next/link';

interface ServicesViewProps {
  onChangeView: (view: ViewType) => void;
}

export default function ServicesView({ onChangeView }: ServicesViewProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/data/services.json');
        if (!res.ok) {
          throw new Error('Failed to load services metadata.');
        }
        const data = await res.json();
        setServices(data);
      } catch (err: any) {
        setError(err?.message || 'Error occurred while loading services.');
      }
    };

    fetchServices();
  }, []);

  const coreTech = [
    'AWS', 'Docker', 'Jenkins', 'Kubernetes', 'React', 'Node.js', 'Python', 'GraphQL', 'Terraform'
  ];

  if (error) {
    return (
      <div className="py-12 border border-error bg-error-container text-on-error-container p-6 text-center font-sans">
        <p className="font-bold">SERVICES LOAD FAILED</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-16 py-8"
    >
      {/* Title Header */}
      <section className="border-b border-outline-variant pb-12">
        <span className="ml-2 font-display text-xs uppercase tracking-widest text-secondary block mb-2">What I Do</span>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase font-bold tracking-tighter text-on-surface">
          Services
        </h1>
      </section>

      {/* Services Grid (Bento/Card Outlines) */}
      <section className="bg-primary-container text-on-primary-container border border-outline-variant overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-outline-variant">
          {services.map((svc) => (
            <div 
              key={svc.id}
              className="bg-primary-container p-8 flex flex-col justify-between aspect-square md:aspect-auto hover:bg-[#59694e] hover:text-white transition-colors duration-300 min-h-[300px]"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="font-display text-4xl font-bold opacity-60 leading-none select-none">
                  {svc.id}
                </span>
                <span className="material-symbols-outlined text-3xl">
                  {svc.icon}
                </span>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-bold uppercase leading-none">
                  {svc.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm opacity-85 leading-relaxed">
                  {svc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Infrastructure Tech Stack Section */}
      <section className="py-12 border-b border-outline-variant">
        <div className="flex flex-col md:flex-row md:items-center gap-8 justify-between">
          <div className="md:w-1/3 space-y-2">
            <span className="font-display text-xs uppercase tracking-widest text-outline block">Tech Stack</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-on-surface">
              Core Infrastructure
            </h2>
          </div>
          <div className="md:w-2/3 flex flex-wrap gap-2.5">
            {coreTech.map((tech) => (
              <Tooltip key={tech} content={`Core proficiency in ${tech}`} position="top">
                <span className="px-5 py-2.5 border border-outline rounded-full font-display text-xs uppercase tracking-widest text-secondary hover:bg-surface-container transition-colors duration-200 cursor-default select-none font-semibold">
                  {tech}
                </span>
              </Tooltip>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Precision Editorial Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="col-span-12 md:col-span-5 space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase leading-tight text-on-surface">
            Engineered with Precision
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
            My approach blends mathematical rigor with editorial design. Every line of code is treated as a component of a larger machine, optimized for scalability, durability, and aesthetic coherence.
          </p>
          <Link 
            href="/projects"
            className="w-full py-4 border border-on-surface font-display text-xs font-semibold uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-colors duration-300 cursor-pointer"
          >
            View Works
          </Link>
        </div>

        {/* High contrast server macro photo */}
        <div className="col-span-12 md:col-span-7 aspect-[4/3] bg-surface-container relative overflow-hidden border border-outline-variant">
          <img 
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuByN_jPvmRBZFmwEBGNb2WVmvstSjcsW14dkHeUKMXu88NsmGJSEt3Xj-9RdCYG8nJIHL5i3OXQ23cgNZB9jh1BV2jA2vB5rpilvZyZipf64KxZx19gy_SRMnBaThDqi9_GAYXhQLGT-D0O0Pwjdb24Iy1mpfUZXPJ8PXLKyc5zSPY4tVix_3Ai1FaqE2boKrTZpBtaJpW0REq6lO5vL2KHSW0pifWXnsIk5_bKydmS78G-sB3SU1xCocndDibm45Li6vvia4FFN0H9" 
            alt="Meticulously wired high-end server rack hardware" 
          />
        </div>
      </section>
    </motion.div>
  );
}
