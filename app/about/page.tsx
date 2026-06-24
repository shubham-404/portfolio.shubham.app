"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Education, Interest, ViewType } from '../types';
import Link from 'next/link';

interface AboutViewProps {
  onChangeView?: (view: ViewType) => void;
}

export default function AboutView({ onChangeView }: AboutViewProps) {
  const [education, setEducation] = useState<Education[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eduRes, intRes] = await Promise.all([
          fetch('/data/education.json'),
          fetch('/data/interests.json')
        ]);
        
        if (!eduRes.ok || !intRes.ok) {
          throw new Error('Failed to load portfolio details.');
        }

        const eduData = await eduRes.json();
        const intData = await intRes.json();
        
        setEducation(eduData);
        setInterests(intData);
      } catch (err: any) {
        setError(err?.message || 'Error occurred while loading data.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="py-12 border border-error bg-error-container text-on-error-container p-6 text-center font-sans">
        <p className="font-bold">METADATA SYNC FAILED</p>
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
      {/* Profile Bio Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 border-b border-outline-variant pb-16">
        <div className="col-span-12 md:col-span-4">
          <p className="font-display text-xs text-outline uppercase tracking-widest mb-2">01 // Identity</p>
          <h2 className="font-display text-5xl font-bold tracking-tighter uppercase text-primary">BIO</h2>
        </div>
        <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
          <p className="font-sans text-lg text-on-surface-variant leading-relaxed mb-6">
            I am a software engineer and student at <span className="text-on-surface font-bold">The National Institute of Engineering (NIE)</span>. My focus lies in building scalable software systems that address complex real-world challenges. 
          </p>
          <p className="font-sans text-base text-on-surface-variant leading-relaxed">
            As the lead of the <span className="text-primary font-bold underline decoration-1 underline-offset-4">AIML Club</span>, I orchestrate technical initiatives that bridge the gap between academic theory and industry application, fostering a community of innovation and high-performance engineering on campus.
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-12">
        <div>
          <p className="font-display text-xs text-outline uppercase tracking-widest mb-2">02 // Pedigree</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface italic">
            Education
          </h2>
        </div>

        <div className="space-y-16">
          {education.map((item, index) => (
            <div key={item.id} className="space-y-8">
              {/* Optional featured image for universities (like the one shown for NIE Mysuru) */}
              {item.image && (
                <div className="w-full h-48 overflow-hidden border border-outline-variant">
                  <img 
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700" 
                    src={item.image} 
                    alt={item.institution} 
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8">
                <div className="md:col-span-2">
                  <span className="font-display text-2xl font-bold border border-primary rounded-full w-14 h-14 flex items-center justify-center text-primary leading-none select-none">
                    0{index + 1}
                  </span>
                </div>

                <div className="md:col-span-10 space-y-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">
                    {item.institution}
                  </h3>
                  
                  <p className="font-display text-xs font-bold text-secondary uppercase tracking-widest">
                    {item.period} • {item.degree}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-4 py-1 rounded-full border border-outline text-sans text-xs font-semibold text-on-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>

              {index < education.length - 1 && (
                <div className="border-t border-outline-variant opacity-30 pt-4" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Interests / Focus Areas Section */}
      <section className="bg-surface-container-highest border border-outline-variant p-6 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Section Left Title Column */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <p className="font-display text-xs text-outline uppercase tracking-widest mb-2">03 // Focus Domains</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface leading-none">
                INTE<br />—<br />RESTS
              </h2>
            </div>

            {/* Architectural decorative asset */}
            <div className="hidden md:block aspect-[4/3] w-full border border-outline-variant overflow-hidden select-none">
              <img 
                className="w-full h-full object-cover grayscale" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaAu5IKRe6V9WFxyW6T1naMA-r2dKi0np-KKcpfOfvGpmeK-WUvwvpifO-nOt7R4-V9w3NV0G6JoXS2Vzi-Qj-J_S98OI2UO2lNlvIaFkJ5e1V0qc1XSOaehEdzgm0DODpQWQpFcOH4sJwfbe9ssqhAmcNRBfRCMIccXGXNtEzmvoN5T8pJB1HxaI1cnrRb1ftgXwT3wwk9-COJb4NAAPBZJIv3KHPqNIAAg5-m_yReSiSk3zXgQtN3w4tF58_pSaS2EHTc3nk2Jsl"
                alt="Minimalist abstract generative grid" 
              />
            </div>
          </div>

          {/* Focus grids */}
          <div className="md:col-span-7 flex flex-col gap-1 bg-outline-variant border border-outline-variant">
            {interests.map((int) => (
              <div 
                key={int.id}
                className="bg-surface p-6 sm:p-8 flex flex-col gap-4 group hover:bg-primary transition-colors duration-500 cursor-default"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-display text-xl sm:text-2xl font-bold uppercase text-on-surface group-hover:text-surface transition-colors">
                    {int.title}
                  </h4>
                  <span className="material-symbols-outlined text-primary group-hover:text-surface transition-colors text-3xl">
                    {int.icon}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed group-hover:text-surface-container-low transition-colors">
                  {int.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* View Services Navigation Button */}
      {onChangeView && (
        <section className="flex justify-center pt-4">
          <Link 
            href="/services"
            className="px-10 py-5 bg-primary text-on-primary hover:bg-secondary hover:text-surface font-display text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer flex items-center gap-3"
          >
            <span>View Services</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </section>
      )}
    </motion.div>
  );
}
