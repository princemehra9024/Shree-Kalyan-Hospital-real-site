interface MarqueeProps {
  items: string[];
  variant?: "navy" | "paper";
  speed?: "slow" | "fast";
}

export function Marquee({ items, variant = "navy", speed = "slow" }: MarqueeProps) {
  const isNavy = variant === "navy";
  return (
    <div
      className={`w-full overflow-hidden flex whitespace-nowrap py-5 border-y ${
        isNavy ? "bg-navy-deep text-paper border-paper/10" : "bg-paper text-navy-deep border-ink/10"
      }`}
    >
      <div className={`flex items-center ${speed === "fast" ? "animate-marquee-fast" : "animate-marquee"}`}>
        {[0, 1].map((set) => (
          <div key={set} className="flex items-center gap-8 mx-4 shrink-0" aria-hidden={set === 1}>
            {items.map((item, i) => (
              <span key={`${set}-${i}`} className="flex items-center gap-8">
                <span
                  className={`font-display text-2xl md:text-4xl italic tracking-wide ${
                    i % 2 === 1 ? "opacity-50" : ""
                  }`}
                >
                  {item}
                </span>
                <span className="size-1.5 rounded-full bg-magenta shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
