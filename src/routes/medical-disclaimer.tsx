import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AlertCircle, Scale, ShieldCheck, Bot, Network } from "lucide-react";

export const Route = createFileRoute("/medical-disclaimer")({
  component: MedicalDisclaimerPage,
  head: () => ({
    meta: [
      { title: "Medical Disclaimer · Shree Kalyan Hospital" },
      {
        name: "description",
        content: "Important medical and legal disclaimers regarding the information provided on the Shree Kalyan Hospital website.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});

function MedicalDisclaimerPage() {
  return (
    <div className="bg-paper text-ink font-sans min-h-screen selection:bg-magenta selection:text-white flex flex-col">
      <SiteNav />

      {/* Hero Section */}
      <section className="pt-40 md:pt-56 pb-20 md:pb-32 px-6 md:px-12 lg:px-24 bg-navy-deep text-paper relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-[0.6rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase mb-8 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-magenta" /> Legal & Compliance
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-8 text-paper">
            Medical <em className="italic font-light text-paper/50">Disclaimer.</em>
          </h1>
          <p className="text-paper/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Please read these terms carefully. The information provided on this platform is for educational purposes and does not substitute professional medical diagnosis or treatment.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 flex-1">
        <div className="max-w-3xl mx-auto space-y-16">
          
          {/* Block 1 */}
          <div className="flex gap-6 md:gap-10 items-start">
            <div className="size-12 shrink-0 rounded-full border border-navy/10 flex items-center justify-center">
              <AlertCircle className="size-5 text-magenta" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-navy-deep mb-4">
                Informational Purposes Only
              </h2>
              <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg">
                The content on this website, including text, graphics, images, and other materials, is provided for general informational and educational purposes only. It is <strong>not intended</strong> to be a substitute for professional medical advice, diagnosis, or treatment. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
              </p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex gap-6 md:gap-10 items-start">
            <div className="size-12 shrink-0 rounded-full border border-navy/10 flex items-center justify-center">
              <ShieldCheck className="size-5 text-magenta" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-navy-deep mb-4">
                No Doctor-Patient Relationship
              </h2>
              <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg">
                Use of this website, including submitting forms, booking appointments, or interacting with our content, does not establish a doctor-patient relationship between you and Shree Kalyan Hospital or any of its physicians. A formal doctor-patient relationship is only established through an in-person consultation and clinical examination.
              </p>
            </div>
          </div>

          {/* Block 3 */}
          <div className="flex gap-6 md:gap-10 items-start">
            <div className="size-12 shrink-0 rounded-full border border-navy/10 flex items-center justify-center">
              <Scale className="size-5 text-magenta" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-navy-deep mb-4">
                Accuracy & Misinformation Liability
              </h2>
              <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg mb-4">
                While Shree Kalyan Hospital strives to keep the information on this website accurate and up-to-date, medical knowledge changes rapidly. We make no representations or warranties, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on the website.
              </p>
              <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg">
                We disclaim all liability for any actions taken or not taken based on the contents of this site. Users are solely responsible for verifying any medical or clinical information with an authorized healthcare professional.
              </p>
            </div>
          </div>

          {/* Block 4: AI Content */}
          <div className="flex gap-6 md:gap-10 items-start bg-navy-deep/5 p-6 md:p-8 rounded-2xl border border-navy-deep/10">
            <div className="size-12 shrink-0 rounded-full bg-white shadow-sm border border-navy/10 flex items-center justify-center">
              <Bot className="size-5 text-magenta" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-navy-deep mb-4">
                AI-Assisted Content & Media
              </h2>
              <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg mb-4">
                <strong className="font-medium text-navy-deep">Notice:</strong> Some textual content, structural layouts, and visual media (images) on this website may have been generated, enhanced, or assisted by Artificial Intelligence (AI) technologies. These elements are utilized for illustrative and design purposes to simulate the hospital's environment and service offerings.
              </p>
              <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg">
                Images and descriptions may not always represent exact, real-world facilities or specific clinical outcomes at Shree Kalyan Hospital. They should not be relied upon as factual representations or guarantees of infrastructure or medical results.
              </p>
            </div>
          </div>

          {/* Block 5: Third Party Services / Tie-ups */}
          <div className="flex gap-6 md:gap-10 items-start bg-magenta/5 p-6 md:p-8 rounded-2xl border border-magenta/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/10 rounded-full blur-3xl pointer-events-none" />
            <div className="size-12 shrink-0 rounded-full bg-white shadow-sm border border-magenta/20 flex items-center justify-center relative z-10">
              <Network className="size-5 text-magenta" />
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-2xl md:text-3xl text-navy-deep mb-4">
                Third-Party Services & Affiliations
              </h2>
              <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg mb-4">
                Certain specialized treatments, diagnostic procedures, or advanced medical facilities mentioned on this website may not be directly available in-house at Shree Kalyan Hospital. In such instances, these services are provided through strategic tie-ups, referrals, and partnerships with other authorized healthcare providers, laboratories, and specialized hospitals.
              </p>
              <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg mb-4">
                Shree Kalyan Hospital acts solely as a facilitator or referring entity for these external services. We bear <strong className="text-magenta font-semibold tracking-wide">NO LEGAL LIABILITY</strong> for the outcomes, quality of care, or medical incidents that may occur at partner facilities. Patients enter into a separate agreement with the third-party providers for such external services.
              </p>
              <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg">
                By using this website, you acknowledge and agree that Shree Kalyan Hospital, its doctors, and its staff cannot be sued or held legally responsible for services rendered by third-party affiliates, nor for any discrepancies between the services listed on this site and those provided in reality.
              </p>
            </div>
          </div>

          <div className="border-t border-navy/10 pt-16 mt-16 text-center">
            <p className="text-[0.65rem] font-syne font-bold uppercase tracking-widest text-ink/40 mb-4">
              Medical Emergencies
            </p>
            <p className="text-lg md:text-xl font-display text-navy-deep leading-tight max-w-lg mx-auto">
              If you think you may have a medical emergency, call emergency services or visit the nearest hospital emergency room immediately.
            </p>
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
