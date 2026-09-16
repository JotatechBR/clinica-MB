import { memo } from "react";

/**
 * Linhas topográficas orgânicas, geradas de forma determinística a partir de uma semente.
 * Evocam curvas faciais e camadas da pele sem representar um rosto literal.
 */

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function contour(cx: number, cy: number, r: number, rand: () => number, stretch = 1.35) {
  const steps = 72;
  const a1 = rand() * Math.PI * 2;
  const a2 = rand() * Math.PI * 2;
  const k1 = 0.06 + rand() * 0.05;
  const k2 = 0.03 + rand() * 0.03;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const rr = r * (1 + k1 * Math.sin(t * 2 + a1) + k2 * Math.sin(t * 3 + a2));
    const x = cx + Math.cos(t) * rr;
    const y = cy + Math.sin(t) * rr * stretch;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

type Props = {
  seed?: string;
  rings?: number;
  className?: string;
  cx?: number;
  cy?: number;
  strokeWidth?: number;
};

export const TopoLines = memo(function TopoLines({
  seed = "mb",
  rings = 14,
  className,
  cx = 62,
  cy = 48,
  strokeWidth = 0.6,
}: Props) {
  const rand = hash(seed);
  const paths = Array.from({ length: rings }, (_, i) => {
    const drift = (rand() - 0.5) * 3;
    return contour(cx + drift, cy + drift * 0.6, 6 + i * 5.2, rand);
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          opacity={1 - i / (rings * 1.25)}
        />
      ))}
    </svg>
  );
});
