"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

/**
 * Rolagem suave (somente mouse/trackpad em desktop, sem movimento reduzido).
 * No toque, a rolagem nativa é preservada — nunca bloqueamos o scroll no mobile.
 */
export function SmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) {
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    }

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, anchors: false });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
