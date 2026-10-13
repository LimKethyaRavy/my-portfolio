import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn, faFacebookF, faTelegram, faInstagram, faXTwitter, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { SOCIALS } from "../data/social";
import "../style/socials.css";

// Font Awesome icon + brand color (used for the hover fill) for each key
const ICONS = {
  github: [faGithub, "#24292f"], linkedin: [faLinkedinIn, "#0a66c2"], email: [faEnvelope, "#5b4bff"],
  facebook: [faFacebookF, "#1877f2"], telegram: [faTelegram, "#26a5e4"], instagram: [faInstagram, "#e4405f"],
  x: [faXTwitter, "#111111"], youtube: [faYoutube, "#ff0000"], tiktok: [faTiktok, "#24292f"]
};

// Icon-only links. aria-label gives screen readers (and the tooltip) the name.
export default function Socials({ size = "md", className = "" }) {
  return (
    <ul className={"m-0 flex list-none flex-wrap gap-2.5 p-0 " + className}>
      {SOCIALS.map((s) => {
        const [icon, color] = ICONS[s.key] || ICONS.email;
        const external = !s.href.startsWith("mailto:");
        return (
          <li key={s.key}>
            <a className={"soc" + (size === "lg" ? " soc-lg" : "")} href={s.href} aria-label={s.label}
              target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} style={{ "--c": color }}>
              <FontAwesomeIcon icon={icon} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}