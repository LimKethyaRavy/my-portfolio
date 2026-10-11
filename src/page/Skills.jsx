import { SKILLS, TECH } from "../data/data";
import { box, h3 } from "../lib";
import PageTitle from "../components/PageTitle";
import Ring from "../components/Ring";
import SortViz from "../components/SortVix";

export default function Skills() {
  return (
    <>
      <PageTitle t="Skills" s="My stack, in numbers" />
      <div className="mq"><div className="mqt">{[...TECH, ...TECH, ...TECH].map(([l, c, n], i) => <span key={i} style={{ "--c": c }}><b>{l}</b>{n}</span>)}</div></div>
      {Object.entries(SKILLS).map(([g, arr]) => (
        <div key={g}>
          <h3 className={h3}>{g}</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
            {arr.map(([n, v]) => (
              <div key={n} className="flex flex-col items-center gap-1.5 rounded-2xl border border-ln bg-pan px-2 py-4 text-[13px] transition hover:-translate-y-1 hover:border-ac2 hover:shadow-[0_12px_30px_-12px_var(--ac2)]">
                <Ring v={v} /><span>{n}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className={box + " mt-7"}><h3 className="mb-1 font-display text-lg font-bold text-ac">Sorting visualizer</h3><SortViz /></div>
    </>
  );
}
