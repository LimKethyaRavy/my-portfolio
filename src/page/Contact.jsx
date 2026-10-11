import { useState } from "react";
import { ME } from "../data/data";
import { box, btn } from "../lib";
import PageTitle from "../components/PageTitle";

const inp = "my-1.5 w-full rounded-lg border border-ln bg-transparent p-2.5 text-fg outline-none focus:border-ac";

export default function Contact() {
  const [name, setName] = useState(""), [msg, setMsg] = useState("");
  const href = `mailto:${ME.email}?subject=${encodeURIComponent("Hello from " + (name || "your portfolio"))}&body=${encodeURIComponent(msg)}`;
  return (
    <>
      <PageTitle t="Contact" s="Open to internships and collaborations" />
      <div className="grid gap-3.5 md:grid-cols-2">
        <div className={box}>
          <h3 className="mb-2 font-display text-lg font-bold text-ac">Get in touch</h3>
          <p className="my-1.5">✉ {ME.email}</p><p className="my-1.5">⌥ {ME.github}</p><p className="my-1.5">in {ME.linkedin}</p><p className="my-1.5">📍 {ME.where}</p>
          <a className={btn + " mt-2 inline-block"} href={ME.resume}>⬇ Download résumé</a>
        </div>
        <div className={box}>
          <h3 className="mb-2 font-display text-lg font-bold text-ac">Send a message</h3>
          <input className={inp} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Your name" />
          <textarea className={inp} rows="4" placeholder="Your message" value={msg} onChange={(e) => setMsg(e.target.value)} aria-label="Message" />
          <a className={btn + " inline-block !border-ac !text-ac"} href={href}>Send via email →</a>
        </div>
      </div>
    </>
  );
}
