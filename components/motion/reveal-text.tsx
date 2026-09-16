"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "blockquote";

type Props = {
  /** Use `*palavra*` para itálico editorial e `\n` para quebra de linha intencional. */
  text: string;
  as?: Tag;
  className?: string;
  italicClassName?: string;
  delay?: number;
  stagger?: number;
  /** Anima somente quando `play` for verdadeiro (ex.: após o preloader). Sem ele, anima ao entrar na viewport. */
  play?: boolean;
  id?: string;
};

type Token = { word: string; italic: boolean } | { br: true };

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  text.split("\n").forEach((line, li) => {
    if (li > 0) tokens.push({ br: true });
    line.split(/(\*[^*]+\*)/g).forEach((chunk) => {
      if (!chunk) return;
      const italic = chunk.startsWith("*") && chunk.endsWith("*");
      const clean = italic ? chunk.slice(1, -1) : chunk;
      clean
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => tokens.push({ word, italic }));
    });
  });
  return tokens;
}

/**
 * Texto revelado palavra a palavra por máscara (overflow + translateY).
 * O texto completo permanece no DOM e legível sem animação.
 */
export function RevealText({
  text,
  as = "p",
  className,
  italicClassName = "serif-italic",
  delay = 0,
  stagger = 0.045,
  play,
  id,
}: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const tokens = tokenize(text);
  const controlled = play !== undefined;
  let index = 0;

  return (
    <Comp
      id={id}
      className={className}
      initial="hidden"
      {...(controlled ? { animate: play ? "show" : "hidden" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } })}
    >
      {tokens.map((t, i) => {
        if ("br" in t) return <br key={`br-${i}`} className="max-md:hidden" />;
        const n = index++;
        return (
          <Fragment key={i}>
            <span className="inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                className={cn("inline-block will-change-transform", t.italic && italicClassName)}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { y: "108%", rotate: 2 },
                  show: reduce
                    ? { opacity: 1, transition: { duration: 0.4 } }
                    : { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE.out, delay: delay + n * stagger } },
                }}
              >
                {t.word}
              </motion.span>
            </span>{" "}
          </Fragment>
        );
      })}
    </Comp>
  );
}
