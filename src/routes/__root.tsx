import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { LenisProvider } from "@/components/site/LenisProvider";
import { ScrollToTop } from "@/components/site/SiteNav";
import { CustomCursor } from "@/components/site/CustomCursor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { EmergencyOverlay } from "@/components/site/EmergencyOverlay";
import { useState, useEffect } from "react";
import { MapPin, ArrowRight, Compass } from "lucide-react";

const hospitalSchema = {
  "@context": "https://schema.org",
  "@type": ["Hospital", "MedicalOrganization", "LocalBusiness"],
  name: "Shree Kalyan Hospital",
  alternateName: ["Shree Kalyan Hospital Kota", "SKH Kota", "Best Hospital in Kota"],
  url: "https://shreekalyanhospital.com",
  logo: "https://shreekalyanhospital.com/favicon.svg",
  image: "https://shreekalyanhospital.com/og-image.jpg",
  description:
    "Shree Kalyan Hospital is the best multi-specialty hospital in Kota, Rajasthan, offering 24/7 emergency care, advanced cardiology, oncology, neurosciences, orthopaedics, critical ICU care, and surgical services. NABH accredited since 2001.",
  telephone: "+918529219330",
  email: "info@shreekalyan.in",
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Debit Card, Insurance, Cashless",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+918529219330",
      contactType: "emergency",
      availableLanguage: ["en", "hi"],
      contactOption: "TollFree",
      hoursAvailable: "Mo-Su 00:00-24:00",
    },
    {
      "@type": "ContactPoint",
      telephone: "+918529219330",
      contactType: "customer service",
      availableLanguage: ["en", "hi"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "80 Feet Link Road, R.K. Puram",
    addressLocality: "Kota",
    addressRegion: "Rajasthan",
    postalCode: "324005",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.1487",
    longitude: "75.8437",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  hasMap: "https://maps.google.com/?q=Shree+Kalyan+Hospital+Kota+Rajasthan",
  sameAs: [
    "https://www.facebook.com/shreekalyanhospital",
    "https://www.instagram.com/shreekalyanhospital",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1200",
    bestRating: "5",
    worstRating: "1",
  },
  medicalSpecialty: [
    "Cardiology",
    "Oncology",
    "Neurosciences",
    "Orthopaedics",
    "General Surgery",
    "Critical Care",
    "Obstetrics & Gynaecology",
    "Paediatrics",
    "Radiology",
    "Anaesthesiology",
  ],
  department: [
    { "@type": "MedicalClinic", name: "Cardiology Department — Shree Kalyan Hospital Kota" },
    { "@type": "MedicalClinic", name: "Oncology & Cancer Care — Shree Kalyan Hospital Kota" },
    { "@type": "MedicalClinic", name: "Neurosciences — Shree Kalyan Hospital Kota" },
    { "@type": "MedicalClinic", name: "ICU & Critical Care — Shree Kalyan Hospital Kota" },
    { "@type": "MedicalClinic", name: "Orthopaedics — Shree Kalyan Hospital Kota" },
  ],
  founder: {
    "@type": "Person",
    name: "Kapil Gautam",
    jobTitle: "Founder & Managing Director, Shree Kalyan Hospital",
  },
  numberOfBeds: 150,
  isAcceptingNewPatients: true,
  availableService: [
    { "@type": "MedicalTherapy", name: "24/7 Emergency Care" },
    { "@type": "MedicalTherapy", name: "Cardiac Surgery Kota" },
    { "@type": "MedicalTherapy", name: "Cancer Treatment Kota" },
    { "@type": "MedicalTherapy", name: "Robotic Surgery Kota" },
    { "@type": "MedicalTherapy", name: "ICU Critical Care Kota" },
    { "@type": "MedicalTherapy", name: "Cashless Insurance Treatment" },
  ],
  award: ["NABH Accredited Hospital", "ISO 9001:2015 Certified"],
  knowsAbout: [
    "Best hospital in Kota",
    "Multi-specialty hospital Kota Rajasthan",
    "Heart specialist Kota",
    "Cancer treatment Kota",
    "Emergency hospital Kota",
    "NABH hospital Kota",
  ],
};

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-6 selection:bg-magenta selection:text-white">
      <div className="max-w-2xl w-full text-left">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-navy-deep/5 rounded-full">
            <Compass className="size-6 text-navy-deep" />
          </div>
          <span className="text-[0.65rem] font-syne font-bold tracking-[0.4em] text-ink/30 uppercase">
            Error 404 — Directional Misalignment
          </span>
        </div>

        <h1 className="font-display text-6xl md:text-8xl text-navy-deep leading-[0.88] mb-8 tracking-tighter">
          This path leads <br />
          <em className="italic font-light text-magenta">elsewhere.</em>
        </h1>

        <p className="text-xl text-ink/60 font-light leading-relaxed mb-12 max-w-lg">
          The requested coordinate does not exist within our clinical network. We recommend
          returning to our primary portal for navigation.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/"
            className="bg-navy-deep text-paper px-12 py-6 text-[0.65rem] font-syne font-bold uppercase tracking-widest hover:bg-magenta transition-colors duration-500 inline-flex items-center gap-4 shadow-editorial"
          >
            Return to Portal
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="/contact"
            className="border border-navy/20 px-12 py-6 text-[0.65rem] font-syne font-bold uppercase tracking-widest text-ink/60 hover:border-navy hover:text-ink transition-all inline-flex items-center gap-4"
          >
            Contact Concierge
          </a>
        </div>

        {/* Decorative element */}
        <div className="mt-32 opacity-[0.03] pointer-events-none select-none">
          <h2 className="font-display text-[15vw] leading-none whitespace-nowrap">SHREE KALYAN</h2>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-paper flex items-center justify-center p-6 selection:bg-magenta selection:text-white">
      <div className="max-w-2xl w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-magenta/10 rounded-full">
            <MapPin className="size-6 text-magenta" />
          </div>
          <span className="text-[0.65rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase">
            System Encountered an Exception
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl text-navy-deep leading-[0.9] mb-8 tracking-tighter">
          Precision was <br />
          <em className="italic font-light text-magenta">interrupted.</em>
        </h1>

        <p className="text-xl text-ink/60 font-light leading-relaxed mb-12 max-w-lg">
          We encountered an unexpected technical issue. Please try refreshing or return to our
          homepage.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-navy-deep text-paper px-10 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest hover:bg-magenta transition-colors duration-500 inline-flex items-center gap-3"
          >
            <ArrowRight className="size-4" />
            Retry
          </button>
          <Link
            to="/"
            className="border border-navy/20 px-10 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest text-ink/60 hover:border-navy hover:text-ink transition-all inline-flex items-center gap-3"
          >
            Return Home
          </Link>
        </div>

        {import.meta.env.DEV && error && (
          <div className="mt-20 p-8 bg-secondary/50 border border-navy/5 rounded-lg overflow-hidden">
            <p className="text-[0.6rem] font-bold tracking-widest text-magenta uppercase mb-4">
              Developer Insight
            </p>
            <pre className="text-xs font-mono text-ink/70 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {error.toString()}
            </pre>
          </div>
        )}
      </div>
    </div>
  ),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Best Hospital in Kota | Shree Kalyan Hospital | NABH Accredited Multi-Specialty Care" },
      {
        name: "description",
        content:
          "Shree Kalyan Hospital Kota — NABH accredited, 150+ bed multi-specialty hospital. Expert care in Cardiology, Oncology, Neurosciences, ICU & Emergency. Serving Kota, Rajasthan since 2001.",
      },
      {
        name: "keywords",
        content:
          "best hospital in kota, hospital kota rajasthan, NABH hospital kota, multi specialty hospital kota, heart specialist kota, cancer treatment kota, neurology hospital kota, ICU hospital kota, 24 hour emergency hospital kota, shree kalyan hospital, top hospital kota, hospital near me kota, cardiology kota, oncology kota",
      },
      { name: "author", content: "Shree Kalyan Hospital, Kota" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "geo.region", content: "IN-RJ" },
      { name: "geo.placename", content: "Kota, Rajasthan, India" },
      { name: "geo.position", content: "25.1487;75.8437" },
      { name: "ICBM", content: "25.1487, 75.8437" },
      { property: "og:title", content: "Best Hospital in Kota | Shree Kalyan Hospital" },
      {
        property: "og:description",
        content: "NABH accredited multi-specialty hospital in Kota, Rajasthan. Expert Cardiology, Oncology, Neurosciences & 24/7 Emergency. Trusted since 2001.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shreekalyanhospital.com" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:site_name", content: "Shree Kalyan Hospital Kota" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@shreekalyan" },
      { name: "twitter:title", content: "Best Hospital in Kota | Shree Kalyan Hospital" },
      {
        name: "twitter:description",
        content: "NABH accredited multi-specialty hospital in Kota. 24/7 emergency, advanced Cardiology, Oncology & more.",
      },
      { name: "theme-color", content: "#03061a" },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "canonical", href: "https://shreekalyanhospital.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(hospitalSchema),
      },
    ],
  }),
});

function RootComponent() {
  const [queryClient] = useState(() => new QueryClient());
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  useEffect(() => {
    // Force scroll to top on reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const handleToggle = () => setEmergencyOpen(true);
    window.addEventListener("toggle-emergency", handleToggle);
    return () => window.removeEventListener("toggle-emergency", handleToggle);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LenisProvider>
        <CustomCursor />
        <Outlet />
        <ScrollToTop />
        <EmergencyOverlay isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
      </LenisProvider>
    </QueryClientProvider>
  );
}
