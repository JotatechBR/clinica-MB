"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TECH_CONCEPTS, TECH_IMAGES } from "@/data/content";
import { EASE } from "@/lib/animations";
import { cn, pad } from "@/lib/utils";
import { MediaFrame } from "@/components/ui/media-frame";
import { Lightbox } from "@/components/ui/lightbox";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";
import { RollingNumber } from "@/components/motion/rolling-number";

export function Technology() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const list = useRef<HTMLOListElement>(null);
  const image = TECH_CONCEPTS[active].image;

  // conceito ativo acompanha a rolagem
  useEffect(() => {
    if (!list.current) return;
    const items = Array.from(list.current.querySelectorAll<HTMLElement>("[data-concept]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.concept));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologia-title"
      data-surface="dark"
      className="relative overflow-clip bg-espresso py-[var(--section-y)] text-bone"
    >
      {/* luz recortada */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] top-0 h-[70vh] w-[60vw] bg-[radial-gradient(closest-side,rgb(196_170_135/0.14),transparent)]"
      />

      <div className="shell layer">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal effect="fade" className="eyebrow mb-6 flex items-center gap-3 text-champagne">
              <span className="h-px w-8 bg-champagne" aria-hidden="true" /> Tecnologias
            </Reveal>
            <RevealText
              as="h2"
              id="tecnologia-title"
              text={"Tecnologia com *propósito.*"}
              className="text-section text-bone"
              italicClassName="serif-italic text-champagne"
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body text-mist">
              Recursos tecnológicos, incluindo tecnologias a laser, integrados a um planejamento individual — utilizados
              quando fazem sentido para cada paciente.
            </p>
          </Reveal>
        </header>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Galeria ativa (desktop fixa) */}
          <div className="lg:col-span-6 lg:col-start-1">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <button
                type="button"
                data-cursor="Explorar"
                onClick={() => setLightbox(image)}
                className="group relative block aspect-[4/5] w-full overflow-hidden bg-ink text-left lg:aspect-auto lg:h-[calc(100svh-var(--header-h)-6rem)]"
                aria-label={`Explorar imagem: ${TECH_IMAGES[image].caption}`}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={image}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0.6, transition: { duration: 0.9 } }}
                    transition={{ duration: 1.1, ease: EASE.curtain }}
                  >
                    <MediaFrame
                      media={TECH_IMAGES[image]}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="h-full w-full transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:scale-[1.02]"
                      interactive
                    />
                  </motion.div>
                </AnimatePresence>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(16_14_13/0.7))]"
                />
                <span className="absolute left-5 top-5 flex items-baseline gap-2 font-display text-bone" aria-hidden="true">
                  <RollingNumber value={pad(image + 1)} className="text-3xl" />
                  <span className="text-sm text-mist">/ {pad(TECH_IMAGES.length)}</span>
                </span>
              </button>
              <p className="eyebrow mt-4 flex justify-between text-mist">
                <span>{TECH_IMAGES[image].caption}</span>
                <span className="hidden sm:inline">Espaço MB</span>
              </p>
            </div>
          </div>

          {/* Conceitos */}
          <ol ref={list} className="lg:col-span-5 lg:col-start-8">
            {TECH_CONCEPTS.map((c, i) => (
              <li
                key={c.code}
                data-concept={i}
                className={cn(
                  "border-t border-bone/10 py-10 transition-opacity duration-700 lg:flex lg:min-h-[52svh] lg:flex-col lg:justify-center lg:py-12",
                  active === i ? "lg:opacity-100" : "lg:opacity-35",
                )}
              >
                <p className="tabular eyebrow text-champagne">{c.code}</p>
                <h3 className="mt-4 text-[clamp(2rem,1.4rem+1.8vw,3.25rem)] leading-[1.02] tracking-[-0.015em]">{c.title}</h3>
                <p className="mt-4 max-w-[30rem] text-body text-mist">{c.text}</p>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-8 hidden h-px w-24 origin-left bg-champagne transition-transform duration-1000 ease-(--ease-editorial) lg:block",
                    active === i ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Lightbox items={TECH_IMAGES} index={lightbox} onChange={setLightbox} label="Galeria de tecnologias" />
    </section>
  );
}
