// Your social links. Add / remove lines here: the icons appear automatically.
// key must be one of: github, linkedin, email, facebook, telegram, instagram, x, youtube
import { ME } from "./data";

const u = (s) => (/^https?:/.test(s) ? s : "https://" + s);

export const SOCIALS = [
  { key: "github", label: "GitHub", href: u(ME.github) },
  { key: "linkedin", label: "LinkedIn", href: u(ME.linkedin) },
  { key: "email", label: "Email", href: "mailto:" + ME.email },
  {key: "facebook", label: "Facebook", href: u(ME.facebook)},
  {key: "tiktok", label: "Tiktok", href: u(ME.tiktok)},
    {key: "telegram", label: "Telegram", href: u(ME.telegram)}

  // { key: "telegram",  label: "Telegram",  href: "https://t.me/yourname" },
  // { key: "facebook",  label: "Facebook",  href: "https://facebook.com/yourname" },
  // { key: "instagram", label: "Instagram", href: "https://instagram.com/yourname" },
  // { key: "x",         label: "X",         href: "https://x.com/yourname" },
  // { key: "youtube",   label: "YouTube",   href: "https://youtube.com/@yourname" },
];