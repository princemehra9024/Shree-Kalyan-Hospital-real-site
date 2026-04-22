import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "@/components/ui/calendar";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CalendarDays, Clock, Phone } from "lucide-react";
import heroCorridor from "@/assets/hero-corridor.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/appointments")({
  component: AppointmentsPage,
  head: () => ({
    meta: [
      { title: "Appointments · Shree Kalyan Hospital" },
      {
        name: "description",
        content:
          "Book a private consultation or OPD slot at Shree Kalyan Hospital, Kota. Walk-in OPD daily. Emergency 24/7.",
      },
    ],
  }),
});

/* ─── Generate time slots ──────────────────────────────────────── */
const generateSlots = () => {
  const slots: string[] = [];
  for (let i = 9; i <= 17; i++) {
    const hour = i > 12 ? i - 12 : i;
    const ampm = i >= 12 ? "PM" : "AM";
    const h = hour < 10 ? `0${hour}` : `${hour}`;
    slots.push(`${h}:00 ${ampm}`);
    if (i !== 17) slots.push(`${h}:30 ${ampm}`);
  }
  return slots;
};
const TIME_SLOTS = generateSlots();

/* ─── Decorative SVG cross ─────────────────────────────────────── */
function Cross({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
      <line x1="0"  y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* ─── Main page ────────────────────────────────────────────────── */
function AppointmentsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState<Date | undefined>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  /* ── Hero entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1. Eyebrow line sweep */
      gsap.fromTo(".ap-line", { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut", delay: 0.2 });
      gsap.fromTo(".ap-eyebrow", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", delay: 0.55 });

      /* 2. Headline word stagger */
      gsap.fromTo(
        ".ap-title-word",
        { yPercent: 110, skewY: 3 },
        { yPercent: 0, skewY: 0, duration: 1.4, stagger: 0.12, ease: "expo.out", delay: 0.4 }
      );

      /* 3. Description + CTA fade */
      gsap.fromTo(".ap-desc", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", delay: 1.05 });
      gsap.fromTo(".ap-cta",  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", delay: 1.25 });

      /* 4. Image clip-path wipe */
      gsap.fromTo(
        ".ap-img-wrap",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 1.8, ease: "expo.inOut", delay: 0.15 }
      );
      gsap.fromTo(".ap-hero-img", { scale: 1.12 }, { scale: 1, duration: 2.6, ease: "power3.out", delay: 0.15 });

      /* 5. Floating badges */
      gsap.fromTo(
        ".ap-badge",
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, stagger: 0.18, ease: "back.out(1.5)", delay: 1.5 }
      );

      /* 6. Deco line draw */
      gsap.fromTo(".ap-deco-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 1.65 });

      /* 7. Image parallax */
      gsap.to(".ap-hero-img", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: ".ap-hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* 8. Booking section scroll reveal */
      gsap.fromTo(
        ".ap-booking-section",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.3, ease: "expo.out",
          scrollTrigger: { trigger: ".ap-booking-section", start: "top 88%", once: true },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* ── Slot grid stagger when date changes ── */
  useEffect(() => {
    if (gridRef.current && date && !selectedTime && !bookingConfirmed) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.7, ease: "power3.out" }
      );
    }
  }, [date, selectedTime, bookingConfirmed]);

  /* ── Form slide reveal ── */
  useEffect(() => {
    if (formRef.current && selectedTime) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, height: 0, y: 40 },
        { opacity: 1, height: "auto", y: 0, duration: 1, ease: "expo.out" }
      );
    }
  }, [selectedTime]);

  const isSlotBooked = (time: string, dt: Date) => {
    const seed = dt.getDate() + dt.getMonth() + time.charCodeAt(0) + time.charCodeAt(3);
    return seed % 3 === 0;
  };

  return (
    <div
      ref={pageRef}
      className="min-h-dvh bg-paper text-ink overflow-x-hidden pb-24 md:pb-0 selection:bg-magenta selection:text-white"
    >
      <SiteNav />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* HERO — Bespoke split-screen                               */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="ap-hero-section relative w-full min-h-screen bg-paper flex flex-col justify-center pt-32 pb-0 overflow-hidden">
        {/* Subtle editorial grid */}
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

            {/* Eyebrow */}
            <div className="flex items-center gap-5 mb-12">
              <div className="ap-line w-12 h-px bg-magenta origin-left" />
              <span className="ap-eyebrow font-bold text-[0.62rem] tracking-[0.38em] uppercase text-magenta">
                Chapter V — Reserve
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display leading-[0.9] tracking-tighter text-navy-deep mb-10"
              style={{ fontSize: "clamp(4.5rem, 10vw, 9rem)" }}
            >
              <div className="overflow-hidden pb-3">
                <span className="ap-title-word block italic font-light text-magenta">Book a</span>
              </div>
              <div className="overflow-hidden pb-3 pl-[0.15em] md:pl-[0.3em]">
                <span className="ap-title-word block">time.</span>
              </div>
            </h1>

            {/* Description */}
            <p className="ap-desc text-lg md:text-xl text-ink/60 font-light leading-relaxed max-w-md mb-12">
              Schedule your consultation with our leading medical experts. Select a
              date, choose a slot, and confirm — we handle the rest.
            </p>

            {/* CTA cluster */}
            <div className="ap-cta flex flex-col sm:flex-row gap-4">
              <a
                href="#booking"
                className="group inline-flex items-center gap-3 bg-navy-deep text-paper px-10 py-5 text-[0.65rem] font-bold tracking-[0.3em] uppercase hover:bg-magenta transition-colors duration-500"
              >
                <CalendarDays className="size-4" />
                Pick a Slot
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+918529219330"
                className="inline-flex items-center gap-3 border border-ink/20 px-10 py-5 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-ink hover:border-magenta hover:text-magenta transition-colors duration-500"
              >
                <Phone className="size-4" />
                Call Instead
              </a>
            </div>

            {/* Deco line */}
            <div className="ap-deco-line mt-16 h-px w-full bg-ink/8 origin-left" />
          </div>

          {/* ── RIGHT: Image ── */}
          <div className="relative order-1 lg:order-2 z-10">
            <div
              className="ap-img-wrap overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.18)]"
              style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            >
              <img
                src={heroCorridor}
                alt="Shree Kalyan Hospital — corridor"
                className="ap-hero-img w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-in-out"
              />
              <div className="absolute inset-0 bg-navy-deep/10 mix-blend-multiply" />
            </div>

            {/* Floating badges */}
            <div className="ap-badge absolute -bottom-6 -left-6 md:-bottom-8 md:-left-10 bg-paper/95 backdrop-blur border border-ink/10 px-6 py-5 shadow-2xl">
              <p className="font-display text-3xl text-navy-deep leading-none mb-1">OPD</p>
              <p className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-ink/40">Daily Walk-in</p>
            </div>
            <div className="ap-badge absolute -top-6 -right-4 md:-top-8 md:-right-8 bg-paper/95 backdrop-blur border border-ink/10 px-6 py-5 shadow-2xl">
              <p className="font-display text-3xl text-navy-deep leading-none mb-1">74+</p>
              <p className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-ink/40">Consultants</p>
            </div>

            {/* Corner frames */}
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
              style={{ height: "40%", animation: "apScrollBar 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* BOOKING SECTION                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="booking"
        className="ap-booking-section px-6 md:px-12 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto border-t border-ink/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">

          {/* Left — Calendar sticky */}
          <div className="col-span-1 lg:col-span-5 lg:sticky top-32">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-magenta mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" /> Step 1
            </p>
            <h2 className="font-display text-5xl lg:text-7xl text-navy-deep tracking-tight mb-12 leading-[0.9]">
              Select <br />
              <span className="italic font-light text-magenta">your date.</span>
            </h2>

            <div className="border border-ink/10 p-8 backdrop-blur-sm bg-white/30">
              <div className="w-full flex justify-center scale-105 md:scale-110 transform origin-top">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    if (d) setDate(d);
                    setSelectedTime(null);
                    setBookingConfirmed(false);
                  }}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="w-fit font-light"
                />
              </div>
            </div>

            {/* Quick info strip */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Clock, label: "OPD Hours", value: "09:00 – 20:00" },
                { icon: Phone, label: "Emergency", value: "24 / 7" },
              ].map((item) => (
                <div key={item.label} className="border border-ink/10 p-5">
                  <item.icon className="size-4 text-magenta mb-3" />
                  <p className="text-[0.6rem] tracking-[0.25em] uppercase font-bold text-ink/40 mb-1">{item.label}</p>
                  <p className="font-display text-xl text-navy-deep">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Slots + Form */}
          <div className="col-span-1 lg:col-span-7">
            {!bookingConfirmed ? (
              <>
                {/* Slot header */}
                <div className="flex items-end justify-between mb-12 border-b border-ink/10 pb-8">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-magenta mb-4 flex items-center gap-4">
                      <span className="w-4 h-px bg-magenta" /> Step 2
                    </p>
                    <h3 className="font-display text-5xl text-navy-deep tracking-tight leading-[0.9]">
                      Available <br />
                      <span className="italic font-light text-magenta">slots.</span>
                    </h3>
                  </div>
                  {date && (
                    <div className="text-right">
                      <p className="text-sm font-light text-ink/50 uppercase tracking-widest">
                        {date.getFullYear()}
                      </p>
                      <p className="text-xl font-display">
                        {date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                      </p>
                    </div>
                  )}
                </div>

                {!date && (
                  <div className="py-24 text-center border-b border-ink/10">
                    <p className="text-2xl font-light text-ink/40">Awaiting date selection…</p>
                  </div>
                )}

                {date && !selectedTime && (
                  <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {TIME_SLOTS.map((time, idx) => {
                      const booked = isSlotBooked(time, date);
                      return (
                        <button
                          key={idx}
                          disabled={booked}
                          onClick={() => setSelectedTime(time)}
                          className={`w-full py-5 px-0 flex justify-between items-center transition-all duration-500 border-b relative group overflow-hidden
                            ${booked
                              ? "border-red-500/20 text-red-500 cursor-not-allowed"
                              : "border-ink/10 text-ink hover:text-magenta hover:border-magenta hover:pl-4"
                            }`}
                        >
                          {!booked && (
                            <span className="absolute inset-0 bg-magenta/5 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10" />
                          )}
                          <span className={`font-display text-2xl tracking-wide z-10 ${booked ? "line-through opacity-70" : ""}`}>
                            {time}
                          </span>
                          <span className={`text-[0.65rem] uppercase tracking-[0.2em] font-bold z-10 ${booked ? "text-red-500/80" : "text-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300"}`}>
                            {booked ? "Booked" : "Select"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Booking form */}
                {date && selectedTime && (
                  <div ref={formRef} className="overflow-hidden">
                    <div className="bg-navy-deep text-paper p-10 md:p-16 mt-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-magenta/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                      <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-8">
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-magenta mb-4 flex items-center gap-4">
                            <span className="w-4 h-px bg-magenta" /> Final Step
                          </p>
                          <h4 className="font-display text-4xl md:text-5xl">{selectedTime}</h4>
                        </div>
                        <button
                          onClick={() => setSelectedTime(null)}
                          className="text-[0.65rem] uppercase tracking-wider font-bold text-white/50 hover:text-magenta transition-colors hover:underline"
                        >
                          Change Time
                        </button>
                      </div>

                      <form
                        onSubmit={(e) => { e.preventDefault(); setBookingConfirmed(true); }}
                        className="space-y-8 relative z-10"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <DarkField id="name" label="Full Name" type="text" required />
                          <DarkField id="phone" label="Phone Number" type="tel" required />
                        </div>
                        <div className="mt-8">
                          <DarkField id="reason" label="Reason for Visit" type="text" />
                        </div>
                        <button
                          type="submit"
                          className="w-full mt-12 bg-magenta text-white py-6 text-sm uppercase tracking-[0.3em] font-bold hover:bg-paper hover:text-navy-deep transition-colors duration-500 flex items-center justify-center gap-3"
                        >
                          Confirm Appointment
                          <ArrowRight className="size-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Success state */
              <div className="py-24 flex flex-col items-start border-b border-ink/10">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-magenta mb-8 flex items-center gap-4">
                  <span className="w-4 h-px bg-magenta" /> Confirmed
                </p>
                <h4 className="font-display text-6xl md:text-7xl text-navy-deep mb-8 leading-[0.9]">
                  It's <br />
                  <span className="text-magenta italic font-light">official.</span>
                </h4>
                <p className="text-xl md:text-2xl text-ink/70 max-w-lg mb-12 font-light">
                  Your time is reserved for{" "}
                  <strong className="font-medium text-navy-deep">{selectedTime}</strong> on{" "}
                  <strong className="font-medium text-navy-deep">{date?.toLocaleDateString()}</strong>.
                </p>
                <button
                  onClick={() => { setSelectedTime(null); setBookingConfirmed(false); }}
                  className="text-sm uppercase tracking-[0.2em] font-bold border-b-2 border-magenta text-magenta hover:text-navy-deep hover:border-navy-deep transition-colors pb-1"
                >
                  Book another
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Scroll-bar keyframe */}
      <style>{`
        @keyframes apScrollBar {
          0%   { transform: translateY(-100%); opacity: 1; }
          60%  { transform: translateY(250%);  opacity: 1; }
          61%  { opacity: 0; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
      `}</style>

      <SiteFooter />
    </div>
  );
}

/* ─── Dark-mode floating-label input ─────────────────────────── */
function DarkField({
  id, label, type, required,
}: {
  id: string; label: string; type: string; required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        required={required}
        type={type}
        id={id}
        className="peer w-full bg-transparent border-b border-white/20 focus:border-magenta focus:outline-none py-4 text-xl font-light text-white placeholder-transparent transition-colors"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-[0.65rem] tracking-[0.2em] uppercase text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[0.65rem] peer-focus:text-magenta font-bold"
      >
        {label}{required && " *"}
      </label>
    </div>
  );
}
