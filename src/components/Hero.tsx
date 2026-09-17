'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ParallaxComponent = dynamic(
  () => import('@/components/ui/parallax-scrolling').then((m) => m.ParallaxComponent),
  { ssr: false }
);

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <ParallaxComponent />
    </section>
  );
}
