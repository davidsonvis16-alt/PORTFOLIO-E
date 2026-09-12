/* Stand-alone routes. Each renders the same section the home page uses, so
   there is exactly one implementation of every section on the site. */

import About from "../sections/About";
import Capabilities from "../sections/Capabilities";
import Pricing from "../sections/Pricing";
import Process from "../sections/Process";
import Why from "../sections/Why";
import Work from "../sections/Work";
import { useSeo } from "../lib/seo";

export function AboutPage() {
  useSeo({
    title: "About",
    description:
      "Eden is a one-person, self-taught digital studio in Kenya building websites for small businesses in Nairobi and Nakuru.",
    path: "/about",
  });
  return <About standalone />;
}

export function WhyPage() {
  useSeo({
    title: "Why your business needs a website",
    description:
      "Be found, look trustworthy, control your presence and turn visitors into customers — why a small business in Kenya needs a website of its own.",
    path: "/why",
  });
  return <Why standalone />;
}

export function ProcessPage() {
  useSeo({
    title: "Process",
    description:
      "Discover, design, build, launch. How a website project with Eden comes together, and what you get at each stage.",
    path: "/process",
  });
  return <Process standalone />;
}

export function WorkPage() {
  useSeo({
    title: "Selected work",
    description:
      "Live websites built for businesses in Nairobi and Nakuru — BakeMart Coffee House, Kijani Kafe, Reality Homes, Beyond Fruits and more.",
    path: "/work",
  });
  return <Work standalone />;
}

export function SkillsPage() {
  useSeo({
    title: "Capabilities",
    description:
      "Business websites, menus and ordering, admin dashboards and listings — built with React, Next.js, TypeScript, Tailwind CSS and Supabase.",
    path: "/skills",
  });
  return <Capabilities standalone />;
}

export function PricingPage() {
  useSeo({
    title: "Pricing",
    description:
      "Website pricing for small businesses in Kenya, starting at KSh 15,000 for a landing page and KSh 30,000 for a business site.",
    path: "/pricing",
  });
  return <Pricing standalone />;
}
