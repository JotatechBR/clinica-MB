/**
 * Estado compartilhado entre DOM (ScrollTrigger / ponteiro) e a cena WebGL.
 * Objeto mutável — lido a cada frame, sem re-render do React.
 */
type Listener = (visible: boolean) => void;

export const stage = {
  /** Progresso da hero saindo da tela (0 → 1). */
  hero: 0,
  /** Progresso do manifesto fixado (0 → 1). */
  manifesto: 0,
  manifestoActive: false,
  /** Progresso da entrada do CTA final (0 → 1). */
  cta: 0,
  ctaActive: false,
  /** Ponteiro normalizado (-1 → 1). */
  pointer: { x: 0, y: 0 },
  /** Velocidade de rolagem normalizada. */
  velocity: 0,
  visible: true,
  listeners: new Set<Listener>(),
  setVisible(v: boolean) {
    if (v === this.visible) return;
    this.visible = v;
    this.listeners.forEach((l) => l(v));
  },
  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => {
      this.listeners.delete(l);
    };
  },
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};
/** Mapeia `v` de [a, b] para [0, 1] com suavização. */
export const range = (v: number, a: number, b: number) => smooth((v - a) / (b - a));

type Target = { x: number; y: number; scale: number; dark: number; spin: number };

/**
 * Coreografia: posições em frações da viewport (x: -0.5 esquerda → 0.5 direita; y: -0.5 topo → 0.5 base).
 */
export function computeTarget(mobile: boolean): Target {
  const h = stage.hero;
  const m = stage.manifesto;
  const c = stage.cta;

  if (stage.ctaActive) {
    const t = range(c, 0, 1);
    return mobile
      ? { x: 0.22, y: lerp(-0.1, -0.3, t), scale: lerp(0.3, 0.55, t), dark: 1, spin: c }
      : { x: 0.3, y: lerp(0.15, -0.02, t), scale: lerp(0.45, 0.72, t), dark: 1, spin: c };
  }

  if (stage.manifestoActive && m > 0) {
    const sweep = range(m, 0, 0.92);
    const out = range(m, 0.9, 1);
    return mobile
      ? { x: lerp(-0.18, 0.2, sweep), y: lerp(0.18, -0.2, sweep), scale: lerp(0.95, 0.4, out), dark: 1, spin: m * 3 }
      : {
          x: lerp(-0.28, 0.08, sweep),
          y: lerp(0.06, -0.04, Math.sin(sweep * Math.PI)),
          scale: lerp(1.25, 0.5, out),
          dark: 1,
          spin: m * 3,
        };
  }

  // Hero → transição para o manifesto
  return mobile
    ? { x: lerp(0.24, -0.18, range(h, 0.35, 1)), y: lerp(0.1, 0.18, h), scale: lerp(0.72, 0.95, range(h, 0.4, 1)), dark: range(h, 0.5, 1), spin: h }
    : { x: lerp(0.07, -0.28, range(h, 0.2, 1)), y: lerp(0.02, 0.06, h), scale: lerp(1, 1.25, range(h, 0.3, 1)), dark: range(h, 0.55, 1), spin: h };
}
