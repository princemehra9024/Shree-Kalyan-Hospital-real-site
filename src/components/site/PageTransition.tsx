"use client";

import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Page Entry Animation
    if (overlayRef.current) {
        gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut",
        });
    }
  }, [location.pathname]);

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-navy-deep z-[10000] pointer-events-none" 
        style={{ transform: 'translateY(0%)' }}
      />
      {children}
    </>
  );
}
