"use client";

import { useRef, useState } from "react";
import { publicPath } from "@/lib/publicPath";

export function CoverMusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.volume = 0.32;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={publicPath("/audio/portfolio-ambient.wav")} loop preload="none" />
      <button
        className="cover-music-toggle focus-ring"
        type="button"
        onClick={toggleMusic}
        aria-pressed={isPlaying}
      >
        {isPlaying ? "关闭背景音乐" : "开启背景音乐"}
      </button>
    </>
  );
}
