import { useEffect, useRef, useState } from "react";

// rofi / Ubuntu-style launcher. items = [{ g: group, i: icon, l: label, run: fn }]
export default function Palette({ items, onClose }) {
  const [q, setQ] = useState(""), [i, setI] = useState(0);
  const ref = useRef(null), list = useRef(null);
  const f = items.filter((x) => (x.g + " " + x.l).toLowerCase().includes(q.toLowerCase())); // filter = substring match

  useEffect(() => { ref.current && ref.current.focus(); }, []);
  useEffect(() => { setI(0); }, [q]);                                   // new query -> select first result
  useEffect(() => { const el = list.current && list.current.querySelector(".on"); el && el.scrollIntoView({ block: "nearest" }); }, [i]);

  const run = (x) => { onClose(); x.run(); };
  const key = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) { e.preventDefault(); setI((v) => Math.min(f.length - 1, v + 1)); }
    else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) { e.preventDefault(); setI((v) => Math.max(0, v - 1)); }
    else if (e.key === "Enter" && f[i]) run(f[i]);
  };

  return (
    <div className="pal" onClick={onClose}>
      <div className="palb" role="dialog" aria-label="Application launcher" onClick={(e) => e.stopPropagation()}>
        <div className="lbar">
          <span className="lpr">❯ run</span>
          <input ref={ref} className="pin" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={key} placeholder="type to launch…" aria-label="Launcher search" autoCapitalize="off" autoCorrect="off" spellCheck="false" />
          <span className="lct">{f.length ? i + 1 : 0}/{f.length}</span>
        </div>
        <div className="pl" ref={list}>
          {f.length === 0 && <div className="pe">no matches for '{q}'</div>}
          {f.map((x, n) => (
            <button key={x.g + x.l} className={"pi" + (n === i ? " on" : "")} onMouseEnter={() => setI(n)} onClick={() => run(x)}>
              <span>{x.i}</span>{x.l}<em>{x.g}</em>
            </button>
          ))}
        </div>
        <div className="pf"><span><kbd>↑↓</kbd> select</span><span><kbd>↵</kbd> run</span><span><kbd>esc</kbd> quit</span><span className="ws">● workspace 1</span></div>
      </div>
    </div>
  );
}
