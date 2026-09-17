"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

interface AppleHelloIntroProps {
  onComplete?: () => void;
  speed?: number;
}

export default function AppleHelloIntro({
  onComplete,
  speed = 1.1,
}: AppleHelloIntroProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleFinish = useCallback(() => {
    setIsVisible(false);
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Prevent scrolling while intro is active
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  // Safety timer so the user is never blocked if tab was in background
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 4200);

    return () => clearTimeout(safetyTimer);
  }, [handleFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="apple-hello-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(14px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleFinish}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07070b] text-white cursor-pointer select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px] pointer-events-none" />

          {/* Animated Apple Cursive "hello" */}
          <div className="relative z-10 scale-110 md:scale-125">
            <AppleHelloEnglishEffect
              speed={speed}
              className="text-[#f6f6f8] drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] h-20 md:h-24"
              onAnimationComplete={() => {
                // Brief pause for aesthetic appreciation, then pop out
                setTimeout(() => {
                  handleFinish();
                }, 500);
              }}
            />
          </div>

          {/* Subtle Skip Prompt */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-10 text-xs tracking-widest text-[#a0a0b8] font-mono uppercase"
          >
            Click anywhere to skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
