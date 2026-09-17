'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award } from 'lucide-react';

export default function Education() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section id="education" className="section-spacing container-main">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-[2px] bg-white/40" />
          <span className="text-label text-white/50 tracking-widest text-xs font-semibold">
            EDUCATION & CERTIFICATIONS
          </span>
        </div>
        <h2 className="text-display-lg heading-gradient font-bold">
          Academic & Verified Credentials.
        </h2>
      </div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education Side */}
          <div>
            <span className="text-label text-white/40 block mb-4">2020 — 2024</span>
            <h3 className="text-display-md heading-gradient-subtle font-bold mb-2">
              B.Tech — Information Technology
            </h3>
            <p className="text-lg text-white/60 mb-8">Indus University, Ahmedabad</p>
            
            <div className="flex flex-wrap gap-2">
              {['Data Structures', 'Intro to ML', 'Intro to AI', 'Database Management', 'Big Data Analytics'].map((course) => (
                <span
                  key={course}
                  className="bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full text-xs text-white/80"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications Side */}
          <div className="flex flex-col justify-center">
            <h4 className="text-lg font-display heading-gradient-subtle font-bold mb-6">
              Certifications
            </h4>
            
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 mb-4 flex items-center gap-4 hover:border-white/20 hover:bg-white/[0.04] transition-all">
              <div className="p-3 rounded-full bg-white/10 text-white">
                <Award size={20} />
              </div>
              <span className="text-white/90 font-medium">Python Programming Certification</span>
            </div>
            
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 flex items-center gap-4 hover:border-white/20 hover:bg-white/[0.04] transition-all">
              <div className="p-3 rounded-full bg-white/10 text-white">
                <Award size={20} />
              </div>
              <span className="text-white/90 font-medium">Power BI Certification — Udemy</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
