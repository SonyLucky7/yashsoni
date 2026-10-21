'use client';

import React from 'react';
import ScrollExpand from '@/components/ui/ScrollExpand';
import { BarChart3, Brain, TrendingUp, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const skills = [
  'SQL', 'Python', 'Power BI', 'Looker Studio', 'Pandas',
  'NumPy', 'Machine Learning', 'ETL Pipelines', 'Workforce Planning',
];

const capabilities = [
  {
    icon: BarChart3,
    title: 'Business Intelligence',
    desc: 'Interactive dashboards with Looker Studio & Power BI that turn scattered data into operational clarity.',
  },
  {
    icon: Brain,
    title: 'Predictive Analytics',
    desc: 'Regression models, data pipelines, and automated forecasting with Python & Scikit-Learn.',
  },
  {
    icon: TrendingUp,
    title: 'Operational Optimization',
    desc: 'Root-cause analysis on operational telemetry to reduce AHT and drive workforce alignment.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full pt-44 md:pt-48 pb-24 md:pb-32 container-main mx-auto z-10 overflow-visible"
    >
      {/* Section Label */}
      <div className="flex items-center gap-3 mb-12">
        <span className="w-10 h-[2px] bg-white/40" />
        <span className="text-label text-white/50 tracking-widest text-xs font-semibold">
          ABOUT
        </span>
      </div>

      {/* === 2-Column Layout === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

        {/* ─── LEFT: Clean Portrait with ScrollExpand ─── */}
        <div className="relative w-full max-w-[480px] mx-auto">
          <div className="relative w-full aspect-[3/4] min-h-[350px] sm:min-h-[480px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <ScrollExpand
              src="/yash_photo_about.jpg"
              alt="Yash Soni"
              title=""
              scrollHint=""
              overlayScrim={0}
              useWindowScroll
              mediaZoom={1.25}
              startWidth={48}
              startHeight={64}
              startRadius={24}
              endRadius={0}
              scrollDistance={1.0}
              holdDistance={0.2}
              smoothing={0.1}
              objectPosition="center 65%"
              enabled
            />
          </div>
        </div>

        {/* ─── RIGHT: About Details ─── */}
        <div className="flex flex-col gap-8">
          {/* Headline */}
          <div>
            <h2 className="text-3xl sm:text-4xl xl:text-[2.75rem] font-display font-bold heading-gradient leading-[1.1] mb-5">
              Turning Curiosity Into Data-Driven Solutions.
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              I&apos;m <span className="text-white font-medium">Yash Soni</span>, a Data Analyst at <span className="text-white font-medium">Accenture</span> 
              and AI enthusiast focused on transforming raw, noisy datasets into high-conviction 
              business intelligence, automated pipelines, and intelligent analytical solutions.
            </p>
            <p className="text-white/35 text-sm leading-relaxed mt-3">
              My work bridges empirical analytics, Business Intelligence, Python, SQL, 
              predictive modeling, automation, and Artificial Intelligence.
            </p>
          </div>

          {/* Quick Facts */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2 text-white/60">
              <MapPin size={14} className="text-white/40" />
              <span>India</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Briefcase size={14} className="text-white/40" />
              <span>Data Analyst @ Accenture</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <GraduationCap size={14} className="text-white/40" />
              <span>B.Tech IT Graduate</span>
            </div>
          </div>

          {/* Capabilities */}
          <div className="flex flex-col gap-3">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="group flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg shrink-0 border border-white/10 bg-white/[0.05] text-white/60">
                  <cap.icon size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-display font-semibold text-white/90 group-hover:text-white transition-colors">
                    {cap.title}
                  </h4>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Technologies */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-mono block mb-3">
              Core Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-white/50 bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:text-white/80 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Impact Metric */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.10]">
            <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              <span className="text-lg font-display font-bold text-white">15%</span>
            </div>
            <div>
              <div className="text-xs font-mono font-semibold text-white/70 uppercase tracking-wider">
                Proven Impact
              </div>
              <div className="text-xs text-white/40 mt-0.5 leading-snug">
                Reduction in call wait times via Looker analytics & workforce planning at TELUS Digital
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
