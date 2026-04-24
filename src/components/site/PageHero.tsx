import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PageHeroProps {
  chapter: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  image?: string;
}

export function PageHero({ chapter, eyebrow, title, intro, image }: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Awwwards-style sliding text animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-eyebrow span, .hero-eyebrow p", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      })
        .from(
          ".hero-title-wrap > *",
          {
            yPercent: 120, // Slide up from completely below
            skewY: 3, // signature typographic skew
            opacity: 0,
            duration: 1.4,
            stagger: 0.15,
          },
          "-=0.8",
        )
        .from(
          ".hero-intro",
          {
            y: 40,
            opacity: 0,
            duration: 1.2,
          },
          "-=1.1",
        );

      /* Parallax Image in Hero */
      if (image) {
        gsap.to(".hero-parallax-img", {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [title, image]);

  return (
    <header
      ref={containerRef}
      className="relative px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto pt-40 md:pt-56 pb-24 md:pb-32 bg-paper overflow-hidden"
    >
      {/* Background Parallax Element */}
      {image && (
        <div className="absolute top-0 right-0 w-[60%] md:w-[50%] h-full opacity-20 pointer-events-none mix-blend-soft-light overflow-hidden mask-image-b">
          <img
            src={image}
            className="hero-parallax-img w-full h-[130%] object-cover grayscale"
            alt="texture"
          />
        </div>
      )}

      <div className="relative z-10">
        <div className="hero-eyebrow flex items-center gap-4 mb-12 overflow-hidden">
          <span className="w-8 h-px bg-magenta block" />
          <p className="text-[0.65rem] font-bold tracking-[0.3em] text-magenta uppercase">
            {chapter} — {eyebrow}
          </p>
        </div>

        <h1 className="font-display text-[4rem] sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.85] text-navy-deep tracking-tight max-w-[14ch]">
          <div className="overflow-hidden pb-4 pt-6 -mt-6 px-4 -mx-4">
            <div className="hero-title-wrap">{title}</div>
          </div>
        </h1>

        {intro && (
          <div className="overflow-hidden mt-12 md:mt-20 ml-0 md:ml-32">
            <p className="hero-intro max-w-[48ch] text-lg md:text-xl leading-[1.8] text-ink/70 text-pretty font-light">
              {intro}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
