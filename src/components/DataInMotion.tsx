'use client';
import Marquee from './Marquee';

export default function DataInMotion() {
  const row1 = ['DATA', 'INSIGHTS', 'ANALYTICS', 'PYTHON', 'SQL', 'AI', 'AUTOMATION', 'VISUALIZATION'];
  const row2 = ['MACHINE LEARNING', 'POWER BI', 'DASHBOARDS', 'PANDAS', 'LOOKER', 'SEABORN', 'NUMPY'];
  const row3 = ['BUSINESS INTELLIGENCE', 'DATA SCIENCE', 'PREDICTIVE ANALYSIS', 'DATA CLEANING'];

  const Dot = () => <span className="text-white/30 mx-4">•</span>;

  const renderWords = (words: string[]) => {
    return words.map((word, index) => {
      const isEven = index % 2 === 0;
      return (
        <span key={index} className="flex items-center">
          <span 
            className={`font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider
            ${!isEven 
              ? 'text-transparent' 
              : 'text-white/80'}`}
            style={!isEven ? { WebkitTextStroke: '1px rgba(255,255,255,0.15)' } : {}}
          >
            {word}
          </span>
          {index < words.length - 1 && <Dot />}
        </span>
      );
    });
  };

  return (
    <section className="w-full py-12 md:py-16 overflow-hidden bg-[#0a0a0a] flex flex-col gap-4">
      <Marquee speed={25} reverse={false} className="py-3">
        {renderWords(row1)}
        <Dot />
      </Marquee>
      <Marquee speed={35} reverse={true} className="py-6">
        {renderWords(row2)}
        <Dot />
      </Marquee>
      <Marquee speed={20} reverse={false} className="py-5">
        {renderWords(row3)}
        <Dot />
      </Marquee>
    </section>
  );
}
