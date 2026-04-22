import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-corridor.jpg";
import { SiteNav } from "@/components/site/SiteNav";
import { Marquee } from "@/components/site/Marquee";
import { Philosophy } from "@/components/site/Philosophy";
import { Specialties } from "@/components/site/Specialties";
import { Physicians } from "@/components/site/Physicians";
import { ContactPreview } from "@/components/site/ContactPreview";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PatientStories } from "@/components/site/PatientStories";
import { QuickAccess } from "@/components/site/QuickAccess";
import { RoomViews } from "@/components/site/RoomViews";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

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
      { property: "og:description", content: "Quiet precision in modern healthcare. Kota, Rajasthan." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
});

function Index() {
  useGsapReveal();

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden">
      <SiteNav />

      {/* Hero */}
      <main className="relative pt-36 md:pt-44 pb-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-x-6 items-center">
          <div className="col-span-12 lg:col-span-7 relative z-10">
            <p
              data-anim="hero-eyebrow"
              className="text-xs font-semibold tracking-[0.2em] text-magenta uppercase mb-10 md:mb-14 flex items-center gap-4"
            >
              <span className="w-8 h-px bg-magenta" />
              Kota, Rajasthan · Est. 2001
            </p>

            <h1
              data-anim="hero-title"
              className="font-display text-[4rem] sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] text-navy-deep tracking-tight text-pretty"
            >
              <div className="overflow-hidden pt-4 pb-4">
                <span className="block">Restoring</span>
              </div>
              <div className="overflow-hidden pt-4 pb-4 -mt-4">
                <span className="block italic text-magenta font-normal ml-8 md:ml-32 mt-2 drop-shadow-sm">vitality</span>
              </div>
              <div className="overflow-hidden pt-4 pb-4 -mt-4">
                <span className="block ml-2 md:ml-12 mt-1">through quiet precision.</span>
              </div>
            </h1>

            <div className="mt-12 md:mt-20 ml-2 md:ml-32 flex flex-col md:flex-row gap-12 md:gap-24 md:items-start" data-anim="hero-body">
              <p className="text-lg md:text-xl max-w-[42ch] leading-[1.8] text-ink/70 text-pretty font-light">
                We believe healing requires more than medical excellence. It demands a sanctuary where
                advanced clinical practice meets profound human empathy.
              </p>

              <div className="flex flex-col gap-8 shrink-0">
                <a
                  href="#philosophy"
                  className="group flex flex-col items-start gap-4 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-magenta transition-colors pt-2"
                >
                  <span className="flex items-center gap-4">
                    Explore Care
                    <span className="block size-1.5 rounded-full bg-magenta scale-0 group-hover:scale-100 transition-transform" />
                  </span>
                  <span className="block w-full h-px bg-magenta/20 group-hover:bg-magenta transition-colors" />
                </a>

                <div className="flex items-center gap-3">
                  <div className="relative size-2">
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse-ring" />
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse-dot" />
                  </div>
                  <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-emerald-600/80">
                    Emergency Services Active
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Overlay */}
            <div 
              data-anim="hero-stats"
              className="mt-20 md:mt-32 ml-2 md:ml-32 grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8 border-t border-ink/5 pt-12"
            >
              <div>
                <span className="block text-2xl font-display italic text-navy-deep">25+</span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-ink/40 mt-2 block">Specializations</span>
              </div>
              <div>
                <span className="block text-2xl font-display italic text-navy-deep">150+</span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-ink/40 mt-2 block">Bed Capacity</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="block text-2xl font-display italic text-navy-deep">NABH</span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-ink/40 mt-2 block">Accredited Care</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-20 lg:mt-0 relative" data-anim="hero-image">
            <div className="w-full aspect-[3/4] bg-paper border border-ink/5 shadow-editorial rotate-1 transition-transform duration-1000 hover:rotate-0 overflow-hidden relative">
              <video
                src="https://player.vimeo.com/external/517090025.sd.mp4?s=34a05f778696b9d62f3a8b277d33b49e6d8a39e8&profile_id=164&oauth2_token_id=57447761"
                poster={heroImg}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              >
                <source src="https://player.vimeo.com/external/517090025.sd.mp4?s=34a05f778696b9d62f3a8b277d33b49e6d8a39e8&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Subtle overlay to soften the video */}
              <div className="absolute inset-0 bg-navy-deep/5 pointer-events-none" />
            </div>
            <div
              data-anim="hero-badge"
              className="absolute -bottom-8 -left-6 md:-bottom-10 md:-left-16 size-32 md:size-36 bg-sky p-5 md:p-6 flex flex-col justify-between text-paper shadow-card"
            >
              <span className="font-display text-4xl md:text-5xl italic leading-none">25</span>
              <span className="text-[0.6rem] md:text-[0.65rem] font-semibold tracking-widest uppercase leading-tight">
                Years of<br />Clinical<br />Excellence
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 opacity-30 group">
          <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase rotate-90 origin-left ml-2 mb-8">Scroll</span>
          <div className="w-px h-12 bg-ink/20 relative overflow-hidden">
            <div className="absolute inset-0 w-full bg-ink animate-scroll-line" />
          </div>
        </div>
      </main>

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
        items={["NABH Accredited", "ISO 9001:2015", "24/7 Trauma", "Insurance Empanelled", "Cashless Care"]}
      />

      <Specialties />
      <RoomViews />
      <Physicians />
      <PatientStories />
      <ContactPreview />
      <SiteFooter />
    </div>
  );
}
