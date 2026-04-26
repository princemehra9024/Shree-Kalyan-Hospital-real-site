import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG Icons ─────────────────────────────────────────────── */
const IconCalendar = () => (
  <svg viewBox="0 0 56 56" fill="none" className="w-12 h-12" aria-hidden="true">
    <rect x="6" y="12" width="44" height="38" rx="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M6 22h44" stroke="currentColor" strokeWidth="1.8" />
    <path d="M18 6v12M38 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="20" cy="35" r="2.5" fill="currentColor" />
    <circle cx="28" cy="35" r="2.5" fill="currentColor" />
    <circle cx="36" cy="35" r="2.5" fill="currentColor" />
    <circle cx="20" cy="43" r="2.5" fill="currentColor" />
    <circle cx="28" cy="43" r="2.5" fill="currentColor" />
  </svg>
);

const IconStethoscope = () => (
  <svg viewBox="0 0 56 56" fill="none" className="w-12 h-12" aria-hidden="true">
    <path
      d="M14 10v16a14 14 0 0 0 28 0V10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="42" cy="38" r="6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M42 32v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10 10h8M38 10h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconDoctor = () => (
  <svg viewBox="0 0 56 56" fill="none" className="w-12 h-12" aria-hidden="true">
    <circle cx="28" cy="18" r="10" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M8 50c0-11.046 8.954-20 20-20s20 8.954 20 20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path d="M34 42h8M38 38v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconCheckup = () => (
  <svg viewBox="0 0 56 56" fill="none" className="w-12 h-12" aria-hidden="true">
    <rect x="12" y="6" width="32" height="44" rx="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M20 6v6h16V6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path
      d="M18 28l6 6 14-13"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconFlask = () => (
  <svg viewBox="0 0 56 56" fill="none" className="w-12 h-12" aria-hidden="true">
    <path
      d="M21 6v22L9 44a4 4 0 0 0 3.6 5.6h30.8A4 4 0 0 0 47 44L35 28V6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M18 6h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="22" cy="40" r="2.5" fill="currentColor" />
    <circle cx="31" cy="36" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="36" cy="43" r="1.5" fill="currentColor" opacity="0.7" />
  </svg>
);

const IconEmergency = () => (
  <svg viewBox="0 0 56 56" fill="none" className="w-12 h-12" aria-hidden="true">
    <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="1.8" />
    <path d="M28 16v24M16 28h24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const ArrowUpRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M4 16L16 4M16 4H8M16 4v8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Card Data ──────────────────────────────────────────────── */
const MAIN_CARDS = [
  {
    id: "qa-appointment",
    num: "01",
    label: "Book an Appointment",
    sub: "With country's leading experts",
    icon: <IconCalendar />,
    href: "/appointments" as const,
    theme: "featured", // magenta fill
  },
  {
    id: "qa-specialities",
    num: "02",
    label: "Specialities",
    sub: "Our expertise in healthcare",
    icon: <IconStethoscope />,
    href: "/services" as const,
    theme: "dark",
  },
  {
    id: "qa-doctors",
    num: "03",
    label: "Our Team",
    sub: "Top experts for your health",
    icon: <IconDoctor />,
    href: "/team" as const,
    theme: "light",
  },
  {
    id: "qa-checkup",
    num: "04",
    label: "Health Checkups",
    sub: "Preventive care packages",
    icon: <IconCheckup />,
    href: "/services" as const,
    theme: "light",
  },
  {
    id: "qa-tests",
    num: "05",
    label: "Tests & Services",
    sub: "Diagnostics & pathology",
    icon: <IconFlask />,
    href: "/services" as const,
    theme: "dark",
  },
  {
    id: "qa-emergency",
    num: "24/7",
    label: "Emergency Care",
    sub: "Immediate trauma support",
    icon: <IconEmergency />,
    href: "/contact" as const,
    theme: "emergency",
  },
];

const STATS = [
  { value: 500, suffix: "+", label: "Beds" },
  { value: 150, suffix: "+", label: "Specialists" },
  { value: 25, suffix: "k+", label: "Surgeries / yr" },
  { value: 98, suffix: "%", label: "Patient Satisfaction" },
];

/* ─── Theme map ──────────────────────────────────────────────── */
const themeMap: Record<
  string,
  {
    bg: string;
    bgHover: string;
    text: string;
    textHover: string;
    subText: string;
    subTextHover: string;
    iconColor: string;
    iconColorHover: string;
    numColor: string;
    border: string;
    arrowBorder: string;
  }
> = {
  featured: {
    bg: "bg-paper",
    bgHover: "group-hover:bg-magenta",
    text: "text-navy-deep group-hover:text-white",
    textHover: "",
    subText: "text-ink/60 group-hover:text-white/80",
    subTextHover: "",
    iconColor: "text-magenta",
    iconColorHover: "group-hover:text-white",
    numColor: "text-ink/30 group-hover:text-white/40",
    border: "border-ink/8",
    arrowBorder: "border-ink/15 group-hover:border-white/40",
  },
  dark: {
    bg: "bg-navy-deep",
    bgHover: "group-hover:bg-navy-deep",
    text: "text-white",
    textHover: "",
    subText: "text-white/60 group-hover:text-white/80",
    subTextHover: "",
    iconColor: "text-sky/80",
    iconColorHover: "group-hover:text-sky",
    numColor: "text-white/30 group-hover:text-white/40",
    border: "border-white/5",
    arrowBorder: "border-white/15 group-hover:border-sky/60",
  },
  light: {
    bg: "bg-paper",
    bgHover: "group-hover:bg-navy-deep",
    text: "text-navy-deep group-hover:text-white",
    textHover: "",
    subText: "text-ink/60 group-hover:text-white/70",
    subTextHover: "",
    iconColor: "text-navy-deep/80",
    iconColorHover: "group-hover:text-sky",
    numColor: "text-ink/30 group-hover:text-white/30",
    border: "border-ink/8",
    arrowBorder: "border-ink/15 group-hover:border-white/25",
  },
  emergency: {
    bg: "bg-magenta",
    bgHover: "group-hover:bg-magenta",
    text: "text-white",
    textHover: "",
    subText: "text-white/60 group-hover:text-white/80",
    subTextHover: "",
    iconColor: "text-white/80",
    iconColorHover: "group-hover:text-white",
    numColor: "text-white/25 group-hover:text-white/40",
    border: "border-white/10",
    arrowBorder: "border-white/20 group-hover:border-white/60",
  },
};

/* ─── Single Card ────────────────────────────────────────────── */
function QACard({ card }: { card: (typeof MAIN_CARDS)[0] }) {
  const t = themeMap[card.theme];

  return (
    <Link
      to={card.href}
      id={card.id}
      className={`
        qa-card group relative flex flex-col justify-between
        min-h-[220px] p-8 overflow-hidden
        border ${t.border}
        ${t.bg} ${t.bgHover}
        transition-colors duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
      `}
    >
      {/* Liquid wipe fill — slides up on hover */}
      {(card.theme === "featured" || card.theme === "light") && (
        <span
          aria-hidden="true"
          className={`
            absolute inset-0 w-full h-full
            ${card.theme === "featured" ? "bg-magenta" : "bg-navy-deep"}
            translate-y-full group-hover:translate-y-0
            transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
            pointer-events-none z-0
          `}
        />
      )}

      {/* Number + Icon row */}
      <div className="relative z-10 flex items-start justify-between">
        <span className={`transition-colors duration-500 ${t.iconColor} ${t.iconColorHover}`}>
          {card.icon}
        </span>
        <span
          className={`font-display text-[2.8rem] leading-none font-light ${t.numColor} transition-colors duration-500`}
        >
          {card.num}
        </span>
      </div>

      {/* Text */}
      <div className="relative z-10 mt-6">
        <h3
          className={`font-display text-[1.6rem] leading-tight tracking-tight ${t.text} transition-colors duration-500`}
        >
          {card.label}
        </h3>
        <p className={`text-sm mt-2 font-light ${t.subText} transition-colors duration-500`}>
          {card.sub}
        </p>
      </div>

      {/* Arrow chip */}
      <span
        className={`
          relative z-10 absolute bottom-7 right-7
          size-9 border flex items-center justify-center
          ${t.arrowBorder}
          transition-all duration-500
          group-hover:translate-x-0.5 group-hover:-translate-y-0.5
        `}
      >
        <span
          className={`transition-colors duration-500 ${card.theme === "dark" || card.theme === "emergency" ? "text-white/50 group-hover:text-sky" : "text-ink/30 group-hover:text-white"}`}
        >
          <ArrowUpRight />
        </span>
      </span>
    </Link>
  );
}

/* ─── Animated Counter ───────────────────────────────────────── */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const elRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            if (el) el.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, suffix]);

  return <span ref={elRef}>0{suffix}</span>;
}

