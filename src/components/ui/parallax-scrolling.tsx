'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const heroEl = parallaxRef.current;
    if (!heroEl) return;

    const layer1 = heroEl.querySelector('[data-parallax-layer="1"]');
    const layer2 = heroEl.querySelector('[data-parallax-layer="2"]');
    const layer3 = heroEl.querySelector('[data-parallax-layer="3"]');
    const layer4 = heroEl.querySelector('[data-parallax-layer="4"]');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      });

      if (layer1) tl.to(layer1, { yPercent: 40, ease: "none", force3D: true }, 0);
      if (layer2) tl.to(layer2, { yPercent: 28, ease: "none", force3D: true }, 0);
      if (layer3) tl.to(layer3, { yPercent: 18, ease: "none", force3D: true }, 0);
      if (layer4) tl.to(layer4, { yPercent: 8, ease: "none", force3D: true }, 0);
    }, heroEl);

    // Refresh after all hero images load
    const images = heroEl.querySelectorAll('img');
    let loadedCount = 0;
    images.forEach(img => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === images.length) {
            ScrollTrigger.refresh();
          }
        }, { once: true });
      }
    });

    if (loadedCount === images.length) {
      ScrollTrigger.refresh();
    }

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            {/* Layer 1: Background */}
            <img
              src="/hero/hero_layer_1.webp"
              loading="eager"
              width="800"
              data-parallax-layer="1"
              alt=""
              className="parallax__layer-img"
            />

            {/* Layer 2: Midground */}
            <img
              src="/hero/hero_layer_2.webp"
              loading="eager"
              width="800"
              data-parallax-layer="2"
              alt=""
              className="parallax__layer-img"
            />

            {/* Layer 3: Title (Renamed from Parallax to Yash Soni, no extra text) */}
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">Yash Soni</h2>
            </div>

            {/* Layer 4: Foreground */}
            <img
              src="/hero/hero_layer_4.webp"
              loading="eager"
              width="800"
              data-parallax-layer="4"
              alt=""
              className="parallax__layer-img"
            />
          </div>
          {/* No shade overlay */}
        </div>
      </section>
    </div>
  );
}

export default ParallaxComponent;
