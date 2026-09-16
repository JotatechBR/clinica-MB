"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Parallax por profundidade. `speed` positivo move mais devagar que a página;
 * negativo, na direção contrária. Desativado com movimento reduzido.
 */
export function Parallax({
  children,
  speed = 0.15,
  className,
  axis = "y",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  axis?: "x" | "y";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const amount = speed * (mobile ? 0.5 : 1) * 100;
    const tween = gsap.fromTo(
      el,
      { [axis === "y" ? "yPercent" : "xPercent"]: -amount / 2 },
      {
        [axis === "y" ? "yPercent" : "xPercent"]: amount / 2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, axis]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

export { ScrollTrigger };
