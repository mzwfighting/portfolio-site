import TextType from "./TextType";
import Link from "next/link";
import { CoverObjects } from "./CoverObjects";
import { CoverMusicToggle } from "./CoverMusicToggle";

const coverText = ["Hello, I’m Zhi Qiu\nWelcome to my portfolio."];

export function PortfolioCover() {
  return (
    <section className="universe-cover" aria-label="作品集欢迎页">
      <CoverObjects />
      <CoverMusicToggle />
      <h1>
        <TextType
          text={coverText}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor
          cursorCharacter="_"
          deletingSpeed={50}
          variableSpeedEnabled={false}
          variableSpeedMin={60}
          variableSpeedMax={120}
          cursorBlinkDuration={0.5}
          hideCursorOnComplete
        />
      </h1>
      <Link href="/#work" className="cover-enter focus-ring">
        点击查看
      </Link>
    </section>
  );
}
