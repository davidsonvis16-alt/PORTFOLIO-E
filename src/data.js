/* All site content in one place. */

export const WHATSAPP_NUMBER = "254142614743";
export const INSTAGRAM = "https://www.instagram.com/vinn_y.codr/";
export const EMAIL = "davidson.vis.16@gmail.com";

/* Real client work — live sites in use by the people they were built for. Numbers stay hedged
   until they are actually measured; no invented precision. */
export const CASE_STUDIES = [
  {
    n: "01",
    client: "BakeMart Coffee House",
    place: "Nakuru",
    need: "The only open-kitchen coffee shop in Nakuru needed a menu customers could read before walking in, and orders they could take without a phone call.",
    constraint:
      "Menu and ordering run off one Supabase backend — the storefront had to stay quick while orders were landing in the same database mid-service.",
    spec: [
      ["STACK", "React · Supabase · Tailwind"],
      ["SCOPE", "Menu · Online ordering"],
      ["TARGET", "Usable on a 3-bar connection"],
      ["STATUS", "Live, in daily use"],
    ],
    img: "/work/bakemart.jpg",
    demo: "https://bakemart.co.ke",
    domain: "bakemart.co.ke",
  },
  {
    n: "02",
    client: "Global Mogul",
    place: "Founder & author site",
    need: "An entrepreneurs lab and its founder needed one home for everything they put out — the book, a reading list, talks, and a marketplace.",
    constraint:
      "Four very different jobs on one site. Each had to be easy to find from a phone without the whole thing turning into one long, heavy page on mobile data.",
    spec: [
      ["STACK", "React · TypeScript · Tailwind"],
      ["SCOPE", "Book · Reading list · Talks · Shop"],
      ["TARGET", "Usable on a 3-bar connection"],
      ["STATUS", "Live"],
    ],
    img: "/work/fidel.jpg",
    demo: "https://global-mogul.vercel.app/",
    domain: "global-mogul.vercel.app",
  },
  {
    n: "03",
    client: "Fidel Castrol",
    place: "Student coach · Homa Bay",
    need: "A student success coach needed one place to show his coaching record and start conversations — plus a page for the HubSpot study partners he is looking for.",
    constraint:
      "Two audiences on one small site: students and parents looking for coaching, and people learning HubSpot. Each gets its own page, its own WhatsApp message and a lead-score quiz, without a heavy app behind it.",
    spec: [
      ["STACK", "React · TypeScript · Tailwind"],
      ["SCOPE", "Coaching site · HubSpot page · Quiz"],
      ["TARGET", "Usable on a 3-bar connection"],
      ["STATUS", "Live, in use"],
    ],
    img: "/work/castrol.jpg",
    demo: "https://fidelc.vercel.app/",
    domain: "fidelc.vercel.app",
  },
];

