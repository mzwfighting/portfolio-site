import { publicPath } from "@/lib/publicPath";

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  use: string;
};

export type ProjectSection = {
  title: string;
  text: string;
  images: ImageAsset[];
};

export type Project = {
  slug: string;
  order: string;
  title: string;
  englishTitle: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  cover: ImageAsset;
  hero: ImageAsset;
  problem: string;
  approach: string;
  result: string;
  sections: ProjectSection[];
  gallery?: ImageAsset[];
};

const asset = (
  folder: string,
  name: string,
  width: number,
  height: number,
  alt: string,
  use: string
): ImageAsset => ({
  src: publicPath(`/assets/${folder}/${name.replace(/\.png$/i, ".webp")}`),
  width,
  height,
  alt,
  use
});

export const projects: Project[] = [
  {
    slug: "shanye-youfang",
    order: "01",
    title: "山野有方",
    englishTitle: "Oriental Tea Brand System",
    category: "品牌视觉 / 茶饮系统",
    year: "Portfolio Case",
    role: "品牌策略、视觉系统、包装与应用延展",
    summary:
      "将东方草本知识转译为年轻、清晰、可日常坚持的茶饮品牌系统。",
    tags: ["品牌视觉", "产品视觉", "商业应用"],
    cover: asset("品牌项目一", "效果图03.png", 1281, 961, "山野有方茶杯组合横版封面", "项目封面"),
    hero: asset("品牌项目一", "效果图09.png", 1281, 1707, "山野有方茶园主视觉", "项目背景"),
    problem:
      "年轻消费者有健康意识，但传统养生饮品沉重、药感强，普通茶饮又缺少清晰的草本逻辑。",
    approach:
      "以东方计时器物日晷为灵感，建立一套围绕饮用时段、身体状态和草本选择的视觉系统。",
    result:
      "形成从策略、图形、杯身、菜单、手提袋到场景传播的完整品牌表达。",
    sections: [
      {
        title: "策略与品牌问题",
        text: "先建立东方草本的年轻化语境，再把饮用时段、状态选择和品牌关键词转化为可阅读的系统。",
        images: [
          asset("品牌项目一", "策略01.png", 1281, 2881, "山野有方品牌背景与市场现状", "设计策略"),
          asset("品牌项目一", "策略02.png", 1281, 1601, "山野有方品牌字标与视觉方向", "视觉概念"),
          asset("品牌项目一", "策略03.png", 1281, 1601, "山野有方辅助图形释义", "品牌系统"),
          asset("品牌项目一", "策略04.png", 1281, 1601, "山野有方字体与色彩规范", "品牌系统")
        ]
      },
      {
        title: "视觉系统",
        text: "以绿色作为主视觉资产，配合四个饮用状态色，让品牌从单一茶饮延展为一套选择逻辑。",
        images: [
          asset("品牌项目一", "效果图01.png", 1281, 1708, "山野有方品牌物料系统", "品牌系统"),
          asset("品牌项目一", "效果图02.png", 1281, 1707, "山野有方完整视觉系统展示", "品牌系统")
        ]
      },
      {
        title: "产品与商业应用",
        text: "杯身、菜单、移动端和门店场景一起呈现，使品牌在购买、携带和传播中保持统一识别。",
        images: [
          asset("品牌项目一", "效果图03.png", 1281, 961, "山野有方杯身产品展示", "产品场景图"),
          asset("品牌项目一", "效果图04.png", 1281, 961, "山野有方菜单应用展示", "商业应用"),
          asset("品牌项目一", "效果图05.png", 1281, 961, "山野有方辅助图形圆形符号", "视觉概念"),
          asset("品牌项目一", "效果图06.png", 1281, 1708, "山野有方杯身场景图", "产品场景图"),
          asset("品牌项目一", "效果图07.png", 1281, 1708, "山野有方移动端应用", "商业应用"),
          asset("品牌项目一", "效果图08.png", 1281, 1707, "山野有方线下立牌应用", "商业应用"),
          asset("品牌项目一", "效果图09.png", 1281, 1707, "山野有方茶园主视觉", "项目背景")
        ]
      }
    ]
  },
  {
    slug: "xunxi-night-repair",
    order: "02",
    title: "循息",
    englishTitle: "Night Repair Packaging",
    category: "包装设计 / 健康产品",
    year: "Portfolio Case",
    role: "包装主视觉、策略表达、产品展示",
    summary:
      "为睡前健康产品建立安静、节律化、具有恢复感的包装视觉语言。",
    tags: ["包装设计", "视觉概念", "产品展示"],
    cover: asset("包装项目三", "封面.png", 1441, 1081, "循息夜间修复盒项目封面", "项目封面"),
    hero: asset("包装项目三", "效果图01.png", 1441, 1921, "循息包装条形产品展示", "包装展示"),
    problem:
      "传统健康产品沟通方式偏严肃，难以融入年轻城市人群的睡前生活。",
    approach:
      "以夜晚、呼吸、节律和恢复信号为线索，用紫色弥散氛围与圆形节律图形建立安静的识别。",
    result:
      "形成从策略洞察到包装盒、瓶身、条包和组合展示的完整包装案例。",
    sections: [
      {
        title: "洞察与定位",
        text: "项目从城市高压、睡前状态切换和情绪健康切入，避免药品化表达。",
        images: [
          asset("包装项目三", "策略01.png", 1440, 1081, "循息品牌背景", "设计策略"),
          asset("包装项目三", "策略02.png", 1441, 1081, "循息市场洞察", "设计策略"),
          asset("包装项目三", "策略03.png", 1441, 1081, "循息用户洞察", "设计策略"),
          asset("包装项目三", "策略04.png", 1440, 1081, "循息品牌定位", "设计策略")
        ]
      },
      {
        title: "视觉概念",
        text: "中央圆形象征时间和身体节律，黄色焦点作为夜晚中的微光。",
        images: [
          asset("包装项目三", "策略05.png", 1441, 1081, "循息设计理念", "视觉概念"),
          asset("包装项目三", "策略06.png", 1441, 1081, "循息品牌核心词", "视觉概念")
        ]
      },
      {
        title: "包装展示",
        text: "产品展示保持统一紫色气质，用不同构图补充包装体量、材质和陈列节奏。",
        images: [
          asset("包装项目三", "封面.png", 1441, 1081, "循息包装组合封面", "包装展示"),
          asset("包装项目三", "效果图01.png", 1441, 1921, "循息包装条形产品展示", "包装展示"),
          asset("包装项目三", "效果图02.png", 1441, 1921, "循息瓶身和包装盒展示", "包装展示"),
          asset("包装项目三", "效果图03.png", 1441, 1081, "循息瓶身组合展示", "产品场景图"),
          asset("包装项目三", "效果图04.png", 1441, 1921, "循息包装盒细节展示", "项目结尾展示")
        ]
      }
    ]
  },
  {
    slug: "herbora-apple-astragalus",
    order: "03",
    title: "HERBORA 苹果黄芪水",
    englishTitle: "Botanical Beverage Packaging",
    category: "品牌包装 / 饮品视觉",
    year: "Portfolio Case",
    role: "品类洞察、包装视觉、产品场景",
    summary:
      "用苹果果香降低黄芪的传统药感，塑造年轻、轻负担的本草果饮包装。",
    tags: ["包装设计", "品牌视觉", "快消产品"],
    cover: asset("品牌项目二", "效果图01.png", 1081, 811, "HERBORA 苹果黄芪水礼盒与瓶装横版封面", "项目封面"),
    hero: asset("品牌项目二", "效果图05.png", 1081, 1441, "HERBORA 苹果黄芪水产品场景图", "产品场景图"),
    problem:
      "普通果味饮料同质化严重，传统本草饮品又容易显得厚重、老气和功效化。",
    approach:
      "将本草记忆点、果香图形和清爽色彩结合，建立日常轻饮的包装审美。",
    result:
      "完成策略、品牌关键词、包装盒、瓶身和场景图展示，突出货架识别与分享属性。",
    sections: [
      {
        title: "趋势与人群",
        text: "围绕饮料健康化、本草年轻化和包装审美日常化，明确 18-35 岁轻养生消费人群。",
        images: [
          asset("品牌项目二", "策略01.png", 1081, 1081, "HERBORA 项目市场趋势洞察", "设计策略"),
          asset("品牌项目二", "策略02.png", 1081, 1081, "HERBORA 品类问题与目标人群", "设计策略"),
          asset("品牌项目二", "策略03.png", 1081, 811, "HERBORA 品牌关键词", "视觉概念"),
          asset("品牌项目二", "策略04.png", 1080, 1441, "HERBORA 色彩与标志规范", "品牌系统")
        ]
      },
      {
        title: "包装系统",
        text: "白与橙建立清爽货架感，透明瓶身和苹果图形强化产品口味记忆。",
        images: [
          asset("品牌项目二", "效果图01.png", 1081, 811, "HERBORA 包装盒与瓶身展示", "包装展示"),
          asset("品牌项目二", "效果图02.png", 1081, 1441, "HERBORA 包装盒堆叠展示", "包装展示"),
          asset("品牌项目二", "效果图03.png", 1081, 1441, "HERBORA 包装与瓶身动态展示", "包装展示")
        ]
      },
      {
        title: "商业场景",
        text: "手持场景和果香视觉让产品从包装设计延伸到社交传播和即时消费。",
        images: [
          asset("品牌项目二", "效果图04.png", 1081, 1441, "HERBORA 手持包装场景图", "产品场景图"),
          asset("品牌项目二", "封面.png", 1080, 1441, "HERBORA 封面瓶身展示", "项目结尾展示"),
          asset("品牌项目二", "效果图05.png", 1081, 1441, "HERBORA 苹果场景产品图", "项目背景")
        ]
      }
    ]
  },
  {
    slug: "qindan-launch-event",
    order: "04",
    title: "沁丹新品发布会",
    englishTitle: "Launch Event Visual System",
    category: "活动视觉 / 直播视觉 / 空间延展",
    year: "Portfolio Case",
    role: "活动主视觉、线上直播物料、线下空间视觉",
    summary:
      "为新品发布会与溯源直播活动建立线上传播、直播界面和线下空间一体化视觉体系。",
    tags: ["商业视觉", "活动视觉", "空间落地"],
    cover: asset("活动项目四", "线上图3.png", 1327, 758, "沁丹活动主视觉横版展示", "项目封面"),
    hero: asset("活动项目四", "线下设计图2.png", 997, 826, "沁丹线下活动空间主视觉", "商业应用"),
    gallery: [
      asset("活动项目四", "001.png", 1601, 4755, "活动项目四视觉设计与线上延展", "项目展示"),
      asset("活动项目四", "002.png", 1601, 4132, "活动项目四线下空间视觉设计", "项目展示"),
      asset("活动项目四", "003.png", 1601, 5563, "活动项目四落地效果与项目成果", "项目展示"),
      asset("活动项目四", "004.png", 1601, 4215, "活动项目四周年活动视觉", "项目展示")
    ],
    problem:
      "活动需要同时承担品牌氛围、产品信息、信任建立和促单转化，线上线下物料必须形成连续体验。",
    approach:
      "以红色主视觉和雪莲溯源概念为核心，将信息分层应用到直播、展墙、发布区和场地节点。",
    result:
      "形成可复用的活动视觉资产，并覆盖线上传播、直播数据、线下展示和空间落地。",
    sections: [
      {
        title: "线上传播与直播",
        text: "主视觉用于活动预热、直播贴片和横版传播，保持统一的红色舞台感。",
        images: [
          asset("活动项目四", "封面.png", 703, 702, "沁丹活动方形封面", "项目封面"),
          asset("活动项目四", "线上图01.png", 438, 700, "沁丹线上活动海报一", "商业应用"),
          asset("活动项目四", "线上图2.png", 394, 699, "沁丹线上活动倒计时海报", "商业应用"),
          asset("活动项目四", "线上图3.png", 1327, 758, "沁丹线上横版主视觉", "项目背景")
        ]
      },
      {
        title: "线下空间设计",
        text: "空间视觉将品牌墙、新品详情区、发布场景和展陈节点统一到活动体验路径中。",
        images: [
          asset("活动项目四", "线下设计图1.png", 1235, 468, "沁丹线下长墙视觉设计", "商业应用"),
          asset("活动项目四", "线下设计图2.png", 997, 826, "沁丹线下入口展示设计", "商业应用"),
          asset("活动项目四", "线下设计图3.png", 1235, 407, "沁丹线下信息展墙设计", "商业应用"),
          asset("活动项目四", "线下设计图4.png", 1235, 470, "沁丹发布区横版设计", "商业应用"),
          asset("活动项目四", "线下设计图5.png", 996, 660, "沁丹发布区拱门视觉", "商业应用")
        ]
      },
      {
        title: "落地呈现",
        text: "现场图记录了设计从屏幕到空间的执行效果，适合以组合排版控制放大比例。",
        images: [
          asset("活动项目四", "落地图1.png", 1351, 446, "沁丹线下落地长墙实拍", "商业应用"),
          asset("活动项目四", "落地图2.png", 400, 336, "沁丹主视觉落地实拍", "商业应用"),
          asset("活动项目四", "落地图3.png", 335, 336, "沁丹入口装置落地实拍", "商业应用"),
          asset("活动项目四", "落地图4.png", 447, 336, "沁丹空间节点落地实拍", "商业应用"),
          asset("活动项目四", "落地图5.png", 1362, 571, "沁丹发布区落地实拍", "商业应用"),
          asset("活动项目四", "落地图6.png", 1348, 524, "沁丹活动信息墙落地实拍", "项目结尾展示")
        ]
      },
      {
        title: "活动结果",
        text: "直播数据记录活动落地后的传播表现。",
        images: [
          asset("活动项目四", "数据图.png", 1249, 740, "沁丹直播数据截图", "商业应用")
        ]
      }
    ]
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return undefined;
  }
  return projects[(index + 1) % projects.length];
}
