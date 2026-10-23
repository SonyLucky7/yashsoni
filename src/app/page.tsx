'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const Navbar = dynamic(() => import('@/components/Navbar'));
const About = dynamic(() => import('@/components/About'));
const DataInMotion = dynamic(() => import('@/components/DataInMotion'));
const DataStory = dynamic(() => import('@/components/DataStory'));
const CareerStory = dynamic(() => import('@/components/CareerStory'));
const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline'));
const ProjectShowcase = dynamic(() => import('@/components/ProjectShowcase'));
const SkillsSystem = dynamic(() => import('@/components/SkillsSystem'));
const BeyondData = dynamic(() => import('@/components/BeyondData'));
const Education = dynamic(() => import('@/components/Education'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));
const FloatingDock = dynamic(() => import('@/components/FloatingDock'), { ssr: false });
const AppleHelloIntro = dynamic(() => import('@/components/AppleHelloIntro'), { ssr: false });
const ResumeModal = dynamic(() => import('@/components/ResumeModal'), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <AppleHelloIntro />
      <ResumeModal />
      <ScrollProgress />
      <Navbar />

      <Hero />

      <main className="relative z-10 bg-[#0a0a0a]">
        <About />
        <DataInMotion />
        <DataStory />
        <CareerStory />
        <ExperienceTimeline />
        <ProjectShowcase />
        <SkillsSystem />
        <BeyondData />
        <Education />
        <Testimonials />
        <Contact />
      </main>

      <FloatingDock />
      <Footer />
    </SmoothScroll>
  );
}
