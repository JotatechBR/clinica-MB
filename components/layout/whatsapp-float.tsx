"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { whatsappUrl } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/icons";
import { EASE } from "@/lib/animations";

/**
 * Botão flutuante discreto de WhatsApp (mobile e tablet).
 * Aparece após a hero e se recolhe perto do CTA final para não competir com ele.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const cta = document.getElementById("cta-final");
      const nearEnd = cta ? cta.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setVisible(window.scrollY > window.innerHeight * 0.8 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar avaliação pelo WhatsApp (abre em nova aba)"
          className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[80] flex h-12 items-center gap-2.5 rounded-full bg-espresso pl-4 pr-5 text-ivory shadow-[0_10px_30px_-12px_rgb(16_14_13/0.6)] active:scale-95 lg:hidden"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE.out }}
        >
          <WhatsAppIcon size={18} />
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.14em]">Agendar</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
