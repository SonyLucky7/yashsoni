'use client';

import React from 'react';
import { ParallaxComponent } from '@/components/ui/parallax-scrolling';

export default function ParallaxDemo() {
  return (
    <div className="w-full relative">
      <ParallaxComponent />
      <div className="osmo-credits py-6 text-center bg-[#0a0a0a] border-t border-white/10">
        <p className="osmo-credits__p text-xs text-white/40">
          Resource by <a target="_blank" rel="noopener noreferrer" href="https://www.osmo.supply/" className="osmo-credits__p-a text-white/60 underline">Osmo</a>
        </p>
      </div>
    </div>
  );
}

export { ParallaxDemo as Demo };
