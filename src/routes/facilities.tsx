import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ShieldCheck, Zap, Coffee, Bed, Activity, ArrowRight } from "lucide-react";
import operatingTheatre from "@/assets/operating-theatre.png";
import surgicalTheater from "@/assets/surgical-theater.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/facilities")({
  component: FacilitiesPage,
  head: () => ({
    meta: [
      { title: "Facilities · Shree Kalyan Hospital, Kota" },
      {
        name: "description",
        content:
          "Tour Shree Kalyan Hospital's precision infrastructure — state-of-the-art ICU, modular operation theaters, deluxe recovery suites, and advanced diagnostics.",
      },
    ],
  }),
});

const facilitiesData = [
  {
    id: "icu",
    title: "Critical Care (ICU)",
    eyebrow: "Unit 01",
    desc: "12-bed state-of-the-art ICU with centralized monitoring and 1:1 nursing ratio for life-threatening conditions.",
    icon: Activity,
    bg: "bg-navy-deep",
    text: "text-paper",
    accent: "text-magenta",
  },
  {
    id: "suites",
    title: "Deluxe Recovery Suites",
    eyebrow: "Unit 02",
    desc: "Hotel-grade luxury suites offering maximum privacy, patient-controlled lighting, and premium bedding for restful healing.",
    icon: Bed,
    bg: "bg-[#f0ede6]",
    text: "text-navy-deep",
    accent: "text-magenta",
  },
  {
    id: "ot",
    title: "Modular Operation Theater",
    eyebrow: "Unit 03",
    desc: "Precision-engineered environments with Lamina Airflow and HEPA filtration for absolute sterility and surgical excellence.",
    icon: ShieldCheck,
    bg: "bg-ink",
    text: "text-paper",
    accent: "text-magenta",
  },
  {
    id: "diagnostic",
    title: "Diagnostic Center",
    eyebrow: "Unit 04",
    desc: "Advanced imaging and 24/7 pathology labs providing rapid, accurate diagnostic support for every clinical decision.",
    icon: Zap,
    bg: "bg-paper",
    text: "text-navy-deep",
    accent: "text-magenta",
  },
  {
    id: "cafeteria",
    title: "Clinical Cafeteria",
    eyebrow: "Unit 05",
    desc: "Nutritional excellence tailored by clinical dietitians to accelerate healing and provide comfort to patients and families.",
    icon: Coffee,
    bg: "bg-magenta",
    text: "text-paper",
    accent: "text-paper/80",
  },
];

