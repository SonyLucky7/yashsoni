'use client';
import React, { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  reverse = false,
  className = '',
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { xPercent: reverse ? -50 : 0 },
      {
        xPercent: reverse ? 0 : -50,
        duration: speed,
        ease: 'none',
        repeat: -1,
      }
    );

    return () => {
      tween.kill();
    };
  }, [speed, reverse]);

  return (
    <div className={`overflow-hidden whitespace-nowrap flex w-full select-none ${className}`}>
      <div
        ref={trackRef}
        className="flex w-max shrink-0 gap-8 will-change-transform"
      >
        <div className="flex shrink-0 gap-8 items-center px-4">
          {children}
        </div>
        <div className="flex shrink-0 gap-8 items-center px-4">
          {children}
        </div>
        <div className="flex shrink-0 gap-8 items-center px-4">
          {children}
        </div>
        <div className="flex shrink-0 gap-8 items-center px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
