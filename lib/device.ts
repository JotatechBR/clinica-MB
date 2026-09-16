export type DeviceTier = "high" | "mid" | "low";

/**
 * Classifica o dispositivo para decidir a versão da experiência 3D.
 * high → escultura completa com refração
 * mid  → versão simplificada (celulares / tablets)
 * low  → composição estática (sem WebGL, economia de dados, hardware fraco, movimento reduzido)
 */
export function detectTier(): DeviceTier {
  if (typeof window === "undefined") return "low";
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "low";
  if (nav.connection?.saveData) return "low";
  if (nav.connection?.effectiveType && /(^|-)2g$/.test(nav.connection.effectiveType)) return "low";
  if ((nav.deviceMemory ?? 8) <= 2) return "low";
  if ((nav.hardwareConcurrency ?? 8) <= 2) return "low";

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return "low";
  } catch {
    return "low";
  }

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 1024;
  if (coarse || small || (nav.hardwareConcurrency ?? 8) <= 4) return "mid";
  return "high";
}
