import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
    <path
      d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.826 1.78 6.854L2 30l7.374-1.742A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z"
      fill="#25D366"
    />
    <path
      d="M22.93 19.474c-.306-.153-1.81-.893-2.09-.996-.28-.102-.484-.153-.687.153-.204.306-.79.996-.968 1.2-.178.204-.357.23-.663.077-.306-.154-1.293-.477-2.463-1.52-.91-.81-1.524-1.812-1.702-2.118-.178-.306-.019-.47.134-.623.137-.136.306-.357.459-.535.153-.178.204-.306.306-.51.102-.204.051-.382-.026-.535-.077-.153-.687-1.656-.941-2.268-.248-.595-.5-.514-.687-.524l-.586-.01c-.204 0-.535.077-.815.382-.28.306-1.07 1.045-1.07 2.549s1.096 2.958 1.249 3.162c.153.204 2.157 3.294 5.228 4.619.73.315 1.3.503 1.745.644.733.233 1.4.2 1.927.122.588-.088 1.81-.74 2.063-1.455.255-.714.255-1.326.178-1.455-.076-.128-.28-.204-.586-.357Z"
      fill="white"
    />
  </svg>
);

export function WhatsAppDirect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const ring1Ref = useRef<HTMLSpanElement>(null);
  const ring2Ref = useRef<HTMLSpanElement>(null);
  const ring3Ref = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  /* ── Entrance animation ─────────────────────────────────────── */
  useEffect(() => {
    if (!buttonRef.current) return;
    gsap.fromTo(
      buttonRef.current,
      { scale: 0, opacity: 0, rotate: -30 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1,
        delay: 1.5,
        ease: "elastic.out(1, 0.5)",
      }
    );
  }, []);

  /* ── Orbital ping rings ─────────────────────────────────────── */
  useEffect(() => {
    const rings = [ring1Ref.current, ring2Ref.current, ring3Ref.current];

    rings.forEach((ring, i) => {
      if (!ring) return;
      gsap.fromTo(
        ring,
        { scale: 1, opacity: 0.7 },
        {
          scale: 2.6,
          opacity: 0,
          duration: 2.2,
          delay: i * 0.7,
          ease: "power2.out",
          repeat: -1,
          repeatDelay: 0.2,
        }
      );
    });
  }, []);

  /* ── Magnetic hover effect ──────────────────────────────────── */
  useEffect(() => {
    const el = buttonRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const strength = 18;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1.2) {
        gsap.to(el, {
          x: dx * strength * 2,
          y: dy * strength * 2,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  /* ── Tooltip animation ──────────────────────────────────────── */
  useEffect(() => {
    const tip = tooltipRef.current;
    if (!tip) return;
    if (hovered) {
      gsap.fromTo(
        tip,
        { opacity: 0, x: 14, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.to(tip, { opacity: 0, x: 14, scale: 0.92, duration: 0.2, ease: "power2.in" });
    }
  }, [hovered]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 right-8 z-[9999] flex items-center justify-end"
      style={{ width: 72, height: 72 }}
    >
      {/* ── Tooltip ── */}
      <span
        ref={tooltipRef}
        style={{ opacity: 0, pointerEvents: "none" }}
        className="absolute right-[calc(100%+16px)] whitespace-nowrap bg-white text-[#0a0f1e] font-bold text-[0.65rem] tracking-[0.18em] uppercase px-4 py-2.5 rounded-full shadow-xl border border-[#25D366]/30 font-sans select-none"
      >
        Direct Connect
        <span className="ml-2 inline-block text-[#25D366] text-[0.8rem]">↗</span>
      </span>

      {/* ── Ping rings ── */}
      {[ring1Ref, ring2Ref, ring3Ref].map((ref, i) => (
        <span
          key={i}
          ref={ref}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="absolute inset-0 rounded-full border-2 border-[#25D366] pointer-events-none"
        />
      ))}

      {/* ── Main button ── */}
      <a
        ref={buttonRef}
        href="https://wa.me/918529219330?text=Hello%2C%20I%20would%20like%20to%20connect%20with%20Shree%20Kalyan%20Hospital."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          opacity: 0,
          position: "relative",
          width: 64,
          height: 64,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          border: "2.5px solid #25D366",
          boxShadow: hovered
            ? "0 0 0 6px rgba(37,211,102,0.15), 0 20px 50px -10px rgba(37,211,102,0.35)"
            : "0 0 0 3px rgba(37,211,102,0.1), 0 12px 32px -8px rgba(37,211,102,0.25)",
          transition: "box-shadow 0.4s ease",
          cursor: "pointer",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        {/* Inner shimmer sweep */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(37,211,102,0.12) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <WhatsAppIcon />
      </a>
    </div>
  );
}
