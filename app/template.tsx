"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/animations";

/** Transição entre páginas: conteúdo surge sob uma cortina espresso. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[180] origin-top bg-espresso"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [1, 0] }}
        transition={{ duration: 0.8, ease: EASE.curtain, times: [0, 1] }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div initial={{ opacity: 0.001 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE.out, delay: 0.1 }}>
        {children}
      </motion.div>
    </>
  );
}
