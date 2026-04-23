import { Link } from "@tanstack/react-router";
import { MapBackground } from "./MapBackground";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative bg-navy-deep text-paper overflow-hidden border-t border-white/5">
      {/* Premium Map Layer */}
      <MapBackground />

      {/* Editorial Glass Veil — Subtly tints and blurs the map */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-transparent to-navy-deep/60 backdrop-blur-[1px] z-1 pointer-events-none" />

      <div className="relative z-10 max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-40">
        <div className="grid grid-cols-12 gap-x-8 gap-y-20">
          <div className="col-span-12 lg:col-span-12 mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div className="max-w-3xl">
                <p className="text-[0.7rem] tracking-[0.4em] uppercase text-pink font-semibold mb-10 flex items-center gap-6">
                  <span className="w-12 h-px bg-pink/40" />
                  Shree Kalyan Hospital
                </p>
                <h2 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter mb-12">
                  Precision care, <br />
                  <span className="italic font-light text-paper/90">in the heart of Kota.</span>
                </h2>
                <div className="flex flex-wrap gap-8 items-center">
                  <a
                    href="https://maps.app.goo.gl/YXY7rY7Z7Z7Z7Z7Z7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 hover:bg-paper hover:text-navy-deep transition-all duration-500 text-[0.7rem] tracking-[0.2em] uppercase font-bold"
                  >
                    Get Directions{" "}
                    <ArrowUpRight className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="hidden lg:block text-right">
                <p className="italic font-display text-paper/20 text-4xl max-w-[10ch] leading-none mb-4">
                  Clinical Excellence
                </p>
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-paper/20">
                  est. 2004 — Kota
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12 h-px bg-white/5 mb-8" />

          {/* Column structure for the rest */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-paper/30 mb-10">
              Directory
            </p>
            <ul className="space-y-4 text-base font-light text-paper/80">
              <li>
                <Link to="/" className="hover:text-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-pink transition-colors">
                  Physicians
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-pink transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-paper/50 mb-4">Reach</p>
            <ul className="space-y-2 text-sm text-paper/80">
              <li>
                <a href="tel:+918529219330" className="hover:text-magenta transition-colors">
                  +91 85292 19330
                </a>
              </li>
              <li>
                <a
                  href="mailto:care@shreekalyan.in"
                  className="hover:text-magenta transition-colors"
                >
                  care@shreekalyan.in
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3 lg:col-start-8">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-paper/30 mb-10">
              Facility Hours
            </p>
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <span className="text-sm font-light text-paper/60 uppercase tracking-widest">
                  OPD · Mon–Sat
                </span>
                <span className="text-sm font-medium">09:00 – 20:00</span>
              </div>
              <div className="flex justify-between items-center text-pink font-medium">
                <span className="text-sm uppercase tracking-[0.2em]">Emergency</span>
                <span className="text-sm px-3 py-1 rounded border border-pink/30">24 / 7</span>
              </div>
            </div>
          </div>

          {/* Global Footer Bottom */}
          <div className="col-span-12 mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
            <div className="space-y-4 text-[0.65rem] tracking-[0.3em] uppercase text-paper/30 leading-relaxed">
              <p className="text-paper/50">© {new Date().getFullYear()} Shree Kalyan Hospital</p>
              <p>Indraprastha Industrial Area, Kota, Rajasthan</p>
            </div>

            <div className="md:text-right">
              <p className="italic font-display lowercase tracking-normal text-paper/20 text-2xl lg:text-3xl mb-2">
                an editorial reimagining of clinical care
              </p>
              <p className="text-[0.55rem] tracking-[0.4em] uppercase text-paper/10 font-bold">
                Premium Healthcare Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
