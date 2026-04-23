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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    category: "Appointments & Consultations",
    items: [
      {
        q: "How do I schedule a private consultation?",
        a: "You can schedule a consultation by calling our admissions desk at +91 85292 19330 or by filling out the request form on our Contact page. We recommend booking at least 48 hours in advance for specialized senior consultants."
      },
      {
        q: "What should I bring for my first visit?",
        a: "Please bring a valid government ID, any previous medical records or imaging (X-rays, MRIs), and a list of your current medications. If you have insurance, please bring your policy card."
      }
    ]
  },
  {
    category: "Visiting & Stay",
    items: [
      {
        q: "What are the visitor hours?",
        a: "General visiting hours are daily from 10:00 AM to 12:00 PM and 5:00 PM to 7:00 PM. To maintain a sanctuary of healing, we limit visitors to two per patient at any given time."
      },
      {
        q: "Is there a pharmacy on-site?",
        a: "Yes, our pharmacy is located on the ground floor and is open 24/7 for both inpatient and outpatient needs."
      }
    ]
  },
  {
    category: "Insurance & Billing",
    items: [
      {
        q: "Which insurance providers do you empanel?",
        a: "We are empanelled with most major TPA and private insurance providers, as well as government schemes. Please contact our billing desk for a specific list of active empanellments."
      },
      {
        q: "Do you offer cashless hospitalization?",
        a: "Yes, cashless facility is available for planned and emergency admissions, subject to the terms and approvals of your insurance provider."
      }
    ]
  }
];

function FAQsPage() {
  useGsapReveal();

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden selection:bg-magenta selection:text-white">
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
        <div className="grid grid-cols-12 gap-x-12">
          <div className="col-span-12 lg:col-span-4 mb-20 lg:mb-0">
             <div className="sticky top-32">
                <p className="text-[0.65rem] font-bold tracking-[0.3em] text-magenta uppercase mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-magenta" />
                  Categories
                </p>
                <ul className="space-y-4">
                   {faqData.map(cat => (
                     <li key={cat.category} className="font-display text-2xl text-navy-deep/60 hover:text-magenta transition-colors cursor-pointer">
                        {cat.category}
                     </li>
                   ))}
                </ul>
             </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <Accordion type="single" collapsible className="w-full space-y-8">
              {faqData.map((cat, ci) => (
                <div key={ci} className="space-y-6">
                   <h3 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink/30 pb-4 border-b border-ink/5">
                      {cat.category}
                   </h3>
                   {cat.items.map((item, ii) => (
                     <AccordionItem key={ii} value={`item-${ci}-${ii}`} className="border-none bg-paper/50 hover:bg-secondary/50 px-6 transition-colors">
                       <AccordionTrigger className="font-display text-2xl md:text-3xl text-left py-8 hover:no-underline">
                          {item.q}
                       </AccordionTrigger>
                       <AccordionContent className="text-lg leading-relaxed text-ink/70 font-light pb-8 max-w-2xl">
                          {item.a}
                       </AccordionContent>
                     </AccordionItem>
                   ))}
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
