'use client';

import React from 'react';
import { Compass, Sparkles, Brain } from 'lucide-react';

const STYLES = `
@keyframes beyond-aurora-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.5; }
}

.beyond-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0.02) 40%,
    transparent 70%
  );
  animation: beyond-aurora-breathe 8s ease-in-out infinite alternate;
}

.beyond-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

.beyond-giant-bg-text {
  font-size: clamp(80px, 18vw, 250px);
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.09);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 70%, transparent 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.beyond-glass-pill {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 100%);
  box-shadow:
    0 10px 30px -10px rgba(0, 0, 0, 0.7),
    inset 0 1px 1px rgba(255, 255, 255, 0.12),
    inset 0 -1px 2px rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.beyond-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow:
    0 20px 40px -10px rgba(0, 0, 0, 0.8),
    inset 0 1px 1px rgba(255, 255, 255, 0.25),
    0 0 30px rgba(255, 255, 255, 0.08);
}
`;

const pillars = [
  {
    icon: Compass,
    title: 'Driven by Purpose',
    description: "Every dataset tells a story. I'm driven to uncover the narrative behind the numbers and translate operational complexity into clarity.",
  },
  {
    icon: Brain,
    title: 'Always Learning',
    description: 'From web architecture to statistical analytics to autonomous AI — constant curiosity and rapid self-directed mastery define my trajectory.',
  },
  {
    icon: Sparkles,
    title: 'Building Forward',
    description: 'Approaching every business problem with mathematical rigor, creative intuition, and scalable automation.',
  },
];

export default function BeyondData() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <section
        id="beyond"
        className="relative z-10 w-full overflow-hidden bg-[#0a0a0a] py-28 md:py-36 border-t border-white/[0.06]"
      >
        {/* Ambient Aurora Glow & Grid */}
        <div className="beyond-aurora absolute left-1/2 top-1/2 h-[60vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[90px] pointer-events-none z-0" />
        <div className="beyond-bg-grid absolute inset-0 z-0 pointer-events-none" />

        {/* Giant background shadow watermark name: restored to original bottom position with increased visibility */}
        <div
          className="beyond-giant-bg-text absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-center"
          aria-hidden="true"
        >
          YASH SONI
        </div>

        <div className="container-main relative z-10">
          <div className="max-w-4xl">
            {/* Latin motto text directly above "MORE THAN A RESUME." */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4">
              <span className="font-mono text-xs md:text-sm font-semibold tracking-[0.25em] text-white/90 uppercase">
                AUT INVENIAM VIAM AUT FACIAM
              </span>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span className="text-xs md:text-sm text-white/50 italic font-serif">
                &ldquo;I shall either find a way or make one.&rdquo;
              </span>
            </div>

            {/* Label */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[2px] bg-white/40" />
              <span className="text-label text-white/50 tracking-widest text-xs font-semibold">
                BEYOND THE DATA
              </span>
            </div>

            {/* Headline with metallic glow */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight heading-gradient uppercase mb-8 leading-[1.05]">
              MORE THAN A RESUME.
            </h2>

            {/* Philosophy quote callout */}
            <div className="relative mb-16 pl-6 border-l-2 border-white/30">
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 italic font-sans font-light leading-relaxed">
                &ldquo;Data is what I work with. Curiosity is what keeps me moving.&rdquo;
              </p>
            </div>
          </div>

          {/* Cards styled with glass-pill aesthetic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-8">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="beyond-glass-pill p-7 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-all duration-300"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6 text-white shadow-inner">
                      <Icon className="w-5 h-5 text-white/80" />
                    </div>

                    <h3 className="font-display font-bold text-white mb-3 text-lg tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-sm text-white/60 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
