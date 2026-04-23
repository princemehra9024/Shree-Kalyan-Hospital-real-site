import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowLeft, Maximize2 } from "lucide-react";

const ROOMS = [
  {
    id: "01",
    title: "Executive Suite",
    subtitle: "Luxury Redefined",
    desc: "Where five-star hospitality meets world-class medicine. Private lounges, dedicated nursing staff, and panoramic views create a sanctuary for healing.",
    stats: { area: "450 sq.ft", beds: "King-size", feature: "Private Lounge" },
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600",
    accent: "#e0185e",
  },
  {
    id: "02",
    title: "Premium Ward",
    subtitle: "Designed for Recovery",
    desc: "Flooded with natural light and engineered for rest. Smart-bed technology, ambient soundscapes, and biophilic design accelerate the healing journey.",
    stats: { area: "320 sq.ft", beds: "Adjustable", feature: "Smart Controls" },
    img: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=1600",
    accent: "#3a86c4",
  },
  {
    id: "03",
    title: "Advanced ICU",
    subtitle: "Precision Engineering",
    desc: "A triumph of medical architecture. AI-driven monitoring, ultra-sterile laminar airflow, and 24/7 specialist oversight for the most critical moments.",
    stats: { area: "280 sq.ft", beds: "Motorized", feature: "AI Monitoring" },
    img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1600",
    accent: "#2ec4b6",
  },
  {
    id: "04",
    title: "Maternity Wing",
    subtitle: "Where Life Begins",
    desc: "A gentle revolution in birthing care. LDR suites wrapped in warmth, neonatal excellence on standby, and an atmosphere that feels like home.",
    stats: { area: "400 sq.ft", beds: "LDR Suite", feature: "NICU Adjacent" },
    img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1600",
    accent: "#f4a261",
  },
];

