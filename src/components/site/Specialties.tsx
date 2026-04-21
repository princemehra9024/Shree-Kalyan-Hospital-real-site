const specialties = [
  { num: "I",   title: "Cardiology",    body: "Interventional procedures and chronic care across our 32-bed cardiac unit." },
  { num: "II",  title: "Neurosciences", body: "Stroke response, epilepsy and movement disorder programs led by senior neurologists." },
  { num: "III", title: "Oncology",      body: "Targeted therapy and surgical oncology informed by molecular diagnostics." },
  { num: "IV",  title: "Orthopedics",   body: "Joint replacement, sports medicine and reconstructive trauma surgery." },
  { num: "V",   title: "Mother & Child",body: "Obstetrics, neonatal ICU and pediatric specialists under one quiet roof." },
  { num: "VI",  title: "Critical Care", body: "Multi-disciplinary ICU with 24-hour intensivist coverage and trauma triage." },
];

export function Specialties() {
  return (
    <section id="specialties" className="bg-secondary px-6 md:px-12 lg:px-24 py-32 md:py-48">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-x-6 mb-20" data-reveal>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-magenta uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" />
              Chapter 02 — Centers of Care
            </p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-navy-deep tracking-tight">
              Six institutes. <span className="italic font-light">One promise.</span>
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-5 lg:col-start-8 self-end text-base md:text-lg leading-relaxed text-ink/75 max-w-prose">
            Each specialty operates as its own institute — with dedicated leadership, protocols and
            outcomes — so depth is never traded for breadth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-ink/15" data-reveal-stagger>
          {specialties.map((s) => (
            <article
              key={s.title}
              className="group relative border-b border-ink/15 md:border-r last:border-b-0 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(2n)]:border-r p-8 md:p-12 transition-colors hover:bg-paper cursor-default"
            >
              <span className="font-display italic text-magenta text-sm tracking-widest">{s.num}</span>
              <h3 className="mt-6 font-display text-3xl md:text-4xl text-navy-deep leading-tight">
                {s.title}
              </h3>
              <p className="mt-4 text-sm md:text-base text-ink/70 leading-relaxed max-w-[36ch]">
                {s.body}
              </p>
              <span className="absolute bottom-8 right-8 size-2 rounded-full bg-magenta opacity-0 group-hover:opacity-100 transition-opacity" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
