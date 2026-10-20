"use client";

import { useEffect, useRef, useState } from "react";
import { publicPath } from "@/lib/publicPath";

export function CoverMusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequestRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.32;
    const request = ++playRequestRef.current;
    void audio.play().then(() => {
      if (request === playRequestRef.current) setIsPlaying(true);
    }).catch(() => {
      if (request === playRequestRef.current) setIsPlaying(false);
    });
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      playRequestRef.current += 1;
      audio.pause();
      setIsPlaying(false);
      return;
    }

    const request = ++playRequestRef.current;
    audio.volume = 0.32;
    try {
      await audio.play();
      if (request === playRequestRef.current) setIsPlaying(true);
    } catch {
      if (request === playRequestRef.current) setIsPlaying(false);
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
