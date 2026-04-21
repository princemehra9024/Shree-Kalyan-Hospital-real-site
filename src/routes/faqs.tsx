import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { FAQAccordion, FAQItem } from "@/components/site/FAQAccordion";

export const Route = createFileRoute("/faqs")({
  component: FAQsPage,
  head: () => ({
    meta: [
      { title: "FAQs · Shree Kalyan Hospital" },
    ],
  }),
});

const faqs: FAQItem[] = [
  {
    question: "Do you accept international insurance plans?",
    answer: "Yes, we have tie-ups with several major international health insurance providers. For a comprehensive list, please contact our international desk before your arrival. Our concierge team can assist in verifying coverage limits and direct-billing arrangements.",
  },
  {
    question: "What is the typical wait time for scheduling an elective surgery?",
    answer: "Wait times vary by specialty. However, our commitment to 'unhurried medicine' ensures that once you are scheduled, the time allocated for your case is entirely yours. Most elective procedures can be scheduled within a week of initial consultation.",
  },
  {
    question: "How does the “same physician” policy work?",
    answer: "We believe continuity is paramount to healing. The lead physician who conducts your initial diagnosis will personally oversee your admission, surgical intervention (if required), and post-operative review to ensure no nuance of your case is lost in translation.",
  },
  {
    question: "Can I request copies of my molecular and imaging reports?",
    answer: "Absolutely. All patients are provided secure, encrypted digital access to their complete medical dossier, including high-resolution 4D echo and MRI scans, within 24 hours of the procedure.",
  },
  {
    question: "What amenities are included in private recovery suites?",
    answer: "Our private suites are designed as sanctuaries of quiet healing. They feature dedicated nursing staff, climate and ambient lighting controls, curated meals designed by our clinical nutritionists, and accommodations for one accompanying family member.",
  },
  {
    question: "Is remote second-opinion consultation available?",
    answer: "Yes. Through our Telemedicine Hub, our specialists frequently consult with patients Pan-India and internationally. For complex oncology and neurology cases, we can also facilitate multi-disciplinary tumor board reviews remotely.",
  },
  {
    question: "Do I need to book an appointment for X-rays or advanced radiology scans?",
    answer: "Routine X-rays and baseline ultrasounds can be accommodated on a walk-in basis through our 24/7 Radiology & Imaging department. However, for advanced imaging modalities such as 3-Tesla MRI, PET-CT, or 128-slice CT scans, prior appointments are strictly recommended to ensure our molecular imaging specialists have prepared your suite and protocol.",
  },
];

function FAQsPage() {
  useGsapReveal();

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden">
      <SiteNav />

      {/* Cinematic Hero Segment */}
      <header className="pt-48 pb-24 md:pt-64 md:pb-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto" data-reveal>
        <p className="text-[0.62rem] font-syne font-bold tracking-[0.3em] text-magenta uppercase mb-8 flex items-center gap-4">
          <span className="w-8 h-px bg-magenta" />
          Support & Guidelines
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.88] text-navy-deep tracking-tight mb-12">
          Frequently asked <br />
          <em className="italic font-light text-magenta">Questions.</em>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-ink/65 leading-relaxed font-light">
          Clarity is the first step toward healing. Find detailed information regarding our admission protocols, insurance networks, and clinical practices below.
        </p>
      </header>

      {/* FAQ Accordion Section */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 md:pb-48 max-w-[1200px] mx-auto" data-reveal>
        <FAQAccordion items={faqs} />
      </section>

      {/* Embedded Contact / Still need help? */}
      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 bg-ink text-paper relative overflow-hidden" data-reveal>
         {/* Background Decor */}
         <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-tr from-magenta/30 to-transparent" />
            <div className="absolute -top-40 -right-40 size-[500px] rounded-full blur-[120px] bg-sky/20" />
         </div>

         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[1600px] mx-auto">
            <div>
              <h2 className="font-display text-4xl md:text-5xl italic font-light mb-6">Didn't find what you were looking for?</h2>
              <p className="text-paper/60 font-light text-lg mb-8 max-w-md">Our concierge team is available 24/7 to provide detailed answers to any specific medical or administrative queries you might have.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <a href="tel:+919999999999" className="border border-paper/20 px-8 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest text-paper hover:bg-white/5 transition-all text-center">
                Call Concierge
              </a>
              <a href="/contact" className="bg-magenta px-8 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest text-white hover:bg-pink transition-all text-center">
                Write to us
              </a>
            </div>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}
