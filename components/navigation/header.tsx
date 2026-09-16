"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS, whatsappUrl } from "@/lib/constants";
import { scrollToTarget } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animations";
import { useExperience } from "@/components/providers/experience-provider";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { introDone } = useExperience();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 40);
      // esconde ao descer rápido, reaparece ao subir
      setHidden(y > 600 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Link ativo conforme a seção visível
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  const onNav = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) return;
    e.preventDefault();
    scrollToTarget(hash);
    history.replaceState(null, "", hash);
  };

  const show = !isHome || introDone;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: show && !(hidden && !open) ? "0%" : "-110%" }}
        transition={{ duration: 0.7, ease: EASE.out, delay: show && !compact ? 0.9 : 0 }}
        className="fixed inset-x-0 top-0 z-[60] pt-[env(safe-area-inset-top)]"
      >
        <div
          className={cn(
            "transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-(--ease-editorial)",
            compact
              ? "border-b border-espresso/[0.07] bg-ivory/80 py-2.5 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent bg-transparent py-4 md:py-6",
          )}
        >
          <div className="shell flex items-center justify-between gap-6">
            <Link
              href="/"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  scrollToTarget("#inicio");
                }
              }}
              className="group flex min-h-11 items-center gap-3 text-espresso"
              aria-label="Espaço MB — início"
            >
              <span className="font-display text-[1.65rem] leading-none tracking-[-0.03em]">
                M<span className="serif-italic text-clay">B</span>
              </span>
              <span className="h-5 w-px bg-espresso/20" aria-hidden="true" />
              <span className="text-[0.75rem] font-semibold uppercase tracking-[0.2em]">Espaço MB</span>
            </Link>

            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-[clamp(1.25rem,2vw,2.25rem)]">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={hrefFor(link.href)}
                      onClick={(e) => onNav(e, link.href)}
                      aria-current={active === link.href ? "true" : undefined}
                      className={cn(
                        "link-line py-2 text-[0.8125rem] font-medium tracking-[0.02em] text-espresso/75 transition-colors hover:text-espresso",
                        active === link.href && "!bg-[length:100%_1px] text-espresso",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Button href={whatsappUrl()} external size="sm" className="hidden lg:inline-flex" icon={<WhatsAppIcon size={15} />}>
                Agendar avaliação
              </Button>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-colors active:bg-espresso active:text-ivory lg:hidden"
                aria-label="Agendar avaliação pelo WhatsApp (abre em nova aba)"
              >
                <WhatsAppIcon size={18} />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                className="flex h-11 items-center gap-3 pl-3 text-espresso lg:hidden"
              >
                <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em]">Menu</span>
                <span className="flex w-6 flex-col gap-[5px]" aria-hidden="true">
                  <span className="h-px w-full bg-current" />
                  <span className="h-px w-2/3 self-end bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} isHome={isHome} />
    </>
  );
}