/* ─── Decorative SVG cross ── */
function Cross({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <line x1="10" y1="0"  x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
      <line x1="0"  y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function FacilitiesPage() {
  const pageRef      = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);

  /* ── Hero entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1. Eyebrow */
      gsap.fromTo(".fc-line",    { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut", delay: 0.2 });
      gsap.fromTo(".fc-eyebrow", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", delay: 0.55 });

      /* 2. Headline */
      gsap.fromTo(
        ".fc-title-word",
        { yPercent: 110, skewY: 3 },
        { yPercent: 0, skewY: 0, duration: 1.4, stagger: 0.12, ease: "expo.out", delay: 0.4 }
      );

      /* 3. Description + CTA */
      gsap.fromTo(".fc-desc", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", delay: 1.05 });
      gsap.fromTo(".fc-cta",  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", delay: 1.25 });

      /* 4. Hero image wipe */
      gsap.fromTo(
        ".fc-img-wrap",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 1.8, ease: "expo.inOut", delay: 0.15 }
      );
      gsap.fromTo(".fc-hero-img", { scale: 1.12 }, { scale: 1, duration: 2.6, ease: "power3.out", delay: 0.15 });

      /* 5. Stat badges */
      gsap.fromTo(
        ".fc-badge",
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, stagger: 0.18, ease: "back.out(1.5)", delay: 1.5 }
      );

      /* 6. Deco line */
      gsap.fromTo(".fc-deco-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 1.65 });

      /* 7. Hero image parallax */
      gsap.to(".fc-hero-img", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: ".fc-hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* ── Horizontal scroll ── */
  useEffect(() => {
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={pageRef} className="bg-paper min-h-screen overflow-x-hidden selection:bg-magenta selection:text-white">
      <SiteNav />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* HERO — Bespoke split-screen                               */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="fc-hero-section relative w-full min-h-screen bg-paper flex flex-col justify-center pt-32 pb-0 overflow-hidden">
        {/* Editorial grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#0a0f1e 0px,#0a0f1e 1px,transparent 1px,transparent 56px),repeating-linear-gradient(90deg,#0a0f1e 0px,#0a0f1e 1px,transparent 1px,transparent 56px)",
          }}
        />

        {/* Decorative crosses */}
        <Cross className="absolute top-44 right-8 md:right-20 text-magenta/25 size-8" />
        <Cross className="absolute top-60 right-20 md:right-40 text-ink/10 size-5" />
        <Cross className="absolute bottom-28 left-8 md:left-20 text-magenta/20 size-6" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT: Typography ── */}
          <div className="z-10 relative order-2 lg:order-1 pb-16 lg:pb-0">
            <div className="flex items-center gap-5 mb-12">
              <div className="fc-line w-12 h-px bg-magenta origin-left" />
              <span className="fc-eyebrow font-bold text-[0.62rem] tracking-[0.38em] uppercase text-magenta">
                Chapter IV — Precision Infrastructure
              </span>
            </div>

            <h1
              className="font-display leading-[0.9] tracking-tighter text-navy-deep mb-10"
              style={{ fontSize: "clamp(4rem, 9.5vw, 8.5rem)" }}
            >
              <div className="overflow-hidden pb-3">
                <span className="fc-title-word block italic font-light text-magenta">Quiet</span>
              </div>
              <div className="overflow-hidden pb-3 pl-[0.15em] md:pl-[0.3em]">
                <span className="fc-title-word block">Precision.</span>
              </div>
              <div className="overflow-hidden pb-3 pl-[0.3em] md:pl-[0.6em]">
                <span className="fc-title-word block italic font-light opacity-40" style={{ fontSize: "55%" }}>
                  High Standards.
                </span>
              </div>
            </h1>

            <p className="fc-desc text-lg md:text-xl text-ink/60 font-light leading-relaxed max-w-md mb-12">
              An editorial tour through our premium healthcare environments — designed
              for medical excellence and patient tranquility in equal measure.
            </p>

            <div className="fc-cta flex flex-col sm:flex-row gap-4">
              <a
                href="#tour"
                className="group inline-flex items-center gap-3 bg-navy-deep text-paper px-10 py-5 text-[0.65rem] font-bold tracking-[0.3em] uppercase hover:bg-magenta transition-colors duration-500"
              >
                Begin Tour
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 border border-ink/20 px-10 py-5 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-ink hover:border-magenta hover:text-magenta transition-colors duration-500"
              >
                Request a Visit
              </a>
            </div>

            <div className="fc-deco-line mt-16 h-px w-full bg-ink/8 origin-left" />
          </div>

          {/* ── RIGHT: Image ── */}
          <div className="relative order-1 lg:order-2 z-10">
            <div
              className="fc-img-wrap overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.18)]"
              style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            >
              <img
                src={operatingTheatre}
                alt="Shree Kalyan Hospital — operating theatre"
                className="fc-hero-img w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-in-out"
              />
              <div className="absolute inset-0 bg-navy-deep/10 mix-blend-multiply" />
            </div>

            <div className="fc-badge absolute -bottom-6 -left-6 md:-bottom-8 md:-left-10 bg-paper/95 backdrop-blur border border-ink/10 px-6 py-5 shadow-2xl">
              <p className="font-display text-3xl text-navy-deep leading-none mb-1">5+</p>
              <p className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-ink/40">Premium Units</p>
            </div>
            <div className="fc-badge absolute -top-6 -right-4 md:-top-8 md:-right-8 bg-paper/95 backdrop-blur border border-ink/10 px-6 py-5 shadow-2xl">
              <p className="font-display text-3xl text-navy-deep leading-none mb-1">HEPA</p>
              <p className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-ink/40">Filtration</p>
            </div>

            <div className="absolute -bottom-10 -left-10 w-32 h-32 border-b border-l border-magenta/50 pointer-events-none z-20" />
            <div className="absolute -top-4 right-0 md:-right-6 w-20 h-20 border-t border-r border-ink/15 pointer-events-none z-20" />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[0.55rem] tracking-[0.35em] uppercase font-bold text-ink">Scroll</span>
          <div className="w-px h-12 bg-ink/30 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-magenta"
              style={{ height: "40%", animation: "fcScrollBar 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* HORIZONTAL SCROLL TOUR                                    */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div id="tour" ref={containerRef} className="relative h-screen overflow-hidden bg-navy-deep">
        <div ref={horizontalRef} className="flex h-full w-fit">
          {facilitiesData.map((item) => (
            <div
              key={item.id}
              className={`w-[100vw] h-full flex flex-col justify-center px-12 md:px-24 py-32 border-r border-white/5 ${item.bg}`}
            >
              <div className="max-w-4xl">
                <p className={`font-display italic text-6xl md:text-9xl mb-8 opacity-15 ${item.text}`}>
                  {item.eyebrow}
                </p>
                <item.icon className={`size-16 md:size-24 mb-12 ${item.accent} opacity-80`} />
                <h2
                  className={`font-display text-5xl md:text-8xl tracking-tight leading-[0.9] mb-12 ${item.text}`}
                >
                  {item.title.split(" ").map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? "italic font-light" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h2>
                <p className={`text-xl md:text-2xl font-light leading-relaxed max-w-2xl opacity-70 ${item.text}`}>
                  {item.desc}
                </p>

                <div className="mt-24 flex items-center gap-12">
                  <div className="flex flex-col">
                    <span className={`text-[0.65rem] uppercase tracking-widest opacity-40 mb-2 ${item.text}`}>Capacity</span>
                    <span className={`font-display text-4xl ${item.text}`}>Available</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[0.65rem] uppercase tracking-widest opacity-40 mb-2 ${item.text}`}>Staffing</span>
                    <span className={`font-display text-4xl ${item.text}`}>24/7 Dedicated</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Final CTA slide */}
          <div className="w-[100vw] h-full flex items-center justify-center bg-paper text-navy-deep">
            <div className="text-center px-12">
              <p className="text-[0.65rem] font-bold tracking-[0.45em] uppercase text-magenta mb-10">End of Tour</p>
              <h3 className="font-display leading-[0.85] tracking-tight mb-16" style={{ fontSize: "clamp(3.5rem,9vw,8rem)" }}>
                Experience <br />
                <span className="italic font-light text-magenta">Excellence.</span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-navy-deep text-paper px-12 py-6 text-xs font-bold tracking-widest uppercase hover:bg-magenta transition-colors duration-500 shadow-xl"
                >
                  Request A Physical Tour
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/appointments"
                  className="inline-flex items-center justify-center gap-3 border border-ink/20 px-12 py-6 text-xs font-bold tracking-widest uppercase text-ink hover:border-magenta hover:text-magenta transition-colors duration-500"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-magenta/40 text-[0.65rem] tracking-[0.4em] uppercase font-bold pointer-events-none">
          <span>Scroll to explore</span>
          <div className="w-24 h-px bg-magenta/20 overflow-hidden">
            <div className="w-full h-full bg-magenta origin-left" style={{ animation: "fcHint 2.2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* CLOSING STATEMENT                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-ink/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-x-6 gap-y-24 items-end">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[0.65rem] font-bold tracking-[0.3em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" />
              Our Philosophy
            </p>
            <h3 className="font-display leading-[0.85] tracking-tighter" style={{ fontSize: "clamp(3rem,7vw,6rem)" }}>
              Designed for <br />
              <span className="italic font-light text-magenta">Healing.</span>
            </h3>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 space-y-8">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-ink/70">
              Our facility is more than walls and technology — it is a carefully crafted ecosystem
              engineered to reduce stress, optimize clinical flow, and ensure every patient feels
              the weight of our legacy.
            </p>
            <div className="relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.14)]">
              <img
                src={surgicalTheater}
                alt="Surgical theater at Shree Kalyan Hospital"
                className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
              />
              <div className="absolute inset-0 bg-navy-deep/10 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      {/* Keyframes */}
      <style>{`
        @keyframes fcScrollBar {
          0%   { transform: translateY(-100%); opacity: 1; }
          60%  { transform: translateY(250%);  opacity: 1; }
          61%  { opacity: 0; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        @keyframes fcHint {
          0%   { transform: scaleX(0); transform-origin: left; }
          50%  { transform: scaleX(1); transform-origin: left; }
          51%  { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>

      <SiteFooter />
    </div>
  );
}