/* Everything else — self-directed builds, not client engagements. Newest first. */
export const OTHER_BUILDS = [
  {
    title: "Cha Bao",
    group: "restaurant",
    tier: "custom",
    tierWhy: "online ordering, table bookings and a back-office admin",
    kind: "Asian bistro · Restaurant",
    desc: "Bao, dim sum and tea in Nairobi — order with M-Pesa, card or PayPal, book a table, and an admin for orders, cancellations and refunds.",
    stack: "React · TypeScript · Framer Motion",
    year: "2026",
    demo: "https://chabaokenya.vercel.app/",
    img: "/work/chabao.jpg",
  },
  {
    title: "Kahawa & Crumb",
    group: "cafe",
    tier: "custom",
    tierWhy: "full ordering, accounts, rewards and six ways to pay",
    kind: "Café · Food ordering",
    desc: "A Nairobi coffee house built like a fast-food app — customise any item, M-Pesa, Airtel or card checkout, Crumbs rewards and live order tracking.",
    stack: "React · Tailwind · Framer Motion",
    year: "2026",
    demo: "https://kahawa-xi.vercel.app/",
    img: "/work/kahawa.jpg",
  },
  {
    title: "Maison Kiatu",
    group: "shop",
    tier: "custom",
    tierWhy: "a stocked shop with a bag and WhatsApp ordering",
    kind: "Sneaker shop · E-commerce",
    desc: "Pre-owned sneakers in Kilimani — every pair cleaned and graded out of ten, ordered on WhatsApp and paid with M-Pesa.",
    stack: "React · Vite · React Router",
    year: "2026",
    demo: "https://shoeske.vercel.app/",
    img: "/work/kiatu.jpg",
  },
  {
    title: "Jave",
    group: "restaurant",
    tier: "custom",
    tierWhy: "online ordering and table bookings",
    kind: "Restaurant & grill",
    desc: "A fire-led grill in Nairobi — order online with M-Pesa or card, book a table, browse the menu.",
    stack: "React · Vite · Framer Motion",
    year: "2026",
    demo: "https://hotelke.vercel.app/",
    img: "/work/jave.jpg",
  },
  {
    title: "Eden Phones",
    group: "shop",
    tier: "custom",
    tierWhy: "M-Pesa checkout and instalment plans",
    kind: "Phone shop · E-commerce",
    desc: "Genuine and certified-refurbished phones in Nairobi — same-day delivery, M-Pesa, and Lipa Mdogo Mdogo instalments.",
    stack: "Next.js · TypeScript · Tailwind",
    year: "2026",
    demo: "https://phoneske-gamma.vercel.app/",
    img: "/work/phones.jpg",
  },
  {
    title: "Petal",
    group: "florist",
    tier: "custom",
    tierWhy: "bouquet builder, M-Pesa checkout, delivery cutoff",
    kind: "Florist · E-commerce",
    desc: "Same-day flower delivery across Nairobi — build-your-own bouquet, M-Pesa checkout, live delivery cutoff.",
    stack: "React · Vite",
    year: "2026",
    demo: "https://floristke.vercel.app/",
    img: "/work/petal.jpg",
  },
  {
    title: "Aldosi Merchants",
    group: "shop",
    tier: "business",
    tierWhy: "catalogue and brand pages, no checkout",
    kind: "Brand storefront",
    desc: "An editorial storefront for a Nairobi cooker brand — a lit-burner hero and a catalogue that reads like a magazine.",
    stack: "React · Tailwind · Framer Motion",
    year: "2026",
    demo: "https://aldosi-merchants.vercel.app/",
    img: "/work/aldosi.jpg",
  },
  {
    title: "Haven",
    group: "homes",
    tier: "custom",
    tierWhy: "property listings and viewing bookings",
    kind: "Real estate",
    desc: "A cinematic property site — full-bleed residences, listings and viewing bookings, no UI framework underneath.",
    stack: "React · TypeScript · Framer Motion",
    year: "2026",
    demo: "https://homeskenya.vercel.app/",
    img: "/work/haven.jpg",
  },
  {
    title: "Gadellaa Arts",
    group: "studio",
    tier: "custom",
    tierWhy: "session booking on top of the portfolio pages",
    kind: "Tattoo studio · Nyeri",
    desc: "A dark, type-led site for a tattoo studio — portfolio, prices, the artist, and session booking.",
    stack: "React · TypeScript · CSS Modules",
    year: "2026",
    demo: "https://gadella.vercel.app/",
    img: "/work/gadella.jpg",
  },
  {
    title: "Bridges",
    group: "platform",
    tier: "custom",
    tierWhy: "address search across cities and categories",
    kind: "Delivery platform",
    desc: "Food, groceries and pharmacy delivery across Kenyan cities — address-first search and category browsing.",
    stack: "React · TypeScript · Tailwind",
    year: "2026",
    demo: "https://bridges-theta.vercel.app/",
    img: "/work/bridges.jpg",
  },
  {
    title: "Arrow",
    group: "platform",
    tier: "custom",
    tierWhy: "mutual-interest matching and gated contact",
    kind: "Dating & discovery",
    desc: "Human-first discovery — a WhatsApp connection only unlocks after mutual interest, numbers never shown publicly.",
    stack: "React · TypeScript · Tailwind",
    year: "2026",
    demo: "https://arrow-puce.vercel.app/",
    img: "/work/arrow.jpg",
  },
  {
    title: "Kijani Kafe",
    group: "restaurant",
    tier: "business",
    tierWhy: "menu, story and location over a few pages",
    kind: "Garden bar · Restaurant",
    desc: "A garden bar and restaurant in Milimani, Nakuru — photography-led, but every image had to earn its weight on mobile data.",
    stack: "React · Next.js · Tailwind",
    year: "2026",
    demo: "https://kijani-kafe.vercel.app/",
    img: "/work/kijani.jpg",
  },
  {
    title: "Beyond Fruits",
    group: "shop",
    tier: "custom",
    tierWhy: "basket and checkout",
    kind: "Grocery · Delivery",
    desc: "Fresh produce with country-wide delivery — basket and checkout kept fast on mobile data.",
    stack: "React · Vite · Tailwind",
    year: "2026",
    demo: "https://beyond-taupe-one.vercel.app/",
    img: "/work/beyond.jpg",
  },
];

