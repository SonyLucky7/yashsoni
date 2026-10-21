'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import { OriginButton } from '@/components/ui/origin-button';

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleContactClick = () => {
    window.location.href = 'mailto:yashsony24@gmail.com';
  };

  return (
    <section id="contact" className="section-spacing container-main" ref={containerRef}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-14"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-[2px] bg-white/40" />
          <span className="text-label text-white/50 tracking-widest text-xs font-semibold">
            GET IN TOUCH
          </span>
        </div>
        <h2 className="text-display-lg font-bold heading-gradient leading-[1.05]">
          LET&apos;S BUILD SOMETHING <br />
          INTELLIGENT.
        </h2>
        <p className="text-xl text-white/60 mt-6 max-w-2xl font-light">
          Have a data problem, dashboard idea, or AI-powered workflow in mind?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <a
          href="mailto:yashsony24@gmail.com"
          className="inline-block"
          aria-label="Send email to yashsony24@gmail.com"
        >
          <OriginButton 
            onClick={handleContactClick}
            className="h-14 px-10 rounded-2xl text-base font-medium tracking-wide shadow-2xl group cursor-pointer"
          >
            <Mail size={20} className="text-white mr-2" />
            GET IN TOUCH
            <ArrowUpRight size={20} className="text-white/60 ml-2 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </OriginButton>
        </a>
      </motion.div>
    </section>
  );
}
