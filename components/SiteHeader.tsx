import Link from "next/link";

const navItems = [
  { href: "/#work", label: "作品" },
  { href: "/#resume", label: "关于" },
  { href: "/#contact", label: "联系" }
];

export function SiteHeader() {
  return (
    <header className="editorial-header">
      <div className="site-max editorial-header-inner">
        <Link href="/" className="focus-ring editorial-wordmark" aria-label="之秋作品集首页">ZHI QIU.</Link>
        <nav aria-label="主导航">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring">{item.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
