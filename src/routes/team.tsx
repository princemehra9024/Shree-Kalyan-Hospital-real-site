import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import doc1 from "@/assets/kapilG.jpeg";
import doc2 from "@/assets/manishG.jpeg";
import doc3 from "@/assets/anjali-sharma.png";
import doc4 from "@/assets/doctor-portrait.jpg";
import featured from "@/assets/kapilG.jpeg";
import manishG from "@/assets/manishG.jpeg";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Marquee } from "@/components/site/Marquee";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Physicians · Shree Kalyan Hospital, Kota" },
      {
        name: "description",
        content:
          "Meet the consultants of Shree Kalyan Hospital, Kota — seventy-four named physicians across cardiology, neurosciences, oncology, orthopedics, pediatrics and critical care.",
      },
      { property: "og:title", content: "Physicians · Shree Kalyan Hospital" },
      {
        property: "og:description",
        content:
          "Seventy-four named consultants. The same physician at admission, review and discharge.",
      },
      { property: "og:image", content: featured },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: featured },
    ],
  }),
});

const physicians = [
  {
    name: "Dr. Anjali Sharma",
    role: "Director, Internal Medicine",
    image: featured,
    quote: "Time, given honestly.",
    creds: "MBBS · MD (AIIMS, New Delhi)",
    institute: "Internal Medicine",
  },
  {
    name: "Dr. Rakesh Mehta",
    role: "Senior Consultant, Cardiology",
    image: doc1,
    quote: "The heart keeps its own counsel.",
    creds: "MBBS · DM Cardiology (PGIMER)",
    institute: "Cardiology",
  },
  {
    name: "Dr. Arjun Verma",
    role: "Consultant Neurosurgeon",
    image: doc2,
    quote: "Steady hands. Quieter minds.",
    creds: "MBBS · MCh Neurosurgery (NIMHANS)",
    institute: "Neurosciences",
  },
  {
    name: "Dr. Meera Nair",
    role: "Head, Mother & Child",
    image: doc3,
    quote: "Two patients. One held breath.",
    creds: "MBBS · MD Pediatrics (CMC Vellore)",
    institute: "Pediatrics",
  },
  {
    name: "Dr. Vikram Singh",
    role: "Senior Consultant, Orthopedics",
    image: doc4,
    quote: "Bone remembers. So we listen.",
    creds: "MBBS · MS Orthopedics (KEM Mumbai)",
    institute: "Orthopedics",
  },
];

