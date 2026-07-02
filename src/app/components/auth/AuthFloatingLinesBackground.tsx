"use client";

import FloatingLines from "../FloatingLines";

export function AuthFloatingLinesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 opacity-55">
        <FloatingLines
          linesGradient={["#14b8a6", "#22d3ee", "#8b5cf6"]}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[7, 9, 7]}
          lineDistance={[7, 5, 8]}
          topWavePosition={{ x: 0.5, y: 0.18, rotate: -0.35 }}
          middleWavePosition={{ x: 0.15, y: 0.02, rotate: 0.2 }}
          bottomWavePosition={{ x: 0.35, y: -0.28, rotate: -0.65 }}
          animationSpeed={0.42}
          interactive={false}
          parallax={false}
          bendStrength={-0.35}
          mixBlendMode="screen"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,8,15,0.18)_0%,rgba(5,8,15,0.54)_58%,#05080f_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,8,15,0.25),rgba(5,8,15,0.82))]" />
    </div>
  );
}
