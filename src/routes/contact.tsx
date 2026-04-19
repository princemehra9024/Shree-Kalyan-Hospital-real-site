import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import exterior from "@/assets/hospital-exterior.jpg";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact · Shree Kalyan Hospital, Kota" },
      {
        name: "description",
        content:
          "Visit Shree Kalyan Hospital in Kota, Rajasthan. Walk-in OPD daily, 24/7 emergency triage, private consultations on appointment.",
      },
      { property: "og:title", content: "Contact · Shree Kalyan Hospital" },
      {
        property: "og:description",
        content: "Walk-in OPD daily. Emergency 24/7. Kota, Rajasthan.",
      },
      { property: "og:image", content: exterior },
      { name: "twitter:image", content: exterior },
    ],
  }),
});

function ContactPage() {
  useGsapReveal();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden pb-24 md:pb-0 selection:bg-magenta selection:text-white">
      <SiteNav />

      <PageHero
        chapter="Chapter IV"
        eyebrow="Visit"
        title={
          <>
            <span className="block italic text-magenta font-light -ml-4 pr-4">Begin</span>
            <span className="block ml-12 md:ml-32 mt-2">here.</span>
          </>
        }
        intro="Walk-in consultations daily. Emergency triage twenty-four hours. To schedule a private review with one of our consultants, leave a note below or call our admissions desk."
      />

      {/* Quick contact strips */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto border-t border-ink/10" data-reveal-stagger>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { label: "Admissions", value: "+91 99999 99999", href: "tel:+919999999999" },
            { label: "Emergency", value: "+91 88888 88888", href: "tel:+918888888888", accent: true },
            { label: "Email", value: "care@shreekalyan.in", href: "mailto:care@shreekalyan.in" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className={`group p-10 md:p-14 border-b md:border-b-0 md:border-r last:border-r-0 border-ink/10 transition-all duration-500 hover:bg-navy-deep ${c.accent ? "bg-magenta/5" : "bg-paper"}`}
            >
              <p className={`text-[0.65rem] tracking-[0.3em] font-bold mb-6 flex items-center gap-3 group-hover:text-magenta transition-colors ${c.accent ? "text-magenta" : "text-ink/40"}`}>
                {c.accent && <span className="size-2 rounded-full bg-magenta animate-pulse" />}
                {c.label}
              </p>
              <p className="font-display text-3xl md:text-5xl text-navy-deep tracking-tight group-hover:text-paper transition-colors">
                {c.value}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="px-6 md:px-12 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto border-t border-ink/10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-24">
          {/* Form */}
          <div className="col-span-12 lg:col-span-6" data-reveal>
            <p className="text-[0.65rem] font-bold tracking-[0.3em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" />
              Request Consultation
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-navy-deep leading-[0.85] tracking-tight mb-16">
              Tell us, <br/><span className="italic font-light text-magenta">briefly.</span>
            </h2>

            {submitted ? (
              <div className="border border-magenta/30 bg-magenta/5 p-10 md:p-16">
                <p className="font-display text-4xl text-navy-deep mb-4">Thank you.</p>
                <p className="text-xl text-ink/70 font-light">A care coordinator will reach you within one business day.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                  <Field label="Full name" name="name" required />
                  <Field label="Phone" name="phone" type="tel" required />
                </div>
                <Field label="Email" name="email" type="email" />
                <Field label="Specialty of interest" name="specialty" placeholder="Cardiology, Neurology, …" />
                <div>
                  <label className="block text-[0.65rem] tracking-[0.3em] font-bold text-magenta uppercase mb-4">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={4}
                    className="w-full bg-transparent border-b border-ink/20 focus:border-magenta focus:outline-none py-4 text-xl font-display text-ink placeholder:text-ink/20 transition-colors resize-none"
                    placeholder="A short description of your concern…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-navy-deep text-paper px-16 py-6 text-sm font-bold tracking-[0.3em] uppercase hover:bg-magenta transition-colors duration-500"
                >
                  Send Request
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-20" data-reveal-stagger>
            <div>
              <p className="text-[0.65rem] tracking-[0.3em] font-bold text-magenta uppercase mb-6 flex items-center gap-4">
                 <span className="w-8 h-px bg-magenta" /> Address
              </p>
              <p className="font-display text-3xl md:text-4xl text-navy-deep leading-tight">
                Shree Kalyan Hospital<br />
                Indraprastha Industrial Area<br />
                Kota, Rajasthan 324005
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] tracking-[0.3em] font-bold text-magenta uppercase mb-6 flex items-center gap-4">
                 <span className="w-8 h-px bg-magenta" /> OPD Hours
              </p>
              <p className="font-display text-3xl md:text-4xl text-navy-deep leading-tight">
                Mon – Sat<br />09:00 – 20:00
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] tracking-[0.3em] font-bold text-magenta uppercase mb-6 flex items-center gap-4">
                 <span className="w-8 h-px bg-magenta" /> Emergency
              </p>
              <p className="font-display text-3xl md:text-4xl text-navy-deep leading-tight">
                24 hours<br />Every day, all year
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Map / location image */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden border-t border-ink/10" data-reveal>
        <img
          src={exterior}
          alt="Shree Kalyan Hospital, Kota — exterior at golden hour"
          width={1280}
          height={896}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-in-out"
          data-parallax
        />
        <div className="absolute inset-0 bg-navy-deep/20" />
        <div className="absolute bottom-12 left-6 md:bottom-24 md:left-24 text-paper">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase font-bold text-magenta mb-4">Find us</p>
          <p className="font-display text-5xl md:text-8xl leading-none">Kota, <br/><span className="italic font-light opacity-80">Rajasthan</span></p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[0.65rem] tracking-[0.2em] uppercase text-ink/50 font-bold mb-3"
      >
        {label} {required && <span className="text-magenta">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-ink/20 focus:border-magenta focus:outline-none py-3 text-base font-display text-ink placeholder:text-ink/30 transition-colors"
      />
    </div>
  );
}
