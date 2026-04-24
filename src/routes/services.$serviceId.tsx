import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { services, type ServiceDetail } from "@/lib/data/services";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services/$serviceId")({
  component: ServiceIdPage,
  loader: ({ params }) => {
    const service = services.find((s) => s.id === params.serviceId);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    const title = service ? `${service.title} · Shree Kalyan Hospital` : "Service · Shree Kalyan Hospital";
    const description = service ? service.desc : "Specialized medical services at Shree Kalyan Hospital.";
    
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function ServiceIdPage() {
  const { service } = Route.useLoaderData() as { service: ServiceDetail };
  useGsapReveal();

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden">
      <SiteNav />

      <PageHero
        chapter={`Institute ${service.chapter}`}
        eyebrow={service.title}
        title={
          <>
            <span className="block">{service.title.split(" ")[0]}</span>
            <span className="block italic font-light text-magenta ml-8 md:ml-32 mt-2">
              {service.title.split(" ").slice(1).join(" ") || "Precision."}
            </span>
          </>
        }
        intro={service.desc}
        image={service.image}
      />

      {/* Editorial Body Segment */}
      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-48 max-w-[1600px] mx-auto border-t border-ink/10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 items-start">
          <div className="col-span-12 lg:col-span-5" data-reveal>
            <p className="text-[0.65rem] font-bold tracking-[0.3em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" />
              Clinical Philosophy
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-navy-deep leading-[0.85] tracking-tighter mb-12">
              Measuring <br />
              <span className="italic font-light">every beat.</span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7" data-reveal>
            <div className="space-y-12">
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-ink/80">
                {service.longDesc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-ink/10">
                {service.stats.map((stat: { label: string; value: string }, i: number) => (
                  <div key={i}>
                    <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink/40 mb-2">
                      {stat.label}
                    </p>
                    <p className="font-display text-5xl text-navy-deep">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services Grid */}
      <section className="bg-navy-deep text-paper px-6 md:px-12 lg:px-24 py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24"
            data-reveal
          >
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl tracking-tight leading-none text-white/90">
              Department <br />
              <span className="italic font-light text-magenta">Capabilities.</span>
            </h2>
            <p className="text-xl text-white/50 max-w-[32ch] font-light leading-relaxed">
              Our {service.title} institute is built for zero-compromise precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.services.map((item: string, i: number) => (
              <div
                key={i}
                className="group border border-white/10 p-10 hover:border-magenta transition-all duration-500"
                data-reveal
              >
                <ArrowRight className="size-6 text-magenta mb-8 group-hover:translate-x-2 transition-transform" />
                <h3 className="font-display text-3xl mb-4">{item}</h3>
                <p className="text-sm font-light text-white/40 group-hover:text-white/60 transition-colors">
                  Advanced clinical management under senior consultant supervision.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Tech */}
      <section className="px-6 md:px-12 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-x-6 gap-y-24 items-center">
          <div className="col-span-12 lg:col-span-6 order-2 lg:order-1" data-reveal>
            <p className="text-[0.65rem] font-bold tracking-[0.3em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" />
              Advanced Technology
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-navy-deep tracking-tighter mb-12 leading-[0.9]">
              Precision <br />
              <span className="italic font-light text-magenta">Infrastructure.</span>
            </h2>

            <div className="space-y-12 max-w-xl">
              {service.features.map((f: { title: string; desc: string }, i: number) => (
                <div key={i} className="flex gap-6 items-start border-b border-ink/5 pb-8">
                  <div className="size-12 rounded-full bg-magenta/5 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="size-6 text-magenta" />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl text-navy-deep mb-2">{f.title}</h4>
                    <p className="text-ink/60 leading-relaxed font-light">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8 order-1 lg:order-2" data-reveal>
            <div className="aspect-[4/5] bg-secondary shadow-editorial flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-navy-deep/5 group-hover:bg-transparent transition-colors duration-700" />
              <AlertCircle className="size-16 text-magenta opacity-20" />
              {/* Note: In a real app, we'd have specific images for each department */}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-32 bg-magenta text-paper text-center">
        <div className="max-w-[800px] mx-auto" data-reveal>
          <h3 className="font-display text-4xl md:text-6xl mb-12 leading-tight">
            Ready for a <span className="italic font-light opacity-80">comprehensive review?</span>
          </h3>
          <Link
            to="/appointments"
            className="inline-block bg-navy-deep text-paper px-20 py-8 text-xs font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-magenta transition-all duration-500 shadow-2xl"
          >
            Book Consultation
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
