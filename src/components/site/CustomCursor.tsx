"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorState = "default" | "hover" | "click" | "text";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const pos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* ── Mouse move — dot is instant, ring lags ── */
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "none",
        overwrite: "auto",
      });

      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    /* ── Press states ── */
    const onDown = () => setCursorState("click");
    const onUp = () => setCursorState("default");

    /* ── Hide when leaving window ── */
    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    /* ── Interactive element detection ── */
    const attach = () => {
      const links = document.querySelectorAll<HTMLElement>(
        'a, button, [role="button"], label[for], summary'
      );
      const inputs = document.querySelectorAll<HTMLElement>(
        "input, textarea, select, [contenteditable]"
      );

      links.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          const tip = el.getAttribute("data-cursor") || "";
          setLabel(tip);
          setCursorState("hover");
        });
        el.addEventListener("mouseleave", () => {
          setLabel("");
          setCursorState("default");
        });
      });

      inputs.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorState("text"));
        el.addEventListener("mouseleave", () => setCursorState("default"));
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
    };
  }, []);

  /* ── Animate ring based on state ── */
  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    if (cursorState === "hover") {
      gsap.to(ring, {
        width: 56,
        height: 56,
        borderColor: "rgba(190,24,93,1)",
        backgroundColor: "rgba(190,24,93,0.08)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, {
        width: 6,
        height: 6,
        backgroundColor: "#be185d",
        duration: 0.2,
      });
    } else if (cursorState === "click") {
      gsap.to(ring, {
        width: 36,
        height: 36,
        backgroundColor: "rgba(190,24,93,0.25)",
        duration: 0.15,
        ease: "power3.out",
      });
      gsap.to(dot, {
        width: 10,
        height: 10,
        backgroundColor: "#be185d",
        duration: 0.1,
      });
    } else if (cursorState === "text") {
      gsap.to(ring, {
        width: 4,
        height: 28,
        borderRadius: 2,
        borderColor: "rgba(190,24,93,0.8)",
        backgroundColor: "rgba(190,24,93,0.15)",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(dot, {
        width: 0,
        height: 0,
        duration: 0.2,
      });
    } else {
      // default
      gsap.to(ring, {
        width: 40,
        height: 40,
        borderRadius: "50%",
        borderColor: "rgba(15,23,42,0.55)",
        backgroundColor: "transparent",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(dot, {
        width: 8,
        height: 8,
        backgroundColor: "#0f172a",
        duration: 0.2,
      });
    }
  }, [cursorState]);

  return (
    <>
      {/* ── Outer ring (lagging) ── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(15,23,42,0.55)",
          backgroundColor: "transparent",
          /* Subtle drop shadow so it's always visible */
          filter: "drop-shadow(0 0 6px rgba(190,24,93,0.18))",
          willChange: "transform",
        }}
      >
        {/* Optional label inside ring on hover */}
        {label && (
          <span
            ref={labelRef}
            className="text-[0.42rem] font-black uppercase tracking-[0.18em] text-magenta whitespace-nowrap select-none"
          >
            {label}
          </span>
        )}
      </div>

      {/* ── Inner dot (instant) ── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        style={{
          width: 8,
          height: 8,
          backgroundColor: "#0f172a",
          boxShadow: "0 0 0 1.5px rgba(255,255,255,0.55), 0 2px 8px rgba(0,0,0,0.25)",
          willChange: "transform",
        }}
      />

      {/* ── Hide native cursor ── */}
      <style>{`
        @media (min-width: 768px) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
