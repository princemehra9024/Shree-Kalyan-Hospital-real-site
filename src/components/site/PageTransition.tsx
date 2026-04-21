"use client";

import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import gsap from "gsap";

/**
 * Award-winning page transition:
 * ON ENTER  — two panels (top + bottom, navy & magenta) slide IN from off-screen,
 *             meet in the center, hold for a beat, then split open revealing the new page.
 * Triggered every time the route changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const top = topRef.current;
    const bot = botRef.current;
    const lbl = labelRef.current;
    if (!top || !bot || !lbl) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

    // Reset panels to closed-center position
    gsap.set(top, { yPercent: -100 });
    gsap.set(bot, { yPercent: 100 });
    gsap.set(lbl, { opacity: 0, y: 16, scale: 0.92 });

    // Phase 1: Slide panels to meet at center
    tl.to([top, bot], {
      yPercent: 0,
      duration: 0.75,
      stagger: 0,
    })

    // Phase 2: Fade-in the transition label
    .to(lbl, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.4, ease: "power3.out",
    }, "-=0.1")

    // Phase 3: Hold
    .to({}, { duration: 0.5 })

    // Phase 4: Fade label out
    .to(lbl, {
      opacity: 0, y: -10,
      duration: 0.3, ease: "power2.in",
    })

    // Phase 5: Split panels open
    .to(top, {
      yPercent: -100,
      duration: 0.85,
      ease: "expo.inOut",
    }, "-=0.1")
    .to(bot, {
      yPercent: 100,
      duration: 0.85,
      ease: "expo.inOut",
    }, "<");

    return () => { tl.kill(); };
  }, [location.pathname]);

  return (
    <>
      {/* Top panel — navy */}
      <div
        ref={topRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 h-1/2 bg-navy-deep z-[10000] pointer-events-none border-b border-magenta/30"
        style={{ transform: "translateY(-100%)" }}
      />

      {/* Bottom panel — magenta accent */}
      <div
        ref={botRef}
        aria-hidden="true"
        className="fixed inset-x-0 bottom-0 h-1/2 bg-navy-deep z-[10000] pointer-events-none border-t border-magenta/30"
        style={{ transform: "translateY(100%)" }}
      />

      {/* Center transition label */}
      <div
        ref={labelRef}
        aria-hidden="true"
        className="fixed inset-0 z-[10001] pointer-events-none flex flex-col items-center justify-center gap-3 opacity-0"
      >
        <span className="w-10 h-px bg-magenta block" />
        <span className="font-syne text-[0.6rem] uppercase tracking-[0.4em] font-bold text-magenta">
          Shree Kalyan Hospital
        </span>
        <span className="font-display italic text-paper text-3xl md:text-5xl mt-2">
          Loading
          <span className="animate-[ellipsis_1.4s_steps(4,end)_infinite]">...</span>
        </span>
      </div>

      {children}
    </>
  );
}
