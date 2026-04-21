import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, HeartHandshake } from "lucide-react";

import hospitalLobby from "@/assets/hospital-lobby.png";
import operatingTheatre from "@/assets/operating-theatre.png";
import heroCorridor from "@/assets/hero-corridor.jpg";
import founderDoctor from "@/assets/founder-doctor.png";
import surgicalTheater from "@/assets/surgical-theater.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/cancer-guidelines")({
  component: CancerGuidelinesPage,
  head: () => ({
    meta: [
      { title: "Cancer Treatment Guidelines · Oncology · Shree Kalyan Hospital" },
      { name: "description", content: "Comprehensive cancer treatment guidelines and patient support at Shree Kalyan Hospital's Oncology Department." },
    ],
  }),
});

/* ── Data ── */
const STAGES = [
  {
    num: "01",
    title: "Diagnosis & Staging",
    body: "World-class molecular pathology and 4D imaging provide an undeniable picture of your diagnosis within 48 hours. No ambiguity. Total clarity from day one.",
    detail: "PET-CT · MRI Spectroscopy · Liquid Biopsy · Molecular Pathology",
  },
  {
    num: "02",
    title: "Tumor Board Review",
    body: "Your case is presented to a multidisciplinary board of surgical, medical, and radiation oncologists who collectively formulate your treatment plan.",
    detail: "Surgical Oncology · Medical Oncology · Radiation Oncology · Palliative",
  },
  {
    num: "03",
    title: "Treatment Protocol",
    body: "From targeted immunotherapy to image-guided radiation and minimally invasive robotic resections — the most advanced modalities, chosen specifically for you.",
    detail: "Chemotherapy · Immunotherapy · Robotic Surgery · LINAC Radiation",
  },
  {
    num: "04",
    title: "Recovery & Surveillance",
    body: "Post-treatment, our oncology nurses and navigators guide every follow-up, manage side effects, and ensure your remission monitoring is never left to chance.",
    detail: "Remission Monitoring · Nutritional Support · Mental Health · Palliative",
  },
];

const TYPES = [
  "Breast Cancer", "Lung Cancer", "Colorectal Cancer",
  "Head & Neck", "Blood Cancers", "Gynecological",
  "Urological", "Brain Tumours",
];

const TECHNOLOGIES = [
  {
    title: "TrueBeam STx Radiation",
    desc: "Sub-millimeter precise radiotherapy targeting tumors while preserving healthy surrounding tissue.",
    img: surgicalTheater
  },
  {
    title: "Da Vinci Xi Robotics",
    desc: "Next-generation robotic surgical system for executing complex, minimally invasive oncological resections.",
    img: operatingTheatre
  },
  {
    title: "PET-CT Discovery",
    desc: "Early detection molecular imaging to track cancer progression and remission at the functional level.",
    img: hospitalLobby
  }
];

