import { createFileRoute } from "@tanstack/react-router";

// This is a server-side route in TanStack Start
export const Route = createFileRoute("/sitemap/xml")({
  loader: async () => {
    const baseUrl = "https://shreekalyanhospital.com";
    
    // In a real app, you'd fetch dynamic routes (like services) from your DB/CMS
    const staticRoutes = [
      "",
      "/about",
      "/appointments",
      "/contact",
      "/facilities",
      "/faqs",
      "/patient-care",
      "/services",
      "/team",
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map((route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>`)
    .join("")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  },
});
