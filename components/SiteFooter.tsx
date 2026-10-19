import Image from "next/image";
import { publicPath } from "@/lib/publicPath";

export function SiteFooter() {
  return (
    <footer id="contact" className="editorial-footer page-pad">
      <div className="site-max">
        <div className="editorial-footer-intro">
          <div className="editorial-footer-copy">
            <p>一起，让想法成形。</p>
            <span>品牌视觉 · 包装设计 · 商业视觉</span>
            <a href="#top" className="editorial-button focus-ring editorial-footer-top">返回顶部 ↑</a>
          </div>
          <figure className="editorial-footer-qr">
            <Image src={publicPath("/assets/personal-wechat-qr.png")} alt="微信个人二维码" width={1318} height={1318} sizes="(max-width: 767px) 128px, 160px" />
          </figure>
        </div>
      </div>
    </footer>
  );
}