/* ─── Main Component ─────────────────────────────────────────── */
export function QuickAccess() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // ── Desktop Animations
      // ── Heading reveal
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.children,
          { opacity: 0, y: 30, skewY: 1.5 },
          {
            opacity: 1, y: 0, skewY: 0, stagger: 0.12, duration: 1,
            ease: "power4.out", scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true }
          }
        );
      }

      // ── Cards stagger in with clip-path reveal
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".qa-card");
        gsap.fromTo(cards,
          { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", stagger: { each: 0.09, from: "start" },
            duration: 1, ease: "power4.out", scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true }
          }
        );
      }

      // ── Stats bar slide up
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.9,
            ease: "power3.out", scrollTrigger: { trigger: statsRef.current, start: "top 90%", once: true }
          }
        );
      }
    }, sectionRef);

    mm.add("(max-width: 767px)", () => {
      // ── Mobile Animations (Simplified to just simple fades)
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6,
            ease: "power2.out", scrollTrigger: { trigger: headingRef.current, start: "top 90%", once: true }
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".qa-card");
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.05, duration: 0.6,
            ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true }
          }
        );
      }

      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.6,
            ease: "power2.out", scrollTrigger: { trigger: statsRef.current, start: "top 90%", once: true }
          }
        );
      }
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quick-access"
      aria-label="Quick access to hospital services"
      className="px-6 md:px-12 lg:px-24 py-20 max-w-[1600px] mx-auto"
    >
      {/* ── Section heading ── */}
      <div ref={headingRef} className="mb-10 overflow-hidden">
        <p className="text-[0.65rem] uppercase tracking-[0.35em] font-bold text-magenta flex items-center gap-4 mb-4">
          <span className="block w-8 h-px bg-magenta" />
          We can help you
        </p>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-navy-deep leading-[0.92] tracking-tight">
          Quick
          <br />
          <span className="text-magenta italic font-light">access.</span>
        </h2>
      </div>

      {/* ── Bento grid ── */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/8"
        style={{ boxShadow: "0 0 0 1px rgba(26,26,26,0.08)" }}
      >
        {/* Row 1: Featured (spans 2 cols on lg) + dark card */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px">
          {/* Big featured card */}
          <Link
            to="/appointments"
            id="qa-appointment-featured"
            className="
              qa-card group relative flex flex-col justify-between
              min-h-[280px] sm:col-span-2 lg:col-span-1 p-10 overflow-hidden
              bg-navy-deep border border-white/5
              transition-colors duration-700
            "
          >
            {/* Animated magenta orb */}
            <span
              aria-hidden="true"
              className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-magenta/20 blur-3xl group-hover:bg-magenta/40 group-hover:scale-125 transition-all duration-1000 pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-magenta/0 to-magenta/0 group-hover:from-magenta/10 group-hover:to-transparent transition-all duration-700 pointer-events-none"
            />

            <div className="relative z-10 flex items-start justify-between">
              <span className="text-magenta group-hover:text-magenta transition-colors">
                <IconCalendar />
              </span>
              <span className="font-display text-[3rem] leading-none font-light text-white/10 group-hover:text-white/15 transition-colors duration-500">
                01
              </span>
            </div>

            <div className="relative z-10 mt-8">
              <h3 className="font-display text-3xl md:text-4xl text-white leading-tight tracking-tight">
                Book an
                <br />
                Appointment
              </h3>
              <p className="text-sm mt-3 font-light text-white/40 group-hover:text-white/60 transition-colors duration-500">
                With country's leading experts
              </p>
              <span className="mt-8 inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-magenta group-hover:gap-5 transition-all duration-500">
                Book Now
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Specialities */}
          <QACard card={{ ...MAIN_CARDS[1] }} />
        </div>

        {/* Column 3: two stacked */}
        <div className="grid grid-rows-2 gap-px">
          <QACard card={{ ...MAIN_CARDS[2] }} />
          <QACard card={{ ...MAIN_CARDS[5] }} />
        </div>

        {/* Row 2: three equal cards */}
        <QACard card={{ ...MAIN_CARDS[3] }} />
        <QACard card={{ ...MAIN_CARDS[4] }} />

        {/* "We help you book" promo cell */}
        <div
          className="
            qa-card relative flex flex-col justify-between min-h-[220px] p-8
            bg-[#f0ede6] border border-ink/8 overflow-hidden
          "
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.08] pointer-events-none"
          />
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ink/40 mb-4">
            Patient Corner
          </p>
          <div className="space-y-3">
            {["Insurance & Cashless", "International Patients", "Medical Records"].map((item) => (
              <Link
                key={item}
                to="/contact"
                className="group/row flex items-center justify-between py-2.5 border-b border-ink/10 hover:border-magenta/40 transition-colors duration-300"
              >
                <span className="text-sm font-medium text-ink/60 group-hover/row:text-navy-deep transition-colors duration-300">
                  {item}
                </span>
                <ArrowUpRight className="w-4 h-4 text-ink/20 group-hover/row:text-magenta group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-all duration-300" />
              </Link>
            ))}
          </div>
          <p className="text-[0.65rem] uppercase tracking-[0.25em] font-bold text-magenta mt-6 flex items-center gap-2">
            <span className="w-3 h-px bg-magenta" /> Patient support
          </p>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        ref={statsRef}
        className="mt-px grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/8"
        style={{ boxShadow: "0 0 0 1px rgba(26,26,26,0.08)" }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="group bg-paper hover:bg-navy-deep px-8 py-7 flex flex-col gap-1 transition-colors duration-500 cursor-default"
          >
            <span className="font-display text-4xl text-navy-deep group-hover:text-white transition-colors duration-500 tracking-tight">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-ink/60 group-hover:text-white/60 transition-colors duration-500">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