export function RoomViews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const animateTransition = useCallback(
    (from: number, to: number) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setActiveIndex(to);
          setIsAnimating(false);
        },
      });

      // ------- TEXT OUT -------
      const fromText = textRefs.current[from];
      if (fromText) {
        tl.to(
          fromText.querySelectorAll("[data-stagger]"),
          {
            y: -40,
            opacity: 0,
            stagger: 0.04,
            duration: 0.45,
            ease: "power3.in",
          },
          0,
        );
      }

      // ------- IMAGE OUT: curtain wipe -------
      const fromImg = imageRefs.current[from];
      if (fromImg) {
        tl.to(
          fromImg,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.8,
            ease: "power4.inOut",
          },
          0.15,
        );
        // scale the inner image slightly while wiping
        tl.to(
          fromImg.querySelector("img"),
          { scale: 1.15, duration: 0.8, ease: "power4.inOut" },
          0.15,
        );
      }

      // ------- IMAGE IN: curtain reveal from bottom -------
      const toImg = imageRefs.current[to];
      if (toImg) {
        gsap.set(toImg, { clipPath: "inset(100% 0 0 0)", zIndex: 10 });
        gsap.set(toImg.querySelector("img"), { scale: 1.25 });

        tl.to(
          toImg,
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1,
            ease: "power4.inOut",
          },
          0.35,
        );
        tl.to(toImg.querySelector("img"), { scale: 1, duration: 1.4, ease: "power2.out" }, 0.35);
      }

      // ------- TEXT IN -------
      const toText = textRefs.current[to];
      if (toText) {
        gsap.set(toText, { visibility: "visible" });
        const staggerEls = toText.querySelectorAll("[data-stagger]");
        gsap.set(staggerEls, { y: 60, opacity: 0 });

        tl.to(
          staggerEls,
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.7,
            ease: "power3.out",
          },
          0.6,
        );
      }

      // ------- PROGRESS BAR ANIMATION -------
      if (progressRef.current) {
        tl.to(
          progressRef.current,
          {
            scaleX: (to + 1) / ROOMS.length,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.3,
        );
      }

      // Reset z-indexes after animation
      tl.add(() => {
        imageRefs.current.forEach((ref, i) => {
          if (ref) ref.style.zIndex = i === to ? "10" : "1";
        });
      });
    },
    [isAnimating],
  );

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % ROOMS.length;
    animateTransition(activeIndex, next);
  }, [activeIndex, animateTransition]);

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + ROOMS.length) % ROOMS.length;
    animateTransition(activeIndex, prev);
  }, [activeIndex, animateTransition]);

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      animateTransition(activeIndex, index);
    },
    [activeIndex, animateTransition],
  );

  // Auto-play every 5 seconds
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      if (!isAnimating) {
        const next = (activeIndex + 1) % ROOMS.length;
        animateTransition(activeIndex, next);
      }
    }, 5500);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [activeIndex, isAnimating, animateTransition]);

  // Set initial progress bar
  useEffect(() => {
    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: 1 / ROOMS.length });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-navy-deep text-paper overflow-hidden border-t border-paper/5"
      style={{ minHeight: "100vh" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-[2s]"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 70% 50%, ${ROOMS[activeIndex].accent}08, transparent 70%)`,
        }}
      />

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-24 py-20 lg:py-28 relative z-10 min-h-screen flex flex-col justify-center">
        {/* Top Row: Section header + Nav Buttons */}
        <div className="flex items-end justify-between mb-16 lg:mb-20">
          <div>
            <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-magenta" /> Our Spaces
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-paper">
              Sanctuaries of <br />
              <em className="italic font-light text-paper/50">Healing.</em>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={goPrev}
              disabled={isAnimating}
              aria-label="Previous room"
              className="group size-14 border border-paper/20 rounded-full flex items-center justify-center hover:bg-magenta hover:border-magenta transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="size-5 group-hover:text-paper transition-colors" />
            </button>
            <button
              onClick={goNext}
              disabled={isAnimating}
              aria-label="Next room"
              className="group size-14 border border-paper/20 rounded-full flex items-center justify-center hover:bg-magenta hover:border-magenta transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowRight className="size-5 group-hover:text-paper transition-colors" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center flex-1">
          {/* Left: Text Content */}
          <div className="col-span-1 lg:col-span-5 relative min-h-[340px] lg:min-h-[420px] flex items-center">
            {ROOMS.map((room, i) => (
              <div
                key={room.id}
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center"
                style={{
                  visibility: i === activeIndex ? "visible" : "hidden",
                }}
              >
                {/* Room Number */}
                <div data-stagger className="flex items-center gap-5 mb-6">
                  <span
                    className="font-display italic text-6xl lg:text-8xl leading-none transition-colors duration-700"
                    style={{ color: room.accent, opacity: 0.25 }}
                  >
                    {room.id}
                  </span>
                  <span className="w-12 h-px bg-paper/20" />
                  <span className="text-[0.6rem] font-syne uppercase tracking-[0.3em] text-paper/40 font-bold">
                    {room.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3
                  data-stagger
                  className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1]"
                >
                  {room.title}
                </h3>

                {/* Description */}
                <p
                  data-stagger
                  className="text-paper/55 text-lg lg:text-xl font-light leading-relaxed max-w-md mb-10"
                >
                  {room.desc}
                </p>

                {/* Stats Row */}
                <div
                  data-stagger
                  className="flex gap-8 lg:gap-12 mb-10 border-t border-paper/10 pt-8"
                >
                  {Object.entries(room.stats).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-paper text-base lg:text-lg font-display">{val}</span>
                      <span className="text-[0.55rem] font-syne uppercase tracking-[0.2em] text-paper/30 font-bold mt-1 capitalize">
                        {key}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div data-stagger>
                  <button className="group flex items-center gap-5">
                    <span className="text-[0.65rem] font-syne uppercase tracking-[0.25em] font-bold text-magenta group-hover:text-paper transition-colors">
                      Explore Room
                    </span>
                    <span className="size-10 rounded-full border border-magenta/40 flex items-center justify-center group-hover:bg-magenta group-hover:border-magenta transition-all duration-300 group-hover:scale-110">
                      <Maximize2 className="size-3.5 text-magenta group-hover:text-paper transition-colors" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image Showcase */}
          <div className="col-span-1 lg:col-span-7 relative h-[50vh] lg:h-[70vh] overflow-hidden group">
            {/* Decorative frame */}
            <div className="absolute -inset-px border border-paper/10 pointer-events-none z-30" />
            <div className="absolute top-4 right-4 left-4 bottom-4 border border-paper/5 pointer-events-none z-30" />

            {/* Images */}
            {ROOMS.map((room, i) => (
              <div
                key={room.id}
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                className="absolute inset-0 will-change-transform"
                style={{
                  clipPath: i === 0 ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                  zIndex: i === activeIndex ? 10 : 1,
                }}
              >
                <img
                  src={room.img}
                  alt={room.title}
                  className="w-full h-full object-cover will-change-transform"
                />
                {/* Cinematic overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-navy-deep/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-navy-deep/20 pointer-events-none" />
              </div>
            ))}

            {/* Floating room label on image */}
            <div className="absolute bottom-6 right-6 z-30 backdrop-blur-xl bg-navy-deep/40 border border-paper/10 px-5 py-3 flex items-center gap-3">
              <span className="size-2 rounded-full bg-magenta animate-pulse" />
              <span className="text-[0.6rem] font-syne uppercase tracking-[0.2em] font-bold text-paper/80">
                {ROOMS[activeIndex].subtitle}
              </span>
            </div>

            {/* Mobile nav arrows overlaid on image */}
            <div className="absolute bottom-6 left-6 z-30 flex gap-3 md:hidden">
              <button
                onClick={goPrev}
                disabled={isAnimating}
                className="size-10 bg-navy-deep/60 backdrop-blur-lg border border-paper/20 rounded-full flex items-center justify-center"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                onClick={goNext}
                disabled={isAnimating}
                className="size-10 bg-navy-deep/60 backdrop-blur-lg border border-paper/20 rounded-full flex items-center justify-center"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom: Progress + Pagination */}
        <div className="mt-12 lg:mt-16 flex items-center gap-8">
          {/* Progress Bar */}
          <div className="flex-1 h-[2px] bg-paper/10 relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-full bg-magenta origin-left"
              style={{ transform: "scaleX(0.25)" }}
            />
          </div>

          {/* Dot Pagination */}
          <div className="flex items-center gap-3 shrink-0">
            {ROOMS.map((room, i) => (
              <button
                key={room.id}
                onClick={() => goTo(i)}
                disabled={isAnimating}
                aria-label={`Go to ${room.title}`}
                className="group flex items-center gap-2"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-500 ${
                    i === activeIndex ? "w-8 bg-magenta" : "w-3 bg-paper/20 group-hover:bg-paper/50"
                  }`}
                />
                <span
                  className={`text-[0.55rem] font-syne font-bold tracking-wider transition-all duration-300 ${
                    i === activeIndex ? "text-paper opacity-100" : "text-paper/0 opacity-0 w-0"
                  }`}
                >
                  {room.id}
                </span>
              </button>
            ))}
          </div>

          {/* Counter */}
          <span className="text-[0.6rem] font-syne font-bold tracking-[0.2em] text-paper/40 shrink-0 hidden md:block">
            <span className="text-paper text-base font-display">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-2">/</span>
            {String(ROOMS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
