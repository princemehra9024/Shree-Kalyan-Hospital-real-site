import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-paper">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-6">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-pink/80 mb-6">Shree Kalyan Hospital</p>
            <p className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight max-w-[18ch]">
              Quiet precision, <span className="italic font-light text-pink">since 2001.</span>
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-paper/50 mb-4">Visit</p>
            <ul className="space-y-2 text-sm text-paper/80">
              <li><Link to="/" className="hover:text-magenta transition-colors">Home</Link></li>
              <li><Link to="/team" className="hover:text-magenta transition-colors">Physicians</Link></li>
              <li><Link to="/contact" className="hover:text-magenta transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-paper/50 mb-4">Reach</p>
            <ul className="space-y-2 text-sm text-paper/80">
              <li><a href="tel:+918529219330" className="hover:text-magenta transition-colors">+91 85292 19330</a></li>
              <li><a href="mailto:care@shreekalyan.in" className="hover:text-magenta transition-colors">care@shreekalyan.in</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-paper/50 mb-4">Hours</p>
            <p className="text-sm text-paper/80 leading-relaxed">
              OPD · Mon–Sat<br />09:00–20:00<br />
              <span className="text-pink mt-2 inline-block">Emergency · 24/7</span>
            </p>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-paper/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[0.65rem] tracking-[0.2em] uppercase text-paper/50">
          <span>© {new Date().getFullYear()} Shree Kalyan Hospital · Kota, Rajasthan</span>
          <span>An editorial reimagining of clinical care</span>
        </div>
      </div>
    </footer>
  );
}
