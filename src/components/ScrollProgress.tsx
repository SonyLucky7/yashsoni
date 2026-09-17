'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed right-3 top-0 h-full w-[2px] z-40 hidden md:block bg-white/5 origin-top">
      <motion.div
        className="w-full bg-gradient-to-b from-white/80 to-white/30 origin-top"
        style={{ scaleY, height: '100%' }}
      />
    </div>
  );
}
