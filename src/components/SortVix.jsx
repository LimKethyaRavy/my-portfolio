import { useEffect, useRef, useState } from "react";
import { btn } from "../lib";

const mk = () => Array.from({ length: 28 }, () => 8 + Math.floor(Math.random() * 92));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Animated bubble / insertion / quick sort. Each swap re-renders the bars.
export default function SortViz() {
  const [a, setA] = useState(mk), [algo, setAlgo] = useState("quick"), [run, setRun] = useState(false);
  const stop = useRef(false);
  useEffect(() => () => { stop.current = true; }, []);

  async function go() {
    if (run) return;
    setRun(true); stop.current = false;
    const x = [...a];
    const swap = async (i, j) => { [x[i], x[j]] = [x[j], x[i]]; setA([...x]); await sleep(35); };
    if (algo === "bubble") {
      for (let i = 0; i < x.length; i++) for (let j = 0; j < x.length - i - 1; j++) { if (stop.current) return; if (x[j] > x[j + 1]) await swap(j, j + 1); }
    } else if (algo === "insertion") {
      for (let i = 1; i < x.length; i++) { let j = i; while (j > 0 && x[j - 1] > x[j]) { if (stop.current) return; await swap(j, j - 1); j--; } }
    } else {
      const qs = async (l, h) => {
        if (l >= h || stop.current) return;
        const p = x[h]; let i = l;
        for (let j = l; j < h; j++) if (x[j] < p) { await swap(i, j); i++; }
        await swap(i, h); await qs(l, i - 1); await qs(i + 1, h);
      };
      await qs(0, x.length - 1);
    }
    setRun(false);
  }
  return (
    <div>
      <div className="bars">{a.map((v, i) => <i key={i} style={{ height: v + "%" }} />)}</div>
      <div className="flex flex-wrap gap-1.5">
        {["bubble", "insertion", "quick"].map((k) => <button key={k} className={btn + (algo === k ? " !border-ac !text-ac" : "")} onClick={() => !run && setAlgo(k)}>{k}</button>)}
        <button className={btn} onClick={go}>▶ run</button>
        <button className={btn} onClick={() => { stop.current = true; setRun(false); setA(mk()); }}>shuffle</button>
      </div>
    </div>
  );
}
