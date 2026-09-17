'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { OriginButton } from '@/components/ui/origin-button';

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      setVisible(scrollTop > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#projects' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.startsWith('#') ? href.slice(1) : href;
    const element = document.getElementById(targetId) || document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* iOS Floating Glass Transparent Header - Hidden on hero section, smoothly appears after hero */}
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed top-3 md:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
          >
            <nav
              aria-label="Main Navigation"
              className="pointer-events-auto w-full max-w-4xl h-14 md:h-16 px-3.5 md:px-5 rounded-full flex items-center justify-between bg-black/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/[0.18] shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(255,255,255,0.05)] transition-all"
            >
          {/* Brand Monogram / Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center font-display font-bold text-xs md:text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] group-hover:scale-105 group-hover:bg-white/[0.15] transition-transform">
              YS
            </div>
            <span className="hidden sm:inline font-display font-medium text-xs tracking-wider text-white/90 group-hover:text-white transition-colors">
              YASH SONI
            </span>
          </div>

          {/* Desktop iOS Segmented Glass Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.06] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wider text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTA: OriginButton */}
          <div className="flex items-center gap-2">
            <OriginButton
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="h-9 md:h-10 px-4 md:px-5 text-xs font-medium tracking-wider rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
            >
              RESUME ↗
            </OriginButton>

            {/* Mobile Hamburger Trigger */}
            <button
              aria-label="Open Navigation Menu"
              className="md:hidden w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white hover:bg-white/15 active:scale-95 transition-all"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>
    )}
  </AnimatePresence>

      {/* iOS Mobile Frosted Glass Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Scrim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md"
            />

            {/* iOS Floating Island Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-5 inset-x-4 max-w-sm mx-auto z-50 p-6 rounded-3xl bg-neutral-950/80 backdrop-blur-3xl border border-white/[0.18] shadow-[0_24px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.35)] flex flex-col gap-6"
            >
              {/* Header inside Sheet */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-xs text-white">
                    YS
                  </div>
                  <span className="font-display font-medium text-sm text-white">
                    Yash Soni
                  </span>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white hover:bg-white/15 active:scale-95 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium tracking-wider text-[#a0a0b8] hover:text-white hover:bg-white/[0.08] transition-all"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs text-white/30">→</span>
                  </a>
                ))}
              </nav>

              {/* Resume CTA */}
              <div className="pt-2 border-t border-white/[0.08]">
                <OriginButton
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open('/resume.pdf', '_blank');
                  }}
                  className="w-full h-11 text-xs font-medium tracking-wider rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white shadow-lg"
                >
                  <FileText size={14} className="mr-2" />
                  VIEW RESUME ↗
                </OriginButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
