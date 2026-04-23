import React, { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import exterior from "@/assets/hospital-exterior.jpg";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin, Clock, Phone, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact · Shree Kalyan Hospital, Kota" },
      {
        name: "description",
        content:
          "Visit Shree Kalyan Hospital in Kota, Rajasthan. Walk-in OPD daily, 24/7 emergency triage, private consultations on appointment.",
      },
      { property: "og:title", content: "Contact · Shree Kalyan Hospital" },
      {
        property: "og:description",
        content: "Walk-in OPD daily. Emergency 24/7. Kota, Rajasthan.",
      },
      { property: "og:image", content: exterior },
      { name: "twitter:image", content: exterior },
    ],
  }),
});

/* ─── Animated SVG cross / plus decorators ─────────────────────── */
function SVGCross({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* ─── Floating stat badge ────────────────────────────────────────── */
function StatBadge({ num, label, className }: { num: string; label: string; className?: string }) {
  return (
    <div
      className={`stat-badge absolute bg-paper/95 backdrop-blur border border-ink/10 px-6 py-5 shadow-2xl ${className}`}
    >
      <p className="font-display text-3xl text-navy-deep leading-none mb-1">{num}</p>
      <p className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-ink/40">{label}</p>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────── */
function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Chapter / eyebrow line sweep ── */
      gsap.fromTo(
        ".ct-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power3.inOut", delay: 0.2 },
      );
      gsap.fromTo(
        ".ct-eyebrow",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", delay: 0.55 },
      );

      /* ── 2. Headline stagger (clip-path per word) ── */
      gsap.fromTo(
        ".ct-title-word",
        { yPercent: 110, skewY: 3 },
        {
          yPercent: 0,
          skewY: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: "expo.out",
          delay: 0.4,
        },
      );

      /* ── 3. Description fade ── */
      gsap.fromTo(
        ".ct-desc",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", delay: 1.0 },
      );

      /* ── 4. CTA bar slide ── */
      gsap.fromTo(
        ".ct-cta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", delay: 1.2 },
      );

      /* ── 5. Hero image clip-path wipe (bottom-up) ── */
      gsap.fromTo(
        ".ct-hero-img-wrap",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: 1.8,
          ease: "expo.inOut",
          delay: 0.15,
        },
      );
      gsap.fromTo(
        ".ct-hero-img",
        { scale: 1.12 },
        { scale: 1, duration: 2.6, ease: "power3.out", delay: 0.15 },
      );

      /* ── 6. Stat badges pop in ── */
      gsap.fromTo(
        ".stat-badge",
        { opacity: 0, scale: 0.85, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "back.out(1.5)",
          delay: 1.5,
        },
      );

      /* ── 7. Decorative lines draw ── */
      gsap.fromTo(
        ".ct-deco-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 1.6 },
      );

      /* ── 8. Image parallax on scroll ── */
      gsap.to(".ct-hero-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".ct-hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── 9. Contact strips scroll reveal ── */
      gsap.fromTo(
        ".ct-strip",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ct-strips", start: "top 88%", once: true },
        },
      );

      /* ── 10. Form section reveal ── */
      gsap.fromTo(
        ".ct-form-section",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ct-form-section", start: "top 85%", once: true },
        },
      );

      /* ── 11. Map image parallax ── */
      gsap.to(".ct-map-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".ct-map-section",
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
      className="min-h-dvh bg-paper text-ink overflow-x-hidden pb-24 md:pb-0 selection:bg-magenta selection:text-white"
    >
      <SiteNav />

      {/* ══════════════════════════════════════════════════ */}
      {/* HERO — Award-winning split-screen                 */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="ct-hero-section relative w-full min-h-screen bg-paper flex flex-col justify-center pt-32 pb-0 overflow-hidden">
        {/* Subtle grid noise texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#1a1a2e 0px,#1a1a2e 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#1a1a2e 0px,#1a1a2e 1px,transparent 1px,transparent 60px)",
          }}
        />

        {/* SVG cross decorators (top-right area) */}
        <SVGCross className="absolute top-40 right-8 md:right-24 text-magenta/25 size-8 ct-deco" />
        <SVGCross className="absolute top-56 right-16 md:right-36 text-ink/10 size-5 ct-deco" />
        <SVGCross className="absolute bottom-24 left-8 md:left-24 text-magenta/20 size-6 ct-deco" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── LEFT: Typography ── */}
          <div className="z-10 relative order-2 lg:order-1 pb-16 lg:pb-0">
            {/* Chapter / eyebrow */}
            <div className="flex items-center gap-5 mb-12">
              <div className="ct-line w-12 h-px bg-magenta origin-left" />
              <span className="ct-eyebrow font-bold text-[0.62rem] tracking-[0.38em] uppercase text-magenta">
                Chapter IV &mdash; Visit
              </span>
            </div>

            {/* Headline — giant editorial */}
            <h1
              className="font-display leading-[0.9] tracking-tighter text-navy-deep mb-10"
              style={{ fontSize: "clamp(4.5rem, 10vw, 9rem)" }}
            >
              {/* "Begin" — italic magenta */}
              <div className="overflow-hidden pb-3">
                <span className="ct-title-word block italic font-light text-magenta">Begin</span>
              </div>
              {/* "here." — indented */}
              <div className="overflow-hidden pb-3 pl-[0.15em] md:pl-[0.3em]">
                <span className="ct-title-word block">here.</span>
              </div>
            </h1>

            {/* Description */}
            <p className="ct-desc text-lg md:text-xl text-ink/60 font-light leading-relaxed max-w-md mb-12">
              Walk-in consultations daily. Emergency triage twenty-four hours. To schedule a private
              review with one of our consultants, leave a note below or call our admissions desk.
            </p>

            {/* CTA cluster */}
            <div className="ct-cta flex flex-col sm:flex-row gap-4">
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-3 bg-navy-deep text-paper px-10 py-5 text-[0.65rem] font-bold tracking-[0.3em] uppercase hover:bg-magenta transition-colors duration-500"
              >
                Send a Note
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+918529219330"
                className="inline-flex items-center gap-3 border border-ink/20 px-10 py-5 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-ink hover:border-magenta hover:text-magenta transition-colors duration-500"
              >
                <Phone className="size-4" />
                Call Now
              </a>
            </div>

            {/* Decorative horizontal deco line */}
            <div className="ct-deco-line mt-16 h-px w-full bg-ink/8 origin-left" />
          </div>

          {/* ── RIGHT: Image with floating badges ── */}
          <div className="relative order-1 lg:order-2 z-10">
            {/* Main hero image with clip-path wipe */}
            <div
              className="ct-hero-img-wrap overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.18)]"
              style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            >
              <img
                src={exterior}
                alt="Shree Kalyan Hospital — exterior"
                className="ct-hero-img w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-in-out"
              />
              {/* Colour overlay */}
              <div className="absolute inset-0 bg-navy-deep/10 mix-blend-multiply" />
            </div>

            {/* Floating stats */}
            <StatBadge
              num="24 / 7"
              label="Emergency Triage"
              className="-bottom-6 -left-6 md:-bottom-8 md:-left-10"
            />
            <StatBadge
              num="74+"
              label="Named Consultants"
              className="-top-6 -right-4 md:-top-8 md:-right-8"
            />

            {/* Decorative corner frame */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 border-b border-l border-magenta/50 pointer-events-none z-20" />
            <div className="absolute -top-4 right-0 md:-right-6 w-20 h-20 border-t border-r border-ink/15 pointer-events-none z-20" />
          </div>
        </div>

        {/* Bottom scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[0.55rem] tracking-[0.35em] uppercase font-bold text-ink">
            Scroll
          </span>
          <div className="w-px h-12 bg-ink/30 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-magenta animate-scroll-bar"
              style={{ height: "40%", animation: "scrollBar 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* Quick contact strips                              */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="ct-strips px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto border-t border-ink/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            {
              icon: Phone,
              label: "Admissions",
              value: "+91 85292 19330",
              href: "tel:+918529219330",
              accent: false,
            },
            {
              icon: Phone,
              label: "Emergency",
              value: "+91 85292 19330",
              href: "tel:+918529219330",
              accent: true,
            },
            {
              icon: Mail,
              label: "Email",
              value: "info@shreekalyan.in",
              href: "mailto:info@shreekalyan.in",
              accent: false,
            },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                className={`ct-strip group p-10 md:p-14 border-b md:border-b-0 md:border-r last:border-r-0 border-ink/10 transition-all duration-500 hover:bg-navy-deep ${c.accent ? "bg-magenta/5" : "bg-paper"}`}
              >
                <p
                  className={`text-[0.65rem] tracking-[0.3em] font-bold mb-6 flex items-center gap-3 group-hover:text-magenta transition-colors ${c.accent ? "text-magenta" : "text-ink/40"}`}
                >
                  {c.accent && <span className="size-2 rounded-full bg-magenta animate-pulse" />}
                  <Icon className="size-3.5" />
                  {c.label}
                </p>
                <p className="font-display text-3xl md:text-5xl text-navy-deep tracking-tight group-hover:text-paper transition-colors">
                  {c.value}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* Form + sidebar                                    */}
      {/* ══════════════════════════════════════════════════ */}
      <section
        id="contact-form"
        className="ct-form-section px-6 md:px-12 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto border-t border-ink/10"
      >
        <div className="grid grid-cols-12 gap-x-6 gap-y-24">
          {/* Form */}
          <div className="col-span-12 lg:col-span-6">
            <p className="text-[0.65rem] font-bold tracking-[0.3em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" />
              Request Consultation
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-navy-deep leading-[0.85] tracking-tight mb-16">
              Tell us, <br />
              <span className="italic font-light text-magenta">briefly.</span>
            </h2>

            {submitted ? (
              <div className="border border-magenta/30 bg-magenta/5 p-10 md:p-16">
                <p className="font-display text-4xl text-navy-deep mb-4">Thank you.</p>
                <p className="text-xl text-ink/70 font-light">
                  A care coordinator will reach you within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                  <Field label="Full name" name="name" required />
                  <Field label="Phone" name="phone" type="tel" required />
                </div>
                <Field label="Email" name="email" type="email" />
                <Field
                  label="Specialty of interest"
                  name="specialty"
                  placeholder="Cardiology, Neurology, …"
                />
                <div>
                  <label className="block text-[0.65rem] tracking-[0.3em] font-bold text-magenta uppercase mb-4">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={4}
                    className="w-full bg-transparent border-b border-ink/20 focus:border-magenta focus:outline-none py-4 text-xl font-display text-ink placeholder:text-ink/20 transition-colors resize-none"
                    placeholder="A short description of your concern…"
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full md:w-auto bg-navy-deep text-paper px-16 py-6 text-sm font-bold tracking-[0.3em] uppercase hover:bg-magenta transition-colors duration-500 flex items-center gap-4"
                >
                  Send Request
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-20">
            {(
              [
                {
                  icon: MapPin,
                  label: "Address",
                  content: (
                    <>
                      Shree Kalyan Hospital
                      <br />
                      80 Feet Link Road
                      <br />
                      Kota, Rajasthan 324005
                    </>
                  ),
                },
                {
                  icon: Clock,
                  label: "OPD Hours",
                  content: (
                    <>
                      Mon – Sat
                      <br />
                      09:00 – 20:00
                    </>
                  ),
                },
                {
                  icon: Phone,
                  label: "Emergency",
                  accent: true,
                  content: (
                    <>
                      24 hours
                      <br />
                      Every day, all year
                    </>
                  ),
                },
              ] as {
                icon: React.ElementType;
                label: string;
                accent?: boolean;
                content: React.ReactNode;
              }[]
            ).map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i}>
                  <p
                    className={`text-[0.65rem] tracking-[0.3em] font-bold uppercase mb-6 flex items-center gap-4 ${item.accent ? "text-magenta" : "text-magenta"}`}
                  >
                    <span className="w-8 h-px bg-magenta" />
                    <Icon className="size-3.5" />
                    {item.label}
                    {item.accent && (
                      <span className="size-2 rounded-full bg-magenta animate-pulse ml-1" />
                    )}
                  </p>
                  <p className="font-display text-3xl md:text-4xl text-navy-deep leading-tight">
                    {item.content}
                  </p>
                </div>
              );
            })}
          </aside>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* Map / location image                             */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="ct-map-section relative h-[60vh] md:h-[80vh] overflow-hidden border-t border-ink/10">
        <img
          src={exterior}
          alt="Shree Kalyan Hospital, Kota — exterior at golden hour"
          width={1280}
          height={896}
          loading="lazy"
          className="ct-map-img absolute inset-0 w-full h-[115%] -top-[7.5%] object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-in-out"
        />
        <div className="absolute inset-0 bg-navy-deep/30" />

        {/* Overlay text */}
        <div className="absolute bottom-12 left-6 md:bottom-24 md:left-24 text-paper">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase font-bold text-magenta mb-4 flex items-center gap-3">
            <MapPin className="size-3.5" /> Find us
          </p>
          <p className="font-display leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}>
            Kota, <br />
            <span className="italic font-light opacity-80">Rajasthan</span>
          </p>
        </div>

        {/* Bottom-right stat */}
        <div className="absolute bottom-12 right-6 md:bottom-24 md:right-24 text-paper text-right">
          <p className="font-display text-6xl md:text-8xl text-paper/20 leading-none">2024</p>
          <p className="text-[0.6rem] tracking-[0.35em] uppercase text-magenta font-bold">
            Est. in Kota
          </p>
        </div>
      </section>

      {/* Scroll-bar keyframe inline */}
      <style>{`
        @keyframes scrollBar {
          0%   { transform: translateY(-100%); opacity: 1; }
          60%  { transform: translateY(250%); opacity: 1; }
          61%  { opacity: 0; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
      `}</style>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[0.65rem] tracking-[0.2em] uppercase text-ink/50 font-bold mb-3"
      >
        {label} {required && <span className="text-magenta">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-ink/20 focus:border-magenta focus:outline-none py-3 text-base font-display text-ink placeholder:text-ink/30 transition-colors"
      />
    </div>
  );
}
