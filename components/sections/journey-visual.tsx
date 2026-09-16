"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/animations";

/**
 * Detalhes visuais abstratos de cada etapa da jornada — desenhados em linha,
 * sem representar pessoas ou resultados.
 */
const draw = (delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.3 } },
  transition: { duration: 1.4, ease: EASE.out, delay },
});

function Listening() {
  return (
    <>
      {[40, 70, 100, 130].map((r, i) => (
        <motion.circle key={r} cx="160" cy="160" r={r} fill="none" stroke="currentColor" strokeWidth="1" {...draw(i * 0.12)} />
      ))}
      <motion.circle cx="160" cy="160" r="4" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, ease: EASE.out }} />
    </>
  );
}

function Evaluation() {
  return (
    <>
      <motion.path
        d="M160 36 C 230 40, 272 100, 268 168 C 264 236, 214 286, 156 284 C 96 282, 52 230, 56 160 C 60 94, 100 34, 160 36 Z"
        fill="none"
        stroke="currentColor"
        {...draw(0)}
      />
      <motion.path
        d="M160 76 C 210 80, 236 118, 232 166 C 228 212, 196 246, 156 244 C 116 242, 90 206, 92 160 C 94 116, 118 74, 160 76 Z"
        fill="none"
        stroke="currentColor"
        {...draw(0.15)}
      />
      <motion.path d="M160 12 V 308 M12 160 H 308" stroke="currentColor" strokeDasharray="2 6" {...draw(0.3)} />
      {[
        [228, 118],
        [104, 214],
      ].map(([x, y], i) => (
        <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.2 }}>
          <circle cx={x} cy={y} r="5" fill="none" stroke="currentColor" />
          <path d={`M${x + 8} ${y} H ${x + 38}`} stroke="currentColor" />
        </motion.g>
      ))}
    </>
  );
}

function Planning() {
  const nodes = [
    [60, 240],
    [120, 180],
    [190, 200],
    [260, 90],
  ];
  return (
    <>
      {[80, 160, 240].map((v) => (
        <motion.path key={`h${v}`} d={`M30 ${v} H290`} stroke="currentColor" strokeOpacity="0.35" {...draw(0)} />
      ))}
      {[80, 160, 240].map((v) => (
        <motion.path key={`v${v}`} d={`M${v} 30 V290`} stroke="currentColor" strokeOpacity="0.35" {...draw(0.1)} />
      ))}
      <motion.path d={`M${nodes.map((n) => n.join(" ")).join(" L ")}`} fill="none" stroke="currentColor" strokeWidth="1.5" {...draw(0.35)} />
      {nodes.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="6" fill="var(--node-fill, #F6F1EA)" stroke="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.18, duration: 0.5, ease: EASE.out }} />
      ))}
    </>
  );
}

function FollowUp() {
  return (
    <>
      <motion.path d="M30 290 H290" stroke="currentColor" {...draw(0)} />
      {[70, 130, 190, 250].map((x, i) => (
        <motion.path key={x} d={`M${x} 284 V296`} stroke="currentColor" {...draw(0.1 + i * 0.05)} />
      ))}
      <motion.path d="M30 230 C 90 226, 110 180, 160 170 S 240 120, 290 110" fill="none" stroke="currentColor" strokeWidth="1.5" {...draw(0.3)} />
      <motion.path d="M30 250 C 100 246, 120 214, 170 204 S 250 170, 290 160" fill="none" stroke="currentColor" strokeOpacity="0.4" {...draw(0.5)} />
      <motion.circle cx="290" cy="110" r="6" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3, duration: 0.5 }} />
    </>
  );
}

const VISUALS = [Listening, Evaluation, Planning, FollowUp];

export function JourneyVisual({ step, className }: { step: number; className?: string }) {
  const Visual = VISUALS[step] ?? Listening;
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true" focusable="false">
      <AnimatePresence mode="wait">
        <motion.g key={step} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <Visual />
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}
