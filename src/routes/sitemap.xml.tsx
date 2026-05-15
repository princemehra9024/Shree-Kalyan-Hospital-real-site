import { createFileRoute } from "@tanstack/react-router";

// This is a server-side route in TanStack Start
export const Route = createFileRoute("/sitemap/xml")({
  loader: async () => {
    const baseUrl = "https://shreekalyanhospital.com";
    const today = new Date().toISOString().split("T")[0];

    // Pages with their SEO priority and change frequency
    const routes = [
      { path: "",            priority: "1.0", changefreq: "weekly"  },
      { path: "/about",      priority: "0.9", changefreq: "monthly" },
      { path: "/services",   priority: "0.9", changefreq: "weekly"  },
      { path: "/appointments", priority: "0.9", changefreq: "daily" },
      { path: "/contact",    priority: "0.9", changefreq: "monthly" },
      { path: "/team",       priority: "0.8", changefreq: "monthly" },
      { path: "/facilities", priority: "0.8", changefreq: "monthly" },
      { path: "/patient-care", priority: "0.8", changefreq: "monthly" },
      { path: "/faqs",       priority: "0.7", changefreq: "monthly" },
      { path: "/cancer-guidelines", priority: "0.8", changefreq: "monthly" },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400",
      },
    });
  },
});
