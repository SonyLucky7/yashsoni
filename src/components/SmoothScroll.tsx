'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;

    // Anchor click smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const id = anchor.getAttribute('href');
        if (id && id !== '#') {
          e.preventDefault();
          const el = document.querySelector(id);
          if (el) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(el as HTMLElement, { offset: -60 });
            } else {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // If mobile, let native scroll handle it, but keep ScrollTrigger refreshed
    if (isMobile) {
      ScrollTrigger.refresh();
      return () => {
        document.removeEventListener('click', handleAnchorClick);
      };
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll with GSAP ScrollTrigger and window scroll events
    lenis.on('scroll', () => {
      ScrollTrigger.update();
      window.dispatchEvent(new Event('scroll'));
    });

    // Drive Lenis directly via GSAP ticker for 100% frame synchronization
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Initial refresh
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      {children}
    </div>
  );
}