function TeamPage() {
  useGsapReveal();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Split-screen cinematic entrance matching FAQ page style
      tl.to(".hero-line", { scaleX: 1, duration: 1, ease: "power3.inOut" })
        .from(".hero-sub", { opacity: 0, x: -20, duration: 0.8 }, "-=0.6")
        .from(
          ".hero-title-line",
          {
            yPercent: 120,
            duration: 1.2,
            stagger: 0.15,
          },
          "-=0.6",
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 20,
            duration: 1,
          },
          "-=0.8",
        )
        .from(
          ".hero-img-wrap",
          {
            clipPath: "inset(0% 100% 0% 0%)", // Left-to-right wipe
            duration: 1.8,
          },
          "-=1.4",
        )
        .from(
          ".hero-img",
          {
            scale: 1.2,
            duration: 2.5,
            ease: "power3.out",
          },
          "-=1.8",
        )
        .fromTo(
          ".hero-frame",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1 },
          "-=1.5",
        );

      // Subtle parallax on the whole section
      gsap.to(".hero-parallax-group", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="min-h-dvh bg-paper text-ink overflow-x-hidden selection:bg-magenta selection:text-white"
      ref={containerRef}
    >
      <SiteNav />

      {/* Split-Screen Hero Section (Matching FAQs style) */}
      <section className="hero-section relative min-h-screen bg-paper text-ink pt-32 pb-24 px-6 md:px-12 lg:px-24 flex items-center overflow-hidden">
        <div className="hero-parallax-group w-full max-w-[1600px] mx-auto z-10 relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text Content */}
          <div className="max-w-2xl z-20 pt-20 lg:pt-0">
            <div className="flex items-center gap-6 mb-8">
              <div className="hero-line w-12 h-[1px] bg-magenta origin-left scale-x-0" />
              <p className="hero-sub font-bold text-[0.65rem] md:text-[0.75rem] tracking-[0.3em] uppercase text-magenta">
                Department of Healing
              </p>
            </div>

            <h1 className="font-display text-[15vw] md:text-7xl lg:text-[7rem] leading-[0.95] tracking-tighter text-navy-deep mb-10">
              <div className="overflow-hidden pb-2">
                <span className="hero-title-line block">The</span>
              </div>
              <div className="overflow-hidden pb-2">
                <span className="hero-title-line block">Architects</span>
              </div>
              <div className="overflow-hidden pb-4">
                <span className="hero-title-line block italic font-light text-magenta">
                  of Care.
                </span>
              </div>
            </h1>

            <p className="hero-desc text-lg md:text-xl text-ink/70 max-w-md leading-relaxed">
              At Shree Kalyan, our team of seventy-four dedicated consultants provides world-class
              care. Experience healing guided by the finest medical minds.
            </p>
          </div>

          {/* Right: Feature Image */}
          <div className="relative z-10 mt-8 lg:mt-0 px-4 md:px-0">
            <div className="hero-img-wrap overflow-hidden relative shadow-2xl bg-ink/5">
              <img
                src={manishG}
                alt="Medical Team"
                className="hero-img w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/5] object-cover"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-navy-deep/5 mix-blend-multiply" />
            </div>
            {/* Decorative frame matching FAQ page */}
            <div className="hero-frame absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-24 h-24 md:w-40 md:h-40 border-b-[1px] border-l-[1px] border-magenta z-0" />
          </div>
        </div>
      </section>

      <div className="border-y border-ink/10 bg-paper relative z-30">
        <Marquee
          items={[
            "Cardiology",
            "Neurosciences",
            "Oncology",
            "Orthopedics",
            "Pediatrics",
            "Critical Care",
          ]}
        />
      </div>

      {/* Featured physician editorial */}
      <section className="px-6 md:px-12 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto relative z-30 bg-paper">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 items-center">
          <div className="col-span-12 lg:col-span-5" data-reveal>
            <p className="text-[0.65rem] font-bold tracking-[0.3em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" />
              Philosophy
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-navy-deep leading-[0.85] tracking-tight mb-8">
              Care <span className="italic font-light text-magenta">Delivered,</span> <br /> Not
              Dispatched.
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-ink/70 max-w-prose mb-12">
              At Shree Kalyan, you meet the same physician at admission, review, and discharge. We
              believe in continuity of care — never a shift, never a substitute.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7 relative" data-reveal>
            <div className="overflow-hidden bg-paper shadow-editorial">
              <img
                src={physicians[0].image}
                alt={physicians[0].name}
                loading="lazy"
                decoding="async"
                className="w-full aspect-square md:aspect-[4/5] object-cover"
                data-parallax
              />
            </div>
            <div className="absolute -bottom-10 -left-4 md:-left-12 bg-magenta text-white p-8 md:p-10 shadow-card max-w-[20rem] z-10">
              <p className="font-display italic text-3xl md:text-4xl leading-tight">
                "{physicians[0].quote}"
              </p>
              <p className="mt-6 text-[0.65rem] tracking-[0.3em] uppercase font-bold text-white/80">
                — {physicians[0].name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roster — editorial cards */}
      <section className="bg-navy-deep text-paper px-6 md:px-12 lg:px-24 py-32 md:py-48 relative z-30">
        <div className="max-w-[1600px] mx-auto">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24"
            data-reveal
          >
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl leading-[0.85] tracking-tight">
              The <span className="italic font-light text-magenta">Roster.</span>
            </h2>
            <p className="text-lg text-paper/60 max-w-[36ch] leading-relaxed">
              A selection of senior consultants across our six institutes. Visit the OPD desk for
              the complete physician directory.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
            data-reveal-stagger
          >
            {physicians.slice(1).map((p) => (
              <article key={p.name} className="group cursor-pointer">
                <div className="overflow-hidden bg-ink aspect-[3/4] mb-6 shadow-card relative">
                  <div className="absolute inset-0 bg-navy-deep/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                </div>
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-magenta font-bold mb-2">
                  {p.institute}
                </p>
                <h3 className="font-display text-2xl md:text-3xl leading-tight">{p.name}</h3>
                <p className="mt-1 text-sm text-paper/65 italic">{p.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-30 bg-paper">
        <SiteFooter />
      </div>
    </div>
  );
}
