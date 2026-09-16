"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExperience } from "@/components/providers/experience-provider";
import { EASE } from "@/lib/animations";
import { lockScroll } from "@/lib/scroll";

const DURATION = 1150; // ms — progresso; a revelação completa fica em ~1,5 s

/**
 * Entrada: fundo espresso, monograma MB, linha champagne desenhada,
 * progresso discreto e revelação por máscara vertical.
 */
export function Preloader() {
  const { completeIntro } = useExperience();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 250 : DURATION;
    lockScroll(true);
    const start = performance.now();
    let raf = 0;
    let fontsReady = false;
    document.fonts?.ready.then(() => (fontsReady = true));

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      // aguarda as fontes por no máximo +300 ms para evitar troca visível
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * (fontsReady || now - start > total + 300 ? 100 : 96));
      setProgress(value);
      if (value >= 100) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!done) return;
    lockScroll(false);
    const t = setTimeout(completeIntro, 180);
    return () => clearTimeout(t);
  }, [done, completeIntro]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          data-preloader
          role="status"
          aria-live="polite"
          aria-label="Carregando Espaço MB"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-espresso text-bone"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.75, ease: EASE.curtain }}
        >
          <div className="grain !absolute" />
          <motion.div
            className="relative flex flex-col items-center"
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE.out }}
          >
            <motion.p
              className="font-display text-[clamp(4.5rem,3rem+6vw,8rem)] leading-none tracking-[-0.04em]"
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: EASE.out }}
            >
              M<span className="serif-italic text-champagne">B</span>
            </motion.p>

            <svg width="180" height="12" viewBox="0 0 180 12" className="mt-6 overflow-visible" aria-hidden="true">
              <path d="M0 6 C 45 1, 135 11, 180 6" fill="none" stroke="#3a322d" strokeWidth="1" />
              <motion.path
                d="M0 6 C 45 1, 135 11, 180 6"
                fill="none"
                stroke="#C4AA87"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 0.12, ease: "linear" }}
              />
            </svg>

            <div className="mt-5 flex w-[180px] items-center justify-between text-[0.6875rem] uppercase tracking-[0.22em] text-sand/70">
              <span>Espaço MB</span>
              <span ref={counterRef} className="tabular">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
