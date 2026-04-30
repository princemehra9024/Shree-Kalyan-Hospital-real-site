import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  Building2,
  HeartPulse,
  Stethoscope,
  Users,
  CheckCircle2,
  ArrowDownRight,
  Award,
  ChevronRight,
} from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Assets
import founderDoctor from "@/assets/founder-doctor.png";
import hospitalLobby from "@/assets/hospital-lobby.png";
import operatingTheatre from "@/assets/operating-theatre.png";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us | Shree Kalyan Hospital" },
      {
        name: "description",
        content:
          "Learn more about Shree Kalyan Hospital, our history, and our commitment to providing world-class healthcare in Kota, Rajasthan.",
      },
    ],
  }),
});

const TIMELINE = [
  {
    year: "2001",
    subtitle: "Genesis",
    title: "The Foundation",
    desc: "Shree Kalyan Hospital opens its doors as a specialized surgical center in Kota, Rajasthan — built on a single obsession: unhurried care.",
  },
  {
    year: "2008",
    subtitle: "Innovation",
    title: "Technological Leap",
    desc: "Introduction of the first robotic-assisted surgery suite in the region, setting a new standard for precision and minimal-invasive procedures.",
  },
  {
    year: "2015",
    subtitle: "Growth",
    title: "Regional Expansion",
    desc: "Expansion into a multi-specialty regional landmark with dedicated centres for Cardiology, Oncology, and state-of-the-art Neurosciences.",
  },
  {
    year: "2024+",
    subtitle: "Future",
    title: "Legacy of Care",
    desc: "Celebrating over 1 million lives touched, consecutive NABH re-accreditations, and continuing our mission.",
  },
];

const LEADERSHIP = [
  {
    img: doctor1,
    role: "Chief of Surgery",
    name: "Dr. Arvind Mehta",
    desc: "Over 30 years of excellence in minimally invasive and robotic surgical oncology.",
  },
  {
    img: doctor2,
    role: "Head of Cardiology",
    name: "Dr. Sunita Sharma",
    desc: "Pioneer in complex angioplasties and advanced structural heart disease interventions.",
  },
  {
    img: doctor3,
    role: "Chief Neurologist",
    name: "Dr. Vikram Singh",
    desc: "Widely renowned for critical neuro-navigation and spinal reconstructive procedures.",
  },
  {
    img: doctor4,
    role: "Medical Director",
    name: "Dr. Ananya Roy",
    desc: "Leading the global clinical governance and patient safety protocols across all facilities.",
  },
];

