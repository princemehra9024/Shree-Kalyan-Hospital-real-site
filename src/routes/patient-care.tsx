import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export const Route = createFileRoute("/patient-care")({
  component: PatientCarePage,
  head: () => ({
    meta: [
      { title: "Patient Care · Shree Kalyan Hospital" },
    ],
  }),
});

const careSteps = [
  {
    title: "Admissions",
    desc: "From the moment you arrive, our guest relations team ensures a seamless transition. Whether it is a planned surgery or an urgent care need, we handle the paperwork so you can focus on healing.",
    points: ["Pre-admission counseling", "Insurance desk assistance", "Concierge luggage service"]
  },
  {
    title: "Your Stay",
    desc: "Our rooms are designed to be sanctuaries of quiet. We maintain strict noise protocols and evidence-based lighting to support your circadian rhythm and speed recovery.",
    points: ["Dedicated nursing ratios", "In-room dietary consultation", "Daily consultant reviews"]
  },
  {
    title: "Discharge",
    desc: "Healing doesn't end at our doors. Our discharge protocol includes a comprehensive care plan, medication management review, and scheduled follow-up coordination.",
    points: ["Medication reconciliation", "Post-care home instructions", "Follow-up tele-consultations"]
  }
];

function PatientCarePage() {
  useGsapReveal();

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden selection:bg-magenta selection:text-white">
      <SiteNav />

      <PageHero
        chapter="Philosophy"
        eyebrow="Care"
        title={
          <>
            <span className="block">Your</span>
            <span className="block italic font-light text-magenta ml-8 md:ml-32 mt-2">journey.</span>
          </>
        }
        intro="Navigate your admission, stay, and discharge with complete transparency and support."
      />

      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-48 max-w-[1600px] mx-auto border-t border-ink/10" data-reveal>
        <div className="space-y-32">
          {careSteps.map((step, i) => (
            <div key={i} className="grid grid-cols-12 gap-x-6 items-start">
               <div className="col-span-12 lg:col-span-5 mb-12 lg:mb-0">
                  <p className="font-display text-7xl md:text-9xl text-magenta/10 leading-none -mb-8 md:-mb-12 select-none">0{i+1}</p>
                  <h2 className="font-display text-5xl md:text-7xl text-navy-deep tracking-tight">{step.title}</h2>
               </div>
               <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                  <p className="text-xl md:text-2xl leading-relaxed text-ink/70 font-light mb-12">
                     {step.desc}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                     {step.points.map((p, pi) => (
                       <li key={pi} className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-magenta">
                          <span className="size-1.5 rounded-full bg-magenta" />
                          {p}
                       </li>
                     ))}
                  </ul>
               </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
