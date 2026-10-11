// Circular skill gauge (SVG). 214 ≈ circumference of r=34, matches the CSS keyframes.
export default function Ring({ v }) {
  const c = 2 * Math.PI * 34;
  return (
    <svg viewBox="0 0 80 80" width="96" height="96">
      <circle cx="40" cy="40" r="34" fill="none" stroke="var(--ln)" strokeWidth="6" />
      <circle className="rgc" cx="40" cy="40" r="34" fill="none" stroke="var(--ac2)" strokeWidth="6" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} transform="rotate(-90 40 40)" />
      <text x="40" y="46" textAnchor="middle" fill="var(--fg)" fontSize="17" fontWeight="700" fontFamily="Space Grotesk">{v}</text>
    </svg>
  );
}
