"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** Numeração editorial com troca vertical dígito a dígito. */
export function RollingNumber({ value, className, direction = 1 }: { value: string; className?: string; direction?: 1 | -1 }) {
  return (
    <span className={cn("tabular relative inline-flex overflow-hidden", className)} aria-live="off">
      {value.split("").map((digit, i) => (
        <span key={i} className="relative inline-block">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.span
              key={`${i}-${digit}`}
              className="inline-block"
              custom={direction}
              variants={{
                enter: (d: number) => ({ y: `${100 * d}%`, opacity: 0 }),
                center: { y: "0%", opacity: 1 },
                exit: (d: number) => ({ y: `${-100 * d}%`, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: EASE.out, delay: i * 0.06 }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
