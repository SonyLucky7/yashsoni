"use client";

import * as React from "react";
import { useRef, useEffect, useCallback } from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import Link from "next/link";

const cn = (...args: any[]) => twMerge(clsx(args));

export interface AnimatedDockProps {
  className?: string;
  items: DockItemData[];
}

export interface DockItemData {
  link: string;
  Icon: React.ReactNode;
  target?: string;
}

export const AnimatedDock = ({ className, items }: AnimatedDockProps) => {
  // Use clientX (viewport coordinate) for fixed dock to avoid scroll mismatch
  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    // Notify all dock items to refresh their resting center coordinate once
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("dock:refresh-bounds"));
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Use clientX directly for rock-solid 60/120 FPS tracking
    mouseX.set(e.clientX);
  }, [mouseX]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(Infinity);
  }, [mouseX]);

  return (
    <motion.div
      ref={dockRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "mx-auto flex h-16 items-end gap-3 rounded-2xl bg-[#0a0a0a]/85 backdrop-blur-md border border-white/10 shadow-2xl px-3.5 pb-2.5 select-none",
        className,
      )}
      style={{ willChange: "transform" }}
    >
      {items.map((item, index) => (
        <DockItem
          key={index}
          mouseX={mouseX}
          href={item.link}
          target={item.target}
        >
          {item.Icon}
        </DockItem>
      ))}
    </motion.div>
  );
};

interface DockItemProps {
  mouseX: MotionValue<number>;
  href: string;
  target?: string;
  children: React.ReactNode;
}

export const DockItem = ({ mouseX, href, target, children }: DockItemProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const cachedCenterX = useRef<number>(0);

  // Measure center X once on mount, on hover enter, or on window resize
  const updateBounds = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      cachedCenterX.current = rect.left + rect.width / 2;
    }
  }, []);

  useEffect(() => {
    updateBounds();

    const handleRefresh = () => updateBounds();
    window.addEventListener("dock:refresh-bounds", handleRefresh, { passive: true });
    window.addEventListener("resize", handleRefresh, { passive: true });

    return () => {
      window.removeEventListener("dock:refresh-bounds", handleRefresh);
      window.removeEventListener("resize", handleRefresh);
    };
  }, [updateBounds]);

  // Smooth, high-performance distance mapping using cached center
  const distance = useTransform(mouseX, (val: number) => {
    if (!cachedCenterX.current && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      cachedCenterX.current = rect.left + rect.width / 2;
    }
    return val - cachedCenterX.current;
  });

  // Target width interpolation based on distance
  const widthSync = useTransform(distance, [-120, 0, 120], [42, 62, 42]);
  
  // Snappy spring — high stiffness + damping prevents oscillation lag
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 300,
    damping: 20,
  });

  // Icon scale derived directly from smoothly sprung width
  const iconScale = useTransform(width, [42, 62], [1, 1.25]);

  const isMail = href.startsWith("mailto:");

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target || (isMail ? undefined : "_blank")}
      rel={isMail ? undefined : "noopener noreferrer"}
      style={{ width }}
      className="aspect-square w-10.5 rounded-full bg-white text-[#0a0a0a] flex items-center justify-center shadow-sm cursor-pointer transition-colors hover:bg-neutral-200 z-10"
    >
      <motion.div
        style={{ scale: iconScale }}
        className="flex items-center justify-center w-full h-full pointer-events-none"
      >
        {children}
      </motion.div>
    </motion.a>
  );
};

export default AnimatedDock;
