"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";

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
  typingSound?: boolean;
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
  typingSound = false,
  className = ""
}: TextTypeProps) {
  const phrases = useMemo(() => toTextArray(text, texts), [text, texts]);
  const typingElementRef = useRef<HTMLSpanElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const typingNoiseRef = useRef<AudioBuffer | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = phrases[phraseIndex] ?? "";
  const visibleText = currentPhrase.slice(0, characterIndex);
  const shouldLoop = phrases.length > 1;
  const isComplete = !shouldLoop && !isDeleting && characterIndex === currentPhrase.length;
  const shouldShowCursor = showCursor && !(hideCursorOnComplete && isComplete);

  useEffect(() => {
    const cover = typingElementRef.current?.closest(".universe-cover");
    if (!cover) return;

    let hasObserved = false;
    let wasVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      if (!hasObserved) {
        hasObserved = true;
        wasVisible = isVisible;
        return;
      }
      if (isVisible && !wasVisible) {
        setPhraseIndex(0);
        setCharacterIndex(0);
        setIsDeleting(false);
      }
      wasVisible = isVisible;
    }, { threshold: 0.5 });

    observer.observe(cover);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!typingSound || !window.AudioContext) return;

    const context = new AudioContext();
    const noise = context.createBuffer(1, Math.ceil(context.sampleRate * 0.03), context.sampleRate);
    const samples = noise.getChannelData(0);
    for (let index = 0; index < samples.length; index += 1) samples[index] = Math.random() * 2 - 1;

    audioContextRef.current = context;
    typingNoiseRef.current = noise;
    // shortcut: browsers keep typing audio silent until the first user gesture.
    const unlock = () => {
      if (context.state === "suspended") void context.resume();
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      audioContextRef.current = null;
      typingNoiseRef.current = null;
      void context.close();
    };
  }, [typingSound]);

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
        if (currentPhrase[characterIndex] !== "\n") {
          const context = audioContextRef.current;
          const noise = typingNoiseRef.current;
          if (context?.state === "running" && noise) {
            const source = context.createBufferSource();
            const filter = context.createBiquadFilter();
            const gain = context.createGain();
            const now = context.currentTime;
            source.buffer = noise;
            filter.type = "highpass";
            filter.frequency.value = 900;
            gain.gain.setValueAtTime(0.025, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
            source.connect(filter).connect(gain).connect(context.destination);
            source.start(now);
            source.stop(now + 0.03);
          }
        }
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
      ref={typingElementRef}
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
