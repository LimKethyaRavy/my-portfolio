import { ME } from "../data/data";
import { photo, hoverPhoto } from "../photos";
import Typed from "../components/Typed";
import Cutout from "../components/Cutout";

const btn =
  "cursor-pointer rounded-lg border border-ln px-3 py-2 text-xs font-semibold text-fg no-underline transition-colors hover:border-ac hover:text-ac";

export default function Home({ go = () => {} }) {
  const [firstName, ...lastNameParts] = ME.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return (
    <section className="mx-auto grid min-h-[78vh] max-w-5xl items-center gap-x-6 gap-y-8 py-10 lg:relative lg:left-1/2 lg:w-[min(1280px,calc(100vw-80px))] lg:max-w-none lg:-translate-x-1/2 lg:grid-cols-[minmax(0,1fr)_minmax(280px,440px)_minmax(0,1fr)] lg:gap-x-10">
      <div className="text-center lg:text-left">
        <small className="text-base font-semibold text-ac2">&gt; hello_world()</small>

        <h1 className="my-4 break-words font-display text-[clamp(48px,10vw,78px)] leading-[.95] font-bold tracking-[-3px]">
          <span className="text-ac2"></span>{" "}
          <span className="name">
            <span className="glitch first" data-text={firstName}>{firstName}</span>{" "}
            {lastName && <span className="glitch last" data-text={lastName}>{lastName}</span>}
          </span>{" "}
          <span className="text-ac2"></span>
        </h1>

        <p className="mb-2 min-h-[30px] text-xl text-ac2">
          I'm a <Typed words={ME.roles} />
        </p>
      </div>

      <div className="flex justify-center lg:col-start-2 lg:row-start-1">
        <Cutout photo={photo} hoverPhoto={hoverPhoto} h="min(76vh,600px)" />
      </div>

      <div className="text-center lg:col-start-3 lg:row-start-1 lg:text-left">
        <p className="mx-auto max-w-lg text-base leading-relaxed text-mut lg:mx-0 lg:text-lg">{ME.tag}</p>

        <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
          <button className={btn + " border-ac text-ac"} onClick={() => go("projects")}>View projects →</button>
          <button className={btn} onClick={() => go("contact")}>Contact me</button>
          <a className={btn} href={ME.resume}>Résumé ↓</a>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-2">
          {ME.stats.map((s) => (
            <div key={s.l} className="rounded-xl border border-ln px-1 py-2 text-center">
              <b className="block font-display text-lg text-ac">{s.v}</b>
              <span className="text-[10px] text-mut">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}