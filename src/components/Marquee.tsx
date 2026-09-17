'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({ children, speed = 30, reverse = false, className = '' }: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex w-full ${className}`}>
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        className="flex w-max shrink-0 gap-8"
      >
        <div className="flex shrink-0 gap-8 items-center px-4">
          {children}
        </div>
        <div className="flex shrink-0 gap-8 items-center px-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
