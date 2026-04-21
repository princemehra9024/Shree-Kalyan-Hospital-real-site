import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { ShieldCheck, Zap, Coffee, Bed, Activity } from "lucide-react";

export const Route = createFileRoute("/facilities")({
  component: FacilitiesPage,
});

const facilitiesData = [
  {
    id: "icu",
    title: "Critical Care (ICU)",
    eyebrow: "Unit 01",
    desc: "12-bed state-of-the-art ICU with centralized monitoring and 1:1 nursing ratio for life-threatening conditions.",
    icon: Activity,
    color: "bg-navy-deep",
    accent: "text-magenta",
  },
  {
    id: "suites",
    title: "Deluxe Recovery Suites",
    eyebrow: "Unit 02",
    desc: "Hotel-grade luxury suites offering maximum privacy, patient-controlled lighting, and premium bedding.",
    icon: Bed,
    color: "bg-secondary",
    accent: "text-navy-deep",
  },
  {
    id: "ot",
    title: "Modular Operation Theater",
    eyebrow: "Unit 03",
    desc: "Precision-engineered environments with Lamina Airflow and HEPA filtration for absolute sterility.",
    icon: ShieldCheck,
    color: "bg-ink",
    accent: "text-magenta",
  },
  {
    id: "diagnostic",
    title: "Diagnostic Center",
    eyebrow: "Unit 04",
    desc: "Advanced imaging and 24/7 pathology labs providing rapid, accurate diagnostic support.",
    icon: Zap,
    color: "bg-paper",
    accent: "text-navy-deep text-ink",
  },
  {
    id: "cafeteria",
    title: "Clinical Cafeteria",
    eyebrow: "Unit 05",
    desc: "Nutritional excellence tailored by clinical dietitians to accelerate healing and provide comfort.",
    icon: Coffee,
    color: "bg-magenta",
    accent: "text-paper",
  },
];

function FacilitiesPage() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = horizontalRef.current?.children;
    if (!horizontalRef.current || !sections || !containerRef.current) return;

    const totalWidth = horizontalRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    
    const scrollTween = gsap.to(horizontalRef.current, {
      x: -(totalWidth - windowWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-paper min-h-screen">
      <SiteNav />
      
      <PageHero 
        chapter="04"
        eyebrow="Precision Infrastructure"
        title={
          <>
            <span className="block italic font-light">Quiet Precision.</span>
            <span className="block -mt-4">High Standards.</span>
          </>
        }
        intro="An 'editorial tour' through our premium healthcare environments, designed for both medical excellence and patient tranquility."
      />

      {/* Main Horizontal Section */}
      <div ref={containerRef} className="relative h-screen overflow-hidden bg-navy-deep">
        <div 
          ref={horizontalRef} 
          className="flex h-full w-fit"
        >
          {facilitiesData.map((item, index) => (
            <div 
              key={item.id} 
              className={`w-[100vw] h-full flex flex-col justify-center px-12 md:px-24 py-32 border-r border-white/5 ${item.color}`}
            >
               <div className="max-w-4xl">
                 <p className={`font-display italic text-6xl md:text-9xl mb-8 opacity-20 ${item.accent}`}>
                   {item.eyebrow}
                 </p>
                 <item.icon className={`size-16 md:size-24 mb-12 ${item.accent} opacity-80`} />
                 <h2 className={`font-display text-5xl md:text-8xl tracking-tight leading-[0.9] mb-12 ${item.accent.includes('text-ink') ? 'text-navy-deep' : 'text-paper'}`}>
                   {item.title.split(' ').map((word, i) => (
                     <span key={i} className={i % 2 === 1 ? 'italic font-light' : ''}>
                       {word}{' '}
                     </span>
                   ))}
                 </h2>
                 <p className={`text-xl md:text-2xl font-light leading-relaxed max-w-2xl opacity-70 ${item.accent.includes('text-ink') ? 'text-ink' : 'text-paper'}`}>
                   {item.desc}
                 </p>
                 
                 <div className="mt-24 flex items-center gap-12">
                    <div className="flex flex-col">
                       <span className="text-[0.65rem] uppercase tracking-widest opacity-40 mb-2">Capacity</span>
                       <span className="font-display text-4xl">Available</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[0.65rem] uppercase tracking-widest opacity-40 mb-2">Staffing</span>
                       <span className="font-display text-4xl">24/7 Dedicated</span>
                    </div>
                 </div>
               </div>
            </div>
          ))}
          
          {/* Final segment leading back */}
          <div className="w-[100vw] h-full flex items-center justify-center bg-paper text-navy-deep">
             <div className="text-center">
                <h3 className="font-display text-6xl md:text-8xl mb-12">Experience <br/><span className="italic font-light text-magenta text-7xl md:text-9xl">Excellence.</span></h3>
                <a 
                  href="/contact" 
                  className="inline-block bg-magenta text-paper px-16 py-6 text-xs font-bold tracking-widest uppercase hover:bg-navy-deep transition-all duration-500 shadow-xl"
                >
                  Request A Physical Tour
                </a>
             </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-magenta/40 text-[0.65rem] tracking-[0.4em] uppercase font-bold">
           <span>Scroll to explore</span>
           <div className="w-24 h-px bg-magenta/20 overflow-hidden">
              <div className="w-full h-full bg-magenta origin-left animate-[scroll-hint_2s_infinite]" />
           </div>
        </div>
      </div>

      <section className="py-24 md:py-48 px-6 md:px-12 lg:px-24">
         <div className="grid grid-cols-12 gap-x-6 gap-y-24 items-end">
            <div className="col-span-12 lg:col-span-5">
               <h3 className="font-display text-4xl md:text-7xl leading-[0.85] tracking-tighter">
                 Designed for <br/><span className="italic font-light text-magenta">Healing.</span>
               </h3>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
               <p className="text-2xl font-light leading-relaxed text-ink/70">
                 Our facility is more than just walls and technology—it is a carefully crafted ecosystem 
                 engineered to reduce stress, optimize clinical flow, and ensure every patient 
                 within our care feels the weight of our legacy.
               </p>
            </div>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}
