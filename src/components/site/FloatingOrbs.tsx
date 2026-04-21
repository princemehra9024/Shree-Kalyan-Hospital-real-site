interface FloatingOrbsProps {
  variant?: "magenta" | "cyan" | "mixed";
  intensity?: "low" | "medium" | "high";
}

export function FloatingOrbs({ variant = "mixed", intensity = "medium" }: FloatingOrbsProps) {
  const opacityMap = { low: 0.06, medium: 0.12, high: 0.2 };
  const op = opacityMap[intensity];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large primary orb — top left */}
      {(variant === "magenta" || variant === "mixed") && (
        <div
          className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full blur-[160px] animate-float-slow"
          style={{ background: `rgba(224, 24, 94, ${op})` }}
        />
      )}

      {/* Medium cyan orb — right center */}
      {(variant === "cyan" || variant === "mixed") && (
        <div
          className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full blur-[130px] animate-float-medium"
          style={{ background: `rgba(6, 214, 245, ${op * 0.7})`, animationDelay: "-5s" }}
        />
      )}

      {/* Small gold accent orb — bottom center */}
      {variant === "mixed" && (
        <div
          className="absolute -bottom-16 left-1/3 w-[380px] h-[380px] rounded-full blur-[110px] animate-float-fast"
          style={{ background: `rgba(212, 168, 67, ${op * 0.55})`, animationDelay: "-9s" }}
        />
      )}

      {/* Tiny accent orb — mid-left */}
      <div
        className="absolute top-2/3 left-1/4 w-[220px] h-[220px] rounded-full blur-[90px] animate-float-slow"
        style={{ background: `rgba(244, 63, 144, ${op * 0.5})`, animationDelay: "-13s" }}
      />

      {/* Very subtle grid pattern */}
      <div className="absolute inset-0 grid-overlay opacity-100" />
    </div>
  );
}
