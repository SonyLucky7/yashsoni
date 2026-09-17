'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, LineChart, Users, Compass, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    headline: "DATA ISN'T JUST NUMBERS.",
    keyword: 'FOUNDATION',
    icon: Database,
    description:
      'Raw rows, telemetry, and CRM logs are meaningless in isolation. Without rigorous cleaning, schema normalization, and domain context, data is just overhead.',
    deliverable: 'Clean Datasets & ETL Pipelines',
  },
  {
    number: '02',
    headline: "IT'S PATTERNS.",
    keyword: 'DISCOVERY',
    icon: LineChart,
    description:
      'Behind noisy distributions lie recurring cycles, seasonal shifts, and hidden correlations. Exploratory analysis reveals the true underlying structure.',
    deliverable: 'Statistical Modeling & Trend Analysis',
  },
  {
    number: '03',
    headline: "IT'S BEHAVIOR.",
    keyword: 'CONTEXT',
    icon: Users,
    description:
      'Every metric represents human reality — customer preferences, drop-off points, agent capacity, and user friction. Data translates human activity into measurable signals.',
    deliverable: 'User Engagement & Workforce Telemetry',
  },
  {
    number: '04',
    headline: "IT'S DECISIONS.",
    keyword: 'STRATEGY',
    icon: Compass,
    description:
      'Reports are only valuable if they answer high-stakes business questions. Interactive dashboards equip leadership with unambiguous clarity to choose the right path.',
    deliverable: 'Looker & Power BI Executive Dashboards',
  },
  {
    number: '05',
    headline: "IT'S ACTION.",
    keyword: 'IMPACT',
    icon: Zap,
    isAction: true,
    description:
      'Analysis without execution is wasted effort. The ultimate purpose of every query, model, and visualization is to trigger immediate, measurable operational change.',
    deliverable: 'Tangible Business Results (e.g. 15% Wait Time Reduction)',
  },
];

export default function DataStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(4); // Default highlighted on "IT'S ACTION."

  return (
    <section
      id="data-story"
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 bg-[#0a0a0a] border-y border-white/[0.06] overflow-hidden"
    >
      <div className="container-main mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 md:mb-24">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[2px] bg-white/40" />
            <span className="text-label text-white/50 tracking-widest text-xs font-semibold">
              THE DATA PHILOSOPHY
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold heading-gradient tracking-tight leading-[1.08] max-w-2xl">
              From Raw Signals <br />
              <span className="text-white/40">To Real-World Impact.</span>
            </h2>
            <p className="text-sm md:text-base text-white/50 max-w-md leading-relaxed">
              Every project follows an intentional 5-stage transformation — turning raw tabular noise into high-conviction business execution.
            </p>
          </div>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Step Selector / Manifest Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;
              const isAction = step.isAction;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? isAction
                        ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                        : 'bg-white/10 text-white border-white/30 shadow-lg'
                      : 'bg-white/[0.02] text-white/60 border-white/[0.06] hover:bg-white/[0.05] hover:text-white hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold tracking-wider px-2 py-1 rounded ${
                        isSelected
                          ? isAction
                            ? 'bg-black text-white'
                            : 'bg-white/20 text-white'
                          : 'bg-white/[0.05] text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <div
                        className={`text-[10px] font-mono tracking-widest uppercase ${
                          isSelected
                            ? isAction
                              ? 'text-black/60 font-semibold'
                              : 'text-white/60'
                            : 'text-white/30'
                        }`}
                      >
                        {step.keyword}
                      </div>
                      <h3
                        className={`text-base sm:text-lg font-display font-bold tracking-tight ${
                          isSelected
                            ? isAction
                              ? 'text-black'
                              : 'text-white'
                            : 'text-white/80'
                        }`}
                      >
                        {step.headline}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`p-2 rounded-lg transition-transform ${
                      isSelected
                        ? isAction
                          ? 'bg-black text-white scale-110'
                          : 'bg-white/20 text-white scale-110'
                        : 'text-white/30 group-hover:text-white/60'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Deep Dive Featured Display */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`p-6 sm:p-8 md:p-10 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                steps[activeStep].isAction
                  ? 'bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
                  : 'bg-white/[0.03] border-white/[0.08]'
              }`}
            >
              {/* Ghost Step Number */}
              <span className="absolute right-4 -top-8 text-[130px] sm:text-[160px] font-display font-extrabold text-white/[0.02] pointer-events-none select-none">
                {steps[activeStep].number}
              </span>

              {/* Tag & Keyword */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono font-bold text-white/50 tracking-widest uppercase">
                  PHASE {steps[activeStep].number} · {steps[activeStep].keyword}
                </span>
                {steps[activeStep].isAction && (
                  <span className="text-[10px] font-mono font-semibold text-black bg-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    PRIMARY OBJECTIVE
                  </span>
                )}
              </div>

              {/* Giant Headline */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold heading-gradient tracking-tight leading-tight mb-6">
                {steps[activeStep].headline}
              </h3>

              {/* Detailed narrative */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8">
                {steps[activeStep].description}
              </p>

              {/* Deliverable Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-white/70 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                      Tangible Deliverable
                    </span>
                    <span className="text-sm font-medium text-white/90">
                      {steps[activeStep].deliverable}
                    </span>
                  </div>
                </div>

                {activeStep < steps.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="shrink-0 flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    NEXT <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="shrink-0 flex items-center gap-1.5 text-xs font-mono text-black font-semibold bg-white px-3 py-1.5 rounded-lg hover:bg-white/90 transition-all cursor-pointer"
                  >
                    SEE PROJECTS <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Quick Summary Pill Row Below */}
            <div className="grid grid-cols-5 gap-2 mt-4">
              {steps.map((s, idx) => (
                <button
                  key={s.number}
                  onClick={() => setActiveStep(idx)}
                  className={`py-2 rounded-lg text-center transition-all cursor-pointer border ${
                    activeStep === idx
                      ? 'bg-white text-black font-bold border-white'
                      : 'bg-white/[0.02] text-white/40 border-white/[0.06] hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="text-xs font-mono block">{s.number}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
