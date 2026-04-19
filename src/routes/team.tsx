import { createFileRoute } from "@tanstack/react-router";
import doc1 from "@/assets/doctor-1.jpg";
import doc2 from "@/assets/doctor-2.jpg";
import doc3 from "@/assets/doctor-3.jpg";
import doc4 from "@/assets/doctor-4.jpg";
import featured from "@/assets/doctor-portrait.jpg";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
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
        content: "Seventy-four named consultants. The same physician at admission, review and discharge.",
      },
      { property: "og:image", content: featured },
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

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden pb-24 md:pb-0 selection:bg-magenta selection:text-white">
      <SiteNav />

      <PageHero
        chapter="Chapter III"
        eyebrow="Physicians"
        title={
          <>
            <span className="block italic text-magenta font-light -ml-4 pr-4">Seventy-four</span>
            <span className="block ml-12 md:ml-32 mt-2">consultants.</span>
          </>
        }
        intro="Care at Shree Kalyan is delivered, not dispatched. You meet the same physician at admission, review and discharge — never a shift, never a substitute."
      />

      <div className="border-t border-ink/10">
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

      {/* Featured physician — large editorial spread */}
      <section className="px-6 md:px-12 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto border-t border-ink/10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 items-center">
          <div className="col-span-12 lg:col-span-6 relative" data-reveal>
            <div className="overflow-hidden bg-paper shadow-editorial">
              <img
                src={physicians[0].image}
                alt={physicians[0].name}
                width={900}
                height={1200}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
                data-parallax
              />
            </div>
            <div className="absolute -bottom-10 -right-4 md:-right-12 bg-navy-deep text-paper p-8 md:p-10 shadow-card max-w-[20rem]">
              <p className="font-display italic text-3xl md:text-4xl leading-tight">"{physicians[0].quote}"</p>
              <p className="mt-6 text-[0.65rem] tracking-[0.3em] uppercase font-bold text-magenta">
                {physicians[0].name}
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8" data-reveal>
            <p className="text-[0.65rem] font-bold tracking-[0.3em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" />
              Featured Physician
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-navy-deep leading-[0.85] tracking-tight mb-8">
              {physicians[0].name}
            </h2>
            <p className="font-display italic text-2xl md:text-3xl text-ink/60 mb-10">{physicians[0].role}</p>
            <p className="text-lg md:text-xl leading-relaxed text-ink/70 max-w-prose mb-12">
              For two decades, Dr. Sharma has shaped Shree Kalyan's philosophy of unhurried medicine —
              insisting that diagnosis begins not with the chart, but with the conversation.
            </p>
            <dl className="grid grid-cols-2 gap-12 max-w-md pt-8 border-t border-ink/10">
              <div>
                <dt className="text-[0.65rem] tracking-[0.3em] uppercase text-magenta font-bold mb-3">Credentials</dt>
                <dd className="font-display text-xl leading-snug">{physicians[0].creds}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] tracking-[0.3em] uppercase text-magenta font-bold mb-3">Institute</dt>
                <dd className="font-display text-xl leading-snug">{physicians[0].institute}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Roster — editorial cards */}
      <section className="bg-secondary px-6 md:px-12 lg:px-24 py-32 md:py-48 border-t border-ink/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24" data-reveal>
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl text-navy-deep leading-[0.85] tracking-tight">
              The full <span className="italic font-light text-magenta">roster.</span>
            </h2>
            <p className="text-lg text-ink/60 max-w-[36ch] leading-relaxed">
              A selection of senior consultants across our six institutes. Visit the OPD desk for the
              complete physician directory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16" data-reveal-stagger>
            {physicians.slice(1).map((p) => (
              <article key={p.name} className="group">
                <div className="overflow-hidden bg-paper aspect-[3/4] mb-5 shadow-card">
                  <img
                    src={p.image}
                    alt={p.name}
                    width={800}
                    height={1024}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-magenta font-bold mb-2">
                  {p.institute}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-navy-deep leading-tight">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-ink/65 italic">{p.role}</p>
                <p className="mt-3 text-xs text-ink/55">{p.creds}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
