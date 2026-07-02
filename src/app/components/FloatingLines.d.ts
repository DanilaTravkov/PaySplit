import type { ComponentType } from "react";

type Wave = "top" | "middle" | "bottom";

type WavePosition = {
  x?: number;
  y?: number;
  rotate?: number;
};

type FloatingLinesProps = {
  linesGradient?: string[];
  enabledWaves?: Wave[];
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: string;
};

declare const FloatingLines: ComponentType<FloatingLinesProps>;

export default FloatingLines;
