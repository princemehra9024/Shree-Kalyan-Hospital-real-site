import doctor from "@/assets/anjali-sharma.png";

export function Physicians() {
  return (
    <section
      id="physicians"
      className="px-6 md:px-12 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-16 items-center">
        <div className="col-span-12 lg:col-span-5 relative" data-reveal>
          <div className="overflow-hidden border border-ink/10 shadow-editorial">
            <img
              src={doctor}
              alt="Dr. Anjali Sharma, Senior Consultant"
              loading="lazy"
              width={900}
              height={1200}
              className="w-full aspect-[3/4] object-cover"
              data-parallax
            />
          </div>
          <div className="absolute -bottom-8 -right-6 md:-right-10 bg-magenta text-paper p-5 md:p-6 shadow-card max-w-[16rem]">
            <p className="font-display italic text-2xl md:text-3xl leading-tight">
              "Time, given honestly."
            </p>
            <p className="mt-3 text-[0.65rem] tracking-[0.2em] uppercase font-semibold opacity-90">
              Dr. Anjali Sharma
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7" data-reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-magenta uppercase mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-magenta" />
            Chapter 03 — Physicians
          </p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-navy-deep tracking-tight">
            Seventy-four <span className="italic font-light">named</span> consultants.
          </h2>
          <p className="mt-8 text-base md:text-lg leading-relaxed text-ink/75 max-w-prose">
            Care at Shree Kalyan is delivered, not dispatched. You meet the same physician at
            admission, review and discharge — never a shift, never a substitute.
          </p>

          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <div data-reveal>
              <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-ink/50">Consultants</dt>
              <dd className="mt-2 font-display text-4xl text-navy-deep">74</dd>
            </div>
            <div data-reveal>
              <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-ink/50">Beds</dt>
              <dd className="mt-2 font-display text-4xl text-navy-deep">220</dd>
            </div>
            <div data-reveal>
              <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-ink/50">Years</dt>
              <dd className="mt-2 font-display text-4xl text-magenta">25</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
