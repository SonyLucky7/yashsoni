'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, PieChart, Database, Code2, LineChart, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ProjectEntry {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  technologies: string[];
  items: string[];
  image: string;
  button?: {
    url: string;
    text: string;
  };
}

const projects: ProjectEntry[] = [
  {
    icon: LineChart,
    number: '01',
    title: 'NYC Airbnb Price Analysis',
    subtitle: 'Data Analysis & Predictive ML • 2024',
    category: 'Data Analysis / Machine Learning',
    description:
      'In-depth exploratory data analysis and price forecasting across 40,000+ NYC Airbnb listings to uncover spatial pricing drivers.',
    items: [
      'Cleaned and processed raw NYC dataset with Pandas, resolving missing values and price outliers',
      'Engineered geospatial mapping and neighbourhood pricing clusters using Folium and Seaborn',
      'Identified statistically significant relationships between borough location and room type premiums',
      'Trained a multivariate linear regression model to predict nightly listing rates with high interpretability',
    ],
    technologies: ['Python', 'Pandas', 'Seaborn', 'Folium', 'Linear Regression', 'Scikit-Learn'],
    image: 'https://yashsony.netlify.app/assets/images/Screenshot_1.png',
    button: {
      url: 'https://github.com/yashsony24',
      text: 'View Code & Notebooks',
    },
  },
  {
    icon: PieChart,
    number: '02',
    title: 'HR Analytics Dashboard',
    subtitle: 'Business Intelligence & Telemetry • 2024',
    category: 'Business Intelligence',
    description:
      'Executive-level Business Intelligence dashboard built in Power BI to monitor, diagnose, and predict employee attrition patterns.',
    items: [
      'Designed end-to-end data modeling connecting employee demographic data, tenure, and satisfaction metrics',
      'Segmented turnover probability across compensation bands, departmental roles, and promotion cycles',
      'Identified critical attrition risk factors in 2–5 year tenure bands to guide targeted retention programs',
      'Delivered automated KPI executive summaries with interactive drill-downs and department-level filters',
    ],
    technologies: ['Power BI', 'DAX', 'Data Modeling', 'Business Intelligence', 'HR Telemetry'],
    image: 'https://yashsony.netlify.app/assets/images/Screenshot_2.png',
    button: {
      url: 'https://github.com/yashsony24',
      text: 'Explore BI Implementation',
    },
  },
  {
    icon: Database,
    number: '03',
    title: 'Zomato Sales Analysis',
    subtitle: 'Database Analytics & SQL Engine • 2023',
    category: 'Data Analytics & SQL',
    description:
      'Comprehensive customer segmentation and sales telemetry analysis leveraging advanced SQL queries to drive commercial insights.',
    items: [
      'Authored complex multi-table SQL queries with CTEs, window functions, and aggregations',
      'Analyzed customer basket sizes, ordering frequency, and peak purchase time distributions',
      'Segmented top-selling cuisines and user preferences across distinct geographic demand clusters',
      'Formulated actionable recommendations for targeted membership loyalty tiers and discount incentives',
    ],
    technologies: ['SQL', 'MySQL', 'Relational Databases', 'Data Hygiene', 'Cohort Analysis'],
    image: 'https://yashsony.netlify.app/assets/images/Screenshot_3.png',
    button: {
      url: 'https://github.com/yashsony24',
      text: 'Inspect SQL Queries',
    },
  },
  {
    icon: Globe,
    number: '04',
    title: 'E-Commerce & Custom Web Platforms',
    subtitle: 'WordPress & PHP Architecture • Scalezix',
    category: 'WordPress / PHP / E-Commerce',
    description:
      'Engineered custom responsive WordPress templates and e-commerce shopping engines with production deployment pipelines.',
    items: [
      'Created custom WordPress templates tailored for responsive, fast-loading e-commerce storefronts',
      'Developed PHP backend modules for checkout workflows, product catalogs, and database management',
      'Configured end-to-end website deployment, domain DNS routing, and hosting environments',
      'Built strong software engineering foundations understanding how web interactions pipe data to relational databases',
    ],
    technologies: ['WordPress', 'PHP', 'E-commerce', 'WooCommerce', 'MySQL', 'Web Architecture'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80',
    button: {
      url: 'https://github.com/yashsony24',
      text: 'Explore Web Architecture',
    },
  },
];

const earlierProjects = [
  { title: 'Quote M', year: '2021', type: 'Web App' },
  { title: 'M Pay', year: '2021', type: 'Fintech UI' },
  { title: 'House Price Prediction', year: '2022', type: 'ML Experiment' },
];

export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isInteractingRef = useRef(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const setItemRef = useCallback((el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  }, []);

  // Stable scroll synchronization: only runs when user is NOT hovering over a card
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      // If user's mouse is anywhere over a project card, do NOT let scroll override it!
      if (isInteractingRef.current) return;

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (isInteractingRef.current) return;

        const viewportCenter = window.innerHeight * 0.45;
        let closestIdx = activeIndex;
        let minDistance = Infinity;

        itemRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          // Only evaluate cards within visible screen bounds
          if (rect.bottom > 100 && rect.top < window.innerHeight - 100) {
            const cardCenter = rect.top + Math.min(rect.height / 2, 260);
            const dist = Math.abs(cardCenter - viewportCenter);
            if (dist < minDistance) {
              minDistance = dist;
              closestIdx = idx;
            }
          }
        });

        if (closestIdx !== activeIndex) {
          setActiveIndex(closestIdx);
        }
      }, 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [activeIndex]);

  // Card hover handler: instantly switches active project and locks it open
  const handleCardActivate = (index: number) => {
    isInteractingRef.current = true;
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-28 md:py-36 container-main relative">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 -right-40 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[120px]" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-24 max-w-3xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-[2px] bg-white/40" />
          <span className="text-label text-white/50 font-mono tracking-widest uppercase text-xs font-semibold">
            SELECTED WORK
          </span>
        </div>

        <h2 className="text-display-lg font-bold tracking-tight heading-gradient uppercase text-3xl md:text-5xl lg:text-6xl mb-4 leading-[1.08]">
          THINGS I&apos;VE BUILT.
        </h2>

        <p className="text-sm md:text-base text-white/60 leading-relaxed">
          Explore production analytical models, business intelligence dashboards, SQL query engines, and full-stack web platforms. Hover over any project to inspect details.
        </p>
      </motion.div>

      {/* Interactive Timeline Stack with smooth, rock-solid cursor hover */}
      <div
        className="space-y-12 md:space-y-20"
        onMouseLeave={() => {
          // When leaving the section entirely, release interaction lock so scroll works again,
          // but NEVER close the active card!
          isInteractingRef.current = false;
        }}
      >
        {projects.map((entry, index) => {
          const isActive = index === activeIndex;
          const Icon = entry.icon;

          return (
            <div
              key={entry.number}
              ref={(el) => setItemRef(el, index)}
              onMouseEnter={() => handleCardActivate(index)}
              onMouseMove={() => handleCardActivate(index)}
              onClick={() => handleCardActivate(index)}
              aria-current={isActive ? 'true' : 'false'}
              className="group relative flex flex-col gap-5 md:flex-row md:gap-14 items-start cursor-pointer"
            >
              {/* Sticky Meta Column */}
              <div className="top-24 flex h-min w-full md:w-64 shrink-0 items-center gap-4 md:sticky z-10">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.25)] scale-105'
                        : 'bg-white/[0.04] text-white/40 border border-white/[0.06] group-hover:text-white group-hover:border-white/20'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold transition-colors ${isActive ? 'text-white' : 'text-white/40'}`}>
                        {entry.number}
                      </span>
                      <span className={`text-sm font-semibold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                        {entry.title}
                      </span>
                    </div>
                    <span className="text-xs text-white/40 font-mono mt-0.5">
                      {entry.subtitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Content Article Column */}
              <article
                className={`flex-1 w-full flex flex-col rounded-3xl border p-4 sm:p-6 md:p-8 transition-all duration-500 backdrop-blur-2xl ${
                  isActive
                    ? 'border-white/30 bg-[#111111]/95 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.06)] ring-1 ring-white/20'
                    : 'border-white/[0.07] bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.035]'
                }`}
              >
                {/* Project Image */}
                {entry.image && (
                  <div className="relative mb-6 w-full h-64 sm:h-80 md:h-[380px] rounded-2xl overflow-hidden bg-black/40 border border-white/[0.08]">
                    <img
                      src={entry.image}
                      alt={`${entry.title} visual`}
                      className={`w-full h-full object-cover object-top transition-transform duration-700 ${isActive ? 'scale-[1.02]' : 'group-hover:scale-[1.02]'}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-[#0a0a0a]/90 backdrop-blur-md border border-white/15 text-white/80">
                        {entry.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Title & Tech Badges */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3
                        className={`text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight transition-colors duration-300 ${
                          isActive ? 'heading-gradient-subtle' : 'text-white/80'
                        }`}
                      >
                        {entry.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {entry.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p
                      className={`text-sm md:text-base leading-relaxed transition-all duration-300 ${
                        isActive
                          ? 'text-white/70'
                          : 'text-white/40 line-clamp-2'
                      }`}
                    >
                      {entry.description}
                    </p>
                  </div>

                  {/* Expandable Breakdown Drawer — stays smoothly open on hover or active */}
                  <div
                    aria-hidden={!isActive}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div className="space-y-5 pt-4 border-t border-white/[0.06] mt-4">
                        {/* Highlights list */}
                        {entry.items && entry.items.length > 0 && (
                          <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">
                              Key Technical Deliverables & Methods
                            </h4>
                            <ul className="space-y-2.5">
                              {entry.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70 leading-relaxed"
                                >
                                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* All technologies pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-xs font-mono text-white/40">Full Stack:</span>
                          {entry.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action CTA Button */}
                        {entry.button && (
                          <div className="flex justify-end pt-2">
                            <Button
                              variant="default"
                              size="sm"
                              className="group h-10 px-5 rounded-xl bg-white text-black hover:bg-white/90 font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] cursor-pointer"
                              asChild
                            >
                              <a href={entry.button.url} target="_blank" rel="noreferrer">
                                {entry.button.text}
                                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* Earlier Experiments Section */}
      <div className="mt-28 md:mt-36 pt-16 border-t border-white/[0.06]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold heading-gradient-subtle tracking-tight">
              Earlier Experiments & Prototypes
            </h3>
            <p className="text-xs md:text-sm text-white/40 mt-1">
              Foundational code projects exploring payment flows, quotes, and early algorithms.
            </p>
          </div>
          <Code2 className="h-5 w-5 text-white/40" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {earlierProjects.map((p) => (
            <div
              key={p.title}
              className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors">
                  {p.title}
                </p>
                <p className="text-xs text-white/40 font-mono mt-0.5">{p.type}</p>
              </div>
              <span className="text-xs font-mono text-white/40 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05]">
                {p.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
