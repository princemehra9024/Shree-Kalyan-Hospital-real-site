import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services & Departments · Shree Kalyan Hospital" },
    ],
  }),
});

import { services } from "@/lib/data/services";
import { Link } from "@tanstack/react-router";

function ServicesPage() {
  useGsapReveal();

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden">
      <SiteNav />

      <PageHero
        chapter="Services"
        eyebrow="Departments"
        title={
          <>
            <span className="block">What we</span>
            <span className="block italic font-light text-magenta ml-8 md:ml-32 mt-2">treat.</span>
          </>
        }
        intro="Explore our wide range of world-class medical services and specialized departments designed around your needs."
      />

      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-48 max-w-[1600px] mx-auto border-t border-ink/10" data-reveal-stagger>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
          
          {services.map((dept, i) => (
            <Link 
              key={dept.id} 
              to="/services/$serviceId" 
              params={{ serviceId: dept.id }}
              className="group border-b border-ink/10 pb-20 block transition-all hover:bg-magenta/[0.02]"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[0.65rem] font-bold text-magenta pr-4 border-r border-magenta/30">{dept.chapter}</span>
                <p className="text-[0.65rem] font-bold tracking-[0.3em] text-ink/50 uppercase">Department</p>
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-navy-deep tracking-tighter mb-10 group-hover:text-magenta transition-colors">
                {dept.title}
              </h2>
              <p className="text-lg text-ink/70 leading-relaxed font-light max-w-md mb-12">
                {dept.desc}
              </p>
              <ul className="grid grid-cols-1 gap-4">
                {dept.services.slice(0, 4).map((s, si) => (
                  <li key={si} className="flex items-center gap-4 text-sm tracking-widest uppercase font-bold text-ink/40 group-hover:text-ink/80 transition-colors">
                    <span className="size-1 bg-magenta rounded-full" />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-12 flex items-center gap-4 text-[0.6rem] font-bold tracking-widest uppercase text-magenta opacity-0 group-hover:opacity-100 transition-all">
                View Institute Details 
                <span className="text-lg">→</span>
              </div>
            </Link>
          ))}

        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-32 bg-paper border-t border-ink/10">
        <div className="max-w-[1200px] mx-auto text-center" data-reveal>
          <p className="text-[0.65rem] font-bold tracking-[0.5em] text-magenta uppercase mb-12">Admissional Request</p>
          <h3 className="font-display text-4xl md:text-6xl text-navy-deep mb-16 leading-tight">
            Seeking a specialized review? <br/> <span className="italic font-light opacity-60">Consult our admissions desk.</span>
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-12">
             <button className="bg-navy-deep text-paper px-12 py-6 text-xs font-bold tracking-[0.3em] uppercase hover:bg-magenta transition-colors">
                View All Departments
             </button>
             <button className="bg-transparent border border-ink/10 px-12 py-6 text-xs font-bold tracking-[0.3em] uppercase hover:border-magenta hover:text-magenta transition-colors">
                Contact Admissions
             </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
