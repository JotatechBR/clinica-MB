"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor personalizado (somente ponteiro fino, sem movimento reduzido).
 * Elementos com `data-cursor="Texto"` exibem um rótulo contextual.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        dot.current?.style.setProperty("opacity", "1");
        ring.current?.style.setProperty("opacity", "1");
      }
      const target = e.target as HTMLElement | null;
      const ctx = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(ctx?.dataset.cursor ?? null);
      setHover(!!target?.closest("a, button, [role='tab'], [role='button'], summary, label"));
      setDark(!!target?.closest("[data-surface='dark']"));
    };

    const onLeave = () => {
      visible = false;
      dot.current?.style.setProperty("opacity", "0");
      ring.current?.style.setProperty("opacity", "0");
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const color = dark ? "#F6F1EA" : "#1B1715";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150]">
      <div ref={dot} className="absolute left-0 top-0 opacity-0 transition-opacity duration-300">
        <span
          className="absolute block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[transform,background-color] duration-300"
          style={{ backgroundColor: color, transform: `translate(-50%,-50%) scale(${label ? 0 : 1})` }}
        />
      </div>
      <div ref={ring} className="absolute left-0 top-0 opacity-0 transition-opacity duration-300">
        <span
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-(--ease-editorial)"
          style={{
            width: label ? 96 : hover ? 52 : 34,
            height: label ? 96 : hover ? 52 : 34,
            borderColor: label ? "transparent" : dark ? "rgb(246 241 234 / .45)" : "rgb(27 23 21 / .3)",
            backgroundColor: label ? "rgb(196 170 135 / .92)" : "transparent",
          }}
        >
          <span
            className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-ink transition-opacity duration-300"
            style={{ opacity: label ? 1 : 0 }}
          >
            {label}
          </span>
        </span>
      </div>
    </div>
  );
}
