import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Phone, MapPin, X, AlertTriangle, Clock, Ambulance } from "lucide-react";

interface EmergencyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyOverlay({ isOpen, onClose }: EmergencyOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    if (isOpen) {
      gsap.set(containerRef.current, { display: "flex", opacity: 0 });
      gsap.to(containerRef.current, { 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out" 
      });
      
      gsap.fromTo(contentRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "expo.out", delay: 0.1 }
      );
      
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = "none";
          document.body.style.overflow = "";
        }
      });
    }
  }, [isOpen]);

  if (!isOpen && typeof window !== "undefined") return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-magenta text-white flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto"
      style={{ display: "none" }}
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 size-14 rounded-full border-2 border-white/20 flex items-center justify-center hover:bg-white hover:text-magenta transition-all group lg:fixed"
      >
        <X className="size-6 transition-transform group-hover:rotate-90" />
      </button>

      <div ref={contentRef} className="w-full max-w-4xl mx-auto space-y-12 py-20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-[0.3em] uppercase">
             <AlertTriangle className="size-4 text-white" />
             Emergency Protocol Active
          </div>
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85]">
            Need <span className="italic font-light">help?</span>
          </h2>
          <p className="text-xl md:text-2xl font-light text-white/80 max-w-2xl mx-auto">
            Our trauma team and ambulance services are available 24/7. Select an action below for immediate assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action Card: Call */}
          <a 
            href="tel:+918529219330" 
            className="group bg-white text-magenta p-10 flex flex-col justify-between aspect-square md:aspect-auto md:h-80 shadow-2xl hover:scale-[1.02] transition-transform"
          >
            <Phone className="size-12" />
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4">Tap to Call</p>
              <h3 className="font-display text-4xl md:text-5xl leading-none">+91 85292 19330</h3>
              <p className="mt-4 text-sm font-medium opacity-70">Direct line to Trauma Center</p>
            </div>
          </a>

          {/* Action Card: Location */}
          <a 
            href="https://maps.google.com/?q=Shree+Kalyan+Hospital+Kota" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-navy-deep text-paper p-10 flex flex-col justify-between aspect-square md:aspect-auto md:h-80 shadow-2xl hover:scale-[1.02] transition-transform"
          >
            <MapPin className="size-12 text-magenta" />
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4 text-magenta">Get Directions</p>
              <h3 className="font-display text-4xl md:text-5xl leading-none">80 Feet Link Road</h3>
              <p className="mt-4 text-sm font-medium opacity-70 italic text-magenta">Kota, Rajasthan</p>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-white/10">
          <div className="flex items-center gap-4">
             <div className="size-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Clock className="size-5" />
             </div>
             <div>
                <p className="text-[0.6rem] font-bold tracking-widest uppercase opacity-60">Avg. Wait Time</p>
                <p className="font-display text-xl">Under 10 Mins</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="size-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Ambulance className="size-5" />
             </div>
             <div>
                <p className="text-[0.6rem] font-bold tracking-widest uppercase opacity-60">Ambulance Status</p>
                <p className="font-display text-xl">4 Units Active</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="size-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <div className="size-3 bg-green-400 rounded-full animate-pulse" />
             </div>
             <div>
                <p className="text-[0.6rem] font-bold tracking-widest uppercase opacity-60">OPD Status</p>
                <p className="font-display text-xl text-green-400">Open Now</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
