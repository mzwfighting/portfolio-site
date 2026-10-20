import Image from "next/image";
import { publicPath } from "@/lib/publicPath";

const skills = [
  { name: "Photoshop", description: "调色 精修" },
  { name: "Illustrator", description: "排版" },
  { name: "Blender", description: "建模渲染" },
  { name: "AIGC", description: "效果图生成" }
];

const workExperience = [
  {
    period: "2025.04 - 2026.06",
    title: "北京雪莲生物科技有限公司",
    role: "品牌设计师（主管）",
    description: "负责大型活动与直播视觉，并完成产品主图、活动海报、小程序、Banner、商品详情页及营销素材的多尺寸适配。"
  },
  {
    period: "2023.10 - 2025.03",
    title: "阳萌电子商务有限公司",
    role: "电商品牌设计师",
    description: "负责淘宝、天猫店铺的营销推广图、产品主图、钻展图、活动横幅及主视觉海报的策划与设计。"
  }
];

const projectExperience = [
  {
    period: "2026.02",
    title: "马跃千里·溯见初心",
    role: "沁丹新品发布暨雪莲跨年溯源直播",
    description: "负责活动主视觉、直播间视觉包装、线上宣传及线下执行物料，完成多尺寸、多媒介的视觉延展与落地。"
  },
  {
    period: "2025.10",
    title: "冻住时间来爱你",
    role: "雪莲品牌四周年",
    description: "负责线上宣传海报、直播贴片，以及横幅、玻璃贴、楼梯贴、展板等线下物料的视觉延展。"
  }
];

export function ResumeIntro() {
  return (
    <section className="resume-intro page-pad" id="resume" aria-label="个人简介">
      <div className="resume-intro__frame site-max">
        <article className="resume-intro__page resume-intro__intro">
          <div className="resume-intro__bento">
            <figure className="resume-intro__tile resume-intro__portrait">
              <Image
                src={publicPath("/assets/profile-zhiqiu.jpg")}
                alt="孟赵伟（之秋）的黑白个人形象照"
                width={1024}
                height={1024}
                sizes="(min-width: 851px) 60vw, 92vw"
                loading="lazy"
              />
            </figure>
            <div className="resume-intro__profile-copy">
              <div className="resume-intro__profile-heading">
                <p className="resume-intro__profile-eyebrow">ABOUT / BRAND DESIGNER</p>
                <p className="resume-intro__identity">
                  <span>孟赵伟<span className="resume-intro__name-alias">（之秋）</span></span>
                  <span>品牌设计师</span>
                </p>
              </div>
            </div>

            <article className="resume-intro__tile resume-intro__card resume-intro__experience-card" aria-labelledby="resume-work-title">
              <h2 id="resume-work-title">工作经历<span className="resume-intro__section-mark" aria-hidden="true">01 / EXPERIENCE</span></h2>
              {workExperience.map((item) => (
                <div className="resume-intro__card-entry" key={item.title}>
                  <p className="resume-intro__card-label">{item.period}</p>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="resume-intro__card-role">{item.role}</p>
                  </div>
                  <p className="resume-intro__card-description">{item.description}</p>
                </div>
              ))}
            </article>

            <article className="resume-intro__tile resume-intro__card resume-intro__experience-card" aria-labelledby="resume-projects-title">
              <h2 id="resume-projects-title">项目经历<span className="resume-intro__section-mark" aria-hidden="true">02 / SELECTED PROJECTS</span></h2>
              {projectExperience.map((item) => (
                <div className="resume-intro__card-entry" key={item.title}>
                  <p className="resume-intro__card-label">{item.period}</p>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="resume-intro__card-role">{item.role}</p>
                  </div>
                  <p className="resume-intro__card-description">{item.description}</p>
                </div>
              ))}
            </article>

            <article className="resume-intro__tile resume-intro__card resume-intro__skill-card" aria-labelledby="resume-skills-title">
              <h2 id="resume-skills-title">专业软件<span className="resume-intro__section-mark" aria-hidden="true">03 / TOOLKIT</span></h2>
              <div className="resume-intro__skill-names">
                {skills.map(({ name, description }) => (
                  <div className="resume-intro__skill-item" key={name}>
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </article>

          </div>
        </article>
      </div>
    </section>
  );
}
