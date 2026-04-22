import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { LenisProvider } from "@/components/site/LenisProvider";
import { CustomCursor } from "@/components/site/CustomCursor";
import { BespokeTransition } from "@/components/site/BespokeTransition";
import { EmergencyOverlay } from "@/components/site/EmergencyOverlay";
import { useState, useEffect } from "react";

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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
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
    <LenisProvider>
      <CustomCursor />
      <BespokeTransition>
        <Outlet />
      </BespokeTransition>
      <EmergencyOverlay
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />
    </LenisProvider>
  );
}
