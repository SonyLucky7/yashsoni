'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2, MapPin, Calendar, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

export default function Education() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const coursework = [
    'Data Structures & Algorithms',
    'Database Management Systems (DBMS)',
    'Introduction to Machine Learning',
    'Introduction to Artificial Intelligence',
    'Big Data Analytics',
    'Object-Oriented Programming',
  ];

  const certifications = [
    {
      title: 'Python Programming Certification',
      issuer: 'Verified Technical Credential',
      date: 'Completed',
      skills: ['Python 3', 'Pandas', 'NumPy', 'Data Cleaning', 'Automation Scripting'],
      verified: true,
    },
    {
      title: 'Power BI Certification',
      issuer: 'Udemy Certified — Business Intelligence',
      date: 'Completed',
      skills: ['Power BI Desktop', 'DAX Measures', 'Star Schema Data Modeling', 'Interactive Dashboards'],
      verified: true,
    },
  ];

  return (
    <section id="education" className="section-spacing container-main">
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-[2px] bg-white/40" />
          <span className="text-label text-white/50 tracking-widest text-xs font-semibold uppercase">
            EDUCATION &amp; CERTIFICATIONS
          </span>
        </div>
        <h2 className="text-display-lg heading-gradient font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl">
          Academic &amp; Verified Credentials.
        </h2>
        <p className="text-sm md:text-base text-white/60 mt-3 max-w-2xl font-light">
          Foundational engineering degree paired with verified industry credentials in Python data processing and enterprise Business Intelligence.
        </p>
      </div>

      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
      >
        {/* Academic Degree Card — 7 cols */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-7 rounded-3xl p-7 md:p-10 bg-white/[0.03] border border-white/[0.12] backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden group hover:border-white/25 transition-all duration-300"
        >
          {/* Subtle ambient corner glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Meta Pill Header */}
            <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/70 font-semibold">
                  BACHELOR OF TECHNOLOGY
                </span>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-white/80 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-white/40" />
                2020 — 2024
              </span>
            </div>

            {/* Degree Title & Institution */}
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mb-2">
              B.Tech in Information Technology
            </h3>

            <div className="flex items-center gap-2 text-white/70 text-sm md:text-base mb-6 font-medium">
              <MapPin className="w-4 h-4 text-white/50 shrink-0" />
              <span>Indus University, Ahmedabad</span>
            </div>

            <p className="text-xs md:text-sm text-white/60 leading-relaxed mb-8">
              Developed comprehensive foundations in computational logic, algorithmic problem-solving, relational databases, distributed systems, and applied machine learning.
            </p>
          </div>

          {/* Key Coursework Pills */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-white/40" />
              <span>Core Coursework &amp; Specializations</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {coursework.map((course) => (
                <span
                  key={course}
                  className="bg-white/[0.04] border border-white/[0.08] hover:border-white/20 px-3 py-1.5 rounded-xl text-xs text-white/80 transition-colors"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certifications Card — 5 cols */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-5 rounded-3xl p-7 md:p-9 bg-white/[0.03] border border-white/[0.12] backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between group hover:border-white/25 transition-all duration-300"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/70 font-semibold">
                  INDUSTRY CREDENTIALS
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>

            <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight mb-2">
              Verified Certifications
            </h3>
            <p className="text-xs md:text-sm text-white/50 mb-6">
              Specialized accreditations demonstrating expertise in analytical programming and enterprise BI tools.
            </p>

            {/* List of certification cards */}
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-white tracking-tight">
                      {cert.title}
                    </h4>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold shrink-0">
                      VERIFIED
                    </span>
                  </div>

                  <p className="text-xs text-white/50 font-mono mb-3">
                    {cert.issuer}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continuous learning footer footnote */}
          <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/40 font-mono">
            <span>Continuous Upskilling</span>
            <Sparkles className="w-3.5 h-3.5 text-white/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
