"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { JOURNEY } from "@/data/content";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { RevealText } from "@/components/motion/reveal-text";
import { RollingNumber } from "@/components/motion/rolling-number";
import { Reveal } from "@/components/motion/reveal";
import { JourneyVisual } from "./journey-visual";

/** Tons de fundo que progridem sutilmente a cada etapa. */
const BACKGROUNDS = ["#F6F1EA", "#F0E7DC", "#EADDCF", "#E4D4C4"];

export function Journey() {
  const desktop = useRef<HTMLDivElement>(null);
  const mobileLine = useRef<HTMLSpanElement>(null);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop: linha contínua e etapa ativa guiadas pela rolagem
  useEffect(() => {
    if (!pinned || !desktop.current) return;
    const root = desktop.current;
    const fill = root.querySelector<HTMLElement>("[data-line-fill]");
    const dot = root.querySelector<HTMLElement>("[data-line-dot]");
    let current = 0;

    const ctx = gsap.context(() => {
      const bg = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const next = Math.min(JOURNEY.length - 1, Math.floor(self.progress * JOURNEY.length));
            if (next !== current) {
              setDirection(next > current ? 1 : -1);
              current = next;
              setStep(next);
            }
          },
        },
      });
      bg.to(root, { keyframes: BACKGROUNDS.slice(1).map((c) => ({ backgroundColor: c, duration: 1 / 3 })), ease: "none" }, 0);
      bg.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
      bg.fromTo(dot, { left: "0%" }, { left: "100%", ease: "none", duration: 1 }, 0);
    }, root);

    return () => ctx.revert();
  }, [pinned]);

  // Mobile: linha vertical preenchida pela rolagem
  useEffect(() => {
    if (pinned || !mobileLine.current) return;
    const el = mobileLine.current;
    const tween = gsap.fromTo(
      el,
      { scaleY: 0 },
      { scaleY: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 70%", end: "bottom 60%", scrub: true } },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [pinned]);

  const header = (id?: string) => (
    <div className="max-w-[40rem]">
      <Reveal effect="fade" className="eyebrow mb-6 flex items-center gap-3 text-clay">
        <span className="h-px w-8 bg-clay" aria-hidden="true" /> Jornada de atendimento
      </Reveal>
      <RevealText
        as="h2"
        id={id}
        text={"Uma experiência construída *em torno de você.*"}
        className="text-[clamp(2.25rem,1.5rem+2.6vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-espresso"
        italicClassName="serif-italic text-clay"
      />
    </div>
  );

  return (
    <section id="experiencia" aria-labelledby="jornada-title" className="relative">
      {/* Desktop */}
      <div
        ref={desktop}
        className={cn("relative bg-bone", pinned ? "block" : "hidden")}
        style={{ height: pinned ? "calc(100svh * 4)" : undefined }}
      >
        <div className="layer sticky top-0 flex h-[100svh] flex-col pb-12 pt-[calc(var(--header-h)+3rem)]">
          <div className="shell flex flex-1 flex-col">
            {header(pinned ? "jornada-title" : undefined)}

            <div className="grid flex-1 grid-cols-12 items-center gap-8">
              <div className="col-span-4 font-display text-[clamp(10rem,6rem+10vw,19rem)] leading-[0.8] tracking-[-0.05em] text-espresso">
                <RollingNumber value={JOURNEY[step].number} direction={direction} />
              </div>

              <div className="col-span-3 flex items-center justify-center text-clay">
                <JourneyVisual step={step} className="aspect-square w-full max-w-[280px]" />
              </div>

              <div className="col-span-4 col-start-9 min-h-[14rem]" aria-live="polite">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 30 * direction, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20 * direction, filter: "blur(4px)" }}
                    transition={{ duration: 0.6, ease: EASE.out }}
                  >
                    <p className="eyebrow text-clay">Etapa {JOURNEY[step].number}</p>
                    <h3 className="mt-4 text-[clamp(2.25rem,1.6rem+1.6vw,3.5rem)] leading-none tracking-[-0.02em]">
                      {JOURNEY[step].title}
                    </h3>
                    <p className="mt-5 text-body text-stone">{JOURNEY[step].text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* linha contínua */}
            <div className="relative mt-6">
              <div className="relative h-px bg-espresso/15">
                <span data-line-fill className="absolute inset-0 origin-left bg-espresso" />
                <span
                  data-line-dot
                  className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-espresso bg-champagne"
                  aria-hidden="true"
                />
              </div>
              <ol className="mt-5 grid grid-cols-4">
                {JOURNEY.map((j, i) => (
                  <li
                    key={j.number}
                    className={cn(
                      "flex items-baseline gap-3 transition-colors duration-500",
                      i <= step ? "text-espresso" : "text-stone/60",
                    )}
                    aria-current={i === step ? "step" : undefined}
                  >
                    <span className="tabular text-[0.75rem]">{j.number}</span>
                    <span className="eyebrow">{j.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile, tablet e movimento reduzido — timeline vertical */}
      <div className={cn("paper bg-bone py-[var(--section-y)]", pinned ? "hidden" : "block")}>
        <div className="shell">
          {header(pinned ? undefined : "jornada-title")}
          <div className="relative mt-14 lg:mt-20">
          <span className="absolute bottom-6 left-[1.1rem] top-2 w-px bg-espresso/12 lg:hidden" aria-hidden="true">
            <span ref={mobileLine} className="absolute inset-0 origin-top bg-clay" />
          </span>
          <ol className="relative lg:grid lg:grid-cols-4 lg:gap-10">
            {JOURNEY.map((j, i) => (
              <Reveal as="li" key={j.number} delay={i * 0.05} className="relative pb-14 pl-14 last:pb-0 lg:pl-0">
                <span
                  className="tabular absolute left-0 top-0 flex size-9 items-center justify-center rounded-full border border-clay/50 bg-bone text-[0.75rem] font-semibold text-clay lg:static lg:mb-6"
                  aria-hidden="true"
                >
                  {j.number}
                </span>
                <div className="mb-5 w-28 text-clay/80 [--node-fill:#F6F1EA]">
                  <MobileVisual step={i} />
                </div>
                <h3 className="text-[clamp(1.875rem,1.4rem+2vw,2.5rem)] leading-none tracking-[-0.015em]">{j.title}</h3>
                <p className="mt-3 text-body text-stone">{j.text}</p>
              </Reveal>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileVisual({ step }: { step: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { rootMargin: "0px 0px -20% 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref}>{inView ? <JourneyVisual step={step} className="aspect-square w-full" /> : <div className="aspect-square w-full" />}</div>;
}
