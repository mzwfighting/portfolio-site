import type { Metadata } from "next";
import "./globals.css";
import "./portfolio-theme.css";
import { SiteFooter } from "@/components/SiteFooter";
import { UniverseBackground } from "@/components/UniverseBackground";

export const metadata: Metadata = {
  title: "Brand Visual Portfolio",
  description: "品牌视觉、包装设计、产品视觉与商业视觉方向作品集。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <div className="site-universe-background" aria-hidden="true">
          <UniverseBackground />
        </div>
        <main id="top">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
