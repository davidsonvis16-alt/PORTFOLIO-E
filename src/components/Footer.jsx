import { Link } from "react-router-dom";
import { BRAND, CONTACT, MESSAGES, NAV_ITEMS, waLink } from "../data/site";
import {
  ArrowUpRight,
  GitHubIcon,
  InstagramIcon,
  LogoMark,
  MailIcon,
  WhatsAppIcon,
} from "./icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="brand">
              <LogoMark size={26} tone="light" />
              <span>
                {BRAND.name}
                <span className="brand__dot">.</span>
              </span>
            </span>
            <p className="footer__tagline">
              A one-person digital studio building fast, modern websites for
              businesses in Nairobi and Nakuru.
            </p>
            <span className="status status--dark">
              <span className="status__dot" />
              {BRAND.availability}
            </span>
          </div>

          <div className="footer__col">
            <h3 className="mono mono--dark">Navigate</h3>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="mono mono--dark">Connect</h3>
            <ul>
              <li>
                <a href={waLink(MESSAGES.general)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={15} /> WhatsApp <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon size={15} /> Instagram <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}>
                  <MailIcon size={15} /> Email
                </a>
              </li>
              <li>
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon size={15} /> GitHub <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="mono mono--dark">
            © {BRAND.year} {BRAND.name}.
          </span>
          <span className="mono mono--dark">{BRAND.location}</span>
        </div>
      </div>
    </footer>
  );
}
