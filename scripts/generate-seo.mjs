/**
 * Generates public/sitemap.xml and public/robots.txt from the route table.
 *
 * The one thing this script cannot know is where the site is deployed, so
 * set SITE_URL when you build:
 *
 *   SITE_URL=https://your-domain.co.ke npm run build
 *
 * On Vercel/Netlify, add SITE_URL as an environment variable once and every
 * deploy picks it up. The default below matches the repository name.
 */
import { writeFileSync } from "node:fs";
import { PROJECTS } from "../src/data/projects.js";

const SITE_URL = (process.env.SITE_URL || "https://portfolio-e.vercel.app").replace(/\/$/, "");

const ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/work", priority: "0.9" },
  { path: "/pricing", priority: "0.9" },
  { path: "/about", priority: "0.8" },
  { path: "/why", priority: "0.8" },
  { path: "/process", priority: "0.8" },
  { path: "/skills", priority: "0.7" },
  { path: "/contact", priority: "0.8" },
  ...PROJECTS.map((p) => ({ path: `/work/${p.slug}`, priority: "0.7" })),
];

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync("public/sitemap.xml", sitemap);
writeFileSync("public/robots.txt", robots);
console.log(`SEO files written for ${SITE_URL} (${ROUTES.length} routes)`);
