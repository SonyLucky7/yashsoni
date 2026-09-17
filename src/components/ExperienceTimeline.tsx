'use client';

import React from 'react';
import { Timeline, TimelineEntry } from '@/components/ui/timeline';
import { Calendar, MapPin, TrendingDown, CheckCircle2 } from 'lucide-react';

const experienceData: TimelineEntry[] = [
  {
    title: 'PRESENT',
    content: (
      <div className="w-full p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-white/80 font-semibold">
                Current Status
              </span>
            </div>
            <h4 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
              Open to Opportunities
            </h4>
            <p className="text-white/50 text-sm mt-1">
              Actively seeking Data Analyst &amp; AI roles
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-white/40 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full self-start">
            <Calendar className="w-3.5 h-3.5 text-white/40" />
            <span>2025 — PRESENT</span>
          </div>
        </div>

        <p className="text-sm text-white/50 leading-relaxed mb-4">
          Building autonomous AI workflows, advancing machine learning pipelines, and sharpening predictive analytics capabilities.
        </p>

        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-white/60">
            Analytics Leadership
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-white/60">
            AI Workflows
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-white/60">
            ML Pipelines
          </span>
        </div>
      </div>
    ),
  },
  {
    title: '2025',
    content: (
      <div className="w-full p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300">
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
              Achieved in call wait times through Looker Studio trend analytics & workforce optimization.
            </div>
          </div>
        </div>

        {/* Responsibilities & Achievements */}
        <ul className="space-y-3 mb-6">
          {[
            'Analyzed call-center telemetry including CRM records, call logs, and QA scores using Google Sheets to diagnose trends in AHT, ASA, and abandonment rate.',
            'Engineered interactive, automated dashboards in Looker Studio enabling live executive monitoring of CSAT, FCR, and agent SLA adherence.',
            'Forecasted daily and seasonal chat/call volumes through historical trend synthesis and root-cause analysis.',
            'Streamlined workforce planning by aligning agent capacity with demand forecasts, reducing idle variance across shifts.',
            'Partnered cross-functionally with QA leads to target underperforming service segments and elevate SLA fulfillment.',
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
    title: '2023',
    content: (
      <div className="w-full p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h4 className="text-2xl font-display font-bold text-white tracking-tight">
              Data Analytics Intern
            </h4>
            <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
              <span className="font-semibold text-white">Virtueinfo Soft Web</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-white/50 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full self-start">
            <Calendar className="w-3.5 h-3.5 text-white/40" />
            <span>JUN 2023 — JUL 2023</span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {[
            'Executed exploratory data analysis (EDA) and data cleansing on client datasets under senior coordinator supervision.',
            'Formulated analytical queries and data transformations to uncover operational trends and baseline performance metrics.',
            'Collaborated on result-oriented analytical reporting frameworks for ongoing business intelligence audits.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
          {['Data Analysis', 'Data Cleansing', 'Statistical Reporting', 'SQL Queries'].map((tech) => (
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
      <div className="w-full p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300">
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
            A track record of translating complex datasets into measurable operational efficiency, 15% lower wait times, and high-impact executive dashboards.
          </p>
        }
      />
    </section>
  );
}
