import Hero from "../sections/Hero";
import Stats from "../sections/Stats";
import Work from "../sections/Work";
import Why from "../sections/Why";
import About from "../sections/About";
import Process from "../sections/Process";
import Capabilities from "../sections/Capabilities";
import Pricing from "../sections/Pricing";
import { useSeo } from "../lib/seo";

/** The long-form experience. Section order is the choreography. */
export default function Home() {
  useSeo({
    title: "Web design & development for small businesses in Nairobi & Nakuru",
    description:
      "Eden is a one-person digital studio building fast, modern websites for restaurants, cafés, shops and growing local brands in Nairobi and Nakuru.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <Stats />
      <Work />
      <hr className="rule" />
      <Why />
      <hr className="rule" />
      <About />
      <hr className="rule" />
      <Process />
      <hr className="rule" />
      <Capabilities />
      <hr className="rule" />
      <Pricing />
    </>
  );
}
