import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/data/services";

/**
 * Dynamic server-side sitemap — served at /sitemap.xml
 * Mirrors public/sitemap.xml but is always generated fresh
 * with the current date and all registered service pages.
 */
export const Route = createFileRoute("/sitemap/xml")({
  loader: async () => {
    const baseUrl = "https://shreekalyanhospital.com";
    const today = new Date().toISOString().split("T")[0];

    // ── Primary pages ─────────────────────────────────────────────
    const primaryRoutes = [
      { path: "",                  priority: "1.0", changefreq: "weekly"  },
      { path: "/about",            priority: "0.9", changefreq: "monthly" },
      { path: "/services",         priority: "0.9", changefreq: "weekly"  },
      { path: "/appointments",     priority: "0.9", changefreq: "daily"   },
      { path: "/contact",          priority: "0.9", changefreq: "monthly" },
      { path: "/team",             priority: "0.8", changefreq: "monthly" },
      { path: "/facilities",       priority: "0.8", changefreq: "monthly" },
      { path: "/patient-care",     priority: "0.8", changefreq: "monthly" },
      { path: "/cancer-guidelines",priority: "0.8", changefreq: "monthly" },
      { path: "/faqs",             priority: "0.7", changefreq: "monthly" },
    ];

    // ── Service detail pages (auto-generated from data) ───────────
    const serviceRoutes = services.map((s) => ({
      path: `/services/${s.id}`,
      priority: "0.85",
      changefreq: "monthly",
    }));

    const allRoutes = [...primaryRoutes, ...serviceRoutes];

    const toUrl = (route: { path: string; priority: string; changefreq: string }) => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allRoutes.map(toUrl).join("")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
        "X-Robots-Tag": "noindex",
      },
    });
  },
});
