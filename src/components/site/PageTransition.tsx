"use client";

import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Reset scroll position on route change.
    // Lenis prevents native window.scrollTo, so we must use the lenis instance directly.
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  
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
