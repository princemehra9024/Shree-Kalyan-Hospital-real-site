import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────── */
const STORIES = [
  {
    id: "story-1",
    initials: "RK",
    name: "Rajesh Kumar",
    age: 54,
    tag: "Cardiac Surgery",
    color: "from-magenta/30 to-pink/10",
    ring: "ring-magenta/30",
    outcome: "Back to hiking.",
    quote:
      "After my bypass surgery I was terrified I'd never live normally again. The team at Shree Kalyan didn't just fix my heart — they rebuilt my confidence. Six months later I climbed Ranthambore with my son.",
    dept: "Cardiology · Dr. Meena Sharma",
    year: "2024",
  },
  {
    id: "story-2",
    initials: "PM",
    name: "Priya Mathur",
    age: 31,
    tag: "Neurology",
    color: "from-sky/40 to-blue-400/10",
    ring: "ring-sky/40",
    outcome: "Seizure-free for 2 years.",
    quote:
      "Epilepsy had robbed me of my driving licence, my independence, my career path. The neurology unit here mapped my brain with precision I didn't know was possible outside Delhi. Now I drive myself to work every single day.",
    dept: "Neurosciences · Dr. Anil Verma",
    year: "2023",
  },
  {
    id: "story-3",
    initials: "SJ",
    name: "Sunita Joshi",
    age: 47,
    tag: "Oncology",
    color: "from-amber-400/30 to-orange-300/10",
    ring: "ring-amber-400/40",
    outcome: "5 years cancer-free.",
    quote:
      "When the word 'cancer' hits you, the world goes silent. What brought the sound back was a team that spoke to me not as a patient number but as a person. The precision oncology programme here gave me five quiet, beautiful, cancer-free years.",
    dept: "Oncology · Dr. Kavita Singh",
    year: "2019",
  },
  {
    id: "story-4",
    initials: "AT",
    name: "Arjun Tiwari",
    age: 22,
    tag: "Orthopaedics",
    color: "from-emerald-400/30 to-teal-300/10",
    ring: "ring-emerald-400/40",
    outcome: "Playing cricket again.",
    quote:
      "A ligament tear at 21 felt like the end of everything I loved. The sports medicine team here didn't just do surgery — they designed a recovery plan around my life, my goals, my timeline. I scored a half-century last month.",
    dept: "Orthopaedics · Dr. Rohit Gupta",
    year: "2024",
  },
  {
    id: "story-5",
    initials: "MB",
    name: "Meena Bhatnagar",
    age: 62,
    tag: "Mother & Child",
    color: "from-violet-400/30 to-purple-300/10",
    ring: "ring-violet-400/40",
    outcome: "Holding her grandson.",
    quote:
      "Four miscarriages in ten years. Then my daughter came to Shree Kalyan's high-risk maternity unit. I was in the room when my grandson took his first breath. Some miracles have a doctor's name on them.",
    dept: "Mother & Child · Dr. Usha Pareek",
    year: "2023",
  },
];

/* ─── Avatar ─────────────────────────────────────────────────── */
function Avatar({ initials, color, ring }: { initials: string; color: string; ring: string }) {
  return (
    <div
      className={`relative shrink-0 size-14 rounded-full ring-2 ${ring} flex items-center justify-center overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-60`} />
      <span className="relative z-10 font-display text-xl text-navy-deep font-light">
        {initials}
      </span>
    </div>
  );
}

