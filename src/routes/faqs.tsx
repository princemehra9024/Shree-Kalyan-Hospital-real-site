import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export const Route = createFileRoute("/faqs")({
  component: FAQsPage,
  head: () => ({
    meta: [
      { title: "FAQs · Shree Kalyan Hospital" },
    ],
  }),
});

function FAQsPage() {
  useGsapReveal();

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden">
      <SiteNav />

      <PageHero
        chapter="Support"
        eyebrow="Questions"
        title={
          <>
            <span className="block">Find</span>
            <span className="block italic font-light text-magenta ml-8 md:ml-32 mt-2">answers.</span>
          </>
        }
        intro="Common questions regarding insurance, emergencies, and medical records."
      />

      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto" data-reveal>
        <p className="text-xl md:text-2xl text-ink/80 leading-relaxed font-display max-w-4xl">
          Frequently asked questions and their detailed answers go here...
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
