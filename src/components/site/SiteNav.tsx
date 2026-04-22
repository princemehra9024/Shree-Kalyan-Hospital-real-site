import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram, Linkedin, Menu, X, AlertTriangle } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const navItems = [
  { to: "/" as const, label: "Home", num: "01" },
  { to: "/about" as const, label: "About Us", num: "02" },
  { to: "/services" as const, label: "Services", num: "03" },
  { to: "/facilities" as const, label: "Facilities", num: "04" },
  { to: "/team" as const, label: "Team", num: "05" },
  { to: "/appointments" as const, label: "Appointments", num: "06" },
  { to: "/patient-care" as const, label: "Patient Care", num: "07" },
  { to: "/faqs" as const, label: "FAQs", num: "08" },
  { to: "/contact" as const, label: "Contact", num: "09" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  // Scroll locking for mobile menu
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // For Lenis compatibility
      document.body.classList.add("lenis-stopped");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("lenis-stopped");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("lenis-stopped");
    };
  }, [open]);

  // ESC key for drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hover indicator that slides between links
  const moveIndicatorTo = (el: HTMLElement | null) => {
    if (!el || !indicatorRef.current || !navRef.current) return;
    const navBox = navRef.current.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    gsap.to(indicatorRef.current, {
      x: box.left - navBox.left,
      width: box.width,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };
  const hideIndicator = () => {
    if (!indicatorRef.current) return;
    gsap.to(indicatorRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
  };

  // Drawer open/close animation
  useEffect(() => {
    if (!drawerRef.current) return;

    // Calculate reveal origin (center of burger button)
    let origin = "90% 10%"; // Default fallback
    if (burgerRef.current) {
      const rect = burgerRef.current.getBoundingClientRect();
      const centerX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
      const centerY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
      origin = `${centerX}% ${centerY}%`;
    }

    if (open) {
      const tl = gsap.timeline();
      
      gsap.set(drawerRef.current, { 
        display: "flex",
        clipPath: `circle(0% at ${origin})` 
      });

      tl.to(drawerRef.current, {
        clipPath: `circle(150% at ${origin})`,
        duration: 0.9,
        ease: "expo.inOut"
      });

      tl.fromTo(
        drawerRef.current.querySelectorAll("[data-drawer-item]"),
        { y: 60, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08, ease: "power4.out" },
        "-=0.5" // Start while the circle is still expanding
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          if (drawerRef.current) gsap.set(drawerRef.current, { display: "none" });
        }
      });

      tl.to(drawerRef.current.querySelectorAll("[data-drawer-item]"), {
        y: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.in"
      });

      tl.to(drawerRef.current, {
        clipPath: `circle(0% at ${origin})`,
        duration: 0.7,
        ease: "expo.inOut"
      }, "-=0.2");
    }
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex bg-transparent drop-shadow-md">
        {/* Huge Left Logo Block Container */}
        <div
          className={`bg-magenta flex items-center justify-center shrink-0 w-32 md:w-64 transition-all duration-500 z-10 shadow-[4px_0_15px_rgba(0,0,0,0.15)] relative
          ${scrolled ? "h-16 md:h-20" : "h-24 md:h-[128px]"}`}
        >
          <Link
            to="/"
            aria-label="Shree Kalyan Hospital home"
            className="group flex flex-col items-center gap-2"
            onMouseLeave={hideIndicator}
          >
            <span
              className={`block rounded-full bg-paper border-2 border-paper shadow-card overflow-hidden transition-[width,height] duration-500 ease-out 
                ${scrolled ? "size-10 md:size-14" : "size-14 md:size-20"}`}
            >
              <img
                src={logo}
                alt="Shree Kalyan Hospital"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </span>
          </Link>

          {/* Right angled pointing element overlapping the bottom nav to match image effect if desired, omitted for simple square right edge */}
        </div>
        
        {/* Right side containers */}
        <div className="flex flex-col flex-1">
          {/* TOP TIER: Contact info & Social icons */}
          <div
            className={`hidden md:flex bg-navy-deep items-stretch transition-all duration-500 overflow-hidden ${
              scrolled ? "h-0 opacity-0" : "h-12 opacity-100"
            }`}
          >
            {/* White Contact Section with Slanted Edge */}
            <div className="bg-paper flex items-center px-8 gap-8 [clip-path:polygon(0_0,100%_0,calc(100%-2rem)_100%,0_100%)] pr-16 text-[0.65rem] tracking-wider uppercase font-bold text-ink">
              <button 
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(new CustomEvent("toggle-emergency"));
                }}
                className="flex items-center gap-2 text-magenta hover:bg-magenta hover:text-white px-3 py-1 -ml-3 rounded transition-colors"
              >
                <AlertTriangle className="size-3.5" /> Emergency
              </button>
              <a href="tel:8529219330" className="flex items-center gap-2 hover:text-magenta transition-colors">
                <Phone className="size-3.5 text-magenta" /> +91 85292 19330
              </a>
              <a href="mailto:info@shreekalyan.in" className="flex items-center gap-2 hover:text-magenta transition-colors">
                <Mail className="size-3.5 text-magenta" /> info@shreekalyan.in
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="size-3.5 text-magenta" /> 80 Feet Link Road Kota
              </span>
            </div>

            {/* Dark Social Icons Section */}
            <div className="flex-1 flex items-center justify-end px-8 gap-4 text-paper">
              <a href="#" className="hover:text-magenta transition-colors"><Facebook className="size-4" /></a>
              <a href="#" className="hover:text-magenta transition-colors"><Youtube className="size-4" /></a>
              <a href="#" className="hover:text-magenta transition-colors"><Instagram className="size-4" /></a>
              <a href="#" className="hover:text-magenta transition-colors"><Linkedin className="size-4" /></a>
            </div>
          </div>

          {/* BOTTOM TIER: Main Navigation */}
          <div
            className={`flex-1 bg-navy-deep/95 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 border-b border-ink/10 transition-all duration-500 
            ${scrolled ? "h-16 md:h-20" : "h-16 md:h-20"}`}
          >
            {/* Mobile: Hospital name — hidden on desktop */}
            <Link
              to="/"
              className="flex flex-col md:hidden leading-tight"
              aria-label="Shree Kalyan Hospital home"
            >
              <span className="text-paper font-bold text-[0.95rem] tracking-wide leading-tight">
                Shree Kalyan
              </span>
              <span className="text-magenta text-[0.62rem] font-bold uppercase tracking-[0.22em] leading-tight">
                Hospital · Kota
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              ref={navRef}
              onMouseLeave={hideIndicator}
              className="relative hidden md:flex items-center gap-1 flex-nowrap"
            >
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-9 rounded-full bg-magenta/10 border border-magenta/20 opacity-0 pointer-events-none"
                style={{ width: 0 }}
              />
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: true }}
                  onMouseEnter={(e) => moveIndicatorTo(e.currentTarget)}
                  activeProps={{ className: "text-magenta" }}
                  className="relative z-10 group flex items-center gap-2 px-3 py-2 text-[0.65rem] font-bold tracking-[0.15em] uppercase text-paper hover:text-magenta transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
              {/* Mobile Quick Actions */}
              <div className="flex md:hidden items-center gap-2">
                {/* Emergency Icon */}
                <button
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new CustomEvent("toggle-emergency"));
                  }}
                  aria-label="Emergency"
                  className="size-10 rounded-full flex items-center justify-center bg-magenta text-paper shadow-lg shadow-magenta/20 active:scale-90 transition-all border border-magenta/20"
                >
                  <AlertTriangle className="size-5" />
                  <span className="absolute -top-1 -right-1 size-3 bg-paper rounded-full flex items-center justify-center">
                    <span className="size-1.5 bg-magenta rounded-full animate-pulse" />
                  </span>
                </button>

                {/* WhatsApp Icon */}
                <a
                  href="https://wa.me/918529219330"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="size-10 rounded-full flex items-center justify-center bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 active:scale-90 transition-all border border-[#25D366]/20"
                >
                  <WhatsAppIcon className="size-5" />
                </a>
              </div>
              {/* Desktop Enquiry CTA */}
              <Link
                to="/contact"
                className="hidden lg:flex bg-magenta text-paper px-6 py-3.5 text-[0.7rem] font-bold tracking-[0.2em] uppercase hover:bg-magenta/80 transition-colors shrink-0 group items-center gap-2"
              >
                ENQUIRY FOR VISIT
                <span className="font-display italic text-[1.1rem] opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all">↗</span>
              </Link>

              {/* Mobile: quick call button */}
              <a
                href="tel:+918529219330"
                aria-label="Call us"
                className="md:hidden flex items-center justify-center size-9 rounded-full bg-magenta/15 border border-magenta/30 text-magenta hover:bg-magenta hover:text-white transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                  <path d="M3 3h4l1.5 4-2 1.5a11 11 0 005 5L13 11l4 1.5V17a1 1 0 01-1 1C7 18 2 13 2 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Mobile Burger */}
              <button
                ref={burgerRef}
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="md:hidden relative size-10 rounded-full flex flex-col items-center justify-center gap-1.5 hover:text-magenta transition-colors text-paper bg-ink/10 backdrop-blur-md border border-paper/10"
              >
                <Menu className="size-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress bar attached to bottom of header */}
        <ScrollProgress />
      </header>

      {/* Mobile fullscreen drawer */}
      <div
        ref={drawerRef}
        style={{ display: "none" }}
        data-lenis-prevent
        className="fixed inset-0 z-[60] bg-navy-deep text-paper flex-col px-6 pt-6 pb-12 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-16">
           <span className="text-[0.65rem] tracking-[0.25em] uppercase text-magenta font-bold">Menu</span>
           <button
             onClick={() => setOpen(false)}
             aria-label="Close menu"
             className="px-6 h-14 rounded-full border border-paper/20 bg-paper/5 backdrop-blur-md text-paper hover:bg-magenta hover:text-white hover:border-magenta transition-all flex items-center gap-3 group active:scale-95"
           >
             <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase">Close</span>
             <X className="size-5 transition-transform group-hover:rotate-90" />
           </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center gap-2">
           {navItems.map((item) => (
             <Link
               key={item.to}
               to={item.to}
               onClick={() => setOpen(false)}
               activeOptions={{ exact: true }}
               activeProps={{ className: "text-magenta" }}
               data-drawer-item
               className="group flex items-baseline justify-between border-b border-paper/15 py-6 text-paper hover:text-magenta transition-colors"
             >
               <span className="flex items-baseline gap-4">
                 <span className="font-display italic text-magenta/70 text-base">{item.num}</span>
                 <span className="font-display text-4xl tracking-tight">{item.label}</span>
               </span>
               <span className="font-display italic text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
             </Link>
           ))}
        </nav>

        <div data-drawer-item className="mt-12 space-y-4 text-[0.65rem] tracking-[0.2em] uppercase">
           <a
             href="mailto:care@shreekalyan.in"
             className="flex w-full items-center justify-center gap-3 bg-magenta text-paper px-5 py-5 text-center font-bold rounded-full shadow-lg shadow-magenta/20 hover:bg-magenta/90 transition-colors"
           >
             <Mail className="size-4" />
             Email Us
           </a>
        </div>
      </div>
    </>
  );
}

function ScrollProgress() {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      ref.current.style.transform = `scaleX(${pct / 100})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <span className="absolute left-0 right-0 bottom-0 h-px bg-magenta/15 overflow-hidden z-20">
      <span
        ref={ref}
        className="block h-full w-full bg-magenta origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </span>
  );
}

