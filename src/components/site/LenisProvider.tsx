"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Duration of the scroll animation — 1.2 feels premium without lag
      duration: 1.2,
      // Custom cubic easing — fluid deceleration like high-end interfaces
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // Tuned multipliers — fast enough to feel responsive, slow enough to feel smooth
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      // Prevent overscroll bounce that can feel jarring
      overscroll: false,
    });

    // Scroll to top on every mount
    lenis.scrollTo(0, { immediate: true });

    // Expose globally so SiteNav and other components can call lenis.stop() / lenis.start()
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker (v1.x: ticker gives seconds → multiply by 1000 for ms)
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    // Disable lag smoothing so Lenis gets perfect frame timing
    gsap.ticker.lagSmoothing(0);

    // Handle mobile menu: stop/start Lenis when lenis-stopped class is toggled
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("lenis-stopped")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      gsap.ticker.remove(update);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
