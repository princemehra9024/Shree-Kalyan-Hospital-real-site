import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Plus,
  Minus,
  Search,
  ArrowRight,
  Phone,
  Mail,
  Award,
  Send,
  MessageCircle,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

import abstractCorridor from "@/assets/hero-corridor.jpg";
import hospitalLobby from "@/assets/hospital-lobby.png";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/faqs")({
  component: FAQsPage,
  head: () => ({
    meta: [
      { title: "Patient Guidelines & FAQs · Shree Kalyan Hospital" },
      {
        name: "description",
        content:
          "Complete guidelines, admission protocols, and FAQs for patients at Shree Kalyan Hospital.",
      },
      { property: "og:title", content: "Patient Guidelines & FAQs · Shree Kalyan Hospital" },
      {
        property: "og:description",
        content:
          "Complete guidelines, admission protocols, and FAQs for patients at Shree Kalyan Hospital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

/* ── Categorized FAQ Data ── */
const FAQ_CATEGORIES = [
  {
    id: "clinical",
    title: "Clinical Care & Surgery",
    items: [
      {
        q: "How does the “same physician” policy work?",
        a: "We believe continuity is paramount. The lead physician who conducts your initial diagnosis will personally oversee your admission, surgical intervention, and post-operative review to ensure no nuance is lost in translation.",
      },
      {
        q: "What is the wait time for elective surgery?",
        a: "Our commitment to 'unhurried medicine' ensures precision over volume. However, most elective procedures can be scheduled within a week of your initial consultation, with dedicated theatre slots reserved for complex cases.",
      },
    ],
  },
  {
    id: "diagnostics",
    title: "Diagnostics & Radiology",
    items: [
      {
        q: "Do I need an appointment for X-rays or advanced scans?",
        a: "Routine X-rays and baseline ultrasounds are accommodated on a walk-in basis (24/7). However, for advanced imaging like 3-Tesla MRI or PET-CT, prior appointments are strictly required so our molecular imaging specialists can prepare your suite and specific protocol.",
      },
      {
        q: "Can I request copies of my imaging reports?",
        a: "Absolutely. All patients are provided secure, encrypted digital access to their complete medical dossier—including high-resolution 4D echo and MRI scans—within 24 hours of the procedure.",
      },
    ],
  },
  {
    id: "facilities",
    title: "Facilities & Amenities",
    items: [
      {
        q: "What is included in private recovery suites?",
        a: "Our private suites are sanctuaries of quiet healing. They feature 1:3 ratio nursing staff, climate and circadian lighting controls, curated clinical nutrition meals, and luxury accommodations for one accompanying family member.",
      },
      {
        q: "Are there spaces for prayer or meditation?",
        a: "Yes. Healing is holistic. We maintain a non-denominational prayer room and a curated, climate-controlled indoor healing garden accessible to all patients and their families at any hour.",
      },
      {
        q: "What are the intensive care visiting hours?",
        a: "To maintain stringent infection control and ensure uninterrupted critical care, ICU visits are strictly by appointment, typically restricted to 11 AM – 12 PM and 5 PM – 6 PM. Emergency exceptions are made at the Lead Intensivist's discretion.",
      },
    ],
  },
  {
    id: "financial",
    title: "Financial & Concierge",
    items: [
      {
        q: "Do you accept cashless insurance?",
        a: "Yes, we partner with all major national health insurance providers. Our TPA desk handles direct-billing arrangements and coverage verification for a seamless experience.",
      },
      {
        q: "Is remote second-opinion consultation possible?",
        a: "Yes. Through our Telemedicine Protocol, our specialists offer remote consultations. For complex cases, we routinely facilitate multi-disciplinary remote reviews.",
      },
      {
        q: "Do you offer support for out-of-town patients?",
        a: "Yes. Our patient experience team coordinates nearby stays for extended family and handles local logistical requirements for patients travelling from other cities.",
      },
    ],
  },
];

/* ════════════════════════════════════════════════ */
/* Custom Bespoke Animated Accordion Item           */
/* ════════════════════════════════════════════════ */
function AnimatedFAQItem({ q, a, num }: { q: string; a: string; num: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !wrapperRef.current) return;
    if (isOpen) {
      gsap.to(wrapperRef.current, {
        height: contentRef.current.scrollHeight,
        duration: 0.6,
        ease: "expo.inOut",
      });
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.15,
        ease: "power3.out",
      });
    } else {
      gsap.to(wrapperRef.current, { height: 0, duration: 0.5, ease: "expo.inOut" });
      gsap.to(contentRef.current, { opacity: 0, y: -15, duration: 0.3, ease: "power3.in" });
    }
  }, [isOpen]);

  return (
    <div className="group border-b border-navy/10 relative overflow-hidden">
      {/* Animated hover background */}
      <div className="absolute inset-x-0 bottom-0 h-0 bg-navy/3 group-hover:h-full transition-all duration-700 pointer-events-none" />

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-10 md:py-12 pr-12 relative z-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-12"
      >
        <span className="text-[0.6rem] font-syne uppercase tracking-widest text-magenta/50 font-bold shrink-0 pt-2">
          {num}
        </span>
        <span
          className={`font-display text-2xl md:text-4xl leading-tight transition-colors duration-500 max-w-3xl ${isOpen ? "text-magenta italic" : "text-navy-deep group-hover:text-magenta"}`}
        >
          {q}
        </span>

        {/* Toggle icon */}
        <div className="absolute right-0 top-10 md:top-14 size-8 border border-navy/10 rounded-full flex items-center justify-center group-hover:border-magenta transition-colors duration-500">
          <div className="relative size-3 flex items-center justify-center">
            <span className="absolute w-full h-[1.5px] bg-navy-deep group-hover:bg-magenta transition-colors" />
            <span
              className={`absolute w-full h-[1.5px] bg-navy-deep group-hover:bg-magenta transition-all duration-500 ${isOpen ? "rotate-0" : "rotate-90"}`}
            />
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      <div ref={wrapperRef} className="h-0 overflow-hidden relative z-10">
        <div ref={contentRef} className="pb-12 pl-0 md:pl-20 opacity-0 -translate-y-4 max-w-3xl">
          <p className="text-lg md:text-xl text-ink/65 font-light leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════ */
/* Main Page Component                              */
/* ════════════════════════════════════════════════ */
function FAQsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(FAQ_CATEGORIES[0].id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Hero Reveal Parallax ── */
      gsap.fromTo(
        ".hq-word",
        { yPercent: 110, skewY: 5, opacity: 0 },
        {
          yPercent: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
        },
      );
      gsap.fromTo(
        ".hq-line",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.1 },
      );

      // Image sweep in
      gsap.fromTo(
        ".hq-hero-img",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", scale: 1.1 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          scale: 1,
          duration: 2,
          ease: "expo.inOut",
          delay: 0.1,
        },
      );

      // Image Parallax scroll
      gsap.to(".hq-hero-img-inner", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hq-hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── 2. ScrollSpy for Sticky Index ── */
      FAQ_CATEGORIES.forEach((cat) => {
        ScrollTrigger.create({
          trigger: `#cat-${cat.id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveTab(cat.id);
          },
        });
      });

      /* ── 3. Category Headings Entrance ── */
      gsap.utils.toArray<HTMLElement>(".cat-heading").forEach((heading) => {
        gsap.fromTo(
          heading,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: heading, start: "top 85%", once: true },
          },
        );
      });

      /* ── 4. FAQ Items Staggered Reveal ── */
      gsap.utils.toArray<HTMLElement>(".faq-item-anim").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          },
        );
      });

      /* ── 5. Journey Cards Reveal ── */
      gsap.fromTo(
        ".journey-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".journey-track", start: "top 80%", once: true },
        },
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Smooth scroll to category
  const scrollToCat = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={pageRef}
      className="bg-paper text-ink font-sans overflow-x-hidden selection:bg-magenta selection:text-white"
    >
      <SiteNav />

      {/* ═══════════════════════════════════════ */}
      {/* 1. CINEMATIC HERO                       */}
      {/* ═══════════════════════════════════════ */}
      <section className="hq-hero-section relative w-full pt-40 md:pt-48 pb-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto min-h-[85vh] flex flex-col justify-end border-b border-navy/10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-end relative z-10">
          {/* Text Left */}
          <div className="lg:col-span-6 pb-10">
            <div className="hq-line flex items-center gap-4 mb-10">
              <span className="w-10 h-px bg-magenta" />
              <span className="text-[0.62rem] font-syne font-bold tracking-[0.35em] text-magenta uppercase">
                Patient Resources
              </span>
            </div>

            <h1 className="font-display leading-[0.88] tracking-tighter text-navy-deep mb-10">
              {["Guidance", "for your", "journey."].map((w, i) => (
                <div key={i} className="overflow-hidden">
                  <span
                    className={`hq-word block ${i === 2 ? "italic font-light text-magenta" : ""}`}
                    style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
                  >
                    {w}
                  </span>
                </div>
              ))}
            </h1>

            <p className="hq-line text-lg md:text-xl text-ink/60 font-light leading-relaxed max-w-lg">
              Absolute clarity is the first step toward healing. Find comprehensive details
              regarding our clinical protocols, admission processes, and global insurance networks.
            </p>
          </div>

          {/* Image Right */}
          <div className="lg:col-span-6 h-[45vh] lg:h-[65vh] w-full relative group">
            <div className="hq-hero-img w-full h-full overflow-hidden absolute inset-0">
              <img
                src={abstractCorridor}
                alt="Hospital Facility"
                className="hq-hero-img-inner w-full h-[120%] object-cover grayscale transition-all duration-[2s] group-hover:grayscale-0 absolute -top-[10%]"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            {/* Corner decorator */}
            <div className="absolute -bottom-6 -left-6 size-24 border-l border-b border-magenta/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 1.5. PREPARATION JOURNEY                */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-ink text-paper overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/5 to-transparent pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-6 flex items-center gap-4">
                <span className="w-10 h-px bg-magenta" /> Pre-Admission Guide
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-paper">
                Before you <em className="italic font-light text-paper/50">arrive.</em>
              </h2>
            </div>
            <p className="max-w-sm text-paper/60 font-light leading-relaxed">
              To ensure a seamless experience, we request you to follow these essential preparatory
              steps prior to your scheduled consultation or admission.
            </p>
          </div>

          <div className="journey-track grid md:grid-cols-4 gap-4 mt-16">
            {[
              {
                num: "01",
                t: "Documentation",
                d: "Collate all past medical records, imaging CDs, and valid government ID.",
              },
              {
                num: "02",
                t: "Medications",
                d: "Bring a physical list of all current prescriptions and dietary supplements.",
              },
              {
                num: "03",
                t: "Fasting Rules",
                d: "Adhere to the 12-hour fasting protocol if scheduled for surgery or PET-CT.",
              },
              {
                num: "04",
                t: "Arrival Time",
                d: "Arrive exactly 45 minutes prior to your allocated slot for registration.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="journey-card bg-navy-deep/40 border border-white/5 p-8 hover:bg-navy-deep transition-colors duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 text-6xl font-display font-bold text-white/[0.03] group-hover:text-magenta/10 transition-colors duration-500 pointer-events-none">
                  {step.num}
                </div>
                <div className="size-10 rounded-full border border-magenta/30 flex items-center justify-center text-magenta mb-12 group-hover:bg-magenta group-hover:text-white transition-all duration-500">
                  <span className="font-syne text-[0.6rem] font-bold">{step.num}</span>
                </div>
                <h3 className="font-display text-2xl text-paper mb-4 relative z-10">{step.t}</h3>
                <p className="text-paper/50 font-light text-sm leading-relaxed relative z-10">
                  {step.d}
                </p>
                {/* Bottom animated border */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-magenta group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 2. STICKY INDEX & ACCORDION LIST        */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 relative items-start">
          {/* Left: Sticky Sidebar Index */}
          <div className="hidden lg:block lg:col-span-4 sticky top-40 text-sm">
            <p className="text-[0.6rem] font-syne font-bold tracking-[0.3em] text-magenta uppercase mb-12 flex items-center gap-4">
              Directory Index
            </p>
            <div className="flex flex-col gap-8">
              {FAQ_CATEGORIES.map((cat, i) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCat(cat.id)}
                    className="group flex flex-col gap-2 text-left"
                  >
                    <span className="text-[0.55rem] font-syne uppercase tracking-widest text-ink/30 font-bold group-hover:text-magenta transition-colors">
                      Section 0{i + 1}
                    </span>
                    <span
                      className={`font-display text-2xl transition-all duration-500 ${isActive ? "text-magenta italic" : "text-navy-deep group-hover:text-magenta"}`}
                    >
                      {cat.title}
                    </span>
                    {/* Animated underline */}
                    <div className="h-[1px] w-full bg-navy/10 mt-2 relative overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 bg-magenta transition-all duration-700 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-20 p-8 bg-surface text-paper shadow-editorial border border-white/10 group cursor-pointer hover:border-magenta/50 transition-colors duration-500">
              <span className="text-[0.55rem] font-syne uppercase tracking-widest text-paper/50 font-bold block mb-4 group-hover:text-magenta">
                24/7 Support
              </span>
              <p className="font-display text-3xl leading-tight mb-6">Need direct assistance?</p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 text-[0.65rem] font-syne uppercase tracking-widest text-magenta font-bold"
              >
                Contact Concierge{" "}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Scrolling FAQs */}
          <div className="lg:col-span-8 space-y-32">
            {FAQ_CATEGORIES.map((cat, cIdx) => (
              <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-40">
                <h2 className="cat-heading font-display text-4xl md:text-5xl text-navy-deep mb-12 border-b border-navy/20 pb-8 flex items-end justify-between">
                  <span>{cat.title}</span>
                  <span className="text-[0.6rem] font-syne uppercase tracking-[0.3em] font-normal text-ink/30 block mb-2">
                    SEC 0{cIdx + 1}
                  </span>
                </h2>
                <div className="flex flex-col">
                  {cat.items.map((item, iIdx) => {
                    const num = `0${cIdx + 1}.0${iIdx + 1}`;
                    return (
                      <div key={iIdx} className="faq-item-anim [perspective:1000px]">
                        <AnimatedFAQItem num={num} q={item.q} a={item.a} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3. VISUAL FOOTER CALLOUT                */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative px-6 md:px-12 lg:px-24 py-32 md:py-48 bg-navy-deep text-paper overflow-hidden">
        {/* Abstract shape backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-1/2 -right-1/4 w-[120%] h-[200%] bg-magenta/10 rounded-[100%] blur-[120px] mix-blend-screen" />
          <img
            src={hospitalLobby}
            alt=""
            className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto text-center" data-reveal>
          <Send className="size-12 text-magenta mx-auto mb-10 opacity-80" />
          <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] text-paper mb-8 tracking-tight">
            Didn't find your <em className="italic font-light text-magenta">answer?</em>
          </h2>
          <p className="text-paper/60 font-light text-xl md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
            Our specialized concierge team is available around the clock to provide detailed context
            to any specific medical, travel, or administrative inquiry.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="mag-btn group bg-magenta text-paper px-10 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest hover:bg-paper hover:text-navy-deep transition-colors duration-500 text-center inline-flex items-center justify-center gap-3"
            >
              Write to us
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+918529219330"
              className="border border-paper/30 px-10 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest text-paper hover:bg-white/10 transition-colors text-center"
            >
              Call Concierge
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
