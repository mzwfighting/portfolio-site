"use client";

import { type CSSProperties, useEffect, useMemo, useState } from "react";

type TextTypeProps = {
  text?: string | string[];
  texts?: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  deletingSpeed?: number;
  variableSpeedEnabled?: boolean;
  variableSpeedMin?: number;
  variableSpeedMax?: number;
  cursorBlinkDuration?: number;
  hideCursorOnComplete?: boolean;
  className?: string;
};

const toTextArray = (text?: string | string[], texts?: string[]) => {
  const source = texts && texts.length > 0 ? texts : text;

  if (Array.isArray(source)) {
    return source.filter(Boolean);
  }

  return source ? [source] : [];
};

const randomDelay = (min: number, max: number) => {
  const low = Math.max(0, Math.min(min, max));
  const high = Math.max(min, max);
  return low + Math.random() * (high - low);
};

export default function TextType({
  text,
  texts,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "_",
  deletingSpeed = 50,
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  cursorBlinkDuration = 0.5,
  hideCursorOnComplete = false,
  className = ""
}: TextTypeProps) {
  const phrases = useMemo(() => toTextArray(text, texts), [text, texts]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = phrases[phraseIndex] ?? "";
  const visibleText = currentPhrase.slice(0, characterIndex);
  const shouldLoop = phrases.length > 1;
  const isComplete = !shouldLoop && !isDeleting && characterIndex === currentPhrase.length;
  const shouldShowCursor = showCursor && !(hideCursorOnComplete && isComplete);

  useEffect(() => {
    if (phrases.length === 0) {
      return;
    }

    let delay = variableSpeedEnabled
      ? randomDelay(variableSpeedMin, variableSpeedMax)
      : typingSpeed;

    if (!isDeleting && characterIndex === currentPhrase.length) {
      if (!shouldLoop) {
        return;
      }

      delay = pauseDuration;
    }

    if (isDeleting && characterIndex === 0) {
      delay = typingSpeed;
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && characterIndex < currentPhrase.length) {
        setCharacterIndex((index) => index + 1);
        return;
      }

      if (!isDeleting && characterIndex === currentPhrase.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && characterIndex > 0) {
        setCharacterIndex((index) => index - 1);
        return;
      }

      setIsDeleting(false);
      setPhraseIndex((index) => (index + 1) % phrases.length);
    }, isDeleting ? deletingSpeed : delay);

    return () => window.clearTimeout(timeout);
  }, [
    characterIndex,
    currentPhrase,
    deletingSpeed,
    isDeleting,
    pauseDuration,
    phrases.length,
    shouldLoop,
    typingSpeed,
    variableSpeedEnabled,
    variableSpeedMax,
    variableSpeedMin
  ]);

  const lines = visibleText.split("\n");

  return (
    <span
      className={`text-type ${className}`}
      data-complete={isComplete || undefined}
      style={{ "--cursor-blink-duration": `${cursorBlinkDuration}s` } as CSSProperties}
      aria-label={currentPhrase}
    >
      {lines.map((line, index) => {
        const isLastLine = index === lines.length - 1;

        return (
          <span className="text-type-line" key={`${index}-${line}`}>
            {line}
            {shouldShowCursor && isLastLine ? (
              <span className="text-type-cursor" aria-hidden="true">
                {cursorCharacter}
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}
