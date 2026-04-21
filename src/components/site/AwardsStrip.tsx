import { Link } from "@tanstack/react-router";

const ACCREDITATIONS = [
  { icon: "🏆", label: "NABH Accredited", sub: "National Accreditation Board" },
  { icon: "🎖️", label: "ISO 9001:2015", sub: "Quality Management" },
  { icon: "⚡", label: "24/7 Trauma Care", sub: "Level II Trauma Centre" },
  { icon: "🤝", label: "Cashless Care", sub: "500+ Insurance Partners" },
  { icon: "🌍", label: "International Patients", sub: "Multilingual Support" },
  { icon: "🔬", label: "NABL Lab", sub: "Accredited Diagnostics" },
  { icon: "🏅", label: "Top Hospital 2024", sub: "Times of India Award" },
  { icon: "💎", label: "CRISIL Rated", sub: "A+ Healthcare Quality" },
];

export function AwardsStrip() {
  return (
    <section className="bg-void border-y border-white/5 relative overflow-hidden py-10">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 blur-[80px] pointer-events-none"
        style={{ background: "rgba(224,24,94,0.12)" }}
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 mb-6">
        <p className="text-[0.6rem] font-syne font-bold uppercase tracking-[0.3em] text-white/25 flex items-center gap-3">
          <span className="size-1 rounded-full bg-magenta animate-live-pulse" />
          Certifications &amp; Recognition
        </p>
      </div>

      {/* Scrolling tape */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex gap-3 animate-marquee">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-stretch gap-3 shrink-0" aria-hidden={set === 1}>
              {ACCREDITATIONS.map((item) => (
                <div
                  key={`${set}-${item.label}`}
                  className="flex items-center gap-4 glass border border-white/6 px-6 py-4 shrink-0 group hover:border-magenta/30 transition-colors duration-500"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-[0.72rem] font-syne font-bold text-paper/90 tracking-wide leading-tight">
                      {item.label}
                    </p>
                    <p className="text-[0.58rem] font-syne text-paper/35 tracking-wider mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CTA at bottom */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 mt-6 flex items-center justify-between">
        <p className="text-[0.6rem] font-syne text-paper/20 uppercase tracking-widest">
          Kota's most trusted multi-speciality hospital
        </p>
        <Link
          to="/about"
          className="text-[0.6rem] font-syne font-bold uppercase tracking-widest text-magenta/60 hover:text-magenta transition-colors"
        >
          View All Accreditations →
        </Link>
      </div>
    </section>
  );
}
