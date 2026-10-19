import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/portfolio";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "项目未找到 - Brand Visual Portfolio"
    };
  }

  return {
    title: `${project.title} - Brand Visual Portfolio`,
    description: project.summary
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const sectionImages = project.sections.flatMap((section) => section.images);
  const cover = sectionImages.find((image) => image.src.endsWith("/封面.png")) ?? project.cover;
  const images = (project.gallery ?? [cover, ...sectionImages])
    .filter((image, index, all) => all.findIndex((item) => item.src === image.src) === index)
    .sort((a, b) =>
      a.src.split("/").pop()!.localeCompare(b.src.split("/").pop()!, "zh-CN", { numeric: true })
    );

  return (
    <article className="project-gallery page-pad bg-black text-[#f1f1f1]">
      <div className="site-max pb-16 pt-10 md:pb-12 md:pt-8">
        <div className="editorial-detail-hero">
          <div>
            <p className="mb-3 font-mono text-xs text-[#a2a2a2]">{project.order} / {project.category}</p>
            <h1 className="text-3xl font-medium leading-tight md:text-5xl">{project.title}</h1>
            <p className="editorial-detail-summary">{project.summary}</p>
          </div>
        </div>
        <div className="grid gap-4 md:gap-6">
          {images.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority={index === 0}
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="block h-auto w-full"
            />
          ))}
        </div>
        <Link href={`/#project-${project.slug}`} className="editorial-button focus-ring mt-8">
          返回全部作品
        </Link>
      </div>
    </article>
  );
}
