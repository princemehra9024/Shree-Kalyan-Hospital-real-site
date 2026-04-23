import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/data/services";
import { ArrowRight } from "lucide-react";

import operatingTheatre from "@/assets/operating-theatre.png";
import heroCorridor from "@/assets/hero-corridor.jpg";
import hospitalLobby from "@/assets/hospital-lobby.png";
import surgicalTheater from "@/assets/surgical-theater.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Centers of Excellence · Shree Kalyan Hospital" },
      {
        name: "description",
        content: "Explore our specialized medical institutes and centers of excellence.",
      },
    ],
  }),
});

/* Images array to cycle through for hover effects */
const HOVER_IMAGES = [operatingTheatre, heroCorridor, surgicalTheater, hospitalLobby];

function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Hero Reveal ── */
      gsap.fromTo(
        ".hq-word",
        { yPercent: 115, skewY: 8, opacity: 0 },
        {
          yPercent: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.8,
          stagger: 0.1,
          ease: "expo.out",
          delay: 0.2,
        },
      );
      gsap.fromTo(
        ".hq-line",
        { width: 0 },
        { width: "100%", duration: 1.5, ease: "power3.inOut", delay: 0.5 },
      );
      gsap.fromTo(
        ".hq-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 1 },
      );

      /* ── 2. Parallax Image in Hero ── */
      gsap.to(".hero-parallax-img", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".services-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── 3. List Item Scroll Reveal ── */
      gsap.utils.toArray<HTMLElement>(".dept-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 80, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      /* ── 4. Image Follow Cursor Logic ── */
      const hoverImage = hoverImgRef.current;
      const track = trackRef.current;

      if (hoverImage && track) {
        // Quick setters for performance
        const xTo = gsap.quickTo(hoverImage, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(hoverImage, "y", { duration: 0.6, ease: "power3" });

        const mouseMove = (e: MouseEvent) => {
          const trackRect = track.getBoundingClientRect();
          // Calculate mouse position relative to the track container
          xTo(e.clientX - trackRect.left);
          yTo(e.clientY - trackRect.top);
        };

        track.addEventListener("mousemove", mouseMove);

        // Hover event listeners on the rows
        gsap.utils.toArray<HTMLElement>(".dept-row").forEach((row, i) => {
          row.addEventListener("mouseenter", () => {
            // Change image source based on index
            hoverImage.src = HOVER_IMAGES[i % HOVER_IMAGES.length];
            gsap.to(hoverImage, {
              scale: 1,
              opacity: 0.8,
              rotate: Math.random() * 6 - 3,
              duration: 0.4,
              ease: "back.out(1.5)",
            });
          });
          row.addEventListener("mouseleave", () => {
            gsap.to(hoverImage, {
              scale: 0.5,
              opacity: 0,
              rotate: 0,
              duration: 0.3,
              ease: "power2.in",
            });
          });
        });

        return () => track.removeEventListener("mousemove", mouseMove);
      }
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-paper text-ink font-sans overflow-x-hidden selection:bg-magenta selection:text-white pb-0"
    >
      <SiteNav />

      {/* ═══════════════════════════════════════ */}
      {/* 1. CINEMATIC HERO                       */}
      {/* ═══════════════════════════════════════ */}
      <section className="services-hero relative w-full pt-48 md:pt-56 pb-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto min-h-[90vh] flex flex-col border-b border-navy/10 overflow-hidden">
        {/* Background Parallax Element */}
        <div className="absolute top-0 right-0 w-[60%] md:w-[45%] h-full opacity-10 pointer-events-none mix-blend-multiply overflow-hidden mask-image-b">
          <img
            src={surgicalTheater}
            className="hero-parallax-img w-full h-[130%] object-cover grayscale"
            alt="texture"
          />
        </div>

        <div className="hq-fade flex items-center gap-4 mb-16 relative z-10">
          <span className="w-12 h-px bg-magenta" />
          <span className="text-[0.65rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase">
            Centers of Excellence
          </span>
        </div>

        <h1 className="font-display leading-[0.85] tracking-tight text-navy-deep relative z-10">
          {["Where clinical", "precision meets", "profound care."].map((text, i) => (
            <div key={i} className="overflow-hidden pb-4 md:pb-6">
              <span
                className={`hq-word block ${i === 2 ? "italic font-light text-magenta/90" : ""}`}
                style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
              >
                {text}
              </span>
            </div>
          ))}
        </h1>

        <div className="mt-auto pt-24 grid md:grid-cols-2 gap-12 items-end relative z-10">
          <div className="h-px w-full bg-navy/10 hq-line col-span-full md:col-span-1" />
          <p className="hq-fade text-lg md:text-2xl text-ink/60 font-light leading-relaxed max-w-lg md:text-right md:justify-self-end">
            We treat the unyielding severity of diagnosis with an uncompromising standard of
            surgical innovation and medical artistry.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 2. INTERACTIVE DEPARTMENT LIST          */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 md:py-48 px-6 md:px-12 lg:px-24">
        {/* Track Container for Floating Image */}
        <div ref={trackRef} className="max-w-[1600px] mx-auto relative relative-track">
          {/* Centered Floating Image that follows cursor */}
          <img
            ref={hoverImgRef}
            src={operatingTheatre}
            alt="Department Preview"
            className="hidden lg:block fixed pointer-events-none z-0 object-cover grayscale mix-blend-multiply"
            style={{
              width: "450px",
              height: "550px",
              opacity: 0,
              scale: 0.5,
              transform: "translate(-50%, -50%)", // perfectly center on cursor
              left: 0,
              top: 0, // rely on GSAP quickTo
            }}
          />

          <div className="flex flex-col border-t border-navy/10 relative z-10">
            {services.map((dept, i) => (
              <Link
                key={dept.id}
                to="/services/$serviceId"
                params={{ serviceId: dept.id }}
                className="dept-row group flex flex-col lg:flex-row lg:items-center justify-between py-16 md:py-20 border-b border-navy/10 hover:border-magenta transition-colors duration-500 cursor-crosshair relative bg-paper mix-blend-normal"
              >
                {/* Number & Tag */}
                <div className="flex items-center gap-6 lg:w-[20%] mb-8 lg:mb-0">
                  <span className="font-syne text-[0.65rem] font-bold text-magenta/50 tracking-[0.2em] uppercase">
                    0{i + 1}
                  </span>
                  <span className="text-[0.55rem] font-syne font-bold uppercase tracking-[0.3em] text-ink/30 px-3 py-1 border border-ink/10 rounded-full group-hover:border-magenta group-hover:text-magenta transition-colors">
                    {dept.chapter}
                  </span>
                </div>

                {/* Title */}
                <div className="lg:w-[45%] mb-8 lg:mb-0 relative pointer-events-none">
                  <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-navy-deep tracking-tight group-hover:italic group-hover:text-magenta transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {dept.title}
                  </h2>
                </div>

                {/* Services List preview */}
                <div className="lg:w-[25%] pointer-events-none">
                  <ul className="grid grid-cols-1 gap-3 border-l border-navy/10 pl-6 lg:pl-10">
                    {dept.services.slice(0, 3).map((s, si) => (
                      <li
                        key={si}
                        className="text-[0.65rem] font-syne font-bold tracking-widest uppercase text-ink/50 flex items-center gap-3"
                      >
                        <span className="size-1 bg-ink/20 rounded-full group-hover:bg-magenta transition-colors duration-500" />
                        {s}
                      </li>
                    ))}
                    {dept.services.length > 3 && (
                      <li className="text-[0.65rem] font-syne italic text-magenta mt-1 group-hover:translate-x-2 transition-transform duration-500">
                        + Explore More Specializations
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Arrow */}
                <div className="hidden lg:flex lg:w-[10%] justify-end pointer-events-none">
                  <div className="size-16 rounded-full border border-navy/10 flex items-center justify-center group-hover:border-magenta group-hover:bg-magenta transition-all duration-500 group-hover:-rotate-45">
                    <ArrowRight className="text-navy-deep group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3. DRAMATIC DARK MODE ADMISSIONS CTA    */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative px-6 md:px-12 lg:px-24 py-32 md:py-48 bg-navy-deep text-paper overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[80%] h-full bg-magenta/5 blur-[150px] mix-blend-screen" />
          <img
            src={heroCorridor}
            alt=""
            className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay opacity-10"
          />
        </div>

        <div className="max-w-[1200px] mx-auto text-center relative z-10" data-reveal>
          <p className="text-[0.65rem] font-syne font-bold tracking-[0.5em] text-magenta uppercase mb-12">
            Private Consultation
          </p>
          <h3 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.9] text-paper mb-16 tracking-tight">
            Seeking a specific <br />{" "}
            <em className="italic font-light text-magenta/90">medical review?</em>
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/contact"
              className="group bg-magenta text-paper px-12 py-6 text-[0.65rem] font-syne font-bold tracking-[0.3em] uppercase hover:bg-paper hover:text-navy-deep transition-colors duration-500 inline-flex items-center justify-center gap-4 border border-magenta"
            >
              Contact Admissions Desk
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+918529219330"
              className="bg-transparent border border-white/20 text-paper px-12 py-6 text-[0.65rem] font-syne font-bold tracking-[0.3em] uppercase hover:border-paper transition-colors inline-block text-center mt-4 sm:mt-0"
            >
              Call +91 85292 19330
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
