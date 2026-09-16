import type Lenis from "lenis";

/** Instância única do Lenis (smooth scroll), registrada por <SmoothScroll />. */
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

export function scrollToTarget(target: string | HTMLElement | number, opts: { immediate?: boolean } = {}) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement | number, { offset: 0, duration: 1.6, immediate: opts.immediate });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof el === "number") window.scrollTo({ top: el, behavior: reduce ? "auto" : "smooth" });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
