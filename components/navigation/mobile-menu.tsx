"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ADDRESS, CONTACT, NAV_LINKS, whatsappUrl } from "@/lib/constants";
import { lockScroll, scrollToTarget } from "@/lib/scroll";
import { EASE } from "@/lib/animations";
import { pad } from "@/lib/utils";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";

type Props = { open: boolean; onClose: () => void; isHome: boolean };

export function MobileMenu({ open, onClose, isHome }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    lockScroll(true);
    const t = setTimeout(() => closeBtn.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) return onClose();
    e.preventDefault();
    onClose();
    setTimeout(() => scrollToTarget(hash), 380);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-surface="dark"
          className="fixed inset-0 z-[120] flex flex-col overflow-y-auto bg-espresso text-bone lg:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
          transition={{ duration: 0.7, ease: EASE.curtain }}
        >
          <div className="shell flex items-center justify-between pb-2 pt-[calc(1rem+env(safe-area-inset-top))]">
            <span className="font-display text-[1.65rem] leading-none">
              M<span className="serif-italic text-champagne">B</span>
            </span>
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              className="flex size-11 items-center justify-center rounded-full border border-bone/20"
              aria-label="Fechar menu"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Navegação principal" className="shell flex flex-1 flex-col justify-center py-8">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="overflow-hidden border-b border-bone/10">
                  <motion.a
                    href={isHome ? link.href : `/${link.href}`}
                    onClick={(e) => go(e, link.href)}
                    className="flex min-h-[3.75rem] items-baseline gap-4 py-2 active:text-champagne"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%", transition: { duration: 0.3 } }}
                    transition={{ duration: 0.8, ease: EASE.out, delay: 0.2 + i * 0.06 }}
                  >
                    <span className="tabular text-[0.6875rem] tracking-[0.2em] text-champagne">{pad(i + 1)}</span>
                    <span className="font-display text-[clamp(2.25rem,9vw,3.25rem)] leading-[1.05] tracking-[-0.02em]">
                      {link.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="shell grid gap-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4 text-[0.875rem] text-sand"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE.out }}
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-3 bg-bone text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink"
            >
              <WhatsAppIcon size={16} /> Agendar avaliação
            </a>
            <div className="grid grid-cols-2 gap-4">
              <address className="not-italic leading-relaxed">
                {ADDRESS.street}
                <br />
                {ADDRESS.neighborhood}
                <br />
                {ADDRESS.city} – {ADDRESS.state}
              </address>
              <div className="flex flex-col items-end gap-1 text-right">
                <a href={`tel:${CONTACT.phoneE164}`} className="min-h-11 content-center">
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2"
                >
                  <InstagramIcon size={15} /> {CONTACT.instagramHandle}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
