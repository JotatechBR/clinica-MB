"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/animations";

type Effect = "rise" | "mask" | "blur" | "line" | "fade";

const effects: Record<Effect, Variants> = {
  rise: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  mask: { hidden: { clipPath: "inset(100% 0% 0% 0%)" }, show: { clipPath: "inset(0% 0% 0% 0%)" } },
  blur: { hidden: { opacity: 0, filter: "blur(10px)", y: 12 }, show: { opacity: 1, filter: "blur(0px)", y: 0 } },
  line: { hidden: { scaleX: 0 }, show: { scaleX: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

type Props = {
  children?: React.ReactNode;
  effect?: Effect;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "p" | "li" | "span" | "figure" | "ul" | "dl";
  once?: boolean;
  style?: React.CSSProperties;
};

export function Reveal({ children, effect = "rise", delay = 0, duration = 1, className, as = "div", once = true, style }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const v = reduce ? effects.fade : effects[effect];
  return (
    <Comp
      className={className}
      style={{ ...(effect === "line" ? { transformOrigin: "left" } : null), ...style }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      variants={v}
      transition={{ duration: reduce ? 0.3 : duration, ease: effect === "mask" ? EASE.curtain : EASE.out, delay }}
    >
      {children}
    </Comp>
  );
}
