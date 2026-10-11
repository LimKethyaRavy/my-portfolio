import { ME, EDU, COURSES, CERTS } from "../data/data";
import { box, h3, tilt } from "../lib";
import { photo } from "../photos";
import PageTitle from "../components/PageTitle";

export default function Education() {
  const ini = ME.name.split(" ").map((w) => w[0]).join("");
  return (
    <>
      <PageTitle t="Education" s="Where I learn" />
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,420px)_1fr]">
        {/* student ID card: tilts + glows with the cursor */}
        <div className="idc tl3" {...tilt}>
          <div className="idh"><span>🎓 {EDU[0].o}</span><span>STUDENT ID</span></div>
          <div className="flex items-center gap-4 px-4 py-[18px]">
            <div className="idp">{photo ? <img src={photo} alt="" /> : <b className="font-display text-4xl text-white">{ini}</b>}</div>
            <div><h3 className="mb-1 font-display text-xl font-bold">{ME.name}</h3><p className="my-0.5">{EDU[0].t}</p><p className="text-xs text-mut">{EDU[0].y}</p><div className="chp" /></div>
          </div>
          <div className="flex items-center gap-3 px-4 pb-3.5 pt-2.5 text-xs font-semibold"><i className="bc" /><span>CS-2023-0042</span></div>
        </div>
        <div>
          <h3 className={h3 + " !mt-0"}>Core courses</h3>
          <div className="flex flex-wrap gap-2">{COURSES.map((c, i) => <span key={c} className="crs cursor-default rounded-full border border-ln bg-pan px-3 py-1.5 text-xs transition hover:-translate-y-0.5 hover:bg-ac hover:text-white" style={{ "--d": i * 70 + "ms" }}>{c}</span>)}</div>
          <h3 className={h3}>Earlier</h3>
          {EDU.slice(1).map((e) => <div key={e.t} className={box}><b>{e.t}</b><div className="text-xs text-mut">{e.o} · {e.y}</div><p className="my-1.5 leading-relaxed">{e.d}</p></div>)}
        </div>
      </div>
      <h3 className={h3 + " mt-7"}>Certificates</h3>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTS.map((x) => <div key={x} className={box + " flex items-center gap-3"}><span className="text-2xl">🎓</span><div>{x}<small className="mt-0.5 block text-[11px] text-ac2">✓ verified</small></div></div>)}
      </div>
    </>
  );
}
