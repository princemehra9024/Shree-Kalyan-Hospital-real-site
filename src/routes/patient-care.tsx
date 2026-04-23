import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import hospitalLobby from "@/assets/hospital-lobby.png";
import operatingTheatre from "@/assets/operating-theatre.png";
import heroCorridor from "@/assets/hero-corridor.jpg";
import surgicalTheater from "@/assets/surgical-theater.jpg";
import founderDoctor from "@/assets/founder-doctor.png";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/patient-care")({
  component: PatientCarePage,
  head: () => ({
    meta: [
      { title: "Patient Care · Shree Kalyan Hospital" },
      {
        name: "description",
        content: "Compassionate, unhurried patient care at Shree Kalyan Hospital.",
      },
    ],
  }),
});

/* ──────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Pre-Admission",
    body: "Pre-register online, upload records, and receive a digital welcome packet. Your concierge confirms travel and dietary preferences before you even arrive.",
    icon: ShieldCheck,
    image: heroCorridor,
  },
  {
    num: "02",
    title: "Arrival & Suite",
    body: "Greeted at the door and escorted to a private recovery suite — climate-controlled, nutritionally curated, and designed around your circadian recovery rhythms.",
    icon: Sparkles,
    image: hospitalLobby,
  },
  {
    num: "03",
    title: "Treatment",
    body: "One lead physician oversees every decision — from diagnosis through surgery to post-operative review. A single thread of absolute accountability.",
    icon: Stethoscope,
    image: operatingTheatre,
  },
  {
    num: "04",
    title: "Recovery & Home",
    body: "Access your encrypted dossier, schedule video follow-ups, and message your care team via the patient portal — complete continuity beyond discharge.",
    icon: HeartHandshake,
    image: surgicalTheater,
  },
];

const AMENITIES = [
  "Private climate-controlled suites",
  "Clinical nutrition & curated dining",
  "24/7 dedicated concierge nursing",
  "Encrypted digital patient records",
  "Valet & mobility assistance",
  "Family accommodation option",
];

const STATS = [
  { value: "24", suffix: "/7", label: "Nursing Support" },
  { value: "98", suffix: "%", label: "Satisfaction Rate" },
  { value: "1", suffix: ":3", label: "Nurse-Patient Ratio" },
  { value: "500", suffix: "+", label: "Beds Capacity" },
];

/* ──────────────────────────────── */
function PatientCarePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ══ 1. HERO: Layered Word-Mask Reveal ══ */
      const heroWords = gsap.utils.toArray<HTMLElement>(".hw");
      gsap.fromTo(
        heroWords,
        { yPercent: 115, skewY: 6, opacity: 0 },
        {
          yPercent: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.6,
          stagger: 0.12,
          ease: "expo.out",
          delay: 0.3,
        },
      );

      gsap.fromTo(
        ".hero-eyebrow",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: "expo.out", delay: 0.1 },
      );

      gsap.fromTo(
        ".hero-sub",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.8 },
      );

      // Hero image: clip-path wipe from right
      gsap.fromTo(
        ".hero-img-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 2, ease: "expo.inOut", delay: 0.2 },
      );

      // Floating badge
      gsap.fromTo(
        ".hero-badge",
        { y: 60, opacity: 0, rotation: 8 },
        { y: 0, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.5)", delay: 1.4 },
      );

      // Hero parallax
      gsap.to(".hero-img-inner", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ══ 2. STATS: Counting Numbers ══ */
      STATS.forEach((s, i) => {
        const el = document.querySelector<HTMLElement>(`.stat-val-${i}`);
        if (!el) return;
        const target = parseInt(s.value);
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              { val: 0 },
              { val: target, duration: 2, ease: "power2.out" },
              {
                onUpdate: function () {
                  el.textContent = Math.round(this.targets()[0].val).toString();
                },
              },
            );
          },
        });
        gsap.fromTo(
          el.parentElement,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.4)",
            delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });

      /* ══ 3. STICKY PINNED JOURNEY ══ */
      const stickyEl = stickyRef.current;
      if (stickyEl) {
        const panels = gsap.utils.toArray<HTMLElement>(".step-panel");
        const images = gsap.utils.toArray<HTMLElement>(".step-img");
        const totalScroll = (panels.length - 1) * (window.innerHeight * 0.8);

        ScrollTrigger.create({
          trigger: stickyEl,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          pinSpacing: true,
          scrub: false,
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = Math.min(Math.floor(progress * panels.length), panels.length - 1);
            panels.forEach((p, idx) => {
              const isActive = idx === activeIndex;
              gsap.to(p, {
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : idx < activeIndex ? -40 : 60,
                duration: 0.5,
                ease: "power3.out",
              });
            });
            images.forEach((img, idx) => {
              const isActive = idx === activeIndex;
              gsap.to(img, {
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.05,
                duration: 0.7,
                ease: "power3.out",
              });
            });
          },
        });

        // Initial state
        panels.forEach((p, i) => {
          if (i > 0) gsap.set(p, { opacity: 0, x: 60 });
        });
        images.forEach((img, i) => {
          if (i > 0) gsap.set(img, { opacity: 0, scale: 1.05 });
        });
      }

      /* ══ 4. PROMISE CARDS: Clip-path Curtain Drop ══ */
      gsap.utils.toArray<HTMLElement>(".promise-card").forEach((card, i) => {
        // clip mask drop
        gsap.fromTo(
          card,
          { clipPath: "inset(0 0 100% 0)", y: 30 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 1.4,
            ease: "expo.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          },
        );
      });

      /* ── 4.5 ONCOLOGY RIBBON DRAW ── */
      const ribbonPath = document.querySelector(".anim-ribbon-path") as SVGPathElement;
      if (ribbonPath) {
        const length = ribbonPath.getTotalLength();
        gsap.set(ribbonPath, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(ribbonPath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".oncology-focus",
            start: "top 75%",
            end: "bottom 35%",
            scrub: 1,
          },
        });
      }

      /* ── 4.6 ONCOLOGY TEXT STAGGER ── */
      gsap.fromTo(
        ".oncology-elem",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oncology-text-container",
            start: "top 80%",
            once: true,
          },
        },
      );

      /* ══ 5. MANIFESTO QUOTE: Word-by-word scroll scrub ══ */
      const quoteWords = gsap.utils.toArray<HTMLElement>(".qw");
      if (quoteWords.length) {
        gsap.fromTo(
          quoteWords,
          { opacity: 0.07 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: ".quote-section",
              start: "top 70%",
              end: "bottom 40%",
              scrub: 1,
            },
          },
        );
      }

      /* ══ 6. AMENITIES: Stagger + underline expand ══ */
      gsap.fromTo(
        ".amenity-row",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ".amenities-grid", start: "top 80%", once: true },
        },
      );

      /* ══ 7. IMAGE GRID: diagonal reveal ══ */
      gsap.utils.toArray<HTMLElement>(".grid-img").forEach((img, i) => {
        gsap.fromTo(
          img,
          { clipPath: i % 2 === 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)", scale: 1.1 },
          {
            clipPath: "inset(0 0 0 0)",
            scale: 1,
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: img, start: "top 82%", once: true },
          },
        );
      });

      /* ══ 8. SPLIT CTA section ══ */
      gsap.fromTo(
        ".cta-left-panel",
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ".cta-split", start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        ".cta-right-panel",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: "expo.out",
          delay: 0.15,
          scrollTrigger: { trigger: ".cta-split", start: "top 80%", once: true },
        },
      );

      // Magnetic button effect
      const magBtns = document.querySelectorAll<HTMLElement>(".mag-btn");
      magBtns.forEach((btn) => {
        btn.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-paper text-ink font-sans overflow-x-hidden selection:bg-magenta selection:text-white"
    >
      <SiteNav />

      {/* ════════════════════════════════════ */}
      {/* 1. HERO — Split layout + word mask  */}
      {/* ════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full grid lg:grid-cols-2 overflow-hidden"
      >
        {/* Left — text */}
        <div className="relative z-10 flex flex-col justify-end px-6 md:px-12 lg:px-20 pt-48 pb-16 md:pb-28 bg-paper">
          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center gap-4 mb-10">
            <span className="w-10 h-px bg-magenta" />
            <span className="text-[0.62rem] font-syne font-bold tracking-[0.35em] text-magenta uppercase">
              Patient Experience
            </span>
          </div>

          {/* Giant masked title */}
          <h1 className="font-display leading-[0.82] tracking-tighter mb-10 text-navy-deep">
            {["A", "sanctuary", "for"].map((w, i) => (
              <div key={i} className="overflow-hidden block">
                <span className="hw inline-block" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
                  {w}&nbsp;
                </span>
              </div>
            ))}
            <div className="overflow-hidden block">
              <span
                className="hw inline-block italic font-light text-magenta"
                style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
              >
                Healing.
              </span>
            </div>
          </h1>

          <p className="hero-sub max-w-md text-lg text-ink/60 font-light leading-relaxed mb-12">
            From admission to full recovery — every detail of your care has been designed around
            your comfort, dignity, and complete healing.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/appointments"
              className="mag-btn group bg-navy-deep text-paper px-8 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest hover:bg-magenta transition-colors duration-500 inline-flex items-center gap-3"
            >
              Book Your Visit
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/faqs"
              className="mag-btn border border-navy/20 px-8 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest text-ink/60 hover:border-navy hover:text-ink transition-all inline-flex items-center gap-3"
            >
              Patient FAQs
            </a>
          </div>
        </div>

        {/* Right — image with clip-path wipe */}
        <div className="relative overflow-hidden hero-img-wrap min-h-[50vh] lg:min-h-full">
          <img
            src={hospitalLobby}
            alt="Patient Suite"
            className="hero-img-inner w-full h-[115%] object-cover -top-[7%] absolute"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-paper/20 lg:to-transparent" />

          {/* Floating badge */}
          <div className="hero-badge absolute bottom-8 left-8 bg-navy-deep text-paper p-6 md:p-8 shadow-editorial max-w-[220px] z-10">
            <p className="font-display italic text-3xl leading-none mb-2">4.9 / 5</p>
            <p className="text-[0.58rem] font-syne uppercase tracking-[0.2em] text-paper/60 font-bold">
              Rated by 2,400+ patients
            </p>
          </div>
        </div>

        {/* Chromatic bottom edge */}
        <div className="chromatic-divider absolute bottom-0 left-0 right-0 z-20" />
      </section>

      {/* ════════════════════════════════════ */}
      {/* 2. STATS COUNTING BAR               */}
      {/* ════════════════════════════════════ */}
      <section className="bg-navy-deep text-paper py-16 md:py-20 border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x md:divide-white/10">
            {STATS.map((s, i) => (
              <div key={i} className="text-center md:px-12 first:pl-0 last:pr-0">
                <div className="font-display font-light leading-none mb-3">
                  <span
                    className={`stat-val-${i} text-5xl md:text-6xl text-paper`}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    0
                  </span>
                  <span className="text-3xl md:text-4xl text-magenta">{s.suffix}</span>
                </div>
                <p className="text-[0.58rem] font-syne uppercase tracking-[0.3em] text-paper/40 font-bold">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* 3. PROMISE CARDS                    */}
      {/* ════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="mb-20 grid md:grid-cols-2 gap-8 items-end">
          <div>
            <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-6 flex items-center gap-4">
              <span className="w-10 h-px bg-magenta" /> Our Promise
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.88] text-navy-deep">
              Without <em className="italic font-light text-navy-deep/50">Compromise.</em>
            </h2>
          </div>
          <p className="text-ink/55 text-lg font-light leading-relaxed max-w-sm md:ml-auto">
            We do not believe in mass-produced healthcare. Every protocol, every investment, every
            decision is measured against one standard: your wellbeing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "Continuity",
              body: "The same physician who diagnoses you will oversee your admission, surgery, and post-operative care. No handoffs. No lost context.",
              col: "bg-paper border border-navy/10",
              accent: "text-magenta",
            },
            {
              num: "02",
              title: "Transparency",
              body: "Complete encrypted access to your medical records, imaging, and lab reports within 24 hours of every procedure.",
              col: "bg-navy-deep text-paper",
              accent: "text-sky",
            },
            {
              num: "03",
              title: "Holistic Care",
              body: "Nutritional counseling, physiotherapy, mental health liaisons, and palliative care — woven into every treatment plan.",
              col: "bg-magenta text-paper",
              accent: "text-paper/80",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`promise-card group ${card.col} p-10 md:p-12 relative overflow-hidden hover:-translate-y-2 transition-transform duration-700`}
            >
              <div className="text-[5rem] font-display font-bold leading-none opacity-[0.04] absolute top-4 right-6 select-none">
                {card.num}
              </div>
              <div
                className={`text-[0.58rem] font-syne uppercase tracking-[0.3em] font-bold mb-6 ${card.accent}`}
              >
                {card.num} — {card.title}
              </div>
              <h3 className="font-display text-3xl md:text-4xl mb-6 leading-tight">{card.title}</h3>
              <p className={`font-light leading-relaxed ${i === 0 ? "text-ink/60" : "opacity-70"}`}>
                {card.body}
              </p>
              {/* Bottom line animation */}
              <div className="mt-10 h-[1px] bg-current opacity-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-current opacity-50 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* 4. STICKY JOURNEY SCROLL            */}
      {/* ════════════════════════════════════ */}
      <section
        ref={stickyRef}
        className="h-screen w-full bg-surface text-paper overflow-hidden relative"
        aria-label="Care Journey"
      >
        {/* Step images stacked */}
        <div className="absolute inset-0">
          {STEPS.map((step, i) => (
            <img
              key={i}
              src={step.image}
              alt={step.title}
              className={`step-img absolute inset-0 w-full h-full object-cover grayscale brightness-[0.35] ${i === 0 ? "" : "opacity-0"}`}
            />
          ))}
          {/* dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/80 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 h-full grid lg:grid-cols-2 items-center px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto gap-12">
          {/* Left text panels */}
          <div className="relative">
            <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-10 h-px bg-magenta" /> Your Care Journey
            </p>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className={`step-panel absolute inset-0 flex flex-col justify-center ${i === 0 ? "" : "opacity-0"}`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="size-12 rounded-full bg-magenta/15 border border-magenta/25 flex items-center justify-center">
                      <Icon className="size-5 text-magenta" />
                    </span>
                    <span className="font-display italic text-magenta text-4xl">{step.num}</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.88] mb-8">
                    {step.title}
                  </h2>
                  <p className="text-paper/60 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                    {step.body}
                  </p>

                  {/* Step indicators */}
                  <div className="flex gap-3 mt-12">
                    {STEPS.map((_, j) => (
                      <span
                        key={j}
                        className={`h-[2px] transition-all duration-500 ${j === i ? "w-10 bg-magenta" : "w-4 bg-white/20"}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
            {/* Spacer so panels stack */}
            <div className="invisible">
              <div className="text-7xl mb-8">Placeholder</div>
              <p className="text-xl max-w-lg">Placeholder body text here for height</p>
            </div>
          </div>

          {/* Right — scroll hint */}
          <div className="hidden lg:flex flex-col items-end justify-center h-full">
            <div className="flex flex-col items-center gap-3 opacity-50">
              <span className="text-[0.55rem] font-syne uppercase tracking-[0.35em] text-paper/50 -rotate-90 mb-4">
                Scroll to explore
              </span>
              <div className="w-px h-20 bg-gradient-to-b from-magenta to-transparent overflow-hidden">
                <div className="w-full h-full bg-paper animate-scroll-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* 4.5 ONCOLOGY & CANCER FOCUS         */}
      {/* ════════════════════════════════════ */}
      <section className="oncology-focus py-32 md:py-56 px-6 md:px-12 lg:px-24 bg-paper text-navy-deep border-b border-navy/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
        <div className="relative z-10 max-w-[1000px] mx-auto text-center oncology-text-container">
          <div className="oncology-elem flex justify-center mb-10">
            {/* Small, highly visible, stable pink ribbon icon */}
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 bg-magenta/20 blur-xl rounded-full" />
              <svg
                viewBox="0 0 100 150"
                className="w-12 h-16 text-magenta relative z-10 drop-shadow-md"
                stroke="currentColor"
                fill="none"
              >
                <path
                  d="M 25,140 C 50,90 80,50 80,30 C 80,10 50,5 45,30 C 40,55 30,85 75,140"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <p className="oncology-elem text-[0.65rem] font-syne font-bold tracking-[0.5em] text-magenta uppercase mb-8">
            Specialized Oncology Care
          </p>
          <h2 className="oncology-elem font-display text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.85] tracking-tight mb-12 text-navy-deep">
            Standing with you <br className="hidden md:block" />
            <em className="italic font-light text-magenta drop-shadow-sm">every step.</em>
          </h2>
          <p className="oncology-elem text-ink/65 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto mb-16">
            A cancer diagnosis changes everything in an instant. Our oncology department is built
            not just with advanced radiation tech and robotic surgery, but with an unparalleled
            depth of human compassion to fight alongside you.
          </p>
          <div className="oncology-elem flex items-center justify-center gap-6">
            <span className="w-16 h-px bg-magenta/50" />
            <span className="text-[0.55rem] font-syne uppercase tracking-widest text-ink/40 font-bold">
              Unrelenting Hope
            </span>
            <span className="w-16 h-px bg-magenta/50" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* 5. AMENITIES + IMAGE GRID           */}
      {/* ════════════════════════════════════ */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-10 h-px bg-magenta" /> In-Suite Amenities
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.9] text-navy-deep mb-12">
              Designed for <br />
              <em className="italic font-light text-navy-deep/50">comfort.</em>
            </h2>

            <div className="amenities-grid space-y-0 divide-y divide-navy/8">
              {AMENITIES.map((item, i) => (
                <div key={i} className="amenity-row group flex items-center gap-5 py-5 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-magenta scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                  <CheckCircle2 className="size-5 text-magenta shrink-0" />
                  <span className="text-lg font-light text-ink/80 group-hover:text-ink transition-colors">
                    {item}
                  </span>
                  <ArrowRight className="size-4 text-magenta ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Right — image composition */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid-img relative col-span-2 h-[45vh] overflow-hidden">
              <img
                src={operatingTheatre}
                alt="Operating Theatre"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-[2s]"
              />
              <div className="absolute top-4 left-4 bg-paper px-4 py-2 text-[0.55rem] font-syne font-bold uppercase tracking-widest text-navy-deep">
                Recovery Suite
              </div>
            </div>
            <div className="grid-img relative h-[30vh] overflow-hidden">
              <img
                src={founderDoctor}
                alt="Expert care"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-[filter] duration-[2s]"
              />
            </div>
            <div className="grid-img relative h-[30vh] overflow-hidden">
              <img
                src={heroCorridor}
                alt="Hospital corridor"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-[2s]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* 6. QUOTE / MANIFESTO — scroll scrub */}
      {/* ════════════════════════════════════ */}
      <section className="quote-section py-40 md:py-56 px-6 md:px-12 lg:px-24 bg-navy-deep overflow-hidden relative">
        {/* Background texture */}
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-magenta/5 rounded-full blur-[200px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <span className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-12 block">
            Our Guiding Belief
          </span>
          <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.2] text-paper">
            {`"Healing is not merely technical. It is deeply, irreversibly human — and every patient deserves to be treated as the masterpiece they are."`
              .split(" ")
              .map((word, i) => (
                <span key={i} className="qw inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
          </p>
          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-magenta" />
            <span className="text-[0.6rem] font-syne uppercase tracking-[0.3em] text-paper/40 font-bold">
              Dr. Founder, Shree Kalyan Hospital
            </span>
            <div className="w-12 h-px bg-magenta" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* 7. VISITOR INFO — minimal editorial */}
      {/* ════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto border-b border-navy/10">
        <div className="mb-20">
          <h2
            className="font-display text-5xl md:text-7xl text-navy-deep leading-[0.88]"
            data-reveal
          >
            Plan your <em className="italic font-light text-navy-deep/40">visit.</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-navy/10">
          {[
            {
              title: "Visiting Hours",
              value: "10 AM – 8 PM",
              detail: "ICU by appointment. Family accommodation available for critical patients.",
            },
            {
              title: "Parking & Drop-Off",
              value: "Valet Service",
              detail: "Complimentary valet for all patients. Wheelchair-accessible main entrance.",
            },
            {
              title: "On-Site Amenities",
              value: "Full Service",
              detail: "Pharmacy, café, prayer room, and a curated healing garden — open to all.",
            },
          ].map((item, i) => (
            <div key={i} className="group px-0 md:px-12 py-10 first:pl-0 last:pr-0" data-reveal>
              <span className="text-[0.58rem] font-syne uppercase tracking-[0.3em] text-ink/40 font-bold block mb-5">
                {item.title}
              </span>
              <div className="font-display text-3xl md:text-4xl text-navy-deep mb-5 group-hover:text-magenta transition-colors duration-500">
                {item.value}
              </div>
              <p className="text-ink/55 font-light leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* 8. SPLIT CTA PANEL                  */}
      {/* ════════════════════════════════════ */}
      <section className="cta-split grid lg:grid-cols-2 min-h-[60vh]">
        {/* Left — image */}
        <div className="cta-left-panel relative overflow-hidden min-h-[40vh]">
          <img
            src={surgicalTheater}
            alt="Our facility"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-navy-deep/60" />
          <div className="absolute inset-0 flex items-end p-10 md:p-16">
            <p className="font-display italic text-4xl md:text-5xl text-paper leading-tight max-w-xs">
              "Your life is our masterpiece."
            </p>
          </div>
        </div>

        {/* Right — CTA */}
        <div className="cta-right-panel bg-magenta text-paper flex flex-col justify-center px-10 md:px-20 py-20 md:py-28">
          <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-paper/70 uppercase mb-8">
            Ready to Begin
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-[0.9]">
            Questions about <br />
            your visit?
          </h2>
          <p className="text-paper/75 font-light text-lg mb-12 max-w-sm leading-relaxed">
            Our concierge team is available around the clock — from insurance coordination to
            dietary preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="mag-btn group bg-paper text-ink px-10 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest hover:bg-navy-deep hover:text-paper transition-colors duration-500 text-center inline-flex items-center justify-center gap-3"
            >
              Contact Concierge
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/faqs"
              className="border border-paper/30 px-10 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest text-paper hover:bg-white/10 transition-colors text-center"
            >
              Read FAQs
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
