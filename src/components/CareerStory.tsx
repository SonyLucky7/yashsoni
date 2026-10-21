'use client';

import React from 'react';
import HowItWorks, { Step } from '@/components/ui/how-it-works';

const journeySteps: Step[] = [
  {
    title: "WEB DEVELOPMENT",
    description: "2022 · Built foundational web systems, WordPress & e-commerce applications, and frontend responsive UI layouts.",
    colorTheme: "monochrome",
  },
  {
    title: "DATA ANALYTICS",
    description: "2023 · Advanced data manipulation, statistical EDA, exploratory pipelines, and complex SQL querying on live datasets.",
    colorTheme: "monochrome",
  },
  {
    title: "BUSINESS INTELLIGENCE",
    description: "2024 · Architected Looker Studio & Power BI dashboards, monitored CSAT/FCR metrics, and cut call wait times by 15%.",
    colorTheme: "monochrome",
  },
  {
    title: "DATA SCIENCE",
    description: "2024 · Geospatial modeling with Folium, pricing regression algorithms, and vectorized Pandas & NumPy analytical workflows.",
    colorTheme: "monochrome",
  },
  {
    title: "AI & AUTOMATION",
    description: "2025 · Present · Decision Science Practitioner at Accenture — enterprise analytics, AI-enabled reporting workflows, and machine learning pipelines.",
    colorTheme: "monochrome",
  },
];

export default function CareerStory() {
  return (
    <section id="career" className="relative w-full py-16 md:py-24 container-main mx-auto z-10">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center gap-3">
          <span className="w-10 h-[2px] bg-white/40" />
          <span className="text-label text-white/50 tracking-widest text-xs font-semibold">
            THE JOURNEY
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold heading-gradient tracking-tight">
          The Evolution of Experience.
        </h2>
        <p className="text-white/50 text-sm md:text-base max-w-xl">
          A visual trajectory tracking my growth from early web development into quantitative analytics, business intelligence, data science, and modern AI automation.
        </p>
      </div>

      <div className="relative w-full">
        <HowItWorks features={journeySteps} />
      </div>

      <p className="italic text-white/40 text-xs sm:text-sm text-center mt-6">
        * A visual representation of my continuous learning path and evolving professional focus.
      </p>
    </section>
  );
}
