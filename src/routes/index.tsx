import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-corridor.jpg";
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
      { title: "Shree Kalyan Hospital · Kota — Quiet precision in modern healthcare" },
      {
        name: "description",
        content:
          "Shree Kalyan Hospital, Kota — an editorial sanctuary of advanced clinical care across cardiology, neurosciences, oncology and more.",
      },
      { property: "og:title", content: "Shree Kalyan Hospital · Kota" },
      {
        property: "og:description",
        content: "Quiet precision in modern healthcare. Kota, Rajasthan.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
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
        {/* Hero Section — Immersive & Minimalist */}
        <section className="relative h-dvh min-h-[700px] flex flex-col justify-end overflow-hidden bg-navy-deep">
          {/* Background Video Layer */}
          <div className="absolute inset-0 z-0">
            <video
              src="https://player.vimeo.com/external/517090025.hd.mp4?s=d63a8b277d33b49e6d8a39e8&profile_id=174"
              poster={heroImg}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125 transition-all duration-1000"
            />
            {/* Editorial Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/30" />
            <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-paper/10" />
          </div>

          <div className="relative z-10 px-6 md:pl-48 lg:pl-80 pr-6 md:pr-12 lg:pr-24 pb-12 md:pb-20 pt-48 md:pt-56 lg:pt-64 max-w-[1920px] mx-auto w-full">
            <div className="flex flex-col md:flex-row items-end justify-between gap-12">
              {/* Circular CTA — HutStuf Inspired */}
              <div className="relative group shrink-0 mb-4 md:mb-12" data-anim="hero-cta">
                <Link
                  to="/appointments"
                  className="size-36 md:size-56 rounded-full bg-magenta text-paper flex flex-col items-center justify-center text-center p-6 transition-all duration-700 hover:scale-110 shadow-glow-magenta relative z-10 overflow-hidden group/btn"
                >
                  <span className="text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.3em] uppercase mb-2 opacity-80">
                    {t("home.book_appointment", "Schedule")}
                  </span>
                  <span className="font-display italic text-3xl md:text-5xl leading-tight">
                    {t("nav.appointments", "Visit")}
                  </span>
                  <div className="absolute inset-0 bg-paper/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                </Link>

                {/* Ambient Animation Rings */}
                <div className="absolute inset-0 rounded-full border border-magenta/30 scale-110 animate-pulse-ring" />
                <div className="absolute inset-0 rounded-full border border-magenta/20 scale-125 animate-pulse-ring [animation-delay:0.4s]" />
              </div>
            </div>

            {/* Subtle Hero Footer */}
            <div
              className="mt-16 md:mt-24 flex flex-col md:flex-row items-center gap-8 md:gap-16 border-t border-paper/10 pt-12"
              data-anim="hero-stats"
            >
              <p className="text-paper/50 text-sm max-w-sm leading-relaxed font-light">
                {t(
                  "home.hero_subtitle",
                  "Quiet precision in modern healthcare. A sanctuary where advanced clinical practice meets profound human empathy.",
                )}
              </p>
              <div className="flex gap-12">
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

        {/* Quick-access Fortis-style grid */}
        <QuickAccess />

        {/* Conveyor belt */}
        <Marquee
          items={[
            "Advanced Cardiology",
            "Neurosciences",
            "Precision Oncology",
            "Robotic Surgery",
            "Mother & Child",
            "Critical Care",
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

        <Specialties />
        <RoomViews />
        <Physicians />
        <PatientReviews />
        <ContactPreview />
      </main>
      <SiteFooter />
    </div>
  );
}
