"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import Tooltip from '../_components/Tooltip';

export default function HireMeView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('sending');

    // Simulated API cycle with exact feedback delay matching the screenshot scripts
    setTimeout(() => {
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');

      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  const getButtonText = () => {
    if (status === 'sending') return 'SENDING...';
    if (status === 'sent') return 'MESSAGE SENT';
    return 'Send Message';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12 py-8"
    >
      {/* Header Section */}
      <section className="border-b border-outline-variant pb-8">
        <span className="font-display text-xs text-primary uppercase block tracking-[0.2em] mb-4">CONTACT</span>
        <h1 className="font-display text-5xl sm:text-7xl leading-none font-bold uppercase tracking-tighter text-on-surface">
          LET'S BUILD <br /> SOMETHING.
        </h1>
      </section>

      {/* Main Stack Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Info Panel */}
        <div className="lg:col-span-5 bg-surface-container-low p-6 sm:p-10 border border-outline-variant flex flex-col justify-between h-full space-y-12 min-w-0 w-full max-w-full overflow-hidden">
          <div className="space-y-8 min-w-0">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-on-surface">
              CONTACT INFO
            </h2>

            <div className="space-y-6 min-w-0">
              <div className="flex flex-col min-w-0">
                <span className="font-display text-[10px] text-outline uppercase tracking-widest mb-1">Phone</span>
                <a className="font-sans text-base sm:text-lg font-semibold text-on-surface hover:text-primary transition-colors break-all" href="tel:+917991694431">
                  +91 7991694431
                </a>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-display text-[10px] text-outline uppercase tracking-widest mb-1">Email</span>
                <a className="font-sans text-base sm:text-lg font-semibold text-on-surface hover:text-primary transition-colors break-all" href="mailto:shubh.shubhamkrsingh@gmail.com">
                  shubh.shubhamkrsingh@gmail.com
                </a>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-display text-[10px] text-outline uppercase tracking-widest mb-1">Github</span>
                <a 
                  className="font-sans text-base sm:text-lg font-semibold text-on-surface hover:text-primary transition-colors break-all" 
                  href="https://github.com/shubham-404" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  github.com/shubham-404
                </a>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-display text-[10px] text-outline uppercase tracking-widest mb-1">Location</span>
                <span className="font-sans text-base sm:text-lg font-semibold text-on-surface">
                  Mysuru, India
                </span>
              </div>
            </div>
          </div>

          {/* High contrast structural architectural background block */}
          <div className="w-full aspect-[4/3] border border-outline-variant overflow-hidden select-none bg-surface-container-highest">
            <img 
              className="w-full h-full object-cover grayscale contrast-125" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhbjWg8IXHuQTyouhVraIcec4bcNGi2AC9VB4bQOQ9EJKBPrrpiFcgrl3q5ltVB3a9qiHZuuhNPva_r8bLA57Xxjb4UE97gRXve_VdddxC4vnqfh9T2NcGODdgG5pcBQaxVjVC3yhE4nIu0S16IkBRK8Y2YJsYfQcpvkVWlAo-Nt6Qh4zq73xa4E5oQi2Eewm840cuoEmZDjj_Cia_FDDoQdrntLv4SbIzNJ5SkVGRvTpI5ePXNyEBz94_VDCivu40IhrZpwaGpIL0" 
              alt="Concrete architectural patterns in India" 
            />
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="lg:col-span-7 bg-surface p-6 sm:p-10 border border-outline-variant flex flex-col justify-center">
          <div className="space-y-4 mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-on-surface">
              SEND MESSAGE
            </h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Briefly describe your project or inquiry below. I typically respond within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Input */}
            <div className="relative group">
              <label 
                htmlFor="name" 
                className="block font-display text-xs uppercase text-secondary tracking-widest mb-2 transition-colors group-focus-within:text-primary font-semibold"
              >
                Your Name
              </label>
              <input 
                id="name"
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status !== 'idle'}
                placeholder="YOUR FULL NAME"
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-sans text-base text-on-surface placeholder:text-outline transition-colors outline-none disabled:opacity-50"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <label 
                htmlFor="email" 
                className="block font-display text-xs uppercase text-secondary tracking-widest mb-2 transition-colors group-focus-within:text-primary font-semibold"
              >
                Email Address
              </label>
              <input 
                id="email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status !== 'idle'}
                placeholder="YOUR EMAIL ADDRESS"
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-sans text-base text-on-surface placeholder:text-outline transition-colors outline-none disabled:opacity-50"
              />
            </div>

            {/* Message Area */}
            <div className="relative group">
              <label 
                htmlFor="message" 
                className="block font-display text-xs uppercase text-secondary tracking-widest mb-2 transition-colors group-focus-within:text-primary font-semibold"
              >
                Message
              </label>
              <textarea 
                id="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status !== 'idle'}
                placeholder="TELL ME ABOUT YOUR PROJECT SCOPE..."
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-sans text-base text-on-surface placeholder:text-outline transition-colors outline-none resize-none disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <Tooltip content="Submit message form secure transmission" position="top">
              <button
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full py-5 font-display text-sm font-semibold uppercase tracking-[0.2em] flex justify-between items-center px-8 cursor-pointer select-none transition-all duration-300 ${
                  status === 'sent'
                    ? 'bg-primary text-surface'
                    : 'bg-secondary text-surface hover:bg-on-surface'
                } ${status !== 'idle' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span>{getButtonText()}</span>
                {status === 'idle' && (
                  <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                )}
                {status === 'sending' && (
                  <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin shrink-0" />
                )}
                {status === 'sent' && (
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                )}
              </button>
            </Tooltip>
          </form>
        </div>

      </div>
    </motion.div>
  );
}
