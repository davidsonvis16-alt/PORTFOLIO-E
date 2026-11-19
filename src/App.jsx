import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";

/* Home ships with the first load; every other page downloads when visited.
   After a new deploy, a phone that still has the old site open asks for
   files that no longer exist — then reload once to get the new site,
   instead of a white screen. */
const page = (load) =>
  lazy(() =>
    load()
      .then((m) => {
        sessionStorage.removeItem("tessy-reloaded");
        return m;
      })
      .catch((err) => {
        if (!sessionStorage.getItem("tessy-reloaded")) {
          sessionStorage.setItem("tessy-reloaded", "1");
          window.location.reload();
          return new Promise(() => {});
        }
        throw err;
      })
  );
const Work = page(() => import("./pages/Work"));
const Ads = page(() => import("./pages/Ads"));
const Rates = page(() => import("./pages/Rates"));
const About = page(() => import("./pages/About"));
const Contact = page(() => import("./pages/Contact"));
const Order = page(() => import("./pages/Order"));
const Pay = page(() => import("./pages/Pay"));
const Login = page(() => import("./pages/Login"));
const Account = page(() => import("./pages/Account"));
import "./site.css";

/* Older links land on the page or section that now holds them. */
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
        <Route path="order" element={<Order />} />
        <Route path="pay" element={<Pay />} />
        <Route path="login" element={<Login />} />
        <Route path="account" element={<Account />} />
        {Object.entries(OLD).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
