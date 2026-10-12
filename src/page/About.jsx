import { ME } from "../data/data";
import { photo, hoverPhoto } from "../photos";
import { box, tag } from "../lib";
import PageTitle from "../components/PageTitle";
import Cutout from "../components/Cutout";

export default function About() {
  return (
    <>
      <PageTitle t="About me" s={ME.uni + " · " + ME.where} />
      <div className="grid items-start gap-6 md:grid-cols-[auto_1fr]">
        <div className="flex justify-center"><Cutout photo={photo} hoverPhoto={hoverPhoto} h="min(48vh,400px)" /></div>
        <div className={box}>
          {ME.bio.map((t, i) => <p key={i} className="my-1.5 leading-relaxed">{t}</p>)}
          <p className="mb-0.5 mt-3 text-mut">Interests</p><div>{ME.interests.map((x) => <span key={x} className={tag}>{x}</span>)}</div>
          <p className="mb-0.5 mt-3 text-mut">Languages</p><div>{ME.languages.map((x) => <span key={x} className={tag}>{x}</span>)}</div>
           <p className="mb-0.5 mt-3 text-mut">Framework</p><div>{ME.Framework.map((x) => <span key={x} className={tag}>{x}</span>)}</div>
        </div>
      </div>
    </>
  );
}
