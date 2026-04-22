"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import gsap from "gsap";

const routeNames: Record<string, string> = {
  "/": "Welcome",
  "/team": "Our Team",
  "/facilities": "Facilities",
  "/patient-care": "Patient Care",
  "/contact": "Contact Us",
  "/about": "About Us"
};

/**
 * BespokeTransition:
 * A cinematic, radial clip-path transition.
 * Features:
 * 1. Double-layered iris reveal (Navy + Magenta).
 * 2. Dynamic typographic entrance showing the destination route.
 * 3. Parallax scale-in content reveal.
 */
export function BespokeTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const currentRouteName = routeNames[location.pathname] || "Shree Kalyan";

  useEffect(() => {
    const l1 = layer1Ref.current;
    const l2 = layer2Ref.current;
    const lbl = labelRef.current;
    const content = contentRef.current;
    if (!l1 || !l2 || !lbl || !content) return;

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onStart: () => {
        gsap.set(containerRef.current, { pointerEvents: "all" });
      },
      onComplete: () => {
        gsap.set(containerRef.current, { pointerEvents: "none" });
      }
    });

    // 1. Reset
    gsap.set([l1, l2], { clipPath: "circle(0% at 50% 50%)" });
    gsap.set(lbl.querySelectorAll("span"), { y: 20, opacity: 0 });
    
    // Hide the incoming content initially to prevent flashes before the overlay covers it
    gsap.set(content, { scale: 1.05, opacity: 0, filter: "blur(8px)" });

    // 2. Cover Phase (Inward)
    tl.to(l1, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 0.8,
    })
    .to(l2, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 0.8,
    }, "-=0.6")

    // 3. Label Entrance
    .to(lbl.querySelectorAll("span"), {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.3")

    // 4. Hold
    .to({}, { duration: 0.4 })

    // 5. Reveal Phase (Outward)
    .to(lbl.querySelectorAll("span"), {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in"
    })
    .to(l2, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.9,
    }, "-=0.1")
    .to(l1, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.9,
    }, "-=0.7")
    
    // 6. Content Parallax Reveal
    .to(content, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.9");

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <>
      <div 
        ref={containerRef}
        className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden"
      >
        {/* Layer 1: Navy Base */}
        <div 
          ref={layer1Ref}
          className="absolute inset-0 bg-navy-deep flex items-center justify-center"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        />
        
        {/* Layer 2: Magenta Accent */}
        <div 
          ref={layer2Ref}
          className="absolute inset-0 bg-paper flex items-center justify-center"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        >
          {/* Label Container within the top-most layer */}
          <div
            ref={labelRef}
            className="flex flex-col items-center gap-4 text-navy-deep"
          >
            <span className="w-12 h-px bg-magenta block" />
            <span className="font-syne text-[0.7rem] uppercase tracking-[0.5em] font-bold text-magenta">
              Navigating To
            </span>
            <span className="font-display italic text-4xl md:text-6xl tracking-tight">
              {currentRouteName}
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.3em] font-medium opacity-40">
              Shree Kalyan Hospital
            </span>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </>
  );
}
