import { cn } from "@/lib/utils";

/**
 * Composição estática otimizada — substitui a escultura WebGL em dispositivos
 * fracos, com movimento reduzido, e enquanto o canvas carrega.
 */
export function StaticSculpture({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const id = `ss-${tone}`;
  return (
    <svg viewBox="0 0 400 480" className={cn("h-auto w-full", className)} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-core`} cx="38%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#FFF8EE" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#E3CDB1" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#9B715F" stopOpacity="0.55" />
        </radialGradient>
        <linearGradient id={`${id}-lam`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4AA87" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#C4AA87" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C4AA87" stopOpacity="0.02" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      <ellipse cx="200" cy="250" rx="176" ry="46" fill="none" stroke="#C4AA87" strokeOpacity="0.5" strokeWidth="0.8" transform="rotate(-14 200 250)" />
      <path
        d="M200 88c62 4 104 54 106 124 2 58-22 104-58 138-24 22-56 36-86 30-52-10-92-62-96-132-4-78 58-164 134-160Z"
        fill={`url(#${id}-core)`}
        filter={`url(#${id}-soft)`}
      />
      <path d="M120 150c40-50 120-70 180-20" fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M58 250c10-110 110-190 230-150 40 14 70 44 84 78" fill="none" stroke={`url(#${id}-lam)`} strokeWidth="26" strokeLinecap="round" opacity="0.8" />
      <path d="M40 300c30 96 150 146 250 100" fill="none" stroke={`url(#${id}-lam)`} strokeWidth="14" strokeLinecap="round" opacity="0.7" />
      {[
        [70, 90],
        [340, 120],
        [360, 330],
        [52, 380],
        [300, 440],
        [150, 40],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#C4AA87" opacity="0.7" />
      ))}
    </svg>
  );
}
