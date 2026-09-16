"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Recalcula os ScrollTriggers quando a altura da página muda
 * (troca de layouts responsivos, imagens, fontes).
 */
export function ScrollRefresher() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let lastHeight = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) < 2) return;
      lastHeight = h;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    ro.observe(document.body);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);
  return null;
}
