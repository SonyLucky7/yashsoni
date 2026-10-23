'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ExternalLink, X } from 'lucide-react';

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-resume', handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-resume', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#111114] border border-white/15 rounded-2xl md:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden z-10"
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#0c0c0f]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm md:text-base text-white tracking-tight">
                    Yash Soni — Resume
                  </h3>
                  <p className="text-[11px] font-mono text-white/50 hidden sm:block">
                    Data Analyst &amp; AI Specialist · Updated October 2026
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Primary Download Button */}
                <a
                  href="/resume.pdf"
                  download="Yash_Soni_Resume.pdf"
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs md:text-sm hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>

                {/* Open in New Tab Button */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white border border-white/10 text-xs transition"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>New Tab</span>
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close resume viewer"
                  className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 flex items-center justify-center text-white/70 hover:text-white active:scale-95 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="relative flex-1 w-full bg-[#0a0a0d] min-h-[55vh] md:min-h-[72vh] overflow-hidden">
              <iframe
                src="/resume.pdf#view=FitH"
                title="Yash Soni Resume"
                className="w-full h-full min-h-[55vh] md:min-h-[72vh] border-0"
              />

              {/* Mobile Helper Bar (visible on touch/small devices where iframes may need fallback) */}
              <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-2xl">
                <a
                  href="/resume.pdf"
                  download="Yash_Soni_Resume.pdf"
                  className="text-xs font-semibold text-white flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  Download Resume
                </a>
                <span className="text-white/30">·</span>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/70 flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open Full
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
