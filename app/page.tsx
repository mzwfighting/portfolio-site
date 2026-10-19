import { PortfolioCover } from "@/components/PortfolioCover";
import { ProjectSummary } from "@/components/ProjectSummary";
import { ResumeIntro } from "@/components/ResumeIntro";
import { projects } from "@/lib/portfolio";

export default function HomePage() {
  return (
    <>
      <PortfolioCover />
      <div className="editorial-home-content">
      <ResumeIntro />

      <section id="work" className="page-pad">
        <div className="site-max py-14 md:py-20">
          <div className="editorial-section-heading work-heading">
            <p className="editorial-eyebrow">SELECTED WORK / 精选作品</p>
            <h2>
              精选项目
            </h2>
            <p>
              品牌、包装与商业视觉。选择一个项目，了解完整设计过程。
            </p>
          </div>
          <div className="home-project-summaries">
          {projects.map((project) => (
            <ProjectSummary key={project.slug} project={project} />
          ))}
          </div>
        </div>
      </section>

      </div>
    </>
  );
}
