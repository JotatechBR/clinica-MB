"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToTarget } from "@/lib/scroll";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "text" | "text-light";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: React.ReactNode | false;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  size?: "md" | "sm";
};

const base =
  "group/btn relative inline-flex min-h-12 select-none items-center justify-center gap-3 overflow-hidden whitespace-nowrap font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] transition-[color,border-color,transform] duration-300 ease-(--ease-editorial) active:scale-[0.98]";

const variants: Record<Variant, { root: string; fill: string }> = {
  primary: {
    root: "bg-espresso text-ivory px-7 hover:text-ivory",
    fill: "bg-cocoa",
  },
  secondary: {
    root: "border border-espresso/25 text-espresso px-7 hover:border-espresso hover:text-ivory",
    fill: "bg-espresso",
  },
  light: {
    root: "bg-bone text-ink px-7",
    fill: "bg-champagne",
  },
  "outline-light": {
    root: "border border-bone/30 text-bone px-7 hover:border-bone hover:text-ink",
    fill: "bg-bone",
  },
  text: { root: "text-espresso px-0 min-h-11", fill: "" },
  "text-light": { root: "text-bone px-0 min-h-11", fill: "" },
};

/**
 * Botão/link com preenchimento que sobe a partir da base e leve atração magnética
 * (máx. ~5px, apenas com mouse).
 */
export function Button({
  href,
  children,
  variant = "primary",
  icon,
  className,
  external,
  onClick,
  ariaLabel,
  size = "md",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isText = variant === "text" || variant === "text-light";
  const isHash = href.startsWith("#");

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
    ref.current.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.translate = "0px 0px";
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHash) {
      e.preventDefault();
      scrollToTarget(href);
      history.replaceState(null, "", href);
    }
    onClick?.();
  };

  const content = (
    <>
      {!isText && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 translate-y-[101%] rounded-[inherit] transition-transform duration-500 ease-(--ease-editorial) group-hover/btn:translate-y-0",
            variants[variant].fill,
          )}
        />
      )}
      <span className={cn("relative", isText && "link-line pb-1")}>{children}</span>
      {external && <span className="sr-only"> (abre em nova aba)</span>}
      {icon !== false && (
        <span
          aria-hidden="true"
          className="relative inline-flex transition-transform duration-500 ease-(--ease-editorial) group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        >
          {icon ?? <ArrowUpRight size={16} strokeWidth={1.5} />}
        </span>
      )}
    </>
  );

  const classes = cn(
    base,
    variants[variant].root,
    size === "sm" && "min-h-11 px-5 text-[0.75rem]",
    "[transition-property:translate,color,border-color,transform] [transition-duration:450ms]",
    className,
  );

  if (external || isHash) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={handleClick}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={classes}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </Link>
  );
}
