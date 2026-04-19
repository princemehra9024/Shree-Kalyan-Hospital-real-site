"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Instant small dot
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "none",
      });

      // Lagging follower circle
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);

    // Reusable listener for interactive elements
    const updateInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    updateInteractiveListeners();
    
    // Observer for dynamic content
    const observer = new MutationObserver(updateInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!followerRef.current || !cursorRef.current) return;

    if (isHovering) {
      gsap.to(followerRef.current, {
        scale: 2.5,
        backgroundColor: "rgba(235, 30, 77, 0.1)", // Magenta tint
        borderColor: "rgba(235, 30, 77, 0.5)",
        duration: 0.3,
      });
      gsap.to(cursorRef.current, {
        scale: 0.5,
        backgroundColor: "#EB1E4D",
        duration: 0.3,
      });
    } else {
      gsap.to(followerRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(26, 26, 26, 0.2)", // Ink tint
        duration: 0.3,
      });
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "#1a1a1a",
        duration: 0.3,
      });
    }
  }, [isHovering]);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-ink rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" 
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-ink/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block" 
      />
      <style>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
