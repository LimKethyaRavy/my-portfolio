import { EXP, ACH } from "../data/data";
import { box, h3 } from "../lib";
import PageTitle from "../components/PageTitle";

export default function Experience() {
  return (
    <>
      <PageTitle t="Experience" s="What I've built and done" />
      <div className={box}>
        <div className="relative ml-1 border-l-2 border-ac pl-4">
          {EXP.map((e) => (
            <div key={e.r} className="relative mb-5 last:mb-0">
              <span className="absolute -left-[22px] top-1.5 size-2.5 rounded-full bg-ac shadow-[0_0_10px_var(--ac)]" />
              <b>{e.r}</b>
              <div className="text-xs text-mut">{e.o} · {e.y}</div>
              <ul className="my-1 list-disc pl-[18px] leading-relaxed">{e.d.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <h3 className={h3 + " mt-6"}>Achievements</h3>
      <div className="grid gap-3.5 sm:grid-cols-2">{ACH.map((x) => <div key={x} className={box}>{x}</div>)}</div>
    </>
  );
}
