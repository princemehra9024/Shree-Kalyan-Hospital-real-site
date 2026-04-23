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
      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      heroTl
        .from("[data-anim='hero-eyebrow']", {
          opacity: 0,
          y: 20,
          duration: 1,
          delay: 0.3,
        })
        .from(
          "[data-anim='hero-title'] span",
          {
            yPercent: 120,
            skewY: 3,
            opacity: 0,
            duration: 1.5,
            stagger: 0.15,
          },
          "-=0.8",
        )
        .from(
          "[data-anim='hero-body']",
          {
            opacity: 0,
            y: 30,
            duration: 1.2,
          },
          "-=1.2",
        )
        .from(
          "[data-anim='hero-image']",
          {
            opacity: 0,
            scale: 1.05,
            duration: 1.5,
          },
          "-=1.5",
        )
        .from(
          "[data-anim='hero-badge']",
          {
            opacity: 0,
            y: 40,
            rotate: -5,
            duration: 1,
          },
          "-=1.1",
        );

      // Generic scroll reveal
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Stagger lists
      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
        const children = el.querySelectorAll(":scope > *");
        gsap.from(children, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });

      // Parallax images
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