/* ─── Big horizontal tape card ───────────────────────────────── */
function StoryCard({
  story,
  index,
  isActive,
  onClick,
}: {
  story: (typeof STORIES)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className={`
        story-card shrink-0 cursor-pointer
        relative flex flex-col justify-between
        w-[82vw] sm:w-[60vw] lg:w-[42vw] xl:w-[36vw] max-w-[680px]
        min-h-[280px] md:min-h-[480px] p-6 md:p-12
        border transition-all duration-700 select-none
        ${isActive ? "bg-navy-deep border-navy-deep" : "bg-paper border-ink/10 hover:border-ink/25"}
      `}
    >
      {/* Index + tag */}
      <div className="flex items-start justify-between mb-4 md:mb-8">
        <span
          className={`font-display text-[3rem] md:text-[5rem] leading-none font-light transition-colors duration-700 ${
            isActive ? "text-white/10" : "text-ink/8"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`text-[0.55rem] font-bold uppercase tracking-[0.2em] border px-2 py-1 md:px-3 md:py-1.5 transition-colors duration-700 ${
            isActive ? "text-magenta border-magenta/30 bg-magenta/10" : "text-ink/40 border-ink/10"
          }`}
        >
          {story.tag}
        </span>
      </div>

      {/* Outcome headline — the BIG line */}
      <div className="flex-1 flex flex-col justify-center">
        <p
          className={`font-display text-xl md:text-4xl xl:text-5xl leading-[1.05] tracking-tight mb-3 md:mb-8 transition-colors duration-700 ${
            isActive ? "text-white" : "text-navy-deep"
          }`}
        >
          <span className="italic font-light text-magenta">"</span>
          {story.outcome}
        </p>

        {/* Quote body */}
        <p
          className={`text-sm md:text-[1.05rem] leading-[1.75] font-light transition-colors duration-700 ${
            isActive ? "text-white/60" : "text-ink/55"
          }`}
        >
          {story.quote}
        </p>
      </div>

      {/* Footer */}
      <div
        className={`mt-5 md:mt-10 pt-4 md:pt-8 border-t transition-colors duration-700 flex items-center gap-3 ${isActive ? "border-white/10" : "border-ink/8"}`}
      >
        <Avatar initials={story.initials} color={story.color} ring={story.ring} />
        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold text-sm transition-colors duration-700 ${isActive ? "text-white" : "text-navy-deep"}`}
          >
            {story.name}, <span className="font-light">{story.age}</span>
          </p>
          <p
            className={`text-[0.72rem] font-light mt-0.5 transition-colors duration-700 ${isActive ? "text-white/40" : "text-ink/40"}`}
          >
            {story.dept}
          </p>
        </div>
        <span
          className={`text-[0.65rem] font-bold tracking-widest transition-colors duration-700 ${isActive ? "text-magenta" : "text-ink/25"}`}
        >
          {story.year}
        </span>
      </div>

      {/* Active indicator pulse */}
      {isActive && (
        <span className="absolute top-6 left-6 size-2 rounded-full bg-magenta animate-pulse" />
      )}
    </article>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export function PatientStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tapeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* — Heading reveal — */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".hl");
        gsap.fromTo(
          lines,
          { opacity: 0, yPercent: 110, skewY: 2 },
          {
            opacity: 1,
            yPercent: 0,
            skewY: 0,
            stagger: 0.13,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top bottom", // fire as soon as heading enters viewport
              once: true,
            },
          },
        );
      }

      /* — Cards stagger reveal — fire the moment tape scrolls into view — */
      if (tapeRef.current) {
        const cards = tapeRef.current.querySelectorAll(".story-card");
        // Don't hide cards initially — just animate them in from a subtle x offset
        gsap.fromTo(
          cards,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current, // trigger on section, not tape
              start: "top bottom", // fires immediately when section enters
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* — Active card scroll-into-view — */
  useEffect(() => {
    if (!tapeRef.current) return;
    const cards = tapeRef.current.querySelectorAll<HTMLElement>(".story-card");
    const card = cards[active];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(STORIES.length - 1, a + 1));

  return (
    <section
      ref={sectionRef}
      id="patient-stories"
      aria-label="Patient stories and testimonials"
      className="pt-8 pb-0 md:py-16 overflow-hidden"
    >
      {/* ── Top band — dark navy strip ── */}
      <div className="bg-navy-deep relative overflow-hidden">
        {/* Decorative grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url('/noise.svg')" }}
        />
        {/* Magenta orb */}
        <div
          aria-hidden="true"
          className="absolute -top-32 right-24 w-96 h-96 rounded-full bg-magenta/15 blur-[100px] pointer-events-none"
        />

        <div className="px-4 md:px-12 lg:px-24 pt-8 md:pt-16 pb-6 md:pb-12 max-w-[1600px] mx-auto relative">
          {/* Eyebrow */}
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.35em] text-magenta mb-4 md:mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-magenta" />
            Voices of recovery
          </p>

          {/* Large heading — word-by-word stagger */}
          <div ref={headingRef} className="overflow-hidden">
            <div className="overflow-hidden">
              <h2 className="hl font-display text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-[0.92] tracking-tight">
                Our Patients'
              </h2>
            </div>
            <div className="overflow-hidden mt-1">
              <h2 className="hl font-display text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92] tracking-tight">
                <span className="text-magenta italic font-light">Stories.</span>
              </h2>
            </div>
          </div>

          {/* Sub-copy + navigation */}
          <div className="mt-4 md:mt-10 flex flex-col sm:flex-row sm:items-end gap-4 md:gap-8 justify-between">
            <p className="text-white/40 text-sm md:text-base font-light max-w-[38ch] leading-relaxed hidden sm:block">
              Real words from real people whose lives changed inside these walls. No scripts. No
              stock photos. Just truth.
            </p>

            {/* Dot nav + arrows — same row on mobile */}
            <div className="flex items-center gap-3">
              {STORIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Story ${i + 1}`}
                  className={`transition-all duration-500 rounded-full ${
                    i === active
                      ? "w-6 h-2 md:w-8 bg-magenta"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrow controls */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                disabled={active === 0}
                aria-label="Previous story"
                className="size-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 transition-all duration-300"
              >
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path
                    d="M13 4L7 10L13 16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={active === STORIES.length - 1}
                aria-label="Next story"
                className="size-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 transition-all duration-300"
              >
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path
                    d="M7 4L13 10L7 16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Horizontal scroll tape ── */}
        <div
          ref={tapeRef}
          className="flex gap-3 md:gap-4 px-4 md:px-12 lg:px-24 pb-8 md:pb-20 pt-4 md:pt-0 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {STORIES.map((story, i) => (
            <StoryCard
              key={story.id}
              story={story}
              index={i}
              isActive={i === active}
              onClick={() => setActive(i)}
            />
          ))}
          {/* Trailing spacer */}
          <div className="shrink-0 w-12 md:w-24" aria-hidden="true" />
        </div>
      </div>

      {/* ── Bottom trust strip — paper background ── */}
      <div className="px-0 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/8 mt-px"
          style={{ boxShadow: "0 0 0 1px rgba(26,26,26,0.08)" }}
        >
          {[
            { val: "98%", label: "Patient Satisfaction" },
            { val: "1.2L+", label: "Patients Treated" },
            { val: "4.8 ★", label: "Google Rating" },
            { val: "NABH", label: "Accredited Care" },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="group bg-paper hover:bg-magenta px-4 md:px-8 py-4 md:py-7 flex flex-col gap-1 transition-colors duration-500 cursor-default"
            >
              <span className="font-display text-xl md:text-3xl text-navy-deep group-hover:text-white transition-colors duration-500 tracking-tight">
                {val}
              </span>
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-ink/40 group-hover:text-white/60 transition-colors duration-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
