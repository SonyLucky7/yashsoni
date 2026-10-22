'use client';

import React from 'react';
import { Timeline, TimelineEntry } from '@/components/ui/timeline';
import { Calendar, MapPin, TrendingDown, CheckCircle2, Sparkles } from 'lucide-react';

const experienceData: TimelineEntry[] = [
  {
    title: 'PRESENT',
    content: (
      <div className="w-full p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.12] backdrop-blur-sm shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:border-white/30 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400/90 font-semibold">
                Current Role
              </span>
            </div>
            <h4 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
              Data Analyst
            </h4>
            <div className="flex flex-wrap items-center gap-2.5 text-white/70 text-sm mt-1">
              <span className="font-semibold text-white">Accenture</span>
              <span className="text-white/20">·</span>
              <span className="text-white/60">I&amp;F Decision Science Practitioner Associate</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-white/70 bg-white/[0.05] border border-white/[0.12] px-3.5 py-1.5 rounded-full self-start">
            <Calendar className="w-3.5 h-3.5 text-white/50" />
            <span>NOV 2025 — PRESENT</span>
          </div>
        </div>

        {/* Highlight Metric / Impact Callout */}
        <div className="mb-6 p-5 rounded-xl bg-white/[0.04] border border-white/15 flex items-center gap-5">
          <div className="w-14 h-14 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold heading-gradient">
              Decision Science &amp; AI Automation
            </div>
            <div className="text-xs md:text-sm text-white/60 mt-0.5">
              Driving actionable business insights, reporting automation, and scalable analytical solutions across enterprise operations.
            </div>
          </div>
        </div>

        {/* Responsibilities & Achievements */}
        <ul className="space-y-3 mb-6">
          {[
            'Performed data analysis and reporting to generate actionable business insights and support strategic decision-making.',
            'Developed and optimized dashboards, visualizations, and reporting solutions using Power BI, SQL, Python, and Advanced Excel.',
            'Contributed to reporting automation, reducing manual effort and improving operational efficiency.',
            'Applied AI-enabled technologies and automation methodologies to streamline workflows and enhance productivity.',
            'Maintained data integrity, governance, and compliance standards while ensuring reporting accuracy and reliability.',
            'Collaborated with stakeholders to translate business requirements into scalable analytical and reporting solutions.',
            'Supported business operations through enterprise applications, including Workday and ServiceNow.',
            'Drove continuous improvement through innovation, process optimization, and data-driven best practices.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Technologies Used */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
          {[
            'Power BI',
            'SQL',
            'Python',
            'Advanced Excel',
            'AI & Automation',
            'Decision Science',
            'Workday',
            'ServiceNow',
            'Reporting Automation',
            'Data Governance',
            'Strategic Insights',
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-white/70 hover:border-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2025',
    content: (
      <div className="w-full p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h4 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
              Data Analyst
            </h4>
            <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm mt-1">
              <span className="font-semibold text-white">TELUS Digital</span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1 text-white/40">
                <MapPin className="w-3.5 h-3.5" /> Gift City, Gandhinagar
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-white/50 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full self-start">
            <Calendar className="w-3.5 h-3.5 text-white/40" />
            <span>JAN 2025 — OCT 2025</span>
          </div>
        </div>

        {/* 15% Highlight Metric Callout */}
        <div className="mb-6 p-5 rounded-xl bg-white/[0.04] border border-white/15 flex items-center gap-5">
          <div className="w-14 h-14 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
            <TrendingDown className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold heading-gradient">
              15% Reduction
            </div>
            <div className="text-xs md:text-sm text-white/60 mt-0.5">
              Achieved in call wait times through Looker Studio trend analytics &amp; workforce optimization.
            </div>
          </div>
        </div>

        {/* Responsibilities & Achievements */}
        <ul className="space-y-3 mb-6">
          {[
            'Analyzed call-center data from CRM records, call logs, and QA scores in Google Sheets to identify trends in AHT, ASA, and abandonment rate; contributed to a 15% reduction in call wait times.',
            'Developed interactive Looker Studio dashboards for stakeholder monitoring of CSAT and FCR, supporting improvements in first-call resolution.',
            'Forecasted call and chat volumes through trend and root-cause analysis to support workforce planning and align agent capacity with demand.',
            'Monitored QA scores, CES, and SLA adherence; identified underperforming segments and collaborated on improvement actions.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Technologies Used */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
          {['Google Sheets', 'Looker Studio', 'Workforce Planning', 'Trend Analysis', 'CSAT Telemetry', 'Root-Cause Analysis'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-white/70 hover:border-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2024',
    content: (
      <div className="w-full p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h4 className="text-2xl font-display font-bold text-white tracking-tight">
              Android Developer Intern
            </h4>
            <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
              <span className="font-semibold text-white">Virtueinfo Soft Web PVT LTD</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-white/50 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full self-start">
            <Calendar className="w-3.5 h-3.5 text-white/40" />
            <span>MAR 2024 — SEP 2024</span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {[
            'Developed a practical groceries application using Android Studio, building responsive UI components in Kotlin and Java while aligning with modern design guidelines.',
            'Integrated RESTful APIs and optimized local data persistence using Room database and SQLite for seamless offline access.',
            'Collaborated with senior developers to debug, identify bottlenecks, and optimize app performance and memory utilization.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
          {['Kotlin', 'Java', 'Android Studio', 'Room Database', 'SQLite', 'RESTful APIs', 'Mobile Architecture'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-white/70 hover:border-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2022',
    content: (
      <div className="w-full p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h4 className="text-2xl font-display font-bold text-white tracking-tight">
              Web Developer Intern
            </h4>
            <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
              <span className="font-semibold text-white">Scalezix Technologies</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-white/50 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full self-start">
            <Calendar className="w-3.5 h-3.5 text-white/40" />
            <span>JUN 2022 — JUL 2022</span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {[
            'Engineered custom WordPress themes and e-commerce templates optimized for responsive performance.',
            'Assisted in full web deployment cycles, DNS configuration, and production hosting setup.',
            'Gained hands-on experience with PHP scripting and agile startup software delivery operations.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
          {['WordPress', 'PHP', 'HTML/CSS', 'E-commerce', 'Web Deployment'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-white/70 hover:border-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative w-full overflow-hidden bg-[#0a0a0a]">
      <Timeline
        data={experienceData}
        title={
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-white/40" />
              <span className="text-label text-white/50 tracking-widest text-xs font-semibold uppercase">
                EXPERIENCE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold heading-gradient tracking-tight">
              WHERE I&apos;VE WORKED
            </h2>
          </div>
        }
        description={
          <p className="text-white/60 text-sm md:text-base max-w-2xl font-light">
            A proven trajectory across enterprise decision science and AI-enabled reporting at Accenture, paired with 15% wait-time reduction at TELUS Digital.
          </p>
        }
      />
    </section>
  );
}
