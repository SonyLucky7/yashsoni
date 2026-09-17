import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-white/80 text-xs md:text-sm font-normal mb-8">
            Advanced analytics, interactive dashboards, and business intelligence models.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="text-white/80 text-xs md:text-sm font-normal mb-8">
            Statistical analysis and SQL data exploration.
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a]">
      <Timeline data={data} />
    </div>
  );
}

export default TimelineDemo;
