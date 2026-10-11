import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ME, NAV } from "../data/data";

const tbtn = "cursor-pointer rounded-lg border border-ln px-2.5 py-1.5 text-xs font-semibold hover:border-ac hover:text-ac";

export default function Navbar({ onPalette, onTerminal, onTheme }) {
  const [open, setOpen] = useState(false);
  const initials = ME.name.split(" ").map((w) => w[0]).join("");
  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-ln bg-pan px-[5vw] py-3 backdrop-blur-md">
      <NavLink to="/" className="font-display text-xl font-bold no-underline">&lt;{initials}<span className="text-ac">/&gt;</span></NavLink>

      <div className={(open ? "flex" : "hidden") + " absolute left-0 right-0 top-full flex-col gap-1 border-b border-ln bg-pan px-[5vw] pb-3 backdrop-blur-md lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"}>
        {NAV.map((p) => (
          <NavLink key={p} to={p === "home" ? "/" : "/" + p} end onClick={() => setOpen(false)}
            className={({ isActive }) => "rounded-lg px-3 py-1.5 text-[13px] no-underline transition-colors " + (isActive ? "bg-ln text-ac" : "text-mut hover:text-fg")}>
            {p}
          </NavLink>
        ))}
      </div>

      <div className="flex gap-1.5">
        <button className={tbtn} onClick={onPalette} aria-label="Open command palette">⌘K</button>
        <button className={tbtn} onClick={onTerminal} aria-label="Toggle terminal">⌨</button>
        <button className={tbtn} onClick={onTheme} aria-label="Toggle theme">◐</button>
        <button className={tbtn + " lg:hidden"} onClick={() => setOpen((o) => !o)} aria-label="Menu">☰</button>
      </div>
    </nav>
  );
}
