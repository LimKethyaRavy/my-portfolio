import { useState, useEffect } from "react";
import { ME } from "../data/data";
import { box, btn } from "../lib";
import PageTitle from "../components/PageTitle";
import { photo } from "../photos";
import { SOCIALS } from "../data/social";
import Socials from "../components/Socials";

 const SIL = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><g fill="#fff" fill-opacity=".45"><circle cx="150" cy="120" r="64"/><path d="M20 400C20 300 80 250 150 250S280 300 280 400Z"/></g></svg>');
 
const TOPICS = ["💼 Internship", "🤝 Collaboration", "🛠 Freelance", "👋 Just saying hi"];
const url = (s) => (/^https?:/.test(s) ? s : "https://" + s);
 
// small chat bubble: "them" = you (left), "me" = the visitor (right)
const Bubble = ({ me, children }) => (
  <div className={"animate-in max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed " + (me ? "self-end rounded-br-sm bg-ac text-white" : "self-start rounded-bl-sm bg-ln")}>{children}</div>
);
 
export default function Contact() {
  const tz = ME.tz || "Asia/Phnom_Penh";                       // optional: add tz: "Asia/..." to data.js
  const [now, setNow] = useState(new Date());
  const [flip, setFlip] = useState(false), [copied, setCopied] = useState("");
  const [topic, setTopic] = useState(""), [name, setName] = useState(""), [msg, setMsg] = useState(""), [sent, setSent] = useState(false);
 
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 20000); return () => clearInterval(id); }, []);
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(now);
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: tz }).format(now));
  const online = hour >= 8 && hour < 22;                        // "online" between 08:00 and 22:00 local time
 
  const ini = ME.name.split(" ").map((w) => w[0]).join("");
  const rows = [["✉", "Email", ME.email], ["⌥", "GitHub", ME.github], ["in", "LinkedIn", ME.linkedin]];
  const copy = async (label, v) => {
    try { await navigator.clipboard.writeText(v); } catch {}
    setCopied(label); setTimeout(() => setCopied(""), 1500);
  };
  const send = () => {
    if (!topic || !msg.trim()) return;
    const subject = `${topic.replace(/^\S+\s/, "")} — ${name || "Portfolio visitor"}`;
    setSent(true);
    window.location.href = `mailto:${ME.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg + "\n\n— " + (name || ""))}`;
  };
 
  return (
    <>
      <PageTitle t="Contact" s="Let's talk — pick a topic and say hi" />
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,360px)_1fr]">
 
        {/* ---------------- left: card + status + copy rows ---------------- */}
        <div className="space-y-4">
          <div className={"fc" + (flip ? " flip" : "")} onClick={() => setFlip((f) => !f)} role="button" aria-label="Flip business card">
            <div className="fci">
              <div className="ff">
                {/* PHOTO SLOT: your cutout sits bottom-right of the card */}
                <div className="absolute bottom-0 right-2 z-[1] flex h-[92%] items-end">
                  {photo ? (
                    <img src={photo} alt={ME.name} draggable="false" className="h-full w-auto object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,.4)]" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-end">
                      <img src={SIL} alt="" draggable="false" className="h-[82%] w-auto" />
                      <span className="mt-1 rounded-full border border-dashed border-white/60 px-2 py-0.5 text-[9px] tracking-wider text-white/85">YOUR PHOTO</span>
                    </div>
                  )}
                </div>
                <div className="font-display text-5xl font-extrabold tracking-tight">{ini}<span className="opacity-70">/&gt;</span></div>
                <div className="absolute bottom-[18px] left-[18px] right-[44%] z-[1]">
                  <div className="font-display text-lg font-bold leading-tight">{ME.name}</div>
                  <div className="text-xs opacity-85">{ME.uni || "Computer Science student"}</div>
                  <div className="mt-2 text-[10px] tracking-widest opacity-70">TAP / HOVER TO FLIP ↻</div>
                </div>
              </div>
              <div className="fk">
                <div className="mb-2 text-[11px] tracking-widest text-mut">CONTACT</div>
                {rows.map(([i, l, v]) => (<div key={l} className="my-2.5 flex items-center gap-2.5 text-[13px]"><span className="w-5 text-center text-ac">{i}</span><span className="truncate">{v}</span></div>))}
                <div className="mt-3 text-xs text-mut">📍 {ME.where}</div>
              </div>
            </div>
          </div>
 
          <div className="rounded-2xl border border-ln bg-pan p-4 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2.5"><span className={"ping absolute inline-flex size-full rounded-full " + (online ? "bg-green-500" : "bg-amber-500")} /><span className={"relative inline-flex size-2.5 rounded-full " + (online ? "bg-green-500" : "bg-amber-500")} /></span>
              <b>{online ? "Available now" : "Away — probably sleeping 😴"}</b>
            </div>
            <div className="mt-2 text-xs text-mut">🕒 {time} local time · {tz.split("/").pop().replace("_", " ")}</div>
            <div className="mt-1 text-xs text-mut">⚡ Usually replies within 24 hours</div>
          </div>
 
          <div className="grid gap-2">
            <div className="rounded-2xl border border-ln bg-pan p-4 backdrop-blur-md">
              <div className="mb-3 text-[11px] tracking-widest text-mut">FIND ME ONLINE</div>
              <Socials size="lg" />
            </div>
            <div className="flex items-center justify-between gap-2 rounded-xl border border-ln bg-pan px-3.5 py-2.5">
              <span className="min-w-0 truncate"><span className="mr-2 text-ac">✉</span>{ME.email}</span>
              <button className="shrink-0 cursor-pointer rounded-lg border border-ln px-2.5 py-1 text-[11px] font-semibold hover:border-ac hover:text-ac" onClick={() => copy("Email", ME.email)}>{copied === "Email" ? "copied ✓" : "copy"}</button>
            </div>
            <a className="cursor-pointer rounded-xl border border-ln bg-pan px-3.5 py-2.5 text-center text-xs font-semibold no-underline transition-colors hover:border-ac hover:text-ac" href={ME.resume}>⬇ Download résumé</a>
          </div>
        </div>
 
        {/* ---------------- right: chat-style composer ---------------- */}
        <div className="flex min-h-[460px] flex-col overflow-hidden rounded-2xl border border-ln bg-pan backdrop-blur-md">
          <div className="flex items-center gap-3 border-b border-ln px-4 py-3">
            {photo
              ? <img src={photo} alt={ME.name} className="size-10 rounded-full bg-ac/20 object-cover object-top" draggable="false" />
              : <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-ac to-ac2 font-display font-bold text-white">{ini}</div>}
            <div className="leading-tight"><b>{ME.name}</b><div className="text-[11px] text-mut">{online ? "● online" : "○ away"} · replies by email</div></div>
          </div>
 
          <div className="flex flex-1 flex-col gap-2.5 overflow-auto p-4">
            <Bubble>Hi 👋 I'm {ME.name}. Thanks for stopping by!</Bubble>
            <Bubble>What would you like to talk about?</Bubble>
            {!topic && (
              <div className="animate-in flex flex-wrap gap-2 pt-1">
                {TOPICS.map((t) => <button key={t} onClick={() => setTopic(t)} className="cursor-pointer rounded-full border border-ac px-3.5 py-1.5 text-[13px] text-ac transition hover:bg-ac hover:text-white">{t}</button>)}
              </div>
            )}
            {topic && <Bubble me>{topic}</Bubble>}
            {topic && <Bubble>Great choice! Tell me a bit more 👇 <button className="ml-1 cursor-pointer text-xs text-ac underline" onClick={() => { setTopic(""); setSent(false); }}>change topic</button></Bubble>}
            {sent && <Bubble me>{msg}</Bubble>}
            {sent && <Bubble>Thanks{name ? ", " + name : ""}! 📬 Opening your email app… if nothing opens, copy my address: <b>{ME.email}</b></Bubble>}
          </div>
 
          {topic && !sent && (
            <div className="animate-in space-y-2 border-t border-ln p-3">
              <input className="w-full rounded-lg border border-ln bg-transparent p-2.5 text-fg outline-none focus:border-ac" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Your name" />
              <div className="flex items-end gap-2">
                <textarea className="min-h-[44px] w-full flex-1 resize-none rounded-lg border border-ln bg-transparent p-2.5 text-fg outline-none focus:border-ac" rows="3" placeholder="Write your message…" value={msg} onChange={(e) => setMsg(e.target.value)} aria-label="Message" />
                <button onClick={send} disabled={!msg.trim()} className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-ac text-lg text-white transition disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send">➤</button>
              </div>
            </div>
          )}
          {sent && <div className="border-t border-ln p-3 text-center"><button className="cursor-pointer text-xs text-ac underline" onClick={() => { setSent(false); setMsg(""); setTopic(""); }}>start a new message</button></div>}
        </div>
      </div>
    </>
  );
}
