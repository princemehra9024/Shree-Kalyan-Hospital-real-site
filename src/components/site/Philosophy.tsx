import surgical from "@/assets/surgical-theater.jpg";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="px-6 md:px-12 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-16 items-center">
        <div className="col-span-12 lg:col-span-5" data-reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-magenta uppercase mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-magenta" />
            Chapter 01 — Philosophy
          </p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-navy-deep tracking-tight">
            A hospital, <span className="italic font-light">reimagined</span> as a place of
            stillness.
          </h2>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7" data-reveal>
          <div className="overflow-hidden mb-10 shadow-editorial relative group">
            <img
              src={surgical}
              alt="Advanced surgical theater"
              loading="lazy"
              width={1280}
              height={896}
              className="w-full aspect-[4/3] object-cover transition-transform duration-[2s] group-hover:scale-110"
              data-parallax
            />
          </div>
          <p className="font-display text-xl md:text-3xl lg:text-4xl leading-relaxed text-ink/80 italic max-w-prose">
            "We refused the cold corridors of conventional medicine. Every surface, every angle,
            every instrument at Shree Kalyan was chosen so that recovery feels less like treatment
            and more like return."
          </p>
          <p className="mt-8 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-magenta flex items-center gap-4">
            <span className="w-4 h-px bg-magenta" />
            The founding intent, Kota, est. 2001
          </p>
        </div>
      </div>
    </section>
  );
}
