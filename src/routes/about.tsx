import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us · Shree Kalyan Hospital" },
    ],
  }),
});

function AboutPage() {
  useGsapReveal();

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden">
      <SiteNav />

      <PageHero
        chapter="About"
        eyebrow="Our Story"
        title={
          <>
            <span className="block">Who we</span>
            <span className="block italic font-light text-magenta ml-8 md:ml-32 mt-2">are.</span>
          </>
        }
        intro="Learn about the history and mission of Shree Kalyan Hospital, dedicated to providing unparalleled care for decades."
      />

      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-48 max-w-[1600px] mx-auto border-t border-ink/10" data-reveal>
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-5 mb-16 lg:mb-0">
            <p className="text-[0.65rem] font-bold tracking-[0.3em] text-magenta uppercase mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" />
              Chapter I — Genesis
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-navy-deep tracking-tighter">
              Twenty-five years of <br/> <span className="italic font-light opacity-80">unhurried</span> medicine.
            </h2>
          </div>
          
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="font-display text-2xl md:text-3xl leading-relaxed text-ink/80 italic mb-12">
              "We believed that healing requires silence. Not just the absence of noise, but the presence of stillness. Shree Kalyan was built to be that sanctuary."
            </p>
            
            <div className="space-y-8 text-lg text-ink/70 leading-[1.8] font-light">
              <p>
                Founded in 2001 in the heart of Kota, Rajasthan, Shree Kalyan Hospital began with a singular obsession: to reconcile the cold efficiency of modern technology with the warm sanctuary of human empathy.
              </p>
              <p>
                Over the decades, we have grown from a local surgical center into a regional landmark for specialized care. Yet, our founding principle remains unchanged. We do not just treat patients; we restore vitality through quiet precision.
              </p>
            </div>
            
            <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-ink/10 pt-12">
              {[
                { label: "Founded", value: "2001" },
                { label: "Specialists", value: "120+" },
                { label: "Lives Touched", value: "1M+" }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-[0.65rem] uppercase tracking-widest font-bold text-magenta mb-2">{stat.label}</p>
                  <p className="font-display text-4xl text-navy-deep">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto border-t border-ink/10">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24" data-reveal>
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl text-navy-deep leading-[0.85] tracking-tight">
              Heritage & <span className="italic font-light text-magenta">milestones.</span>
            </h2>
            <p className="text-lg text-ink/60 max-w-[36ch] leading-relaxed">
              A brief history of our evolution from a surgical center to a regional center of excellence.
            </p>
          </div>

          <div className="space-y-12">
            {[
              { year: "2001", event: "Shree Kalyan Surgical Center founded by senior consultants in Kota." },
              { year: "2008", event: "Expansion into a multi-specialty facility with advanced cardiology wing." },
              { year: "2015", event: "Attained NABH accreditation, the gold standard for Indian healthcare." },
              { year: "2021", event: "Inauguration of the Precision Oncology and Robotic Surgery department." },
              { year: "2024", event: "Celebrating 25 years of restoring vitality through quiet precision." }
            ].map((m, i) => (
              <div key={i} className="group grid grid-cols-12 gap-x-6 py-12 border-b border-ink/5 items-center hover:bg-magenta/[0.01] transition-colors" data-reveal>
                <div className="col-span-3 md:col-span-2">
                  <span className="font-display text-4xl md:text-6xl italic text-magenta/40 group-hover:text-magenta transition-colors">{m.year}</span>
                </div>
                <div className="col-span-9 md:col-span-10">
                  <p className="font-display text-2xl md:text-4xl text-navy-deep/80 max-w-3xl leading-snug">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-32 bg-navy-deep text-paper overflow-hidden relative">
         <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-magenta)_0%,_transparent_70%)]" />
         </div>
         
         <div className="max-w-[1200px] mx-auto text-center" data-reveal>
            <p className="text-[0.65rem] font-bold tracking-[0.5em] text-magenta uppercase mb-12">Our Core Pillars</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
               {[
                 { title: "Precision", desc: "Advanced diagnostics and surgical accuracy that leaves no room for doubt." },
                 { title: "Presence", desc: "A commitment to being fully attentive to every patient’s unique narrative." },
                 { title: "Progress", desc: "Continuously evolving our clinical protocols to lead the frontier of care." }
               ].map((p, i) => (
                 <div key={i} className="group">
                    <h3 className="font-display text-5xl mb-6 italic font-light group-hover:text-magenta transition-colors">{p.title}</h3>
                    <p className="text-sm tracking-wide leading-relaxed opacity-60 font-light">{p.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}
