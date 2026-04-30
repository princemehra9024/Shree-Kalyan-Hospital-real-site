import { Link } from "@tanstack/react-router";
import exterior from "@/assets/hospital.png";

export function ContactPreview() {
  return (
    <section className="relative bg-navy-deep text-paper overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img
          src={exterior}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={1280}
          height={896}
          className="w-full h-full object-cover"
          data-parallax
        />
        <div className="absolute inset-0 bg-navy-deep/70" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-32 md:py-48">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <div className="col-span-12 lg:col-span-8" data-reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-pink uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-pink" />
              Chapter 04 — Visit
            </p>
            <h2 className="font-display text-6xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tight">
              Begin <span className="italic font-light text-pink">here.</span>
            </h2>
            <p className="mt-10 text-lg md:text-xl leading-relaxed text-paper/80 max-w-[44ch]">
              Walk-in consultations daily. Emergency triage 24 hours. To schedule a private review
              with one of our consultants, reach our admissions desk.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-magenta text-paper px-8 py-5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-pink transition-colors"
              >
                Request Consultation
                <span className="size-1.5 rounded-full bg-paper group-hover:scale-125 transition-transform" />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center justify-center gap-3 border border-paper/30 text-paper px-8 py-5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-paper hover:text-navy-deep transition-colors"
              >
                Meet Our Physicians
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
