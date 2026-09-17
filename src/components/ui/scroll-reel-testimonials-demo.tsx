"use client";

import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";

const TESTIMONIALS = [
  {
    quote: "Big effort - high quality. Best Framer content out there.",
    author: "Jan Dittrich",
    image:
      "https://cdn.21st.dev/assets/mirror/52/5216da152597678ee4f7cab615388a50ee8aa802c43e5faba6bcf909fe0efafc.jpg",
    alt: "Portrait of Jan Dittrich",
  },
  {
    quote:
      "I'm building a new website and it's absolutely ridiculous how valuable your content has been.",
    author: "Michael Riddering",
    image:
      "https://cdn.21st.dev/assets/mirror/c0/c0c060c53a1cd5b3d59a402b9b361d3fb8fdec13271d174282c6700cb7258bdd.jpg",
    alt: "Portrait of Michael Riddering",
  },
  {
    quote: "Way too much value for free to be honest.",
    author: "James Traf",
    image:
      "https://cdn.21st.dev/assets/mirror/37/37f69283028651a2e72bc9ed9486be14d8101f1d8444d4ea23462964a5c68d22.jpg",
    alt: "Portrait of James Traf",
  },
];

export default function DemoOne() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <ScrollReelTestimonials testimonials={TESTIMONIALS} />
    </div>
  );
}

export { DemoOne };
