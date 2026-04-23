import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shree Kalyan Hospital · Kota — Quiet precision in modern healthcare" },
      { name: "description", content: "Shree Kalyan Hospital, Kota — an editorial sanctuary of advanced clinical care across cardiology, neurosciences, oncology and more." },
      { name: "author", content: "Shree Kalyan Hospital" },
      { property: "og:title", content: "Shree Kalyan Hospital · Kota" },
      { property: "og:description", content: "Quiet precision in modern healthcare. Kota, Rajasthan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@shreekalyan" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { LenisProvider } from "@/components/site/LenisProvider";
import { CustomCursor } from "@/components/site/CustomCursor";
import { PageTransition } from "@/components/site/PageTransition";
import { EmergencyOverlay } from "@/components/site/EmergencyOverlay";
import { useState, useEffect } from "react";

function RootComponent() {
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setEmergencyOpen(true);
    window.addEventListener("toggle-emergency", handleToggle);
    return () => window.removeEventListener("toggle-emergency", handleToggle);
  }, []);

  return (
    <LenisProvider>
      <CustomCursor />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <EmergencyOverlay 
        isOpen={emergencyOpen} 
        onClose={() => setEmergencyOpen(false)} 
      />
    </LenisProvider>
  );
}
