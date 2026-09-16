"use client";

import Image from "next/image";
import { useRef } from "react";
import type { MediaSlot, MediaTone } from "@/data/media";
import { useExperience } from "@/components/providers/experience-provider";
import { TopoLines } from "./topo-lines";
import { cn } from "@/lib/utils";

const TONES: Record<MediaTone, { bg: string; line: string; text: string; dark: boolean }> = {
  ivory: { bg: "linear-gradient(160deg,#FCFAF6 0%,#EFE6DB 100%)", line: "#C4AA87", text: "#59443B", dark: false },
  sand: { bg: "linear-gradient(165deg,#E9DCCF 0%,#D5C1AE 55%,#C2A993 100%)", line: "#9B715F", text: "#4A3931", dark: false },
  champagne: { bg: "linear-gradient(160deg,#EEE3D3 0%,#D8C3A5 60%,#BFA27E 100%)", line: "#8F7652", text: "#4A3931", dark: false },
  clay: { bg: "linear-gradient(170deg,#B7907D 0%,#9B715F 50%,#6F4F42 100%)", line: "#EBD9C6", text: "#FCFAF6", dark: true },
  cocoa: { bg: "linear-gradient(170deg,#6D564B 0%,#4B3A33 55%,#2C2320 100%)", line: "#C4AA87", text: "#F6F1EA", dark: true },
  espresso: { bg: "linear-gradient(170deg,#2E2622 0%,#1B1715 55%,#100E0D 100%)", line: "#C4AA87", text: "#DCCBBB", dark: true },
};

type Props = {
  media: MediaSlot;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Imagem responde levemente ao cursor (desktop). */
  interactive?: boolean;
  /** Identificação do arquivo necessário exibida no placeholder. */
  label?: "full" | "compact" | "none";
  /** Escala extra para permitir parallax sem revelar bordas. */
  overscan?: boolean;
};

/**
 * Moldura de imagem. Se o arquivo real existir em /public, usa next/image;
 * caso contrário, exibe um placeholder editorial claramente identificado.
 * Usa apenas elementos inline (span) para poder viver dentro de botões e links.
 */
export function MediaFrame({ media, sizes, className, imgClassName, priority, interactive, label = "full", overscan }: Props) {
  const { hasImage } = useExperience();
  const ref = useRef<HTMLSpanElement>(null);
  const available = hasImage(media.src);
  const tone = TONES[media.tone];

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--mx", `${(-x * 8).toFixed(2)}px`);
    ref.current.style.setProperty("--my", `${(-y * 8).toFixed(2)}px`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--mx", "0px");
    ref.current?.style.setProperty("--my", "0px");
  };

  return (
    <span
      ref={ref}
      onPointerMove={interactive ? onMove : undefined}
      onPointerLeave={interactive ? onLeave : undefined}
      className={cn("relative block overflow-hidden", className)}
    >
      <span
        data-parallax-inner
        className={cn(
          "absolute inset-0 block transition-[scale] duration-700 ease-(--ease-editorial)",
          (interactive || overscan) && "scale-[1.07]",
        )}
      >
        <span
          className="absolute inset-0 block transition-[translate] duration-700 ease-(--ease-editorial)"
          style={interactive ? { translate: "var(--mx, 0px) var(--my, 0px)" } : undefined}
        >
          {available ? (
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes={sizes}
              priority={priority}
              className={cn("object-cover", imgClassName)}
              style={{ objectPosition: media.position ?? "50% 50%" }}
            />
          ) : (
            <span role="img" aria-label={media.alt} className="absolute inset-0 block" style={{ background: tone.bg }}>
              <span
                className="absolute inset-0 block"
                style={{
                  background: tone.dark
                    ? "radial-gradient(60% 50% at 78% 18%, rgb(196 170 135 / 0.28), transparent 70%)"
                    : "radial-gradient(60% 55% at 80% 15%, rgb(255 255 255 / 0.55), transparent 70%)",
                }}
              />
              <span className="absolute inset-0 block opacity-40" style={{ color: tone.line }}>
                <TopoLines seed={media.src} className="h-full w-full" rings={16} />
              </span>
            </span>
          )}
        </span>
      </span>

      {!available && label !== "none" && (
        <span
          className="pointer-events-none absolute inset-x-3 bottom-3 block text-left sm:inset-x-4 sm:bottom-4"
          style={{ color: tone.text }}
        >
          <span className="block max-w-[28ch] text-[0.6875rem] font-normal normal-case leading-snug tracking-wide">
            <span className="mb-1 flex items-center gap-2 font-semibold uppercase tracking-[0.16em]">
              <span className="inline-block size-1.5 rounded-full bg-current opacity-70" />
              Foto real pendente
            </span>
            {label === "full" && <span className="block opacity-85">{media.brief}</span>}
            <code className="mt-1 block font-mono text-[0.625rem] opacity-75 [overflow-wrap:anywhere]">{`public${media.src}`}</code>
          </span>
        </span>
      )}
    </span>
  );
}