function AboutPage() {
  useGsapReveal();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Parallax
      gsap.to(".hero-bg-img", {
        yPercent: 20,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Huge Typography Scroll Skew
      gsap.to(".hero-massive-text", {
        xPercent: -5,
        skewX: -2,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 3. Founder Image Parallax
      gsap.to(".founder-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 4. Marquee Infinite Animation
      gsap.to(".marquee-content", {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1,
      });

      // 5. Leadership Cards Entrance Animation
      const leaderCards = gsap.utils.toArray<HTMLElement>(".leader-card");
      leaderCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ".leadership-section",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // 6. Timeline Progress & Custom Award-Winning Animations
      gsap.to(".timeline-progress-line", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      const timelineSteps = gsap.utils.toArray<HTMLElement>(".timeline-step");
      timelineSteps.forEach((step) => {
        const dot = step.querySelector(".timeline-dot");
        const yearBlock = step.querySelector(".timeline-year-block");
        const titleMask = step.querySelector(".timeline-title-mask h3");
        const descMask = step.querySelector(".timeline-desc-mask p");
        const bgYear = step.querySelector(".timeline-year-bg");

        if (bgYear) {
          gsap.fromTo(
            bgYear,
            { y: 150, opacity: 0, scale: 0.8 },
            {
              y: -50,
              opacity: 0.04,
              scale: 1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: step,
                start: "top 90%",
                end: "bottom 10%",
                scrub: 1,
              },
            },
          );
        }

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0.5, backgroundColor: "transparent" },
            {
              scale: 1,
              backgroundColor: "#e0185e",
              boxShadow: "0 0 25px 8px rgba(224, 24, 94, 0.5)",
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: step,
                start: "top center",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (yearBlock) {
          gsap.fromTo(
            yearBlock,
            { x: -80, opacity: 0, rotationY: -15 },
            {
              x: 0,
              opacity: 1,
              rotationY: 0,
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (titleMask) {
          gsap.fromTo(
            titleMask,
            { yPercent: 120, skewY: 4, opacity: 0 },
            {
              yPercent: 0,
              skewY: 0,
              opacity: 1,
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (descMask) {
          gsap.fromTo(
            descMask,
            { x: 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              delay: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      // 7. Manifesto Parallax
      gsap.to(".manifesto-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-paper text-ink font-sans pb-0 selection:bg-magenta selection:text-white overflow-hidden"
    >
      <SiteNav />

      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative w-full pt-44 pb-32 px-6 md:px-12 lg:px-24 flex flex-col justify-center bg-paper hero-section border-b border-navy/5">
        <div className="max-w-[1600px] mx-auto w-full relative z-10 grid grid-cols-12 gap-y-16 gap-x-8 items-center lg:items-end">
          <div className="col-span-12 lg:col-span-8 order-2 lg:order-1 relative z-20">
            <div className="mb-8 flex items-center gap-6" data-anim="hero-eyebrow">
              <span className="h-px w-16 bg-navy-deep"></span>
              <span className="text-[0.65rem] font-syne uppercase tracking-[0.4em] font-bold text-navy-deep">
                Established 2001
              </span>
            </div>

            <h1
              className="font-display text-navy-deep leading-[0.8] tracking-tighter mix-blend-multiply hero-massive-text"
              data-anim="hero-title"
            >
              <span className="block text-6xl md:text-[6rem] lg:text-[8rem]">A Legacy</span>
              <span className="block text-7xl md:text-[7rem] lg:text-[9.5rem] mt-2 lg:mt-4">
                <em className="italic font-light text-magenta pr-4 lg:pr-8">of</em>Care.
              </span>
            </h1>

            <div
              className="mt-16 max-w-xl pl-6 border-l-2 border-magenta relative"
              data-anim="hero-body"
            >
              <div className="absolute -left-[5px] top-0 size-2 bg-magenta rounded-full"></div>
              <p className="text-xl md:text-2xl text-ink/80 font-light leading-relaxed">
                Twenty-five years of quiet precision. Delivering world-class healthcare with an
                uncompromising, human touch right here in Kota.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-12 lg:gap-20 mt-20 pt-10 border-t border-navy/10"
              data-reveal
            >
              <div className="flex flex-col">
                <span className="font-display font-light text-4xl text-navy-deep">
                  500<span className="text-magenta">+</span>
                </span>
                <span className="text-[0.55rem] font-syne uppercase tracking-widest text-ink/60 mt-3 font-bold">
                  Beds Facility
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-light text-4xl text-navy-deep">
                  140<span className="text-magenta">+</span>
                </span>
                <span className="text-[0.55rem] font-syne uppercase tracking-widest text-ink/60 mt-3 font-bold">
                  Top Specialists
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-light text-4xl text-navy-deep">
                  1M<span className="text-magenta">+</span>
                </span>
                <span className="text-[0.55rem] font-syne uppercase tracking-widest text-ink/60 mt-3 font-bold">
                  Lives Touched
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 order-1 lg:order-2 relative">
            <div
              className="relative aspect-[3/4] w-full max-w-[400px] mx-auto lg:ml-auto group hero-img-container"
              data-anim="hero-image"
            >
              <div className="absolute inset-0 border border-navy/15 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 pointer-events-none transition-transform duration-700 group-hover:translate-x-8 group-hover:translate-y-8"></div>
              <div className="absolute inset-0 bg-navy/5 overflow-hidden">
                <img
                  src={hospitalLobby}
                  alt="Hospital Lobby"
                  className="w-full h-[120%] object-cover grayscale transition-all duration-[2s] group-hover:grayscale-0 hero-bg-img"
                  style={{ top: "-10%" }}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <div
                className="absolute -bottom-10 -left-6 md:-left-12 bg-navy-deep p-6 md:p-8 shadow-editorial z-30 max-w-[240px]"
                data-anim="hero-badge"
              >
                <ArrowDownRight className="w-8 h-8 text-magenta mb-6" />
                <p className="font-display italic text-paper text-2xl leading-none mb-3">
                  Shree Kalyan Campus
                </p>
                <p className="text-[0.6rem] font-syne uppercase tracking-[0.2em] text-paper/60 font-bold hidden sm:block">
                  Kota, Rajasthan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto border-t border-ink/10">
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24"
          data-reveal
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl text-navy-deep leading-[0.85] tracking-tight">
            Heritage & <span className="italic font-light text-magenta">milestones.</span>
          </h2>
          <p className="text-lg text-ink/60 max-w-[36ch] leading-relaxed">
            A brief history of our evolution from a surgical center to a regional center of
            excellence.
          </p>
        </div>

        <div className="space-y-12">
          {[
            {
              year: "2001",
              event: "Shree Kalyan Surgical Center founded by senior consultants in Kota.",
            },
            {
              year: "2008",
              event: "Expansion into a multi-specialty facility with advanced cardiology wing.",
            },
            {
              year: "2015",
              event: "Attained NABH accreditation, the gold standard for Indian healthcare.",
            },
            {
              year: "2021",
              event: "Inauguration of the Precision Oncology and Robotic Surgery department.",
            },
            {
              year: "2024",
              event: "Celebrating 25 years of restoring vitality through quiet precision.",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="group grid grid-cols-12 gap-x-6 py-12 border-b border-ink/5 items-center hover:bg-magenta/[0.01] transition-colors"
              data-reveal
            >
              <div className="col-span-3 md:col-span-2">
                <span className="font-display text-4xl md:text-6xl italic text-magenta/40 group-hover:text-magenta transition-colors">
                  {m.year}
                </span>
              </div>
              <div className="col-span-9 md:col-span-10">
                <p className="font-display text-2xl md:text-4xl text-navy-deep/80 max-w-3xl leading-snug">
                  {m.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-32 bg-navy-deep text-paper overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-magenta)_0%,_transparent_70%)]" />
        </div>

        <div className="max-w-[1200px] mx-auto text-center" data-reveal>
          <p className="text-[0.65rem] font-bold tracking-[0.5em] text-magenta uppercase mb-12">
            Our Core Pillars
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            {[
              {
                title: "Precision",
                desc: "Advanced diagnostics and surgical accuracy that leaves no room for doubt.",
              },
              {
                title: "Presence",
                desc: "A commitment to being fully attentive to every patient’s unique narrative.",
              },
              {
                title: "Progress",
                desc: "Continuously evolving our clinical protocols to lead the frontier of care.",
              },
            ].map((p, i) => (
              <div key={i} className="group">
                <h3 className="font-display text-5xl mb-6 italic font-light group-hover:text-magenta transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm tracking-wide leading-relaxed opacity-60 font-light">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE (AWARDS) */}
      <section className="py-8 bg-magenta text-paper overflow-hidden border-y border-navy-deep">
        <div className="flex whitespace-nowrap marquee-content w-[200%] items-center">
          {/* Repeat items twice for smooth infinite loop */}
          {[1, 2].map((group) => (
            <div key={group} className="flex items-center gap-16 px-8 w-1/2 justify-around">
              <span className="font-display font-light italic text-3xl md:text-5xl flex items-center gap-6">
                <Award className="w-10 h-10" /> NABH Accredited
              </span>
              <span className="h-2 w-2 rounded-full bg-paper/50"></span>
              <span className="font-display font-light italic text-3xl md:text-5xl">
                ISO 9001:2015
              </span>
              <span className="h-2 w-2 rounded-full bg-paper/50"></span>
              <span className="font-display font-light italic text-3xl md:text-5xl">
                #1 Central India Healthcare
              </span>
              <span className="h-2 w-2 rounded-full bg-paper/50"></span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OUR STORY */}
      <section className="py-32 px-6 lg:px-24 max-w-[1600px] mx-auto bg-paper story-section relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">
          <div className="col-span-1 lg:col-span-5 relative" data-reveal>
            <div className="h-[600px] overflow-hidden group border border-navy/5 relative">
              <img
                src={founderDoctor}
                alt="Founder"
                className="w-full h-[120%] object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] absolute top-[-10%] founder-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute top-8 -right-8 origin-bottom-right -rotate-90 hidden lg:block">
              <p className="text-[0.55rem] font-syne uppercase tracking-[0.4em] text-navy-deep font-bold mix-blend-multiply">
                Origin · 2001
              </p>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-6 lg:col-start-7 lg:sticky lg:top-32" data-reveal>
            <div className="mb-12">
              <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-8 flex items-center gap-4">
                <span className="w-12 h-px bg-magenta" /> Our Story
              </p>
              <h2 className="font-display text-4xl md:text-6xl leading-[0.9] text-navy-deep">
                Pioneers of <br />
                <em className="italic font-light text-magenta">Empathy.</em>
              </h2>
            </div>

            <div className="space-y-6 text-ink/75 text-lg font-light leading-relaxed">
              <p>
                From a modest surgical center to a leading multi-specialty hospital, our journey has
                been driven by one core philosophy: the patient always comes first.
              </p>
              <p>
                When we opened our doors in 2001, we aimed to create a sanctuary of healing. We
                understood that modern healthcare requires advanced technology, but we also knew
                that true healing requires empathy, patience, and a human connection.
              </p>
              <p>
                Today, Shree Kalyan Hospital is recognized across Rajasthan and beyond for its
                specialized departments, from Robotic Surgery to Oncology, all operating under the
                same guiding principle of unhurried, personalized care.
              </p>
            </div>

            <div className="mt-14 pt-8 border-t border-navy/10 relative">
              <div className="absolute top-0 right-1/2 w-4 h-[2px] bg-magenta"></div>
              <p className="font-display text-3xl italic text-navy-deep leading-tight">
                "Healing is not merely technical. It is deeply, irreversibly human."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE JOURNEY TIMELINE - Custom GSAP Timeline */}
      <section className="py-32 bg-surface text-paper relative timeline-section border-t border-white/5">
        <div className="max-w-[1600px] mx-auto relative z-10 px-6 lg:px-24">
          <div className="mb-24 flex items-end justify-between" data-reveal>
            <div>
              <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-8 flex items-center gap-4">
                <span className="w-12 h-px bg-magenta" /> The Timeline
              </p>
              <h2 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.9] text-paper">
                Evolution of <br />
                <em className="italic font-light text-paper/60 hidden sm:inline">Excellence.</em>
                <em className="italic font-light text-paper/60 sm:hidden">Excellence</em>
              </h2>
            </div>
          </div>

          <div className="relative pt-10 border-t border-white/10">
            {/* Custom Scrub Progress Line */}
            <div className="absolute top-0 left-[15px] lg:left-[calc(25vw-30px)] bottom-0 w-[1px] bg-white/10 hidden md:block">
              <div className="w-[2px] bg-magenta timeline-progress-line absolute top-0 left-[-0.5px] h-0"></div>
            </div>

            {TIMELINE.map((item, index) => (
              <div
                key={item.year}
                className="group relative border-b border-white/5 py-16 lg:py-32 timeline-step overflow-hidden"
                style={{ perspective: "1000px" }}
              >
                {/* Massive Parallax Background Year via GSAP */}
                <div className="absolute inset-x-0 top-0 pointer-events-none opacity-0 -z-10 text-[12em] md:text-[20em] lg:text-[40em] font-display font-light text-white leading-none text-center timeline-year-bg mix-blend-overlay">
                  {item.year}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                  {/* Left block: Year and sub */}
                  <div className="col-span-1 lg:col-span-3 flex flex-col justify-center lg:pr-10 pb-6 lg:pb-0 timeline-year-block">
                    <span className="font-display text-5xl lg:text-7xl text-magenta mb-3 origin-left tracking-tight">
                      {item.year}
                    </span>
                    <span className="text-[0.6rem] font-syne uppercase tracking-[0.25em] text-paper/40 font-bold">
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Anchor Point Dot */}
                  <div className="hidden md:block absolute left-[15px] lg:left-[calc(25vw-30px)] top-1/2 -translate-y-1/2 -translate-x-1/2 size-3 rounded-full border border-magenta bg-surface z-20 timeline-dot"></div>

                  <div className="col-span-1 lg:col-span-9 grid lg:grid-cols-2 gap-8 items-center lg:pl-16">
                    {/* Title block with Mask Reveal */}
                    <div
                      className="timeline-title-mask overflow-hidden py-2"
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                    >
                      <h3 className="font-display text-3xl md:text-5xl lg:text-5xl text-paper leading-[1.1] transform-gpu">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description block */}
                    <div className="mt-4 lg:mt-0 timeline-desc-mask">
                      <p className="text-lg md:text-xl text-paper/50 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP / MASTER SURGEONS */}
      <section className="py-24 md:py-32 bg-paper leadership-section">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-24">
          {/* Section Header */}
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
            data-reveal
          >
            <div>
              <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-8 flex items-center gap-4">
                <span className="w-12 h-px bg-magenta" /> Master Surgeons
              </p>
              <h2 className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[0.8] text-navy-deep">
                Guiding <br />
                <em className="italic font-light text-magenta">Hands.</em>
              </h2>
            </div>
            <p className="text-ink/60 text-xl font-light max-w-sm leading-relaxed">
              Scroll to explore the leading minds driving clinical innovation at Shree Kalyan.
            </p>
          </div>

          {/* Horizontally scrollable cards row */}
          <div
            className="flex gap-6 lg:gap-10 overflow-x-auto pb-8 hide-scrollbar"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {LEADERSHIP.map((leader, i) => (
              <div
                key={i}
                className="leader-card w-[85vw] sm:w-[65vw] md:w-[45vw] lg:w-[30vw] h-[65vh] shrink-0 relative group border border-navy/10 overflow-hidden bg-white"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
                <img
                  src={leader.img}
                  alt={leader.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale opacity-90 transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-105"
                />

                <div className="absolute bottom-0 left-0 p-8 lg:p-10 z-20 w-full transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                  <p className="text-[0.65rem] font-syne uppercase tracking-[0.3em] font-bold text-magenta mb-3">
                    {leader.role}
                  </p>
                  <h3 className="font-display text-3xl lg:text-4xl text-paper mb-4">
                    {leader.name}
                  </h3>
                  <div className="h-0 group-hover:h-20 lg:group-hover:h-16 transition-all duration-700 ease-out overflow-hidden opacity-0 group-hover:opacity-100">
                    <p className="text-paper/70 font-light text-sm leading-relaxed">
                      {leader.desc}
                    </p>
                  </div>
                </div>

                <div className="absolute top-6 right-6 z-20 w-10 h-10 border rounded-full hidden lg:flex items-center justify-center border-paper/20 bg-paper/5 backdrop-blur-md">
                  <span className="font-syne text-[0.6rem] text-paper">0{i + 1}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="flex items-center gap-3 mt-6 text-ink/30">
            <ChevronRight className="w-4 h-4" />
            <span className="text-[0.6rem] font-syne uppercase tracking-[0.3em] font-bold">
              Drag to explore
            </span>
          </div>
        </div>
      </section>

      {/* 6. CORE VALUES */}
      <section className="py-32 bg-navy-deep text-paper relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20" data-reveal>
            <div className="col-span-1 lg:col-span-5 relative">
              <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-8 flex items-center gap-4">
                <span className="w-12 h-px bg-magenta" /> Principles
              </p>
              <h2 className="font-display text-5xl md:text-7xl text-paper leading-[0.9] tracking-tight">
                Without <br />
                <em className="italic font-light text-paper/60">Compromise.</em>
              </h2>
            </div>

            <div className="col-span-1 lg:col-span-5 lg:col-start-7 self-end">
              <p className="text-paper/50 text-xl font-light leading-relaxed">
                We do not believe in mass-produced healthcare. Every protocol, every technological
                investment, and every decision is measured against one standard: patient wellbeing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-reveal>
            {[
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: "Expert Team",
                desc: "Our doctors are renowed leaders, bringing decades of compassionate experience.",
              },
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Modern Facility",
                desc: "Equipped with state-of-the-art diagnostic and surgical technology in a comforting environment.",
              },
              {
                icon: <HeartPulse className="w-8 h-8" />,
                title: "Patient First",
                desc: "Every decision is centered around the well-being and comfort of our patients.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Care",
                desc: "We are dedicated to improving the overall health of the communities we serve.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group border-t border-white/10 pt-8 pb-10 hover:border-magenta transition-colors duration-500"
              >
                <div className="text-white/30 mb-8 group-hover:text-magenta transition-colors duration-500 flex items-center justify-between">
                  {feature.icon}
                  <span className="font-syne text-[0.6rem] tracking-[0.2em] opacity-30 font-bold group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-3xl text-paper mb-4">{feature.title}</h3>
                <p className="text-paper/50 font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INFRASTRUCTURE / FACILITIES */}
      <section className="py-32 px-6 lg:px-24 max-w-[1600px] mx-auto bg-paper relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center border-b border-navy/10 pb-32">
          <div className="col-span-1 lg:col-span-5 space-y-10 order-2 lg:order-1" data-reveal>
            <div>
              <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-8 flex items-center gap-4">
                <span className="w-12 h-px bg-magenta" /> Infrastructure
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy-deep leading-[0.9]">
                Precision <br />
                <em className="italic font-light text-navy-deep/60">Suites.</em>
              </h2>
            </div>

            <p className="text-ink/70 text-xl leading-relaxed font-light">
              We leverage the latest in medical technology to ensure absolute clinical precision,
              minimize recovery times, and optimize outcomes for every patient.
            </p>

            <div className="grid gap-8 mt-12">
              {[
                "Da Vinci-class Robotic surgery systems",
                "Real-time intraoperative MRI and imaging",
                "Class IV therapeutic laser suites",
                "Advanced neuro-navigation protocols",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 relative pb-6 border-b border-navy/10 group"
                >
                  <div className="w-0 h-[2px] bg-magenta absolute bottom-0 left-0 transition-all duration-500 group-hover:w-full"></div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-magenta shrink-0 mt-1" />
                    <span className="text-navy-deep font-display font-light italic lg:not-italic lg:font-sans lg:font-normal text-xl lg:text-lg">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 order-1 lg:order-2" data-reveal>
            <div className="aspect-square lg:aspect-auto lg:h-[800px] w-full relative group">
              <div className="absolute top-10 -right-10 bottom-10 w-20 bg-surface/5 hidden lg:block transition-all duration-700 group-hover:translate-x-4"></div>

              <img
                src={operatingTheatre}
                alt="Operating Theatre"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
              />
              <div className="absolute top-8 left-8 bg-paper p-4 border border-navy/10 shadow-editorial z-10">
                <span className="text-[0.55rem] font-syne uppercase tracking-widest text-navy-deep font-bold">
                  Facility Cam
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEW: MANIFESTO / END CTA */}
      <section className="relative py-40 bg-surface overflow-hidden manifesto-section pb-40">
        <div className="absolute inset-0 opacity-10">
          <img
            src={hospitalLobby}
            className="w-full h-[150%] object-cover grayscale manifesto-bg"
            style={{ top: "-25%" }}
            alt="bg"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-24 relative z-20 text-center" data-reveal>
          <Award className="w-16 h-16 text-magenta mx-auto mb-10 opacity-80" />
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl text-paper leading-[1.1] mb-12">
            Your Life.
            <br />
            Our <em className="italic font-light text-magenta">Masterpiece.</em>
          </h2>
          <p className="text-paper/60 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-16">
            Experience the pinnacle of medical excellence with unwavering compassion. The next
            chapter of your health begins here.
          </p>
          <button className="bg-magenta hover:bg-pink text-white font-syne uppercase text-[0.7rem] font-bold tracking-[0.2em] py-5 px-10 transition-colors duration-300">
            Book An Appointment Today
          </button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
