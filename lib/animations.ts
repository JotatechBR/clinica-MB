/**
 * Linguagem de movimento do Espaço MB.
 * Curvas lentas na saída, sem rebote — o movimento deve parecer respirado.
 */
export const EASE = {
  /** Saída editorial, usada em revelações. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Entrada e saída suaves para trocas de estado. */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Máscaras e cortinas. */
  curtain: [0.76, 0, 0.24, 1] as const,
};

export const GSAP_EASE = {
  out: "expo.out",
  soft: "power3.out",
  inOut: "power2.inOut",
  curtain: "expo.inOut",
};

export const DURATION = {
  micro: 0.2,
  ui: 0.45,
  reveal: 0.9,
  cinematic: 1.3,
};

/** Durações reduzidas em telas de toque (animações mais curtas no mobile). */
export const mobileFactor = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches ? 0.7 : 1;
