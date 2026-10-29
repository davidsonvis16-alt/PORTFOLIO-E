import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";

/* Home ships with the first load; every other page downloads when visited. */
const Work = lazy(() => import("./pages/Work"));
const Ads = lazy(() => import("./pages/Ads"));
const Rates = lazy(() => import("./pages/Rates"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
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