export const SKILLS = ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vite", "Framer Motion", "Git", "M-Pesa", "Responsive Design"];

/* End-of-year offer. Every plan: free hosting, 60% to start and 40% at launch. */
export const OFFER_ENDS = "31 December";
export const PRICING_TIERS = [
  {
    key: "landing",
    name: "Landing Page",
    was: "15,000",
    price: "10,000",
    monthly: "500",
    split: ["6,000", "4,000"],
    methods: "M-Pesa",
    tag: "Save KSh 5,000",
    perks: ["Free hosting"],
    blurb: "One sharp page that gets you found and gets you messaged.",
    plus: "WHAT YOU GET",
    features: ["1 page, single layout", "WhatsApp button", "Mobile-first, built for 3 bars", "3-day turnaround"],
    missing: ["No payments", "No extra pages"],
  },
  {
    key: "business",
    name: "Business Site",
    was: "30,000",
    price: "25,000",
    monthly: "1,000",
    split: ["15,000", "10,000"],
    methods: "M-Pesa or bank transfer",
    tag: "Save KSh 5,000",
    featured: true,
    perks: ["Free hosting"],
    blurb: "The full shopfront — menu, story, location and payments.",
    plus: "EVERYTHING IN LANDING, PLUS",
    features: ["Up to 5 pages", "Custom design, not a stock layout", "M-Pesa payments", "1 round of revisions", "7-day turnaround"],
    missing: ["No cart or checkout", "No bookings or accounts"],
  },
  {
    key: "custom",
    name: "Custom Build",
    price: "35,000",
    from: true,
    monthly: "2,000",
    split: ["21,000", "14,000"],
    methods: "M-Pesa or bank transfer",
    tag: "New price",
    perks: ["Free hosting", "Free domain"],
    blurb: "When the site has to run part of the business, not just describe it.",
    plus: "EVERYTHING IN BUSINESS, PLUS",
    features: ["Cart and M-Pesa checkout", "Bookings, search or listings", "Database behind the site", "Revisions scoped to the job", "Ongoing support"],
    missing: [],
  },
];

export const PAY_STEPS = [
  { n: "01", title: "Agree the scope", body: "Tell me what the business needs on WhatsApp. You get a fixed price before any work starts." },
  { n: "02", title: "Pay 60% to start", body: "The deposit books your slot and work begins the same week." },
  { n: "03", title: "Review and approve", body: "You see the design first, then the built site, and sign it off." },
  { n: "04", title: "Pay 40% at launch", body: "The balance is due when the site goes live — hosting included, free." },
];

export const TIER_NAME = { landing: "Landing Page", business: "Business Site", custom: "Custom Build" };

export const PROCESS_STEPS = [
  { n: "01", title: "Discover", desc: "Understand the business, the customers, and what the site actually has to do." },
  { n: "02", title: "Design", desc: "A layout reviewed with you before a line of code gets written." },
  { n: "03", title: "Build", desc: "Responsive code, tested on the kind of connection your customers actually use." },
  { n: "04", title: "Launch", desc: "Live, monitored, and handed over with everything you need to keep running it." },
];

export const WHY_POINTS = [
  {
    title: "Be found when you are closed",
    body: "Customers search before they buy. A site puts the menu, the hours and the location in front of them at 11pm, when nobody is answering the phone.",
  },
  {
    title: "Look like a real business",
    body: "A clean, quick site does the same job as a swept floor. People decide whether to trust you before they ever walk in.",
  },
  {
    title: "Own the channel",
    body: "Social feeds are rented and temporary. A site is yours — the message, the look, the customer list.",
  },
  {
    title: "Built for the connection here",
    body: "Most of your customers are on mobile data, often outside the good coverage. A heavy site loses them before it ever loads.",
  },
];

/* Only figures that can be pointed at. Two are counted from the work
   data; two are stated as targets because they have not been measured
   on a fixed rig yet. */
