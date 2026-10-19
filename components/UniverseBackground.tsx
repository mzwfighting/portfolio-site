import Galaxy from "./Galaxy";

export function UniverseBackground() {
  return (
      <div className="universe-galaxy" aria-hidden="true">
        <Galaxy
          starSpeed={0.36}
          density={0.58}
          hueShift={140}
          speed={1}
          glowIntensity={0.34}
          saturation={0}
          mouseRepulsion
          repulsionStrength={0.5}
          twinkleIntensity={0.12}
          rotationSpeed={0.1}
          transparent={false}
        />
      </div>
  );
}
