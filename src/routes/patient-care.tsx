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

function PatientCarePage() {
  useGsapReveal();

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden">
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

      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto" data-reveal>
        <p className="text-xl md:text-2xl text-ink/80 leading-relaxed font-display max-w-4xl">
          Guidelines, visitor hours, and patient resources go here...
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
