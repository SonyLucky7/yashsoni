'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollReelTestimonials, ScrollReelTestimonial } from '@/components/ui/scroll-reel-testimonials';

const TESTIMONIALS: ScrollReelTestimonial[] = [
  {
    quote:
      "Yash built automated Looker Studio dashboards that gave our stakeholders real-time visibility into AHT, ASA, and abandonment metrics. His workforce planning work directly cut call wait times by 15%. Dependable, sharp, and always a step ahead.",
    author: "Rohan Deshmukh — Ops & Workforce Analytics Lead, TELUS Digital",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    alt: "Rohan Deshmukh",
  },
  {
    quote:
      "Fast, disciplined, and genuinely curious about the 'why' behind the numbers. Whether writing SQL queries or cleaning messy datasets, Yash executed with precision and needed minimal oversight. He asks the right questions before writing a single line.",
    author: "Pooja Varma — Senior Analytics Coordinator, Virtueinfo Soft Web",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    alt: "Pooja Varma",
  },
  {
    quote:
      "Yash quickly mastered our template architecture and deployment pipelines. His software engineering background gives him a real edge as an analyst — he understands how data is generated and piped under the hood.",
    author: "Chirag Shah — Founder & Technical Director, Scalezix Technologies",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    alt: "Chirag Shah",
  },
  {
    quote:
      "His predictive regression modeling and Power BI dashboards showed rigor well beyond coursework standards. Yash consistently bridges theory with practical insight — exactly the kind of thinking industry needs.",
    author: "Prof. S. K. Joshi — Project Guide, IT Dept, Indus University",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    alt: "Prof. S. K. Joshi",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative z-10 w-full overflow-hidden bg-[#0a0a0a] py-28 md:py-36"
    >
      <div className="container-main relative">
        {/* Header — minimal, no icons, no numbered labels */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-white/40" />
            <span className="text-label text-white/50 tracking-widest text-xs font-semibold">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-3xl md:text-[44px] lg:text-[52px] font-display font-bold heading-gradient leading-[1.1] tracking-tight max-w-2xl">
            Kind words from people
            <br />
            I&apos;ve worked with.
          </h2>
        </motion.div>

        {/* Scroll Reel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <ScrollReelTestimonials
            testimonials={TESTIMONIALS}
            charStaggerMs={6}
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

