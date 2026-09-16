"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { MediaSlot } from "@/data/media";
import { EASE } from "@/lib/animations";
import { lockScroll } from "@/lib/scroll";
import { pad } from "@/lib/utils";
import { MediaFrame } from "./media-frame";

type Item = MediaSlot & { caption: string };

type Props = {
  items: Item[];
  index: number | null;
  onChange: (i: number | null) => void;
  label: string;
};

/**
 * Visualização em tela cheia: teclado (setas/Esc), foco preso no diálogo,
 * arrastar/swipe para navegar.
 */
export function Lightbox({ items, index, onChange, label }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement;
    lockScroll(true);
    const focusTimer = setTimeout(() => dialog.current?.querySelector<HTMLElement>("[data-close]")?.focus(), 60);
    return () => {
      clearTimeout(focusTimer);
      lockScroll(false);
      opener.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go, onChange]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          data-surface="dark"
          className="fixed inset-0 z-[160] flex flex-col bg-ink/[0.97] text-bone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="shell flex items-center justify-between py-4 pt-[calc(1rem+env(safe-area-inset-top))]">
            <p className="tabular eyebrow text-sand" aria-live="polite">
              {pad(index! + 1)} / {pad(items.length)} — {item.caption}
            </p>
            <button
              data-close
              type="button"
              onClick={() => onChange(null)}
              className="flex size-11 items-center justify-center rounded-full border border-bone/20 transition-colors hover:bg-bone hover:text-ink"
              aria-label="Fechar visualização"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-[var(--gutter)] pb-6">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={index}
                className="relative h-full max-h-[80svh] w-full max-w-[1200px] touch-pan-y"
                initial={{ opacity: 0, scale: 0.97, clipPath: "inset(6% 6% 6% 6%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: EASE.out }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60 || info.velocity.x < -400) go(1);
                  else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
                }}
              >
                <MediaFrame media={item} sizes="100vw" className="h-full w-full" imgClassName="!object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="shell flex items-center justify-between pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-12 items-center gap-3 pr-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em]"
              aria-label="Imagem anterior"
            >
              <ArrowLeft size={18} strokeWidth={1.5} /> <span className="max-sm:sr-only">Anterior</span>
            </button>
            <p className="hidden text-[0.75rem] text-mist sm:block">Use as setas do teclado ou arraste</p>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-12 items-center gap-3 pl-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em]"
              aria-label="Próxima imagem"
            >
              <span className="max-sm:sr-only">Próxima</span> <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