/* ══════════════════════════════════════════════════════ */
function CancerGuidelinesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ══ 1. HERO — Word mask reveal (same as patient-care but unique timing) ══ */
      gsap.fromTo(".cgw",
        { yPercent: 120, skewY: 7, opacity: 0 },
        { yPercent: 0, skewY: 0, opacity: 1, duration: 1.7, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );
      gsap.fromTo(".cg-eyebrow", { x: -70, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5, ease: "expo.out", delay: 0.1 });
      gsap.fromTo(".cg-sub", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.9 });

      // Pink ribbon SVG path draw animation
      if (ribbonRef.current) {
        const paths = ribbonRef.current.querySelectorAll("path, circle");
        gsap.fromTo(paths,
          { strokeDashoffset: 1000, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 2.5, stagger: 0.1, ease: "power2.out", delay: 0.5 }
        );
        // Eternal float
        gsap.to(ribbonRef.current, {
          y: -18, rotation: 4, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1,
        });
      }

      /* ══ 2. Hero image reveal — clip from LEFT (opposite of patient-care) ══ */
      gsap.fromTo(".cg-img-wrap",
        { clipPath: "inset(0 0 0 100%)" },
        { clipPath: "inset(0 0 0 0%)", duration: 2.2, ease: "expo.inOut", delay: 0.1 }
      );

      /* ══ 3. TYPE PILLS — cascade in ══ */
      gsap.fromTo(".type-pill",
        { scale: 0.7, opacity: 0, y: 20 },
        {
          scale: 1, opacity: 1, y: 0,
          duration: 0.7, stagger: 0.07, ease: "back.out(1.8)",
          scrollTrigger: { trigger: ".types-section", start: "top 82%", once: true },
        }
      );

      /* ══ 4. STAGES: Stagger from alternating sides ══ */
      gsap.utils.toArray<HTMLElement>(".stage-card").forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        // Number float in
        const num = card.querySelector(".stage-num");
        if (num) {
          gsap.fromTo(num,
            { x: fromLeft ? -60 : 60, opacity: 0, skewX: fromLeft ? -10 : 10 },
            { x: 0, opacity: 1, skewX: 0, duration: 1.2, ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 82%", once: true }
            }
          );
        }
        // Card clip-path: curtain from top
        gsap.fromTo(card.querySelector(".stage-inner"),
          { clipPath: "inset(0 0 100% 0)", y: 20 },
          { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.3, ease: "expo.inOut",
            scrollTrigger: { trigger: card, start: "top 84%", once: true }
          }
        );
      });

      /* ══ 4.5 TECH ACCORDION ══ */
      gsap.fromTo(".tech-accordion-container", 
        { y: 80, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: ".tech-section", start: "top 80%", once: true } }
      );

      gsap.utils.toArray<HTMLElement>(".tech-item").forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(".tech-item", { flex: 1, duration: 0.6, ease: "power3.out" });
          gsap.to(item, { flex: 3.5, duration: 0.6, ease: "power3.out" });
          gsap.to(item.querySelector(".tech-content"), { opacity: 1, y: 0, duration: 0.4, delay: 0.2 });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(".tech-item", { flex: 1, duration: 0.6, ease: "power3.out" });
          gsap.to(item.querySelector(".tech-content"), { opacity: 0, y: 10, duration: 0.3 });
        });
      });

      /* ══ 5. PINK RIBBON QUOTE — scrub opacity per word ══ */
      gsap.fromTo(".rw",
        { opacity: 0.06 },
        {
          opacity: 1, stagger: 0.07, ease: "none",
          scrollTrigger: { trigger: ".ribbon-quote", start: "top 72%", end: "bottom 30%", scrub: 1 }
        }
      );

      /* ══ 6. IMAGE MOSAIC — staggered clip reveal ══ */
      gsap.utils.toArray<HTMLElement>(".mosaic-img").forEach((img, i) => {
        const dirs = [
          "inset(100% 0 0 0)", "inset(0 100% 0 0)",
          "inset(0 0 100% 0)", "inset(0 0 0 100%)"
        ];
        gsap.fromTo(img,
          { clipPath: dirs[i % 4], scale: 1.1 },
          { clipPath: "inset(0 0 0 0)", scale: 1, duration: 1.5, ease: "expo.inOut",
            scrollTrigger: { trigger: img, start: "top 84%", once: true }
          }
        );
      });

      /* ══ 7. CTA SPLIT — simultaneous slide from sides ══ */
      gsap.fromTo(".cg-cta-l",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: "expo.out",
          scrollTrigger: { trigger: ".cg-cta-split", start: "top 80%", once: true }
        }
      );
      gsap.fromTo(".cg-cta-r",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: "expo.out", delay: 0.1,
          scrollTrigger: { trigger: ".cg-cta-split", start: "top 80%", once: true }
        }
      );

      /* ══ Magnetic buttons ══ */
      document.querySelectorAll<HTMLElement>(".mag-btn").forEach((btn) => {
        btn.addEventListener("mousemove", (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.28, duration: 0.35, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-paper text-ink font-sans overflow-x-hidden selection:bg-magenta selection:text-white">
      <SiteNav />

      {/* ═══════════════════════════════════════ */}
      {/* 1. HERO — Split with clip-from-left image */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative min-h-screen w-full grid lg:grid-cols-2 overflow-hidden">
        {/* Right — image clips in from LEFT */}
        <div className="relative overflow-hidden cg-img-wrap order-1 lg:order-2 min-h-[50vh] lg:min-h-full">
          <img src={hospitalLobby} alt="Oncology Department" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-paper/30 lg:from-transparent to-transparent" />
          {/* Pink ribbon badge */}
          <div className="absolute top-8 right-8 z-10 flex flex-col items-center gap-2">
            {/* Inline SVG Pink Ribbon */}
            <svg ref={ribbonRef} viewBox="0 0 80 100" className="w-20 h-24 drop-shadow-[0_0_20px_rgba(244,63,144,0.7)]" fill="none">
              <path
                d="M40 10 C18 10 10 30 10 45 C10 60 20 70 40 85 C60 70 70 60 70 45 C70 30 62 10 40 10Z"
                stroke="#f43f90" strokeWidth="3" strokeDasharray="1000" strokeDashoffset="1000"
                fill="rgba(244,63,144,0.08)"
              />
              <path
                d="M40 85 C40 85 32 92 28 96 C36 95 40 90 40 90 C40 90 44 95 52 96 C48 92 40 85 40 85Z"
                stroke="#f43f90" strokeWidth="2.5" strokeDasharray="1000" strokeDashoffset="1000"
                fill="rgba(244,63,144,0.12)"
              />
              <circle cx="40" cy="47" r="6" stroke="#f43f90" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" fill="rgba(244,63,144,0.2)" />
            </svg>
            <span className="text-[0.52rem] font-syne uppercase tracking-[0.3em] text-magenta/80 font-bold">Cancer Awareness</span>
          </div>
        </div>

        {/* Left — text */}
        <div className="relative z-10 flex flex-col justify-end px-6 md:px-12 lg:px-20 pt-48 pb-16 md:pb-28 bg-paper order-2 lg:order-1">
          <div className="cg-eyebrow flex items-center gap-4 mb-10">
            <span className="w-10 h-px bg-magenta" />
            <span className="text-[0.62rem] font-syne font-bold tracking-[0.35em] text-magenta uppercase">
              Oncology Department
            </span>
          </div>

          <h1 className="font-display leading-[0.82] tracking-tighter text-navy-deep">
            {["Compassionate", "Cancer", "Care."].map((w, i) => (
              <div key={i} className="overflow-hidden block">
                <span
                  className={`cgw inline-block ${i === 2 ? "italic font-light text-magenta" : ""}`}
                  style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
                >
                  {w}
                </span>
              </div>
            ))}
          </h1>

          <p className="cg-sub max-w-md text-lg text-ink/60 font-light leading-relaxed mt-8 mb-10">
            We stand with you at every stage of your cancer journey. Our multidisciplinary oncology team brings global expertise with a deeply human approach to care.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/appointments" className="mag-btn group bg-magenta text-white px-8 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest hover:bg-navy-deep transition-colors duration-500 inline-flex items-center gap-3">
              Book a Consultation
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/contact" className="mag-btn border border-navy/20 px-8 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest text-ink/60 hover:border-navy hover:text-ink transition-all">
              24/7 Support Line
            </a>
          </div>
        </div>

        <div className="chromatic-divider absolute bottom-0 left-0 right-0 z-20" />
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 2. CANCER TYPES PILLS                  */}
      {/* ═══════════════════════════════════════ */}
      <section className="types-section bg-navy-deep text-paper py-20 px-6 md:px-12 lg:px-24 border-b border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <p className="text-[0.58rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-8 flex items-center gap-4">
            <span className="w-10 h-px bg-magenta" /> Cancers We Treat
          </p>
          <div className="flex flex-wrap gap-3">
            {TYPES.map((t, i) => (
              <span
                key={i}
                className="type-pill border border-white/10 px-5 py-2.5 font-syne text-[0.65rem] uppercase tracking-widest text-paper/70 hover:border-magenta hover:text-magenta transition-all duration-500 cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3. TREATMENT STAGES                    */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="mb-20 grid md:grid-cols-2 gap-8 items-end">
          <div>
            <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-6 flex items-center gap-4">
              <span className="w-10 h-px bg-magenta" /> Treatment Pathway
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.88] text-navy-deep">
              Your guided <em className="italic font-light text-navy-deep/50">roadmap.</em>
            </h2>
          </div>
          <p className="text-ink/55 text-lg font-light leading-relaxed max-w-sm md:ml-auto">
            Cancer treatment is never one-size-fits-all. Our four-stage pathway is designed to give you absolute clarity about what to expect at every turn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {STAGES.map((s, i) => (
            <div key={i} className="stage-card relative">
              {/* Ghost number */}
              <div className="stage-num text-[7rem] md:text-[9rem] font-display font-bold leading-none text-navy-deep/[0.03] -mb-10 select-none pointer-events-none">
                {s.num}
              </div>

              <div className="stage-inner border border-navy/10 p-8 md:p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                {/* Hover shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-magenta/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-magenta group-hover:w-full transition-all duration-700" />

                <div className="flex items-center justify-between mb-6">
                  <span className="text-[0.58rem] font-syne uppercase tracking-[0.3em] text-magenta font-bold">{s.num}</span>
                  <div className="size-2 rounded-full bg-magenta/30 group-hover:bg-magenta transition-colors duration-500" />
                </div>

                <h3 className="font-display text-2xl md:text-3xl text-navy-deep mb-5">{s.title}</h3>
                <p className="text-ink/60 font-light leading-relaxed mb-8">{s.body}</p>

                <div className="border-t border-navy/8 pt-5">
                  <p className="text-[0.58rem] font-syne uppercase tracking-[0.25em] text-ink/40 font-bold leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3.5 ADVANCED TECHNOLOGIES (Accordion)  */}
      {/* ═══════════════════════════════════════ */}
      <section className="tech-section py-20 pb-32 bg-paper relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 mb-16">
          <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-6 flex items-center gap-4">
            <span className="w-10 h-px bg-magenta" /> Precision Medicine
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.88] text-navy-deep">
            Advanced <em className="italic font-light text-navy-deep/50">Technologies.</em>
          </h2>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="tech-accordion-container flex h-[50vh] md:h-[65vh] gap-3 w-full">
            {TECHNOLOGIES.map((tech, i) => (
              <div 
                key={i} 
                className="tech-item relative flex-1 bg-navy-deep overflow-hidden cursor-crosshair rounded border border-navy/10 group"
              >
                <img 
                  src={tech.img} 
                  alt={tech.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-[filter,opacity] duration-[1.5s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                
                {/* Bottom title */}
                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-10">
                   <div className="flex items-center gap-3 mb-3 md:mb-4">
                     <span className="text-[0.55rem] font-syne uppercase tracking-widest text-magenta font-bold">0{i+1}</span>
                   </div>
                   <h3 className="font-display text-2xl md:text-4xl text-paper whitespace-nowrap drop-shadow-lg">{tech.title}</h3>
                </div>

                {/* Content revealed on hover */}
                <div className="tech-content absolute bottom-28 md:bottom-32 left-6 md:left-10 max-w-xs md:max-w-sm opacity-0 translate-y-2 pointer-events-none z-10">
                  <p className="text-paper/85 font-light leading-relaxed mb-6 text-sm md:text-base drop-shadow-md">
                    {tech.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[0.55rem] font-syne uppercase tracking-widest text-magenta font-bold">
                    Discover More <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 4. PINK RIBBON QUOTE — scroll scrub    */}
      {/* ═══════════════════════════════════════ */}
      <section className="ribbon-quote py-40 md:py-56 px-6 md:px-12 lg:px-24 bg-navy-deep text-paper relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
        {/* Decorative ribbon silhouette */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
          <svg viewBox="0 0 200 260" className="w-48 h-64" fill="currentColor">
            <path d="M100 20 C45 20 20 65 20 100 C20 140 50 165 100 200 C150 165 180 140 180 100 C180 65 155 20 100 20Z"/>
            <path d="M100 200 C100 200 82 220 72 228 C90 226 100 215 100 215 C100 215 110 226 128 228 C118 220 100 200 100 200Z"/>
          </svg>
        </div>

        <div className="max-w-[1100px] mx-auto relative z-10 text-center">
          <div className="mb-12 flex justify-center">
            {/* Small pink ribbon icon */}
            <svg viewBox="0 0 40 52" className="w-10 h-12" fill="none">
              <path d="M20 5 C9 5 5 16 5 23 C5 31 11 37 20 44 C29 37 35 31 35 23 C35 16 31 5 20 5Z" fill="rgba(244,63,144,0.15)" stroke="#f43f90" strokeWidth="1.5"/>
              <path d="M20 44 C20 44 16 48 14 50 C18 49.5 20 47 20 47 C20 47 22 49.5 26 50 C24 48 20 44 20 44Z" fill="rgba(244,63,144,0.2)" stroke="#f43f90" strokeWidth="1.5"/>
            </svg>
          </div>
          <p className="font-display text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.25] text-paper">
            {`"No patient should ever feel alone in their fight. We are your advocates, your shield, your steady hand through every storm."`.split(" ").map((word, i) => (
              <span key={i} className="rw inline-block mr-[0.28em]">{word}</span>
            ))}
          </p>
          <div className="mt-14 flex items-center justify-center gap-4">
            <div className="w-10 h-px bg-magenta" />
            <span className="text-[0.58rem] font-syne uppercase tracking-[0.3em] text-paper/40 font-bold">
              Head of Oncology, Shree Kalyan Hospital
            </span>
            <div className="w-10 h-px bg-magenta" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 5. SUPPORT GRID + IMAGE MOSAIC         */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left text */}
          <div>
            <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-10 h-px bg-magenta" /> Holistic Support
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.9] text-navy-deep mb-12">
              Beyond the <em className="italic font-light text-navy-deep/50">clinic.</em>
            </h2>

            <div className="space-y-0 divide-y divide-navy/8">
              {[
                "Oncology concierge & navigation team",
                "Tumor board second opinions",
                "Clinical nutrition & dietetics",
                "Mental health & counselling support",
                "Insurance & financial coordination",
                "Palliative & end-of-life planning",
              ].map((item, i) => (
                <div key={i} className="group flex items-center gap-5 py-5 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-magenta scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                  <CheckCircle2 className="size-5 text-magenta shrink-0" />
                  <span className="text-lg font-light text-ink/80">{item}</span>
                  <ArrowRight className="size-4 text-magenta ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Right — image mosaic */}
          <div className="grid grid-cols-2 gap-4">
            <div className="mosaic-img col-span-2 relative h-[40vh] overflow-hidden">
              <img src={operatingTheatre} alt="Oncology suite" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-[2s]" />
              <div className="absolute top-4 left-4 bg-paper px-4 py-2 text-[0.55rem] font-syne font-bold uppercase tracking-widest text-navy-deep">Oncology Suite</div>
            </div>
            <div className="mosaic-img relative h-[28vh] overflow-hidden">
              <img src={founderDoctor} alt="Care team" className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-[filter] duration-[2s]" />
            </div>
            <div className="mosaic-img relative h-[28vh] overflow-hidden">
              <img src={heroCorridor} alt="Hospital" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-[2s]" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 6. SPLIT CTA                           */}
      {/* ═══════════════════════════════════════ */}
      <section className="cg-cta-split grid lg:grid-cols-2 min-h-[60vh]">
        {/* Left — image */}
        <div className="cg-cta-l relative overflow-hidden min-h-[40vh]">
          <img src={hospitalLobby} alt="Shree Kalyan" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-deep/70" />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-10 md:p-16 gap-4">
            <HeartHandshake className="size-10 text-magenta" />
            <p className="font-display italic text-3xl md:text-5xl text-paper leading-tight max-w-xs">
              "You are never alone in this fight."
            </p>
          </div>
        </div>

        {/* Right — magenta CTA */}
        <div className="cg-cta-r bg-magenta text-paper flex flex-col justify-center px-10 md:px-20 py-20 md:py-28">
          <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-paper/70 uppercase mb-8">
            Start Your Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-[0.9]">
            Ready to speak <br />with a specialist?
          </h2>
          <p className="text-paper/75 font-light text-lg mb-12 max-w-sm leading-relaxed">
            Our oncology concierge team is available 24/7. Call us, write to us, or walk in — we are ready for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/appointments" className="mag-btn group bg-paper text-ink px-10 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest hover:bg-navy-deep hover:text-paper transition-colors duration-500 text-center inline-flex items-center justify-center gap-3">
              Book Consultation
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+918529219330" className="border border-paper/30 px-10 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest text-paper hover:bg-white/10 transition-colors text-center">
              Call Now
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
