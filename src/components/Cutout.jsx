import { useState } from "react";
import { TECH } from "../data/data";

// Fallback silhouette so the hover effect works before you add your photo.
const SIL =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b7bff"/><stop offset="1" stop-color="#3ef0c8"/></linearGradient></defs><circle cx="150" cy="120" r="64" fill="url(#g)"/><path d="M20 400C20 300 80 250 150 250S280 300 280 400Z" fill="url(#g)"/></svg>'
  );

const POS = [[-6, 14], [92, 8], [-12, 48], [98, 44], [0, 80], [90, 78]]; // badge positions (left %, top %)

/**
 * photo      : your transparent PNG
 * hoverPhoto : optional tech version shown on hover (otherwise: green hologram)
 * The visual effect itself lives in cutout.css (raw CSS).
 */
export default function Cutout({ photo, hoverPhoto, h }) {
  const img = photo || SIL;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`cut${isHovered ? " is-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      style={h ? { "--h": h } : undefined}
    >
      <div className="halo" />
      <img className={"c0" + (photo ? "" : " ph")} src={img} alt={photo ? "Portrait" : "Profile illustration"} draggable="false" />
      <img className={"c1" + (hoverPhoto ? "" : " holo")} src={hoverPhoto || img} alt="" draggable="false" />
      {!hoverPhoto && <div className="mk" style={{ "--src": `url("${img}")` }} />}
      <div className="scan" />
      {TECH.map(([label, color, name], i) => (
        <div key={name} className="fb" title={name}
          style={{ "--i": i, "--c": color, left: POS[i][0] + "%", top: POS[i][1] + "%" }}>
          {label}
        </div>
      ))}
    </div>
  );
}