export const LIVE_COUNT = CASE_STUDIES.length + OTHER_BUILDS.filter((b) => b.demo?.startsWith("http")).length;
export const PROOF = [
  { value: CASE_STUDIES.length, label: "Clients", note: "sites live and in use" },
  { value: LIVE_COUNT, label: "Sites live", note: "client + self-directed" },
  { text: "< 2s", label: "Typical load, 3G", note: "target, not a lab figure" },
  { text: "< 2h", label: "Usual reply time", note: "WhatsApp, working hours" },
];

export const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* Phone-size screenshot of the same site. */
export const phone = (img) => img.replace("/work/", "/work/m/");

/* Pages, numbered like stops on a route. */
export const NAV = [
  { to: "/work", label: "Work" },
  { to: "/ads", label: "Ads" },
  { to: "/rates", label: "Rates" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/* Ad campaigns — concept work, not client engagements.
   Each piece: [file, headline, format]. Files live in /public/ads/<key>/,
   with a smaller copy in /s/ for the grid. */
export const AD_CAMPAIGNS = [
  {
    key: "stage46",
    n: "01",
    name: "Stage 46",
    sector: "Chicken & burgers · Nairobi",
    brief:
      "A chicken-and-burger joint dressed as a matatu route. Fares, tickets, receipts and stops — every post plays the same joke: the food is where you get off.",
    voice: "Loud, yellow, condensed. Hazard stripes and checker flags.",
    palette: ["#FFD23F", "#111111", "#E8322B", "#F3EEE4"],
    cover: "01-get-off-here",
    pieces: [
      ["01-get-off-here", "Get off here.", "Feed 4:5"],
      ["02-zero-overlapping", "Ice cold. Zero overlapping.", "Feed 4:5"],
      ["03-the-111-double-story", "The 111 Double.", "Story 9:16"],
      ["04-room-for-one-more", "Room for one more.", "Feed 4:5"],
      ["05-every-stop-billboard", "Every stop is a meal.", "Billboard 16:9"],
      ["06-end-of-the-line", "End of the line for thirst.", "Feed 4:5"],
      ["07-packed-like-the-8am-46", "Packed tighter than the 8am 46.", "Square 1:1"],
      ["08-built-stop-by-stop", "Built stop by stop.", "Feed 4:5"],
      ["09-sauce-up-to-the-elbow", "Sauce up to the elbow.", "Feed 4:5"],
      ["10-unwrap-the-111", "Unwrap.", "Feed 4:5"],
      ["11-crunch-hour", "Crunch hour.", "Feed 4:5"],
      ["12-its-raining-coke", "It's raining Coke.", "Feed 4:5"],
      ["13-your-fare-itemised", "Your fare, itemised.", "Feed 4:5"],
      ["14-messy-is-the-point", "Messy is the point.", "Feed 4:5"],
      ["15-classic-route-coke", "Burger. Chips. Coke.", "Feed 4:5"],
      ["16-chicken-meet-your-coke", "Chicken, meet your Coke.", "Feed 4:5"],
      ["17-fare-includes-coke", "Fare includes Coke.", "Feed 4:5"],
      ["logos", "Logo & sticker sheet", "Brand sheet"],
    ],
  },
  {
    key: "lineup",
    n: "02",
    name: "The Lineup",
    sector: "Barber club · Nairobi",
    brief:
      "A barbershop that sells precision. Black, cream and barber-pole blue, tight type, a price menu and a booking story with the Saturday slots laid out.",
    voice: "Sharp and dry. One blue word per headline.",
    palette: ["#111111", "#2B55FF", "#F3EEE4", "#E8322B"],
    cover: "01-sharp-is-a-habit",
    pieces: [
      ["01-sharp-is-a-habit", "Sharp is a habit.", "Feed 4:5"],
      ["02-set-a-ruler-by", "Lines you could set a ruler by.", "Feed 4:5"],
      ["03-tools-of-the-trade", "Tools of the trade.", "Feed 4:5"],
      ["04-walk-out-taller", "Walk in. Walk out taller.", "Feed 4:5"],
      ["05-the-menu", "The menu.", "Feed 4:5"],
      ["06-your-chair-billboard", "Your chair is waiting.", "Billboard 16:9"],
      ["07-beards-handled", "Beards, handled.", "Feed 4:5"],
      ["08-book-before-friday-story", "Book it before Friday.", "Story 9:16"],
      ["logos", "Logo sheet", "Brand sheet"],
    ],
  },
  {
    key: "latch",
    n: "03",
    name: "Latch Homes",
    sector: "Rentals · Nairobi",
    brief:
      "A rental agency that answers what tenants actually worry about — viewing fees, deposits, landlords, moving day. Serif headlines and warm light instead of shouting.",
    voice: "Calm and warm. Forest green, terracotta and ochre.",
    palette: ["#1F4A36", "#C8603A", "#C9A458", "#F3EEE4"],
    cover: "04-the-home-that-says-yes",
    pieces: [
      ["01-viewing-fee-zero", "Viewing fee: zero.", "Feed 4:5"],
      ["02-sunlight-included", "Sunlight included.", "Feed 4:5"],
      ["03-bedsitter-to-bungalow", "Bedsitter to bungalow.", "Feed 4:5"],
      ["04-the-home-that-says-yes", "The home that finally says yes.", "Feed 4:5"],
      ["05-landlord-but-nice", "Your landlord, but nice.", "Feed 4:5"],
      ["06-moving-day-no-drama", "Moving day, no drama.", "Feed 4:5"],
      ["07-this-weeks-home", "This week's home.", "Feed 4:5"],
      ["08-wake-up-billboard", "Wake up somewhere better.", "Billboard 16:9"],
      ["09-latch-after-dark", "Quiet streets. Warm lights.", "Feed 4:5"],
      ["logos", "Logo sheet", "Brand sheet"],
    ],
  },
];

export const AD_COUNT = AD_CAMPAIGNS.reduce((n, c) => n + c.pieces.length, 0);
export const adSrc = (key, file, small = false) => `/ads/${key}/${small ? "s/" : ""}${file}.webp`;

/* What a client gets — the route, stop by stop. */
export const SERVICES = [
  { n: "01", title: "Websites", body: "Landing pages to full shopfronts, built to load on mobile data." },
  { n: "02", title: "Ad campaigns", body: "Feed posts, stories and billboards with one idea running through them." },
  { n: "03", title: "Ordering & M-Pesa", body: "Menus, carts, bookings and checkout wired to how Kenya pays." },
  { n: "04", title: "Hosting & upkeep", body: "Free hosting on every plan, and a monthly fee that keeps it running." },
];

/* Ad design packages, priced the way design work is sold in Nairobi:
   per poster, as a monthly content plan, or as a one-off campaign.
   Same terms as the sites: 60% to start, 40% on delivery (monthly is paid
   up front each month). Ad spend on Meta/TikTok is never included.
   "eg" names the concept campaign built at that level. */
export const AD_TIERS = [
  {
    key: "single",
    name: "Single Poster",
    price: "2,000",
    unit: "per design",
    blurb: "One poster for one offer — a new item, a deal, an opening.",
    features: ["1 feed post or story", "Your logo and colours", "1 round of changes", "48-hour turnaround"],
  },
  {
    key: "monthly",
    name: "Monthly Content",
    price: "15,000",
    unit: "per month",
    blurb: "Your feed handled every month, so it never goes quiet.",
    features: ["12 feed posts + 4 stories a month", "One look across the whole month", "Planned with you at the start", "Cancel with a month's notice"],
  },
  {
    key: "campaign",
    name: "Brand Campaign",
    price: "20,000",
    unit: "one-off · up to 10 pieces",
    featured: true,
    blurb: "A full voice for the business — posts, stories and a billboard.",
    features: ["Feed posts and stories", "A billboard / banner size", "Logo sheet tidy-up", "2 rounds of changes", "7-day turnaround"],
    eg: ["The Lineup", "Latch Homes"],
  },
  {
    key: "full",
    name: "Full Campaign",
    price: "35,000",
    unit: "one-off · up to 18 pieces",
    blurb: "Everything for a launch — every format, stickers and a menu or price board.",
    features: ["Feed, story, square and billboard", "Logo and sticker sheet", "Menu, receipt or price-board post", "2 rounds of changes", "10-day turnaround"],
    eg: ["Stage 46"],
  },
];

export const AD_TERMS = "Ad spend on Instagram, Facebook or TikTok is paid by you, directly to the platform — it's never inside these prices.";
export const AD_BUNDLE = "Book a campaign with any website and take KSh 3,000 off the campaign.";
