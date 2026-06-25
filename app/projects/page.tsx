"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import Tooltip from '../_components/Tooltip';
import Link from 'next/link';

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/data/projects.json');
        if (!res.ok) {
          throw new Error('Failed to load projects data.');
        }
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err?.message || 'Error occurred while loading projects.');
      }
    };

    fetchProjects();
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (error) {
    return (
      <div className="py-12 border border-error bg-error-container text-on-error-container p-6 text-center font-sans">
        <p className="font-bold">GALLERY LOAD FAILED</p>
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
      {/* Archive Header */}
      <section className="border-b border-outline-variant pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl space-y-4">
            <span className="ml-2 font-display text-xs uppercase tracking-widest text-primary block">
              Archive 2025-26
            </span>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight text-on-surface leading-none">
              SELECTED<br />PROJECTS
            </h1>
          </div>
          <div className="max-w-xs md:pb-3">
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              A curated exhibition of engineering solutions, from distributed systems to machine learning pipelines. Built with precision and aesthetic rigor.
            </p>
          </div>
        </div>
      </section>

      {/* Projects List Timeline */}
      <section className="space-y-24">
        {projects.map((proj) => (
          <article 
            key={proj.id} 
            className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 relative border-b border-outline-variant/35 pb-16 last:border-b-0 last:pb-0"
          >
            {/* Project Image Card */}
            <div className="col-span-12 md:col-span-7 lg:col-span-8 overflow-hidden border border-outline-variant group cursor-pointer bg-surface-container">
              <img 
                className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-102"
                src={proj.image} 
                alt={`${proj.title} Preview`} 
              />
            </div>

            {/* Project Text Specs */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-outline-variant/20 pb-2">
                  <span className="font-display text-4xl text-outline-variant font-bold">
                    {proj.id}
                  </span>
                  <span className="font-display text-xs uppercase text-outline tracking-wider font-semibold">
                    TIMELINE: {proj.year}
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-on-surface tracking-tight leading-none">
                  {proj.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {expanded[proj.id] || proj.description.length <= 135
                    ? proj.description
                    : `${proj.description.slice(0, 135)}...`}
                  {proj.description.length > 135 && (
                    <Link
                      href="#"
                      className="text-primary hover:text-secondary font-bold ml-1.5 focus:outline-none cursor-pointer text-xs uppercase tracking-widest font-display inline-block"
                    >
                      {expanded[proj.id] ? '...less' : '...more'}
                    </Link>
                  )}
                </p>

                {/* Tags rounded badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3.5 py-1 rounded-full border border-outline text-sans text-xs font-semibold text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Anchors */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Tooltip content="Explore case study documentation">
                  <a 
                    href={proj.url}
                    className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-primary hover:text-on-surface group/lnk transition-colors"
                  >
                    <span>View Case Study</span>
                    <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover/lnk:translate-x-1">
                      arrow_forward
                    </span>
                  </a>
                </Tooltip>

                <Tooltip content="Browse GitHub code repository">
                  <a 
                    href={proj.sourceUrl}
                    className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary group/src transition-colors"
                  >
                    <span>Source Code</span>
                    <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover/src:-translate-y-0.5 group-hover/src:translate-x-0.5">
                      code
                    </span>
                  </a>
                </Tooltip>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination component from screenshot 4 */}
      <section className="pt-12 border-t border-outline-variant flex justify-between items-center select-none font-display">
        <div className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant">
          Page 01 / 01
        </div>
        <div className="flex gap-4">
          <button 
            disabled 
            className="p-4 border border-outline-variant bg-surface text-on-surface opacity-30 cursor-not-allowed hover:bg-surface-container transition-colors"
            aria-label="Previous page"
          >
            <span className="material-symbols-outlined leading-none">chevron_left</span>
          </button>
          <button 
            disabled 
            className="p-4 border border-outline-variant bg-surface text-on-surface opacity-30 cursor-not-allowed hover:bg-surface-container transition-colors"
            aria-label="Next page"
          >
            <span className="material-symbols-outlined leading-none">chevron_right</span>
          </button>
        </div>
      </section>
    </motion.div>
  );
}
