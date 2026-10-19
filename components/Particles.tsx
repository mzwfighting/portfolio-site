"use client";

import { useEffect, useRef } from "react";

type ParticlesProps = {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  color: string;
  drift: number;
};

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

export function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors = ["#ffffff"],
  moveParticlesOnHover = true,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  className = ""
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const parent = canvas.parentElement ?? canvas;
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    let lastTime = performance.now();
    let rotation = 0;

    const createParticle = (): Particle => ({
      x: randomBetween(-particleSpread, particleSpread),
      y: randomBetween(-particleSpread, particleSpread),
      z: randomBetween(0, particleSpread * 2),
      size: (particleBaseSize / 85) * (0.35 + Math.random() * Math.max(sizeRandomness, 0.1)),
      alpha: alphaParticles ? randomBetween(0.35, 1) : 1,
      color: particleColors[Math.floor(Math.random() * particleColors.length)] ?? "#ffffff",
      drift: randomBetween(-0.35, 0.35)
    });

    let particles = Array.from({ length: particleCount }, createParticle);

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time: number) => {
      const delta = Math.min(time - lastTime, 48);
      lastTime = time;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#000000";
      context.fillRect(0, 0, width, height);

      if (!disableRotation) {
        rotation += delta * speed * 0.00016;
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const fieldScale = Math.min(width, height) / Math.max(particleSpread * 2.15, 1);
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);

      for (const particle of particles) {
        particle.z -= delta * speed * 0.004;
        particle.y += particle.drift * delta * speed * 0.0005;

        if (particle.z < -cameraDistance * 0.24) {
          particle.x = randomBetween(-particleSpread, particleSpread);
          particle.y = randomBetween(-particleSpread, particleSpread);
          particle.z = particleSpread * 2;
          particle.drift = randomBetween(-0.35, 0.35);
        }

        const rotatedX = particle.x * cos - particle.y * sin;
        const rotatedY = particle.x * sin + particle.y * cos;
        const perspective = cameraDistance / Math.max(cameraDistance + particle.z, 0.1);
        let screenX = centerX + rotatedX * fieldScale * perspective;
        let screenY = centerY + rotatedY * fieldScale * perspective;

        if (moveParticlesOnHover && pointer.active) {
          const dx = screenX - pointer.x;
          const dy = screenY - pointer.y;
          const distance = Math.hypot(dx, dy);
          const radius = Math.min(width, height) * 0.22;

          if (distance < radius && distance > 0.01) {
            const force = (1 - distance / radius) * particleHoverFactor;
            screenX += (dx / distance) * force * 34;
            screenY += (dy / distance) * force * 34;
          }
        }

        const radius = Math.max(0.45, particle.size * perspective);
        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(screenX, screenY, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      particles = [];
    };
  }, [
    alphaParticles,
    cameraDistance,
    disableRotation,
    moveParticlesOnHover,
    particleBaseSize,
    particleColors,
    particleCount,
    particleHoverFactor,
    particleSpread,
    sizeRandomness,
    speed
  ]);

  return <canvas ref={canvasRef} className={`particles-canvas ${className}`} aria-hidden="true" />;
}
