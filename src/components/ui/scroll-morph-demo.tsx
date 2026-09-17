"use client";

import React from "react";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";

export default function ScrollMorphDemo() {
    return (
        <div className="w-full h-[800px] border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl">
            <ScrollMorphHero />
        </div>
    );
}

export { ScrollMorphDemo as Demo };
