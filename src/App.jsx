import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Ads from "./pages/Ads";
import Rates from "./pages/Rates";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./site.css";

/* Old single-page links land on the page that now holds that section. */
const OLD = { projects: "/work", pricing: "/rates", skills: "/about", why: "/about", process: "/about" };

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="ads" element={<Ads />} />
        <Route path="rates" element={<Rates />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {Object.entries(OLD).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
