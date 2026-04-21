import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram, Linkedin, Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const navItems = [
  { to: "/" as const, label: "Home", num: "01" },
  { to: "/about" as const, label: "About Us", num: "02" },
  { to: "/services" as const, label: "Services", num: "03" },
  { to: "/team" as const, label: "Team", num: "04" },
  { to: "/appointments" as const, label: "Appointments", num: "05" },
  { to: "/patient-care" as const, label: "Patient Care", num: "06" },
  { to: "/faqs" as const, label: "FAQs", num: "07" },
  { to: "/contact" as const, label: "Contact", num: "08" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

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
    if (open) {
      gsap.set(drawerRef.current, { display: "flex" });
      gsap.fromTo(
        drawerRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.6, ease: "power4.out" }
      );
      gsap.fromTo(
        drawerRef.current.querySelectorAll("[data-drawer-item]"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.15 }
      );
    } else {
      gsap.to(drawerRef.current, {
        y: "-100%",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          if (drawerRef.current) drawerRef.current.style.display = "none";
        },
      });
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

            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
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
                aria-label="Call emergency"
                className="md:hidden flex items-center justify-center size-9 rounded-full bg-magenta/15 border border-magenta/30 text-magenta hover:bg-magenta hover:text-white transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                  <path d="M3 3h4l1.5 4-2 1.5a11 11 0 005 5L13 11l4 1.5V17a1 1 0 01-1 1C7 18 2 13 2 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Mobile Burger */}
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="md:hidden relative size-9 flex items-center justify-center hover:text-magenta transition-colors text-paper"
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
        className="fixed inset-0 z-[60] bg-navy-deep text-paper flex-col px-6 pt-6 pb-12 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-16">
           <span className="text-[0.65rem] tracking-[0.25em] uppercase text-magenta font-bold">Menu</span>
           <button
             onClick={() => setOpen(false)}
             aria-label="Close menu"
             className="size-12 rounded-full border border-paper/20 text-paper hover:bg-magenta hover:border-magenta transition-colors flex items-center justify-center"
           >
             <X className="size-5" />
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

        <div data-drawer-item className="mt-12 grid grid-cols-2 gap-4 text-[0.65rem] tracking-[0.2em] uppercase">
           <a
             href="tel:+918888888888"
             className="bg-magenta text-paper px-5 py-4 text-center font-bold rounded-full"
           >
             Emergency 24/7
           </a>
           <a
             href="mailto:care@shreekalyan.in"
             className="border border-paper/30 text-paper px-5 py-4 text-center font-bold rounded-full"
           >
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

