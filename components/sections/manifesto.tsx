"use client";

import { useEffect, useRef, useState } from "react";
import { MANIFESTO } from "@/data/content";
import { MEDIA } from "@/data/media";
import { gsap } from "@/lib/gsap";
import { pad } from "@/lib/utils";
import { MediaFrame } from "@/components/ui/media-frame";
import { RollingNumber } from "@/components/motion/rolling-number";

/** Palavras destacadas em itálico em cada frase. */
const EMPHASIS = ["própria identidade", "cada mudança", "precisão", "você."];

function renderPhrase(text: string, emphasis: string) {
  const i = text.lastIndexOf(emphasis);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <em className="serif-italic text-champagne">{emphasis}</em>
      {text.slice(i + emphasis.length)}
    </>
  );
}

/**
 * Manifesto guiado pela rolagem: a seção fica fixada (sticky) enquanto o
 * ScrollTrigger coreografa as frases com máscara, desfoque e profundidade.
 * Sem animação, as frases são exibidas em sequência normal.
 */
export function Manifesto() {
  const section = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimated(true);
  }, []);

  useEffect(() => {
    if (!animated || !section.current) return;
    const root = section.current;
    const phrases = gsap.utils.toArray<HTMLElement>("[data-phrase]", root);
    const image = root.querySelector<HTMLElement>("[data-manifesto-image]");
    const line = root.querySelector<HTMLElement>("[data-manifesto-line]");
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 60%",
          end: "bottom bottom",
          scrub: mobile ? 0.4 : 0.8,
          onUpdate: (self) => {
            const i = Math.min(phrases.length - 1, Math.floor(self.progress * phrases.length * 0.999));
            setIndex(i);
          },
        },
      });

      phrases.forEach((el, i) => {
        const at = i;
        const inner = el.querySelector("[data-phrase-inner]");
        // cada frase entra com uma variação própria de profundidade
        const depth = [1.12, 0.9, 1.08, 0.94][i % 4];
        const yIn = [60, -40, 40, -30][i % 4];
        tl.fromTo(
          el,
          { clipPath: i % 2 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)", opacity: 1 },
          { clipPath: "inset(-20% 0% -20% 0%)", duration: 0.4 },
          at,
        );
        tl.fromTo(
          inner,
          { yPercent: yIn / 2, scale: depth, filter: "blur(14px)", letterSpacing: "0.04em" },
          { yPercent: 0, scale: 1, filter: "blur(0px)", letterSpacing: "-0.015em", duration: 0.45 },
          at,
        );
        if (i < phrases.length - 1) {
          tl.to(inner, { yPercent: -yIn / 3, scale: 2 - depth, filter: "blur(10px)", opacity: 0, duration: 0.35 }, at + 0.65);
        } else {
          tl.to(inner, { duration: 0.3 }, at + 0.7);
        }
      });

      if (image) {
        tl.fromTo(image, { yPercent: 35, scale: 1.1 }, { yPercent: -35, scale: 1, duration: phrases.length }, 0);
      }
      if (line) {
        tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: phrases.length }, 0);
      }
    }, root);

    return () => ctx.revert();
  }, [animated]);

  return (
    <section
      id="manifesto"
      ref={section}
      aria-label="Manifesto do Espaço MB"
      data-surface="dark"
      className="relative bg-ink text-bone"
      style={animated ? { height: "calc(100svh * 4.4)" } : undefined}
    >
      {/* transição orgânica a partir da hero */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[10vh] w-full -translate-y-[99%] text-ink"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d="M0 100 C 360 100, 520 18, 860 30 C 1120 40, 1260 80, 1440 64 L1440 100 Z" fill="currentColor" />
      </svg>

      <div className={animated ? "layer sticky top-0 h-[100svh] overflow-hidden" : "layer py-[var(--section-y)]"}>
        {/* imagem em deslocamento */}
        <div
          data-manifesto-image
          className={
            animated
              ? "absolute right-[var(--gutter)] top-[18svh] w-[34vw] max-w-[420px] opacity-60 md:w-[22vw] md:opacity-90"
              : "shell mb-16 max-w-md"
          }
        >
          <MediaFrame media={MEDIA.manifesto} sizes="(min-width: 768px) 22vw, 34vw" className="aspect-[3/4] w-full" label="compact" overscan />
        </div>

        <div className={animated ? "shell relative flex h-full items-center" : "shell"}>
          <p className="eyebrow absolute left-0 top-[calc(var(--header-h)+2rem)] flex items-center gap-3 text-champagne">
            <span className="h-px w-8 bg-champagne" aria-hidden="true" /> Manifesto
          </p>

          <ol className={animated ? "relative w-full md:w-[74%]" : "mt-16 space-y-12"}>
            {MANIFESTO.map((text, i) => (
              <li
                key={text}
                data-phrase
                className={animated ? "absolute inset-x-0 top-1/2 -translate-y-1/2" : ""}
                style={animated ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}
              >
                <p
                  data-phrase-inner
                  className="origin-left font-display text-[clamp(2.4rem,1.2rem+4.6vw,6.25rem)] font-medium leading-[1.02] tracking-[-0.015em] will-change-transform"
                >
                  {renderPhrase(text, EMPHASIS[i])}
                </p>
              </li>
            ))}
          </ol>

          {animated && (
            <div className="absolute bottom-[calc(2.5rem+var(--safe-bottom))] left-0 flex items-end gap-5" aria-hidden="true">
              <span className="relative block h-20 w-px bg-bone/15">
                <span data-manifesto-line className="absolute inset-0 origin-top bg-champagne" />
              </span>
              <span className="eyebrow flex items-baseline gap-2 text-sand">
                <RollingNumber value={pad(index + 1)} className="font-display text-2xl tracking-normal text-bone" />
                <span className="text-mist">/ {pad(MANIFESTO.length)}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
