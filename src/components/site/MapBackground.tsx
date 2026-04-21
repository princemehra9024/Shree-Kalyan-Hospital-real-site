import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MapBackground() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    gsap.fromTo(
      mapRef.current,
      { y: "-10%" },
      {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: mapRef.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div ref={mapRef} className="absolute inset-[-20%] w-[140%] h-[140%]">
        {/* Stylized SVG Map of Kota area */}
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full text-white/80 fill-none stroke-current stroke-[2.5]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Major Roads / Grid */}
          <path d="M0,200 Q250,220 500,200 T1000,200" />
          <path d="M0,400 Q300,380 600,400 T1000,400" />
          <path d="M0,700 Q400,720 800,700 T1000,700" />
          
          <path d="M200,0 Q220,250 200,500 T200,1000" />
          <path d="M500,0 Q480,300 500,600 T500,1000" />
          <path d="M800,0 Q820,400 800,800 T800,1000" />

          {/* Chambal River representation */}
          <path
            d="M100,-100 Q150,200 120,400 T180,700 T140,1100"
            className="stroke-sky/30 stroke-[4] stroke-dash-2"
          />

          {/* Minor Grid / Texture */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* District Highlights */}
          <circle cx="520" cy="410" r="100" className="fill-paper/5" />
          <circle cx="210" cy="650" r="150" className="fill-paper/3" />
        </svg>

        {/* The Hospital Marker (Fixed Position relative to the SVG layout) */}
        <div 
          className="absolute left-[52%] top-[41%] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing rings */}
            <div className="absolute size-24 bg-magenta/40 rounded-full animate-pulse-ring" />
            <div className="absolute size-16 bg-magenta/60 rounded-full animate-pulse-ring [animation-delay:0.5s]" />
            
            {/* The Dot */}
            <div className="relative size-4 bg-magenta rounded-full shadow-[0_0_20px_rgba(190,24,93,0.8)] animate-pulse-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}
