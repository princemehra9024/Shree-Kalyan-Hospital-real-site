import wardImg from "@/assets/ward-skh.jpg";
import corridorImg from "@/assets/corridor-skh.jpg";
import icuImg from "@/assets/icu-skh.jpg";
import otImg from "@/assets/lab-skh.jpg";

const specialties = [
  {
    num: "I",
    title: "Cardiology",
    body: "Interventional procedures and chronic care across our 32-bed cardiac unit.",
    img: wardImg,
  },
  {
    num: "II",
    title: "Neurosciences",
    body: "Stroke response, epilepsy and movement disorder programs led by senior neurologists.",
    img: corridorImg,
  },
  {
    num: "III",
    title: "Oncology",
    body: "Targeted therapy and surgical oncology informed by molecular diagnostics.",
    img: icuImg,
  },
  {
    num: "IV",
    title: "Critical Care",
    body: "Multi-disciplinary ICU with 24-hour intensivist coverage and trauma triage.",
    img: otImg,
  },
];

export function Specialties() {
  return (
    <section id="specialties" className="bg-secondary px-6 md:px-12 lg:px-24 pt-16 pb-10 md:pt-20 md:pb-16">
      <div className="max-w-[1600px] mx-auto">

        {/* ── Header + Description — single unified frame ── */}
        <div
          className="border border-ink/15 p-8 md:p-12 mb-6 grid grid-cols-12 gap-x-6 gap-y-6"
          data-reveal
        >
          <div className="col-span-12 lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-magenta uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" />
              Chapter 02 — Centers of Care
            </p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-navy-deep tracking-tight">
              Four institutes. <span className="italic font-light">One promise.</span>
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-5 lg:col-start-8 self-end text-base md:text-lg leading-relaxed text-ink/75 max-w-prose">
            Each specialty operates as its own institute — with dedicated leadership, protocols and
            outcomes — so depth is never traded for breadth.
          </p>
        </div>

        {/* ── Individual framed specialty cards (2×2 grid) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-reveal-stagger>
          {specialties.map((s) => (
            <article
              key={s.title}
              className="group border border-ink/15 overflow-hidden hover:border-magenta transition-colors duration-500 cursor-default"
            >
              {/* Image frame */}
              <div className="relative h-52 md:h-64 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                <span className="absolute top-6 left-6 font-display italic text-magenta text-sm tracking-widest">
                  {s.num}
                </span>
              </div>

              {/* Text content */}
              <div className="p-8 md:p-10">
                <h3 className="font-display text-3xl md:text-4xl text-navy-deep leading-tight mb-4">
                  {s.title}
                </h3>
                <p className="text-sm md:text-base text-ink/70 leading-relaxed max-w-[40ch]">
                  {s.body}
                </p>
                <span className="mt-6 inline-block size-2 rounded-full bg-magenta opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
