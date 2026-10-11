import { useEffect, useState } from "react";
import { ME, TECH } from "../data/data";

const MSGS = ["initializing runtime…", "loading modules…", "compiling components…", "connecting the graph…", "ready ✓"];

// Tech-logo loading screen: logos light up as the progress bar fills.
export default function Loader({ onDone }) {
  const [p, setP] = useState(0), [out, setOut] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setP((v) => (v >= 100 ? 100 : Math.min(100, v + Math.random() * 7 + 2))), 110);
    return () => clearInterval(id);
  }, []);
  const done = p >= 100;
  useEffect(() => {
    if (!done) return;
    const a = setTimeout(() => setOut(true), 350), b = setTimeout(onDone, 950);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [done]);
  const n = Math.floor(p);
  return (
    <div className={"ld" + (out ? " out" : "")} role="status" aria-label="Loading portfolio">
      <div className="w-[min(460px,90vw)] text-center">
        <svg className="atom mx-auto" viewBox="-50 -50 100 100" width="96" height="96">
          <g fill="none" stroke="var(--ac)" strokeWidth="2.5"><ellipse rx="42" ry="16" /><ellipse rx="42" ry="16" transform="rotate(60)" /><ellipse rx="42" ry="16" transform="rotate(120)" /></g>
          <circle r="6" fill="var(--ac2)" />
        </svg>
        <div className="mb-5 mt-3 font-display text-[22px] font-bold">&lt;{ME.name}/&gt;</div>
        <div className="mb-5 grid grid-cols-4 gap-3">
          {TECH.map(([s, c, t], i) => (
            <div key={t} className={"lt" + ((n / 100) * TECH.length > i ? " on" : "")} style={{ "--c": c }}>
              <b>{s}</b><span className="text-[10px] text-mut">{t}</span>
            </div>
          ))}
        </div>
        <div className="h-[5px] overflow-hidden rounded-full bg-ln lb"><i style={{ width: n + "%" }} /></div>
        <div className="mb-4 mt-2 flex justify-between text-xs text-mut"><span>{MSGS[Math.min(MSGS.length - 1, Math.floor(n / 22))]}</span><span>{n}%</span></div>
        <button className="cursor-pointer rounded-lg border border-ln px-3 py-1.5 text-xs font-semibold hover:border-ac hover:text-ac" onClick={onDone}>skip →</button>
      </div>
    </div>
  );
}
