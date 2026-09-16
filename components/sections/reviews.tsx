"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { REVIEWS } from "@/data/content";
import { REPUTATION } from "@/lib/constants";
import { EASE } from "@/lib/animations";
import { cn, initials, pad } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/ui/icons";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";
import { RollingNumber } from "@/components/motion/rolling-number";

const AUTOPLAY_MS = 7000;

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [slideW, setSlideW] = useState(0);
  const [gap, setGap] = useState(24);
  const viewport = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const progress = useRef<HTMLSpanElement>(null);
  const dragging = useRef(false);

  const count = REVIEWS.length;
  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  // mede a largura do slide para posicionar a trilha
  useLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const mobile = w < 768;
      const gutter = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gutter")) || 16;
      setGap(mobile ? 16 : Math.round(w * 0.03));
      setSlideW(mobile ? w - gutter * 2 : Math.min(860, w * 0.58));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const offsetFor = useCallback(
    (i: number) => {
      const w = viewport.current?.clientWidth ?? 0;
      return (w - slideW) / 2 - i * (slideW + gap);
    },
    [slideW, gap],
  );

  useEffect(() => {
    if (!slideW) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(x, offsetFor(index), reduce ? { duration: 0 } : { duration: 0.9, ease: EASE.out });
    return () => controls.stop();
  }, [index, slideW, offsetFor, x]);

  // reprodução automática com pausa na interação
  const stopped = paused || userPaused || !visible;
  useEffect(() => {
    if (stopped || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (progress.current) progress.current.style.transition = "none";
      return;
    }
    const bar = progress.current;
    if (bar) {
      bar.style.transition = "none";
      bar.style.transform = "scaleX(0)";
      void bar.offsetWidth;
      bar.style.transition = `transform ${AUTOPLAY_MS}ms linear`;
      bar.style.transform = "scaleX(1)";
    }
    const t = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, stopped, go]);

  // só roda quando visível
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setUserPaused(true);
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setUserPaused(true);
      go(index - 1);
    }
  };

  return (
    <section
      id="avaliacoes"
      aria-labelledby="avaliacoes-title"
      data-surface="dark"
      className="relative overflow-hidden bg-cocoa py-[var(--section-y)] text-bone"
    >
      <div className="shell layer grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <Reveal effect="fade" className="eyebrow mb-6 flex items-center gap-3 text-sand">
            <span className="h-px w-8 bg-sand" aria-hidden="true" /> Avaliações no Google
          </Reveal>
          <RevealText
            as="h2"
            id="avaliacoes-title"
            text={"Experiências que constroem *confiança.*"}
            className="text-section text-bone"
            italicClassName="serif-italic text-sand"
          />
        </div>

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
            <p className="font-display leading-[0.8] tracking-[-0.04em]">
              <span className="text-[clamp(5.5rem,4rem+5vw,9.5rem)]">{REPUTATION.ratingDisplay}</span>
              <span className="ml-1 text-[1.5rem] text-sand">/5</span>
              <span className="sr-only"> de nota média</span>
            </p>
            <div className="pb-2">
              <Stars className="flex gap-1 text-champagne" size={16} />
              <p className="mt-3 text-[0.9375rem] text-sand">
                <span className="tabular font-semibold text-bone">{REPUTATION.reviewCount}</span> avaliações no Google
              </p>
            </div>
          </div>
          <Button href={REPUTATION.googleReviewsUrl} external variant="outline-light" className="mt-8">
            Ver todas as avaliações
          </Button>
        </Reveal>
      </div>

      {/* Carrossel editorial */}
      <div
        className="layer relative mt-16 lg:mt-24"
        onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && !dragging.current && setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          ref={viewport}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Avaliações de pacientes publicadas no Google"
          tabIndex={0}
          onKeyDown={onKey}
          className="overflow-hidden focus-visible:outline-offset-[-2px]"
        >
          <motion.ul
            className="flex cursor-grab touch-pan-y active:cursor-grabbing"
            style={{ x, gap }}
            drag="x"
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={() => {
              dragging.current = true;
              setUserPaused(true);
            }}
            onDragEnd={(_, info) => {
              dragging.current = false;
              const threshold = Math.min(120, slideW * 0.18);
              if (info.offset.x < -threshold || info.velocity.x < -500) go(index + 1);
              else if (info.offset.x > threshold || info.velocity.x > 500) go(index - 1);
              else animate(x, offsetFor(index), { duration: 0.6, ease: EASE.out });
            }}
          >
            {REVIEWS.map((r, i) => (
              <ReviewSlide
                key={r.author}
                review={r}
                active={i === index}
                width={slideW}
                position={i}
                onSelect={() => {
                  setUserPaused(true);
                  go(i);
                }}
              />
            ))}
          </motion.ul>
        </div>

        {/* controles */}
        <div className="shell mt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <p className="tabular flex items-baseline gap-2 font-display text-bone" aria-live="polite" aria-atomic="true">
              <span className="sr-only">Avaliação</span>
              <RollingNumber value={pad(index + 1)} className="text-3xl" />
              <span className="text-base text-sand">/ {pad(count)}</span>
            </p>
            <span className="relative hidden h-px w-32 bg-bone/15 sm:block" aria-hidden="true">
              <span ref={progress} className="absolute inset-0 origin-left scale-x-0 bg-champagne" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              className="flex size-12 items-center justify-center rounded-full text-sand transition-colors hover:text-bone"
              aria-label={userPaused ? "Retomar rotação automática" : "Pausar rotação automática"}
            >
              {userPaused ? <Play size={16} strokeWidth={1.5} /> : <Pause size={16} strokeWidth={1.5} />}
            </button>
            <button
              type="button"
              onClick={() => {
                setUserPaused(true);
                go(index - 1);
              }}
              className="flex size-12 items-center justify-center rounded-full border border-bone/25 transition-colors hover:bg-bone hover:text-ink active:scale-95"
              aria-label="Avaliação anterior"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => {
                setUserPaused(true);
                go(index + 1);
              }}
              className="flex size-12 items-center justify-center rounded-full border border-bone/25 transition-colors hover:bg-bone hover:text-ink active:scale-95"
              aria-label="Próxima avaliação"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <p className="shell mt-8 text-[0.8125rem] text-sand/80">
          Trechos de avaliações públicas deixadas por pacientes no Perfil da Empresa no Google.
        </p>
      </div>
    </section>
  );
}

