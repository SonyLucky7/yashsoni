"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    title?: string;
    subtitle?: string;
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;  // Reduced from 100
const IMG_HEIGHT = 85; // Reduced from 140

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
    title = "View",
    subtitle = "Details",
}: FlipCardProps) {
    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}

            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`hero-${index}`}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-900 flex flex-col items-center justify-center p-2 border border-gray-700"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-white/80 uppercase tracking-widest mb-1">{title}</p>
                        <p className="text-[10px] font-medium text-white line-clamp-2">{subtitle}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000; // Virtual scroll range

// Unsplash Images
const IMAGES = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80",
    "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80",
];

// Experience card metadata mapping to showcase Yash's work
const CARD_DATA = [
    { title: "TELUS Digital", subtitle: "15% Wait Time Reduction" },
    { title: "Analytics", subtitle: "Looker Studio Dashboards" },
    { title: "Optimization", subtitle: "Workforce Planning" },
    { title: "Quality QA", subtitle: "CSAT & FCR Monitoring" },
    { title: "Virtueinfo", subtitle: "Data Analytics Intern" },
    { title: "Scalezix", subtitle: "Web Developer Intern" },
    { title: "Python", subtitle: "Data Pipelines & Models" },
    { title: "SQL", subtitle: "Complex Query Optimization" },
    { title: "Power BI", subtitle: "Interactive Executive BI" },
    { title: "Airbnb NYC", subtitle: "Price Prediction Model" },
    { title: "HR Analytics", subtitle: "Employee Attrition BI" },
    { title: "Zomato", subtitle: "Sales & Behavior Analysis" },
    { title: "Gift City", subtitle: "Gandhinagar Operations" },
    { title: "Forecasting", subtitle: "Call & Chat Volumes" },
    { title: "SLA Adherence", subtitle: "Compliance & Metrics" },
    { title: "Machine Learning", subtitle: "Predictive Intelligence" },
    { title: "WordPress & PHP", subtitle: "Scalezix Deployments" },
    { title: "Data Cleaning", subtitle: "Pandas & NumPy ETL" },
    { title: "Automation", subtitle: "AI-Powered Workflows" },
    { title: "B.Tech IT", subtitle: "Indus University" },
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export interface ScrollMorphHeroProps {
    className?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    isDark?: boolean;
}

export default function ScrollMorphHero({
    className = "",
    title = "Work in Motion",
    subtitle = "Scroll through analytical milestones & verified impact",
    description = "Interactive 3D view of roles, datasets, and enterprise solutions.",
    isDark = true,
}: ScrollMorphHeroProps) {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        // Initial set
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            // Check if scrolling inside component
            const delta = e.deltaY;
            const current = scrollRef.current;
            const next = Math.min(Math.max(current + delta, 0), MAX_SCROLL);
            
            // Only prevent default if we are actively progressing through the virtual scroll
            if ((delta > 0 && current < MAX_SCROLL) || (delta < 0 && current > 0)) {
                e.preventDefault();
                scrollRef.current = next;
                virtualScroll.set(next);
            }
        };

        // Touch support
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            const current = scrollRef.current;
            const next = Math.min(Math.max(current + deltaY, 0), MAX_SCROLL);

            if ((deltaY > 0 && current < MAX_SCROLL) || (deltaY < 0 && current > 0)) {
                e.preventDefault();
                touchStartY = touchY;
                scrollRef.current = next;
                virtualScroll.set(next);
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation (Shuffling)
    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    // --- Render Loop State ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div 
            ref={containerRef} 
            className={`relative w-full h-full min-h-[500px] overflow-hidden rounded-2xl ${
                isDark ? "bg-[#0d0d14] text-[#f0f0f5]" : "bg-[#FAFAFA] text-gray-900"
            } ${className}`}
        >
            {/* Background grid overlay */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text (Fades out during morph) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-4">
                    <motion.h3
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className={`text-xl md:text-3xl font-medium tracking-tight ${isDark ? "text-white" : "text-gray-800"}`}
                    >
                        {title}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.7 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-3 text-xs font-bold tracking-[0.2em] text-white/50 uppercase"
                    >
                        SCROLL / HOVER TO EXPLORE CARDS
                    </motion.p>
                </div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[8%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">
                        FLIP CARDS FOR HIGHLIGHTS
                    </span>
                    <h3 className={`text-2xl md:text-4xl font-bold tracking-tight mb-2 heading-gradient`}>
                        {title}
                    </h3>
                    <p className={`text-xs md:text-sm max-w-md leading-relaxed text-white/60`}>
                        {subtitle}
                    </p>
                </motion.div>

                {/* Cards Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 70;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // A. Circle Position
                            const circleRadius = Math.min(minDimension * 0.35, 280);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // B. Bottom Arc Position
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.3 : 1.05);
                            const arcApexY = containerSize.height * (isMobile ? 0.38 : 0.28);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 95 : 120;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.3 : 1.6,
                            };

                            // C. Interpolate
                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        const cardMeta = CARD_DATA[i % CARD_DATA.length];

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                                title={cardMeta.title}
                                subtitle={cardMeta.subtitle}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export { ScrollMorphHero as IntroAnimation };
