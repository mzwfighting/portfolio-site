import type { ComponentType, HTMLAttributes } from "react";

export type GalaxyProps = HTMLAttributes<HTMLDivElement> & {
  focal?: [number, number];
  rotation?: [number, number];
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  disableAnimation?: boolean;
  speed?: number;
  mouseInteraction?: boolean;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
  lightMode?: boolean;
};

declare const Galaxy: ComponentType<GalaxyProps>;

export default Galaxy;
