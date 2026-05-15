import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hospital.png";
import { SiteNav } from "@/components/site/SiteNav";
import { Marquee } from "@/components/site/Marquee";
import { Philosophy } from "@/components/site/Philosophy";
import { Specialties } from "@/components/site/Specialties";
import { Physicians } from "@/components/site/Physicians";
import { ContactPreview } from "@/components/site/ContactPreview";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PatientReviews } from "@/components/site/Reviews";
import { QuickAccess } from "@/components/site/QuickAccess";
import { RoomViews } from "@/components/site/RoomViews";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Best Hospital in Kota Rajasthan | Shree Kalyan Hospital | NABH Accredited" },
      {
        name: "description",
        content:
          "Shree Kalyan Hospital — the best hospital in Kota, Rajasthan. NABH accredited, 150+ beds, 70+ specialists. Expert Cardiology, Oncology, Neurosciences, ICU & 24/7 Emergency care. Book appointment today.",
      },
      {
        name: "keywords",
        content:
          "best hospital in kota, hospital kota rajasthan, shree kalyan hospital kota, NABH hospital kota, multi specialty hospital kota, cardiology hospital kota, oncology hospital kota, 24 hour hospital kota, emergency hospital kota, top doctor kota",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Best Hospital in Kota | Shree Kalyan Hospital | NABH Accredited" },
      {
        property: "og:description",
        content: "Shree Kalyan Hospital — NABH accredited multi-specialty hospital in Kota, Rajasthan. Expert Cardiology, Oncology, Neurosciences & 24/7 Emergency. Trusted since 2001.",
      },
      { property: "og:url", content: "https://shreekalyanhospital.com/" },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
      { name: "twitter:title", content: "Best Hospital in Kota | Shree Kalyan Hospital" },
    ],
  }),
});

function Index() {
  const { t } = useTranslation();
  useGsapReveal();

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden">
      <SiteNav isHome={true} />
      <main>
        {/* ── Hero Section — Immersive & Minimalist ── */}
        <section className="relative h-dvh min-h-[600px] flex flex-col justify-center overflow-hidden bg-navy-deep pt-20 md:pt-24">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImg}
              alt="Shree Kalyan Hospital — best hospital in Kota"
              fetchPriority="high"
              decoding="sync"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            />
            {/* Editorial Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/75 via-navy-deep/20 to-transparent" />
          </div>

          <div className="relative z-10 px-4 sm:px-6 md:pl-24 lg:pl-32 pr-4 sm:pr-6 md:pr-12 lg:pr-24 max-w-[1920px] mx-auto w-full">
            <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-8 xl:gap-12">
              <div className="flex-1 max-w-full">
                <div className="mb-4 lg:mb-8 flex items-center gap-6" data-anim="hero-eyebrow">
                  <span className="h-px w-16 bg-paper/20"></span>
                  <span className="text-[0.65rem] font-syne uppercase tracking-[0.4em] font-bold text-magenta">
                    Est. 2001
                  </span>
                </div>
                <h1
                  className="font-display text-paper leading-[1] tracking-tighter"
                  data-anim="hero-title"
                >
                  <span className="block text-5xl sm:text-6xl md:text-[5rem] lg:text-[7.5rem]">Care that</span>
                  <span className="block text-6xl sm:text-7xl md:text-[6rem] lg:text-[9rem] mt-1 lg:mt-2">
                    <em className="italic font-light text-magenta pr-2 lg:pr-4">sees</em> You.
                  </span>
                </h1>
              </div>

              {/* Circular CTA */}
              <div className="relative group shrink-0 mb-4 xl:mb-8 self-start xl:self-auto" data-anim="hero-cta">
                <Link
                  to="/appointments"
                  className="size-28 sm:size-32 md:size-40 lg:size-48 rounded-full bg-magenta text-paper flex flex-col items-center justify-center text-center p-3 md:p-4 transition-all duration-700 hover:scale-110 shadow-glow-magenta relative z-10 overflow-hidden group/btn"
                >
                  <span className="text-[0.5rem] md:text-[0.65rem] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-1 md:mb-2 opacity-80">
                    {t("nav.appointments", "Appointments")}
                  </span>
                  <span className="font-display italic text-xl md:text-3xl leading-tight">
                    {t("home.book_appointment", "Book\nAppointment")}
                  </span>
                  <div className="absolute inset-0 bg-paper/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                </Link>

                {/* Ambient Animation Rings */}
                <div className="absolute inset-0 rounded-full border border-magenta/30 scale-110 animate-pulse-ring" />
                <div className="absolute inset-0 rounded-full border border-magenta/20 scale-125 animate-pulse-ring [animation-delay:0.4s]" />
              </div>
            </div>

            {/* Hero Footer — tagline + stats */}
            <div
              className="mt-8 md:mt-16 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 border-t border-paper/10 pt-6 md:pt-8"
              data-anim="hero-stats"
            >
              <p className="text-paper/50 text-sm max-w-sm leading-relaxed font-light">
                {t(
                  "home.hero_subtitle",
                  "Expert medical care with personal attention. We combine advanced clinical practice with compassion to ensure the best outcomes for our patients.",
                )}
              </p>
              <div className="flex gap-8 md:gap-12 flex-wrap">
                <div>
                  <span className="block text-paper text-xl font-display italic">25+</span>
                  <span className="text-[0.55rem] font-bold uppercase tracking-widest text-paper/60 mt-1 block">
                    Specialties
                  </span>
                </div>
                <div>
                  <span className="block text-paper text-xl font-display italic">150+</span>
                  <span className="text-[0.55rem] font-bold uppercase tracking-widest text-paper/60 mt-1 block">
                    Bed Capacity
                  </span>
                </div>
                <div>
                  <span className="block text-paper text-xl font-display italic">NABH</span>
                  <span className="text-[0.55rem] font-bold uppercase tracking-widest text-paper/60 mt-1 block">
                    Accredited
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Scroll Indicator */}
          <div className="absolute bottom-8 right-12 z-20 hidden md:flex flex-col items-center gap-4 opacity-40">
            <span className="text-[0.6rem] font-bold tracking-[0.5em] uppercase vertical-text mb-4 text-paper">
              Scroll
            </span>
            <div className="w-px h-24 bg-gradient-to-b from-paper via-paper to-transparent relative overflow-hidden">
              <div className="absolute inset-0 w-full bg-magenta/50 animate-scroll-line" />
            </div>
          </div>
        </section>

        {/* Quick-access grid */}
        <QuickAccess />

        {/* Marquee conveyor */}
        <Marquee
          items={[
            "Expert Cardiology",
            "Advanced Neurosciences",
            "Oncology Care",
            "Surgical Excellence",
            "24/7 Critical Care",
          ]}
        />

        <Philosophy />

        <Marquee
          variant="paper"
          speed="fast"
          items={[
            "NABH Accredited",
            "ISO 9001:2015",
            "24/7 Trauma",
            "Insurance Empanelled",
            "Cashless Care",
          ]}
        />

        {/* Below-fold sections — lazy rendered for perf */}
        <div className="section-lazy"><Specialties /></div>
        <div className="section-lazy"><RoomViews /></div>
        <div className="section-lazy"><Physicians /></div>
        <div className="section-lazy"><PatientReviews /></div>
        <div className="section-lazy"><ContactPreview /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
