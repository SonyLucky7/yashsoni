"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

export interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple" | "monochrome";
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

export const Card = ({
  number,
  title,
  description,
  colorTheme = "monochrome",
  className,
  rotate,
  colors: customColors,
}: CardProps) => {
  const defaultBgColors = {
    monochrome: "bg-white/[0.04] dark:bg-white/[0.04]",
    orange: "bg-white/[0.04] dark:bg-white/[0.04]",
    blue: "bg-white/[0.04] dark:bg-white/[0.04]",
    purple: "bg-white/[0.04] dark:bg-white/[0.04]",
  };
  const defaultTextColors = {
    monochrome: "text-white dark:text-white",
    orange: "text-white dark:text-white",
    blue: "text-white dark:text-white",
    purple: "text-white dark:text-white",
  };
  const defaultBorderColors = {
    monochrome: "border-white/[0.12] dark:border-white/[0.12]",
    orange: "border-white/[0.12] dark:border-white/[0.12]",
    blue: "border-white/[0.12] dark:border-white/[0.12]",
    purple: "border-white/[0.12] dark:border-white/[0.12]",
  };

  const bgColor = customColors?.bg || defaultBgColors[colorTheme] || defaultBgColors.monochrome;
  const textColor = customColors?.text || defaultTextColors[colorTheme] || defaultTextColors.monochrome;
  const borderColor = customColors?.border || defaultBorderColors[colorTheme] || defaultBorderColors.monochrome;

  return (
    <div
      className={`relative w-full md:w-[280px] transition-transform duration-300 hover:z-30 hover:scale-105 max-md:!rotate-0 ${rotate} ${className}`}
    >
      <div className="bg-[#131317] dark:bg-[#131317] p-2 rounded-[25px] shadow-[0_20px_40px_rgba(0,0,0,0.7)] border border-white/[0.1]">
        <Pin className={`w-8 h-8 text-white/80 z-20 mb-5 mx-auto`} />
        <div
          className={`${bgColor} border ${borderColor} rounded-[15px] p-[18px] h-full flex flex-col relative overflow-hidden backdrop-blur-md`}
        >
          <span className="text-white font-mono font-bold text-3xl mb-4 tracking-tighter">
            {number}
          </span>
          <h3 className="text-xl font-bold font-display text-white tracking-tight leading-snug mb-2">
            {title}
          </h3>
          <p className="text-white/60 text-xs sm:text-sm/5 leading-relaxed tracking-normal font-sans">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple" | "monochrome";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

export const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-6" },
  {
    className: "md:absolute md:top-[120px] md:right-[15%]",
    rotate: "-rotate-6",
  },
  { className: "md:absolute md:top-[450px] md:left-[15%]", rotate: "rotate-6" },
  {
    className: "md:absolute md:top-[570px] md:right-[10%]",
    rotate: "-rotate-6",
  },
  { className: "md:absolute md:top-[850px] md:left-[15%]", rotate: "rotate-6" },
];

export default function HowItWorks({
  features,
  className = "",
  stepPositions,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: "WEB DEVELOPMENT",
      description: "Frontend architecture, responsive UI components, and modern web application interfaces.",
      colorTheme: "monochrome",
    },
    {
      title: "DATA ANALYTICS",
      description: "Exploratory data analysis, SQL data querying, statistical synthesis, and automated pipelines.",
      colorTheme: "monochrome",
    },
    {
      title: "BUSINESS INTELLIGENCE",
      description: "Executive dashboards in Looker Studio & Power BI, workforce planning telemetry, and CSAT metrics.",
      colorTheme: "monochrome",
    },
    {
      title: "DATA SCIENCE",
      description: "Predictive modeling, regression analytics, hypothesis testing, and vectorized Pandas/NumPy pipelines.",
      colorTheme: "monochrome",
    },
    {
      title: "AI & AUTOMATION",
      description: "Autonomous workflows, prompt systems, machine learning pipelines, and predictive decision engines.",
      colorTheme: "monochrome",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 1130;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 450;
  else if (data.length === 3) height = 800;
  else if (data.length === 4) height = 900;
  else height = 1130;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`bg-transparent max-md:pt-10 max-md:pb-20 md:py-16 px-4 md:px-8 relative overflow-hidden ${className}`}
      >
        {/* Subtle monochrome background grids */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="relative w-full max-w-[1000px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 1000 ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    if (index === 0)
                      return "M 290 150 C 500 150, 550 270, 710 270"; // 1 -> 2
                    if (index === 1)
                      return acc + " C 850 270, 500 350, 290 450"; // 2 -> 3
                    if (index === 2)
                      return acc + " C 290 600, 550 720, 750 720"; // 3 -> 4
                    if (index === 3)
                      return acc + " C 950 720, 500 800, 290 850"; // 4 -> 5
                    return acc;
                  }, "");
                  return (
                    <m.path
                      d={pathD}
                      stroke="rgba(255, 255, 255, 0.35)"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{
                        strokeDashoffset: -140, // Multiple of 14 (8+6) for seamless loop
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  );
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length];

              return (
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  colorTheme={step.colorTheme || "monochrome"}
                  colors={step.colors}
                  rotate={position.rotate}
                  className={position.className}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
