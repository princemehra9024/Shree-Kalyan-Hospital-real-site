import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function useGsapReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const ctx = gsap.context(() => {
      // Hero entrance - Cinematic character reveal
      const hasHero = document.querySelector("[data-anim='hero-title']");
      if (hasHero) {
        const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

        heroTl
          .fromTo("[data-anim='hero-eyebrow']", 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.3 }
          )
          .fromTo(
            "[data-anim='hero-title'] span",
            { yPercent: 120, skewY: 3, opacity: 0 },
            { yPercent: 0, skewY: 0, opacity: 1, duration: 1.5, stagger: 0.15 },
            "-=0.8"
          )
          .fromTo(
            "[data-anim='hero-cta']",
            { opacity: 0, scale: 0.5, rotate: -15 },
            { opacity: 1, scale: 1, rotate: 0, duration: 1.2 },
            "-=1.2"
          )
          .fromTo(
            "[data-anim='hero-stats']",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1 },
            "-=1"
          );
      }

      // Generic scroll reveal
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      // Stagger lists
      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
        const children = el.querySelectorAll(":scope > *");
        gsap.fromTo(children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }
        );
      });

      // Parallax images
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(el,
          { yPercent: 0 },
          {
            yPercent: -12,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);
}
