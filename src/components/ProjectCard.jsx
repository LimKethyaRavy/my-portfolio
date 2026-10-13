import { box, tag, tilt, slug } from "../lib";

export default function ProjectCard({ p, i }) {
  return (
    <div className={box + " tl3 !p-5"} {...tilt}>
      <div className="pointer-events-none absolute right-3.5 top-1 font-display text-7xl font-extrabold leading-none opacity-[.07]">{String(i + 1).padStart(2, "0")}</div>
      <div className="mb-3.5 flex items-center gap-1.5">
        <i className="size-2.5 rounded-full bg-[#ff5f57]" /><i className="size-2.5 rounded-full bg-[#febc2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] text-mut">{slug(p.n)}.app</span>
      </div>
      <h3 className="mb-1.5 font-display text-[22px] font-bold text-ac">{p.n}</h3>
      <div className="mb-3.5 overflow-hidden rounded-xl border border-dashed border-ln bg-gradient-to-br from-ac/10 via-transparent to-ac2/10">
        {p.image ? (
          <img src={p.image} alt={`${p.n} preview`} className="h-32 w-full object-cover" />
        ) : (
          <div className="flex h-32 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_50%)] text-center text-[10px] font-medium uppercase tracking-[0.27em] text-mut/80">
            image placeholder
          </div>
        )}
      </div>
      <p className="my-1.5 leading-relaxed">{p.d}</p>
      <p className="text-ac2">↳ {p.hi}</p>
      <div>{p.s.map((x) => <span key={x} className={tag}>{x}</span>)}</div>
      <div className="mt-3.5 flex justify-between border-t border-dashed border-ln pt-2.5 text-xs text-mut"><span>⌥ {p.link}</span><b className="text-ac">open ↗</b></div>
    </div>
  );
}
