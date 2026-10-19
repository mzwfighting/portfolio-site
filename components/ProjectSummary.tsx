import Link from "next/link";
import type { Project } from "@/lib/portfolio";
import { ProjectImage } from "./ProjectImage";

type ProjectSummaryProps = { project: Project };

export function ProjectSummary({ project }: ProjectSummaryProps) {
  return (
    <article id={`project-${project.slug}`} className="editorial-project">
      <div className="editorial-project-copy">
        <p className="editorial-eyebrow">{project.order} / {project.category}</p>
        <h2>{project.title}</h2>
        <p className="editorial-project-description">{project.summary}</p>
        <Link href={`/work/${project.slug}`} className="editorial-button focus-ring">查看项目</Link>
      </div>
      <Link href={`/work/${project.slug}`} className="focus-ring editorial-project-media" aria-label={`查看${project.title}完整项目`}>
        <ProjectImage image={project.cover} priority={project.order === "01"}
          imageClassName="aspect-[16/10]" sizes="(min-width: 1280px) 1100px, 100vw" />
      </Link>
    </article>
  );
}
