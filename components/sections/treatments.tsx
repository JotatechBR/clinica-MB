"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TREATMENTS, TREATMENT_DISCLAIMER } from "@/data/treatments";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { MediaFrame } from "@/components/ui/media-frame";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";
import { RollingNumber } from "@/components/motion/rolling-number";

export function Treatments() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const t = TREATMENTS[active];

  const select = (i: number, focus = false) => {
    const next = (i + TREATMENTS.length) % TREATMENTS.length;
    setDirection(next >= active ? 1 : -1);
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => select(active + 1, true),
      ArrowRight: () => select(active + 1, true),
      ArrowUp: () => select(active - 1, true),
      ArrowLeft: () => select(active - 1, true),
      Home: () => select(0, true),
      End: () => select(TREATMENTS.length - 1, true),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    }
  };

  return (
    <section id="tratamentos" aria-labelledby="tratamentos-title" className="relative overflow-hidden bg-ivory py-[var(--section-y)]">
      {/* iluminação que acompanha a categoria */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{
          background: `radial-gradient(55% 60% at ${62 + active * 4}% ${30 + (active % 3) * 12}%, ${t.light}33, transparent 70%)`,
        }}
        transition={{ duration: 1.2, ease: EASE.out }}
      />

      <div className="shell layer grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal effect="fade" className="eyebrow mb-6 flex items-center gap-3 text-clay">
            <span className="h-px w-8 bg-clay" aria-hidden="true" /> Tratamentos
          </Reveal>
          <RevealText
            as="h2"
            id="tratamentos-title"
            text={"Diferentes necessidades. *Um cuidado individual.*"}
            className="text-[clamp(2.25rem,1.5rem+2.4vw,4rem)] leading-[1.02] tracking-[-0.02em] text-espresso"
            italicClassName="serif-italic text-clay"
          />

          <div
            role="tablist"
            aria-label="Categorias de tratamento"
            aria-orientation="vertical"
            onKeyDown={onKey}
            className="no-scrollbar -mx-[var(--gutter)] mt-10 flex snap-x gap-6 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:mt-14 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
          >
            {TREATMENTS.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.slug}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${item.slug}`}
                  aria-selected={selected}
                  aria-controls="painel-tratamento"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn(
                    "group relative flex min-h-12 shrink-0 snap-start items-baseline gap-3 text-left transition-colors duration-500 lg:gap-5 lg:border-t lg:border-espresso/10 lg:py-4",
                    selected ? "text-espresso" : "text-stone hover:text-espresso",
                  )}
                >
                  <span className="tabular text-[0.75rem] text-clay">{item.number}</span>
                  <span className="whitespace-nowrap text-[1rem] font-medium lg:text-[1.125rem]">{item.title}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0 left-0 h-px w-full origin-left bg-espresso transition-transform duration-700 ease-(--ease-editorial) lg:-top-px lg:bottom-auto",
                      selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-[0.25]",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Palco — altura estável */}
        <div
          id="painel-tratamento"
          role="tabpanel"
          aria-labelledby={`tab-${t.slug}`}
          className="lg:col-span-7 lg:col-start-6"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[16/11]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={t.slug}
                custom={direction}
                className="absolute inset-0"
                variants={{
                  enter: (d: number) => ({ clipPath: d > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }),
                  center: { clipPath: "inset(0% 0% 0% 0%)" },
                  exit: { opacity: 1 },
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1, ease: EASE.curtain }}
              >
                <motion.div
                  className="h-full w-full"
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: EASE.out }}
                >
                  <MediaFrame media={t.media} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full" interactive />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-2 font-display text-[clamp(4.5rem,3rem+6vw,9rem)] leading-none tracking-[-0.04em] text-ivory mix-blend-difference sm:right-6"
            >
              <RollingNumber value={t.number} direction={direction} />
            </div>
          </div>

          <div className="relative mt-8 grid min-h-[21rem] gap-6 sm:min-h-[17rem] md:grid-cols-12 lg:mt-10 lg:min-h-[15rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={t.slug}
                className="md:col-span-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE.out }}
              >
                <p className="eyebrow text-clay">{t.kicker}</p>
                <h3 className="mt-3 text-subtitle text-espresso sm:text-[clamp(1.75rem,1.2rem+1.4vw,2.5rem)] sm:leading-[1.1]">
                  {t.title}
                </h3>
                <p className="mt-4 text-body text-stone">{t.summary}</p>
                <Link
                  href={`/tratamentos/${t.slug}`}
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-espresso"
                >
                  <span className="link-line pb-1">Conhecer este cuidado</span>
                  <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </AnimatePresence>

            <ul className="md:col-span-4 md:col-start-9 md:pt-8" aria-label="Pontos do cuidado">
              {t.focus.map((f, i) => (
                <motion.li
                  key={`${t.slug}-${f}`}
                  className="flex items-center gap-4 border-t border-espresso/10 py-3 text-[0.9375rem] text-cocoa"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: EASE.out }}
                >
                  <span className="h-px w-4 bg-champagne-deep" aria-hidden="true" />
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>

          <p className="mt-8 flex items-center gap-3 border-t border-espresso/10 pt-5 text-[0.8125rem] text-stone">
            <span className="size-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
            {TREATMENT_DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  );
}
