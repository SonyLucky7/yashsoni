'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import {
  Database,
  LineChart,
  Filter,
  BarChart2,
  TrendingUp,
  PieChart,
  LayoutDashboard,
  Gauge,
  FileSpreadsheet,
  Code2,
  Terminal,
  FileCode,
  Cpu,
  Table,
  Binary,
  Activity,
  Compass,
  Layers,
  Brain,
  Sparkles,
  Bot,
  Workflow,
  CheckCircle2,
} from 'lucide-react';

interface SkillItem {
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SkillCategory {
  id: string;
  label: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'analytics',
    label: 'ANALYTICS',
    skills: [
      { name: 'SQL', desc: 'Complex Joins, CTEs, Window Functions', icon: Database },
      { name: 'Data Analysis', desc: 'Exploratory & Hypothesis Testing', icon: LineChart },
      { name: 'Data Cleaning', desc: 'Handling Outliers, Imputation, Scaling', icon: Filter },
      { name: 'Data Visualization', desc: 'Storytelling & Visual Encodings', icon: BarChart2 },
      { name: 'Statistical Analysis', desc: 'Variance, Regression, Significance', icon: TrendingUp },
    ],
  },
  {
    id: 'bi',
    label: 'BUSINESS INTELLIGENCE',
    skills: [
      { name: 'Power BI', desc: 'DAX Measures, Data Modeling & Reports', icon: PieChart },
      { name: 'Looker Studio', desc: 'Stakeholder & Operational Dashboards', icon: LayoutDashboard },
      { name: 'Tableau', desc: 'Interactive Workbooks & Analytics', icon: Gauge },
      { name: 'Microsoft Excel', desc: 'VLOOKUP/XLOOKUP, Pivot Tables, Macros', icon: FileSpreadsheet },
    ],
  },
  {
    id: 'programming',
    label: 'PROGRAMMING',
    skills: [
      { name: 'Python', desc: 'Production Scripting & Data Pipelines', icon: Code2 },
      { name: 'JavaScript', desc: 'Web Interactivity & Frontend Logic', icon: Terminal },
      { name: 'HTML / CSS', desc: 'Modern Web Structure & Responsive Layouts', icon: FileCode },
      { name: 'C / C++', desc: 'Foundational Systems & Algorithmic Logic', icon: Cpu },
    ],
  },
  {
    id: 'data',
    label: 'PYTHON / DATA',
    skills: [
      { name: 'Pandas', desc: 'Dataframe Manipulation & Aggregation', icon: Table },
      { name: 'NumPy', desc: 'Vectorized Operations & Matrices', icon: Binary },
      { name: 'Matplotlib', desc: 'Publication-grade Plotting', icon: Activity },
      { name: 'Seaborn', desc: 'Statistical Distribution & Heatmaps', icon: LineChart },
      { name: 'Folium', desc: 'Geospatial Mapping & Coordinate Clusters', icon: Compass },
    ],
  },
  {
    id: 'db',
    label: 'DATABASE',
    skills: [
      { name: 'MySQL', desc: 'Relational Schemas, Constraints, Indexes', icon: Database },
      { name: 'MongoDB', desc: 'Document Store & JSON Aggregations', icon: Layers },
    ],
  },
  {
    id: 'ai',
    label: 'AI / DATA SCIENCE',
    skills: [
      { name: 'Machine Learning', desc: 'Supervised/Unsupervised Models', icon: Brain },
      { name: 'Predictive Analysis', desc: 'Trend Projections & Forecasting', icon: Sparkles },
      { name: 'AI & LLMs', desc: 'Prompt Engineering & Autonomous Agents', icon: Bot },
      { name: 'Automation', desc: 'Workflow Optimization & Batch Jobs', icon: Workflow },
    ],
  },
];

export default function SkillsSystem() {
  const [activeTab, setActiveTab] = useState<string>(skillCategories[0].id);
  const activeCategory = skillCategories.find((c) => c.id === activeTab) || skillCategories[0];

  return (
    <section id="skills" className="relative w-full overflow-hidden bg-[#0a0a0a]">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center justify-center pb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-white/40" />
              <span className="text-label text-white/50 tracking-widest text-xs font-semibold uppercase">
                CAPABILITIES
              </span>
              <span className="w-10 h-[2px] bg-white/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold heading-gradient tracking-tight">
              THE TOOLS I THINK WITH
            </h2>
            <p className="text-sm md:text-base text-white/50 mt-4 max-w-xl mx-auto px-4">
              A structured taxonomy of modern analytical engines, business intelligence tools, and machine learning stacks.
            </p>
          </div>
        }
      >
        <div className="h-full w-full flex flex-col justify-between bg-[#111114] border border-white/[0.08] rounded-xl p-4 md:p-6 text-white select-none">
          {/* Top Console Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/50" />
              </div>
              <span className="font-mono text-xs text-white/40 ml-2 tracking-wide hidden sm:inline">
                yash.capabilities // workstation-terminal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs text-white/60 tracking-wider">
                ENV: READY · {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} SKILLS
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="py-4 overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 min-w-max pb-1">
              {skillCategories.map((category) => {
                const isActive = activeTab === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                        : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Skills Grid */}
          <div className="flex-1 py-2 overflow-y-auto hide-scrollbar min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
              >
                {activeCategory.skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.04,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="group relative flex flex-col justify-between p-3.5 md:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/40 hover:bg-white/[0.07] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/10 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-semibold text-white tracking-wide">
                            {skill.name}
                          </span>
                        </div>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors pl-0.5">
                        {skill.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Terminal Footer */}
          <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-xs text-white/40 font-mono gap-2">
            <span className="truncate">
              active_category: <span className="text-white/80">{activeCategory.label.toLowerCase()}</span>
            </span>
            <span className="hidden sm:inline">
              STACK: <span className="text-white/70">Python · SQL · Power BI · Pandas · ML</span>
            </span>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
