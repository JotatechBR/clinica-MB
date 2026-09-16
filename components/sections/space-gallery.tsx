"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import { SPACE_GALLERY, type GalleryItem } from "@/data/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn, pad } from "@/lib/utils";
import { getLenis } from "@/lib/scroll";
import { MediaFrame } from "@/components/ui/media-frame";
import { Lightbox } from "@/components/ui/lightbox";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";

const SIZES: Record<GalleryItem["ratio"], string> = {
  tall: "h-[70svh] aspect-[3/4.2]",
  portrait: "h-[58svh] aspect-[4/5]",
  landscape: "h-[50svh] aspect-[4/3]",
  square: "h-[46svh] aspect-square",
};
/** Alinhamentos verticais alternados para uma composição editorial. */
const OFFSETS = ["self-end", "self-start mt-[8svh]", "self-center", "self-end mb-[4svh]", "self-start mt-[14svh]", "self-center"];

const INTRO =
  "No Jardim Anália Franco, o Espaço MB reúne atendimento individualizado, tecnologia e uma estrutura preparada para transformar cada visita em uma experiência de cuidado.";

export function SpaceGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [horizontal, setHorizontal] = useState(false);
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileTrack = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setHorizontal(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop: rolagem horizontal controlada + parallax interno
  useEffect(() => {
    if (!horizontal || !section.current || !track.current) return;
    const root = section.current;
    const rail = track.current;
    const distance = () => rail.scrollWidth - window.innerWidth;

    const setHeight = () => {
      root.style.height = `${distance() + window.innerHeight}px`;
    };
    setHeight();

    const inners = Array.from(rail.querySelectorAll<HTMLElement>("[data-parallax-inner]"));
    const ctx = gsap.context(() => {
      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onRefresh: setHeight,
          onUpdate: () => {
            const vw = window.innerWidth;
            inners.forEach((el) => {
              const r = el.parentElement!.getBoundingClientRect();
              const offset = (r.left + r.width / 2 - vw / 2) / vw;
              el.style.translate = `${(-offset * 6).toFixed(2)}% 0`;
            });
          },
        },
      });
      trigger.current = tween.scrollTrigger ?? null;
    }, root);

    return () => {
      ctx.revert();
      root.style.height = "";
      trigger.current = null;
    };
  }, [horizontal]);

  // Foco por teclado leva o item para a área visível da trilha horizontal
  const onItemFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    const st = trigger.current;
    if (!horizontal || !st || !track.current) return;
    const item = e.currentTarget;
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const dist = track.current.scrollWidth - window.innerWidth;
    const x = Math.min(dist, Math.max(0, itemCenter - window.innerWidth / 2));
    const y = st.start + (x / dist) * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo({ top: y });
  };

  const onMobileScroll = () => {
    const el = mobileTrack.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    children.forEach((c, i) => {
      if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - center) < Math.abs(children[best].offsetLeft + children[best].offsetWidth / 2 - center)) best = i;
    });
    setMobileIndex(best);
  };

  const intro = (
    <div className="max-w-[34rem]">
      <Reveal effect="fade" className="eyebrow mb-6 flex items-center gap-3 text-clay">
        <span className="h-px w-8 bg-clay" aria-hidden="true" /> Estrutura
      </Reveal>
      <RevealText
        as="h2"
        id="estrutura-title"
        text={"Um espaço pensado para *acolher.*"}
        className="text-section text-espresso"
        italicClassName="serif-italic text-clay"
      />
      <Reveal delay={0.15}>
        <p className="mt-8 text-body text-stone">{INTRO}</p>
      </Reveal>
    </div>
  );

  return (
    <section id="estrutura" aria-labelledby="estrutura-title" className="relative bg-ivory">
      {horizontal ? (
        <div ref={section} className="relative">
          <div className="layer sticky top-0 h-[100svh] overflow-hidden">
            <div ref={track} className="flex h-full w-max items-stretch gap-[4vw] pl-[var(--gutter)] pr-[12vw] will-change-transform">
              <div className="flex w-[34vw] max-w-[560px] shrink-0 flex-col justify-center pt-[var(--header-h)]">
                {intro}
                <p className="eyebrow mt-12 flex items-center gap-3 text-stone" aria-hidden="true">
                  Role para percorrer <span className="h-px w-16 bg-stone/40" />
                </p>
              </div>
              <ul className="flex h-full items-center gap-[4vw] py-[calc(var(--header-h)+2svh)]" aria-label="Galeria do Espaço MB">
                {SPACE_GALLERY.map((item, i) => (
                  <li key={item.src} className={cn("flex shrink-0 flex-col", OFFSETS[i % OFFSETS.length])}>
                    <button
                      type="button"
                      data-cursor="Ampliar"
                      onClick={() => setLightbox(i)}
                      onFocus={onItemFocus}
                      className={cn("group relative block overflow-hidden", SIZES[item.ratio])}
                      aria-label={`Ampliar: ${item.caption}`}
                    >
                      <MediaFrame
                        media={item}
                        sizes="(min-width: 1024px) 40vw, 80vw"
                        overscan
                        className="h-full w-full transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:scale-[0.985]"
                        label="compact"
                      />
                    </button>
                    <p className="mt-4 flex items-baseline gap-3 text-[0.8125rem] text-stone">
                      <span className="tabular text-clay">{pad(i + 1)}</span>
                      {item.caption}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-[var(--section-y)]">
          <div className="shell">{intro}</div>
          <ul
            ref={mobileTrack}
            onScroll={onMobileScroll}
            className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 [scroll-padding-inline:var(--gutter)]"
            aria-label="Galeria do Espaço MB"
          >
            {SPACE_GALLERY.map((item, i) => (
              <li key={item.src} className="w-[78vw] max-w-[420px] shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={cn(
                    "relative block w-full overflow-hidden active:scale-[0.99]",
                    item.ratio === "landscape" ? "aspect-[4/3.2]" : "aspect-[4/5]",
                  )}
                  aria-label={`Ampliar: ${item.caption}`}
                >
                  <MediaFrame media={item} sizes="80vw" className="h-full w-full" label="compact" />
                  <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-ivory/80 text-espresso" aria-hidden="true">
                    <Maximize2 size={14} strokeWidth={1.5} />
                  </span>
                </button>
                <p className="mt-3 flex items-baseline gap-3 text-[0.875rem] text-stone">
                  <span className="tabular text-clay">{pad(i + 1)}</span>
                  {item.caption}
                </p>
              </li>
            ))}
          </ul>
          <div className="shell mt-6 flex items-center gap-4" aria-hidden="true">
            <span className="tabular text-[0.75rem] text-espresso">{pad(mobileIndex + 1)}</span>
            <span className="relative h-px flex-1 bg-espresso/10">
              <span
                className="absolute inset-y-0 left-0 bg-espresso transition-[width] duration-500"
                style={{ width: `${((mobileIndex + 1) / SPACE_GALLERY.length) * 100}%` }}
              />
            </span>
            <span className="tabular text-[0.75rem] text-stone">{pad(SPACE_GALLERY.length)}</span>
          </div>
        </div>
      )}

      <Lightbox items={SPACE_GALLERY} index={lightbox} onChange={setLightbox} label="Galeria do Espaço MB" />
    </section>
  );
}
