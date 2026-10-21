"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export interface TimelineProps {
  data: TimelineEntry[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export const Timeline = ({
  data,
  title,
  description,
  className = "",
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndices, setActiveIndices] = useState<number[]>([0]);

  useEffect(() => {
    if (!ref.current) return;
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [data.length]);

  useEffect(() => {
    if (!ref.current || !lineRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 55%",
        end: "bottom 75%",
        scrub: 0.15,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          if (lineRef.current) {
            lineRef.current.style.transform = `scaleY(${p})`;
          }
          const count = data.length;
          const activated: number[] = [];
          for (let i = 0; i < count; i++) {
            const threshold = i / Math.max(1, count - 0.5);
            if (p >= threshold * 0.85) {
              activated.push(i);
            }
          }
          if (activated.length === 0) activated.push(0);
          setActiveIndices(activated);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [height, data.length]);

  return (
    <div
      className={`w-full bg-[#0a0a0a] dark:bg-[#0a0a0a] font-sans md:px-10 ${className}`}
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-10 md:py-16 px-4 md:px-8 lg:px-10">
        {title ? (
          <div>
            {title}
            {description && <div className="mt-4">{description}</div>}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl md:text-4xl mb-4 text-white font-display font-bold heading-gradient max-w-4xl">
              Professional Experience
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-sm">
              A timeline of my career journey and growth.
            </p>
          </div>
        )}
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-16">
        {data.map((item, index) => {
          const isPassed = activeIndices.includes(index);
          return (
            <div
              key={index}
              className="flex justify-start pt-8 md:pt-16 md:gap-8 group/item"
            >
              {/* Sticky Left Column with Minimal Milestone Dot (No outer circles) */}
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div
                  className={`h-10 absolute left-1 md:left-3 w-10 rounded-full bg-[#0a0a0a] border transition-colors duration-300 flex items-center justify-center ${
                    isPassed
                      ? "border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                      : "border-white/10"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full transition-all duration-300 ${
                      isPassed
                        ? "bg-white shadow-[0_0_8px_#ffffff]"
                        : "bg-white/20 border border-white/40"
                    }`}
                  />
                </div>

                <h3
                  className={`hidden md:block text-xl md:pl-20 md:text-4xl lg:text-5xl font-bold font-display transition-colors duration-500 ${
                    isPassed ? "text-white" : "text-white/30"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              {/* Experience Card */}
              <div
                className={`relative pl-16 pr-4 md:pl-4 w-full transition-all duration-500 ${
                  isPassed
                    ? "[&>div]:border-white/30 [&>div]:shadow-[0_12px_45px_rgba(255,255,255,0.06)]"
                    : "[&>div]:border-white/[0.08]"
                }`}
              >
                <h3
                  className={`md:hidden block text-2xl mb-4 text-left font-bold font-display transition-colors duration-500 ${
                    isPassed ? "text-white" : "text-white/40"
                  }`}
                >
                  {item.title}
                </h3>
                {item.content}
              </div>
            </div>
          );
        })}

        {/* Timeline Track Rail */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-6 md:left-8 top-0 w-[2px] bg-white/[0.08] rounded-full pointer-events-none"
        />

        {/* Luminous Travelling Fluid Beam */}
        <div
          ref={lineRef}
          style={{
            height: height + "px",
            transformOrigin: "top",
            transform: "scaleY(0)",
          }}
          className="absolute left-6 md:left-8 top-0 w-[2px] bg-gradient-to-b from-white/20 via-white/80 to-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.7)] will-change-transform pointer-events-none"
        />
      </div>
    </div>
  );
};

export default Timeline;
