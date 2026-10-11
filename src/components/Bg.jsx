import { useEffect, useRef } from "react";

// Interactive particle network. Dots drift and move away from the cursor.
export default function Bg() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, c = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H, raf, m = { x: -999, y: -999 };
    const size = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    const d = Array.from({ length: W < 700 ? 40 : 85 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
    const move = (e) => (m = { x: e.clientX, y: e.clientY });
    addEventListener("pointermove", move); addEventListener("resize", size);
    const loop = () => {
      c.clearRect(0, 0, W, H);
      c.fillStyle = c.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--ac").trim();
      for (const p of d) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - m.x, dy = p.y - m.y;
        if (dx * dx + dy * dy < 14000) { p.x += dx / 16; p.y += dy / 16; }
      }
      for (let i = 0; i < d.length; i++) {
        c.globalAlpha = 0.6; c.beginPath(); c.arc(d[i].x, d[i].y, 1.6, 0, 7); c.fill();
        for (let j = i + 1; j < d.length; j++) {
          const q = (d[i].x - d[j].x) ** 2 + (d[i].y - d[j].y) ** 2;
          if (q < 11000) { c.globalAlpha = (1 - q / 11000) * 0.3; c.beginPath(); c.moveTo(d[i].x, d[i].y); c.lineTo(d[j].x, d[j].y); c.stroke(); }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", move); removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} className="bg-canvas" />;
}
