import { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ME, NAV, PROJECTS } from "./data/data";
import Bg from "./components/Bg";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Terminal from "./components/Terminal";
import Palette from "./components/Palette";
import Home from "./page/Home";
import About from "./page/About";
import Education from "./page/Education";
import Experience from "./page/Exprience";
import Projects from "./page/Project";
import Skills from "./page/Skills";
import Contact from "./page/Contact";

export default function App() {
  const navigate = useNavigate(), loc = useLocation();
  const [boot, setBoot] = useState(true), [pal, setPal] = useState(false), [term, setTerm] = useState(false);

  const go = useCallback((id) => { navigate(id === "home" ? "/" : "/" + id); window.scrollTo(0, 0); }, [navigate]);
  const toggleTheme = () => {
    const r = document.documentElement;
    const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
    r.dataset.theme = dark ? "light" : "dark";
  };

  // Ctrl/⌘ + K toggles the launcher, "/" opens it (unless you are typing in a field)
  useEffect(() => {
    const k = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPal((v) => !v); }
      else if (e.key === "/" && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); setPal(true); }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);

  // every launcher command is just data: group, icon, label, and a function to run
  const items = useMemo(() => [
    ...NAV.map((p) => ({ g: "Navigate", i: "→", l: "Go to " + p, run: () => go(p) })),
    ...PROJECTS.map((x) => ({ g: "Projects", i: "▣", l: x.n, run: () => go("projects") })),
    { g: "Actions", i: "◐", l: "Toggle theme", run: toggleTheme },
    { g: "Actions", i: "⌨", l: "Toggle terminal", run: () => setTerm((t) => !t) },
    { g: "Actions", i: "⬇", l: "Download résumé", run: () => window.open(ME.resume, "_blank") },
    { g: "Actions", i: "⎘", l: "Copy email address", run: () => { try { navigator.clipboard.writeText(ME.email); } catch {} } },
    { g: "Links", i: "⌥", l: "Open GitHub", run: () => window.open("https://" + ME.github, "_blank") },
    { g: "Links", i: "in", l: "Open LinkedIn", run: () => window.open("https://" + ME.linkedin, "_blank") },
    { g: "Links", i: "✉", l: "Send email", run: () => { location.href = "mailto:" + ME.email; } },
  ], [go]);

  return (
    <>
      {boot && <Loader onDone={() => setBoot(false)} />}
      <Bg />
      {pal && <Palette items={items} onClose={() => setPal(false)} />}
      <Navbar onPalette={() => setPal(true)} onTerminal={() => setTerm((t) => !t)} onTheme={toggleTheme} />

      <main key={loc.pathname} className="animate-in relative z-10 mx-auto max-w-5xl px-[5vw] pb-28 pt-10">
        <Routes>
          <Route path="/" element={<Home go={go} />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home go={go} />} />
        </Routes>
      </main>

      <footer className="relative z-10 p-5 text-center text-xs text-mut">
        © {new Date().getFullYear()} {ME.name} · built with React + Tailwind · press <kbd>⌘K</kbd> or <kbd>Ctrl K</kbd>
      </footer>
      {term && <Terminal go={go} toggleTheme={toggleTheme} onClose={() => setTerm(false)} />}
    </>
  );
}
