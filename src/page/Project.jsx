import { PROJECTS } from "../data/data";
import PageTitle from "../components/PageTitle";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <>
      <PageTitle t="Projects" s="What i have build" />
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => <ProjectCard key={p.n} p={p} i={i} />)}
      </div>
    </>
  );
}
