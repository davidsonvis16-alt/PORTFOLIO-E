/* =========================================================================
   Eden. — project data
   ---------------------------------------------------------------------------
   HOW TO ADD A PROJECT
   Copy an entry, give it a unique `slug`, and drop screenshots in
   /public/work as <slug>-1600.webp, <slug>-1600.jpg, <slug>-800.webp,
   <slug>-800.jpg. Omit `image` and a typographic placeholder is used instead.

   `study` powers the case-study page (/work/<slug>). Every field is optional:
   only the blocks that exist are rendered, so leave a section out rather than
   filling it with something that is not true of the project.
   ========================================================================= */

export const PROJECTS = [
  {
    slug: "bakemart",
    title: "BakeMart Coffee House",
    client: "BakeMart",
    category: "Restaurant · Digital experience",
    summary: "A modern digital presence for a growing coffee house.",
    desc: "The only open-kitchen coffee shop in Nakuru — live site with full menu, ordering, and admin dashboard built on Supabase.",
    tech: ["React", "Supabase", "Tailwind"],
    live: "https://bakemart.co.ke",
    image: "bakemart",
    featured: true,
    study: {
      problem:
        "BakeMart is an open-kitchen coffee house in Nakuru. Everything that makes it worth visiting — the menu, the kitchen, the room — lived offline, with no digital home where people could look at the menu or place an order.",
      approach:
        "Treat the site as the front door. Menu first, ordering close behind, and a back office the team can run themselves without calling a developer every time a price changes.",
      build:
        "React on the front end, Supabase behind it for the menu, orders and the admin dashboard. Kept deliberately light so it holds up on a normal mobile connection.",
      result:
        "Live at bakemart.co.ke with the full menu, online ordering and an admin dashboard the team updates themselves.",
    },
  },
  {
    slug: "kijani-kafe",
    title: "Kijani Kafe",
    client: "Kijani Kafe",
    category: "Restaurant · Garden bar",
    summary: "A garden bar and restaurant, translated onto the screen.",
    desc: "A garden bar & restaurant in Milimani, Nakuru — built to carry the calm, slow-down feel of the place itself onto the screen.",
    tech: ["React", "Next.js", "Tailwind"],
    live: "https://kijani-kafe.vercel.app/",
    image: "kijani-kafe",
    featured: true,
    study: {
      problem:
        "A garden bar and restaurant in Milimani, Nakuru. The place is calm and unhurried by design, and a generic restaurant template would have communicated none of that.",
      approach:
        "Carry the feel of the room onto the screen: open space, quiet typography, and photography given room to breathe rather than crowded into a grid.",
      build:
        "Next.js and Tailwind, with a layout that stays composed from a phone in the garden to a laptop at home.",
      result:
        "A live site that reads like the place it represents rather than like a template.",
    },
  },
  {
    slug: "reality-homes",
    title: "Reality Homes",
    client: "Reality Homes",
    category: "Property · Listings",
    summary: "Property listings built for a weak connection.",
    desc: "Property listings that load fast on a weak connection, because that's how most people actually browse here.",
    tech: ["React", "Next.js", "Tailwind"],
    live: "https://rhomes.vercel.app/",
    image: "reality-homes",
    featured: false,
    study: {
      problem:
        "Property listings are heavy by nature — many images, a lot of filtering. On the connections most people here actually browse on, that turns into a blank screen.",
      approach:
        "Design for the slow case first. Fewer requests, smaller images, and a listing layout that is readable before everything has finished loading.",
      build:
        "Next.js and Tailwind, with images and listing pages kept deliberately light.",
      result: "Listings that load fast on a weak connection.",
    },
  },
  {
    slug: "beyond-fruits",
    title: "Beyond Fruits",
    client: "Beyond Fruits",
    category: "Retail · Groceries & delivery",
    summary: "A fresh produce shop with country-wide delivery.",
    desc: "A fresh fruits & groceries shop in Nairobi — built to showcase produce that travels from farm to door with country-wide home delivery, keeping the basket and the checkout fast even on a slow connection.",
    tech: ["React", "Vite", "Tailwind"],
    live: "https://beyond-taupe-one.vercel.app/",
    image: "beyond-fruits",
    featured: false,
    study: {
      problem:
        "A fresh fruit and grocery shop in Nairobi delivering countrywide. The produce has to look good on screen, and the basket has to stay quick or the order never gets placed.",
      approach:
        "Let the produce lead, then get out of the way — a short path from browsing to a filled basket and a checkout that does not stall.",
      build:
        "React and Vite with Tailwind, with the basket and checkout kept fast even on a slow connection.",
      result:
        "A live storefront showing produce that travels from farm to door, with country-wide home delivery.",
    },
  },
  {
    slug: "bridges",
    title: "Bridges",
    client: "Bridges",
    category: "Platform · Web app",
    summary: "A platform connecting people and resources.",
    desc: "A platform connecting people and resources — built to bridge gaps with a clean, fast interface.",
    tech: ["React", "Vite", "Tailwind"],
    live: "https://bridges-theta.vercel.app/",
    featured: false,
    // Case-study copy still to be written — the page falls back to the
    // overview and the live link until `study` is filled in.
    study: null,
  },
  {
    slug: "arrow",
    title: "Arrow",
    client: "Arrow",
    category: "Web · Interface",
    summary: "A sleek, fast web experience.",
    desc: "A sleek, fast web experience — built with precision and purpose.",
    tech: ["React", "Vite", "Tailwind"],
    live: "https://arrow-puce.vercel.app/",
    featured: false,
    study: null,
  },
  {
    slug: "dating-saas",
    title: "Dating SaaS",
    client: "In-house",
    category: "Product · In development",
    summary: "A matchmaking platform with real-time discovery and messaging.",
    desc: "A matchmaking platform with real-time discovery and messaging — currently in development.",
    tech: ["React", "TypeScript", "Tailwind"],
    status: "in-development",
    featured: false,
    study: null,
  },
];

/** Projects with a live URL — the honest definition of "shipped". */
export const SHIPPED = PROJECTS.filter((p) => p.live);

export const FEATURED = PROJECTS.filter((p) => p.featured);
export const REST = PROJECTS.filter((p) => !p.featured);

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}

/** Display index, 1-based and zero-padded: 01, 02, 03 … */
export function projectIndex(slug) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return String(i + 1).padStart(2, "0");
}

export function nextProject(slug) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return PROJECTS[(i + 1) % PROJECTS.length];
}

/** <picture> sources for a project screenshot in /public/work. */
export function imageSources(name) {
  return {
    webp: `/work/${name}-800.webp 800w, /work/${name}-1600.webp 1600w`,
    jpg: `/work/${name}-800.jpg 800w, /work/${name}-1600.jpg 1600w`,
    fallback: `/work/${name}-1600.jpg`,
  };
}
