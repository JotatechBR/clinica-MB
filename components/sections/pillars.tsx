"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { PILLARS } from "@/data/content";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { MediaFrame } from "@/components/ui/media-frame";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";

export function Pillars() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  return (
    <section
      id="clinica"
      aria-labelledby="pilares-title"
      className="relative py-[var(--section-y)] transition-colors duration-1000 ease-(--ease-editorial)"
      style={{ backgroundColor: PILLARS[active].tint }}
    >
      <div className="shell layer">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal effect="fade" className="eyebrow mb-6 flex items-center gap-3 text-clay">
              <span className="h-px w-8 bg-clay" aria-hidden="true" /> A clínica
            </Reveal>
            <RevealText
              as="h2"
              id="pilares-title"
              text={"Cuidado que começa pela *compreensão.*"}
              className="text-section max-w-[14ch] text-espresso"
              italicClassName="serif-italic text-clay"
            />
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body text-stone">
              Seis frentes de cuidado conectadas por um mesmo olhar: entender cada paciente antes de propor qualquer
              caminho.
            </p>
          </Reveal>
        </header>

        {/* Desktop — painéis sobrepostos em vitrine horizontal */}
        <ul className="mt-16 hidden h-[min(76vh,760px)] min-h-[560px] gap-[3px] lg:flex" aria-label="Pilares do Espaço MB">
          {PILLARS.map((p, i) => {
            const isActive = active === i;
            return (
              <li
                key={p.number}
                className="relative min-w-0 overflow-hidden transition-[flex-grow] duration-[900ms] ease-(--ease-editorial)"
                style={{ flexGrow: isActive ? 4.6 : 1, flexBasis: 0 }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={isActive}
                  aria-controls={`pilar-${i}`}
                  className="absolute inset-0 z-10 text-left"
                >
                  <span className="sr-only">{p.title}</span>
                </button>

                <MediaFrame
                  media={p.media}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={cn(
                    "absolute inset-0 transition-[filter] duration-700",
                    isActive ? "grayscale-0" : "grayscale-[35%]",
                  )}
                  label={isActive ? "compact" : "none"}
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 transition-opacity duration-700",
                    isActive
                      ? "bg-[linear-gradient(180deg,rgb(16_14_13/0.35)_0%,rgb(16_14_13/0)_30%,rgb(16_14_13/0)_45%,rgb(16_14_13/0.78)_100%)]"
                      : "bg-[linear-gradient(180deg,rgb(89_68_59/0.55),rgb(27_23_21/0.7))]",
                  )}
                />

                {/* número */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "tabular absolute left-6 top-6 font-display text-[1.75rem] leading-none text-bone transition-transform duration-700 ease-(--ease-editorial)",
                    isActive ? "translate-x-2 translate-y-1" : "",
                  )}
                >
                  {p.number}
                </span>

                {/* título vertical (inativo) */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[1.6rem] leading-none text-bone transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180",
                    isActive ? "opacity-0" : "opacity-100 delay-300",
                  )}
                >
                  {p.title}
                </span>

                {/* conteúdo ativo */}
                <div
                  id={`pilar-${i}`}
                  className="pointer-events-none absolute inset-x-0 bottom-0 p-8 text-bone xl:p-10"
                >
                  <motion.div
                    initial={false}
                    animate={
                      isActive
                        ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.out, delay: 0.35 } }
                        : { opacity: 0, y: 16, transition: { duration: 0.25 } }
                    }
                    className="w-[min(34rem,90%)] min-w-[26rem]"
                  >
                    <h3 className="text-[clamp(2rem,1rem+2vw,3.25rem)] leading-[1.02] tracking-[-0.015em]">{p.title}</h3>
                    <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-relaxed text-bone/85">{p.description}</p>
                  </motion.div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-6 block h-px origin-left bg-champagne transition-transform duration-[1100ms] ease-(--ease-editorial)",
                      isActive ? "scale-x-100 delay-200" : "scale-x-0",
                    )}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        {/* Mobile e tablet — narrativa vertical com toque */}
        <ol className="mt-14 flex flex-col gap-12 lg:hidden">
          {PILLARS.map((p, i) => {
            const open = openMobile === i;
            return (
              <Reveal as="li" key={p.number} effect="rise">
                <MediaFrame media={p.media} sizes="100vw" className="aspect-[16/10] w-full" label="compact" />
                <h3 className="mt-5">
                <button
                  type="button"
                  onClick={() => setOpenMobile(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`pilar-m-${i}`}
                  className="flex w-full items-start gap-4 text-left active:opacity-70"
                >
                  <span className="tabular pt-2 font-display text-lg text-clay">{p.number}</span>
                  <span className="flex-1 font-display text-[clamp(1.875rem,1.2rem+3vw,2.75rem)] leading-[1.05] tracking-[-0.015em]">{p.title}</span>
                  <span
                    className={cn(
                      "mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-espresso/15 transition-transform duration-500",
                      open && "rotate-45",
                    )}
                    aria-hidden="true"
                  >
                    <Plus size={16} strokeWidth={1.5} />
                  </span>
                </button>
                </h3>
                <motion.div
                  id={`pilar-m-${i}`}
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE.out }}
                  className="overflow-hidden"
                >
                  <p className="pl-10 pt-3 text-body text-stone">{p.description}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