function ReviewSlide({
  review,
  active,
  width,
  position,
  onSelect,
}: {
  review: (typeof REVIEWS)[number];
  active: boolean;
  width: number;
  position: number;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const textRef = useRef<HTMLQuoteElement>(null);
  const id = `review-${position}`;

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const check = () => setOverflowing(el.scrollHeight > el.clientHeight + 2 || expanded);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded, width]);

  return (
    <motion.li
      className="relative shrink-0 select-none"
      style={{ width: width || "100%" }}
      animate={{ opacity: active ? 1 : 0.28, scale: active ? 1 : 0.92, filter: active ? "blur(0px)" : "blur(1.5px)" }}
      transition={{ duration: 0.8, ease: EASE.out }}
      aria-roledescription="slide"
      aria-label={`${position + 1} de ${REVIEWS.length}`}
      aria-hidden={!active}
      onClick={() => !active && onSelect()}
    >
      <figure className="border-t border-bone/20 pt-8">
        <span aria-hidden="true" className="block font-display text-[5rem] leading-[0.4] text-champagne/60">
          “
        </span>
        <blockquote
          id={id}
          ref={textRef}
          className={cn(
            "mt-4 font-display text-[clamp(1.5rem,1.1rem+1.5vw,2.625rem)] leading-[1.22] tracking-[-0.01em] text-bone",
            !expanded && "line-clamp-5 md:line-clamp-4",
          )}
        >
          {review.text}
        </blockquote>

        {(overflowing || expanded) && (
          <button
            type="button"
            tabIndex={active ? 0 : -1}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={id}
            className="mt-4 min-h-11 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-sand underline-offset-4 hover:underline"
          >
            {expanded ? "Recolher comentário" : "Ler comentário completo"}
          </button>
        )}

        <figcaption className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
          <span
            aria-hidden="true"
            className="flex size-12 items-center justify-center rounded-full border border-champagne/60 font-display text-[1.05rem] text-champagne"
          >
            {initials(review.author)}
          </span>
          <span className="flex flex-col">
            <span className="text-[1rem] font-semibold text-bone">{review.author}</span>
            <Stars className="mt-1 flex gap-0.5 text-champagne" size={12} />
          </span>
          <span className="ml-auto inline-flex items-center gap-2 border border-bone/15 px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-sand max-sm:ml-0">
            <span className="size-1.5 rounded-full bg-champagne" aria-hidden="true" />
            Avaliação publicada no Google
          </span>
        </figcaption>
      </figure>
    </motion.li>
  );
}
