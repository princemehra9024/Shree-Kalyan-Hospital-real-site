import { useState, useRef, useEffect, ImgHTMLAttributes } from "react";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** If true, skips lazy loading (use for above-the-fold/LCP images) */
  priority?: boolean;
  /** Extra classes for the wrapper div */
  wrapperClass?: string;
  /** Aspect ratio class applied to wrapper, e.g. "aspect-video" */
  aspect?: string;
}

/**
 * SmartImage — a drop-in replacement for <img> that provides:
 *  • Shimmer skeleton while loading
 *  • Smooth blur → sharp fade-in on load
 *  • Lazy loading (IntersectionObserver-backed)
 *  • GPU-composited rendering hints
 *  • Graceful error fallback
 */
export function SmartImage({
  src,
  alt = "",
  priority = false,
  className = "",
  wrapperClass = "",
  aspect,
  style,
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(priority); // priority images load immediately
  const imgRef = useRef<HTMLImageElement>(null);

  /* Intersection Observer for lazy loading */
  useEffect(() => {
    if (priority || inView) return;
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // start loading 200px before viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, inView]);

  /* If img was already cached/decoded, mark as loaded immediately */
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className={[
        "img-wrap",
        loaded ? "loaded" : "",
        aspect ?? "",
        wrapperClass,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      aria-hidden={!alt ? "true" : undefined}
    >
      {/* Shimmer is handled by .img-wrap::before CSS — no extra DOM node needed */}

      {error ? (
        /* Graceful error fallback */
        <div className="w-full h-full flex items-center justify-center bg-navy/5 text-ink/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4-4a3 3 0 014.243 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={inView ? src : undefined}
          alt={alt}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={[
            "w-full h-full object-cover",
            /* Smooth transition from blur to sharp */
            "transition-[opacity,filter,transform]",
            loaded
              ? "opacity-100 blur-none scale-100"
              : "opacity-0 blur-sm scale-[1.01]",
            /* Duration & easing */
            "duration-700 ease-out",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            willChange: "opacity, transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          {...props}
        />
      )}
    </div>
  );
}
