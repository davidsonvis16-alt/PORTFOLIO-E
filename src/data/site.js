/* =========================================================================
   Eden. — site content
   Everything a human would want to edit lives in this file and projects.js.
   Nothing here is presentational; components read from it.
   ========================================================================= */

export const BRAND = {
  name: "Eden",
  label: "Digital Studio",
  location: "Nairobi · Kenya",
  availability: "Available for selected projects",
  year: 2026,
};

/* --- contact -------------------------------------------------------------
   These are the real, live channels. Do not replace with placeholders.      */
export const CONTACT = {
  whatsappNumber: "254142614743",
  instagram: "https://www.instagram.com/vinn_y.codr/",
  email: "davidson.vis.16@gmail.com",
  github: "https://github.com/davidsonvis16-alt",
};

/* Builds a WhatsApp deep link with a pre-filled, context-aware message. */
export function waLink(message) {
  const text = message || MESSAGES.general;
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const MESSAGES = {
  general: "Hi Eden, I'd like to discuss building a website for my business.",
  tier: (name, price) =>
    `Hi Eden, I'm interested in the ${name} package (${price}). Can we talk about what my business needs?`,
  project: (title) =>
    `Hi Eden, I saw ${title} on your site. I'd like something like this for my business.`,
  quote: "Hi Eden, I'd like a quote for my business. Here's what I have in mind:",
};

/* --- navigation ----------------------------------------------------------
   `id` doubles as the home-page section id and the stand-alone route path.  */
export const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "why", label: "Why", path: "/why" },
  { id: "process", label: "Process", path: "/process" },
  { id: "work", label: "Work", path: "/work" },
  { id: "skills", label: "Skills", path: "/skills" },
  { id: "pricing", label: "Pricing", path: "/pricing" },
];

/* --- trust band ----------------------------------------------------------
   Only verifiable facts and stated commitments. `count` animates on entry;
   everything else is qualitative on purpose — no invented metrics.          */
export const STATS = [
  {
    label: "Projects shipped",
    kind: "count",
    suffix: "",
    note: "Live sites for real businesses, not concepts.",
  },
  {
    label: "Performance",
    kind: "text",
    value: "Fast by design",
    note: "Built light, because most people here browse on mobile data.",
  },
  {
    label: "Client response",
    kind: "text",
    value: "Within 24h",
    note: "One person answers. Usually the same day.",
  },
  {
    label: "Focus",
    kind: "text",
    value: "Small business → digital product",
    note: "Restaurants, cafés, shops and growing local brands.",
  },
];

/* --- why a website ------------------------------------------------------ */
export const WHY = [
  {
    n: "01",
    title: "Be found",
    desc: "Your customers should be able to discover your business beyond social media — on a search, on a map, on a link someone forwards them.",
  },
  {
    n: "02",
    title: "Look trustworthy",
    desc: "A professional website gives your business a permanent digital home. People decide whether you are worth visiting long before they arrive.",
  },
  {
    n: "03",
    title: "Control your presence",
    desc: "Your website belongs to your business, not an algorithm. You decide what it says, how it looks, and who it speaks to.",
  },
  {
    n: "04",
    title: "Turn visitors into customers",
    desc: "Clear information, a visible way to get in touch and an obvious next step make it easier for people to actually do business with you.",
  },
];

/* --- process ------------------------------------------------------------ */
export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "Understand your business, your customers, and what the site actually needs to do.",
    deliverable: "Scope + quote",
  },
  {
    n: "02",
    title: "Design",
    desc: "A layout and look that fits the brand, reviewed with you before a line of code is written.",
    deliverable: "Design preview",
  },
  {
    n: "03",
    title: "Build",
    desc: "Fast, responsive code, tested on the kind of connection your customers actually use.",
    deliverable: "Staging link",
  },
  {
    n: "04",
    title: "Launch",
    desc: "Live, monitored, and handed over with everything you need to keep running it.",
    deliverable: "Live site + handover",
  },
];

/* --- capabilities -------------------------------------------------------
   Grounded in work that has actually shipped — see projects.js.            */
export const CAPABILITIES = [
  {
    title: "Business websites",
    desc: "The front door: who you are, what you sell, where to find you, and how to get in touch.",
  },
  {
    title: "Menus & ordering",
    desc: "Live menus and online ordering for restaurants and cafés, updated by your own team.",
  },
  {
    title: "Admin dashboards",
    desc: "A back office so the people running the business can change things without calling a developer.",
  },
  {
    title: "Listings & catalogues",
    desc: "Property, produce or product listings that stay quick to browse and easy to filter.",
  },
  {
    title: "Performance work",
    desc: "Light pages that hold up on mobile data, because that is how most customers arrive.",
  },
];

/* Two marquee rows. Only technologies actually used across these projects. */
export const STACK_ROW_ONE = [
  "React", "TypeScript", "Next.js", "JavaScript", "Tailwind CSS", "Supabase",
];
export const STACK_ROW_TWO = [
  "Vite", "HTML", "CSS", "Git", "Responsive Design",
];

/* --- pricing ------------------------------------------------------------ */
export const PRICING = [
  {
    name: "Landing Page",
    price: "KSh 15,000",
    note: "Starting at",
    desc: "One page. Right for a business that just needs to be found and trusted.",
    features: [
      "Single-page design",
      "Mobile responsive",
      "WhatsApp button built in",
      "3-day turnaround",
    ],
    featured: false,
  },
  {
    name: "Business Site",
    price: "KSh 30,000",
    note: "Starting at",
    desc: "For restaurants, spas and shops that need more than one page.",
    features: [
      "Up to 5 pages",
      "Custom design",
      "WhatsApp / M-Pesa integration",
      "1 round of revisions",
      "7-day turnaround",
    ],
    featured: true,
    flag: "Most booked",
  },
  {
    name: "Custom Build",
    price: "Let's talk",
    note: "Scoped per project",
    desc: "Booking systems, e-commerce, dashboards. Scoped around what you actually need.",
    features: [
      "Full custom scope",
      "Ongoing support available",
      "Timeline set per project",
    ],
    featured: false,
  },
];
