// shared helpers + shared Tailwind class strings
export const slug = (x) => x.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const box = "rounded-2xl border border-ln bg-pan p-[18px] backdrop-blur-md transition-colors hover:border-ac";
export const tag = "mr-1 mt-1 inline-block rounded-full border border-ln px-2 py-0.5 text-[11px] text-ac2";
export const btn = "cursor-pointer rounded-lg border border-ln px-3 py-2 text-xs font-semibold text-fg no-underline transition-colors hover:border-ac hover:text-ac";
export const h3 = "mb-2.5 mt-6 font-display text-lg font-bold";

// 3D tilt + cursor spotlight (pair with the .tl3 class from effects.css)
export const tilt = {
  onPointerMove: (e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", x * 100 + "%");
    el.style.setProperty("--my", y * 100 + "%");
    el.style.transform = `perspective(800px) rotateY(${(x - 0.5) * 8}deg) rotateX(${(0.5 - y) * 8}deg)`;
  },
  onPointerLeave: (e) => { e.currentTarget.style.transform = ""; },
};
