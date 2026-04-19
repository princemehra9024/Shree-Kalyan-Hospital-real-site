"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger
    // Importing gsap inside useEffect to avoid SSR issues if necessary
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);
        
        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value) {
            return arguments.length 
              ? lenis.scrollTo(value as number, { immediate: true }) 
              : lenis.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
        });
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
