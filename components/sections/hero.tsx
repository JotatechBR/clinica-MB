"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MEDIA } from "@/data/media";
import { ADDRESS, DOCTOR, whatsappUrl } from "@/lib/constants";
import { EASE } from "@/lib/animations";
import { useExperience } from "@/components/providers/experience-provider";
import { RevealText } from "@/components/motion/reveal-text";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { TopoLines } from "@/components/ui/topo-lines";
import { WhatsAppIcon } from "@/components/ui/icons";
import { StaticSculpture } from "@/components/three/static-sculpture";
import { scrollToTarget } from "@/lib/scroll";

export function Hero() {
  const { introDone: play } = useExperience();

  const step = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, ease: EASE.out, delay: 0.15 * i },
  });

  return (
    <section id="inicio" aria-labelledby="hero-title" className="paper relative overflow-hidden bg-bone">
      {/* 1 · Fundo */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[30%] -left-[20%] h-[110%] w-[90%] text-champagne"
        initial={{ opacity: 0 }}
        animate={{ opacity: play ? 0.28 : 0 }}
        transition={{ duration: 1.6, ease: EASE.out }}
      >
        <TopoLines seed="hero-espaco-mb" rings={22} cx={40} cy={60} />
      </motion.div>

      {/* 2 · Composição estática (fallback / enquanto o WebGL carrega) */}
      <div
        aria-hidden="true"
        className="static-sculpture pointer-events-none absolute left-[45%] top-[22%] z-[1] w-[46vw] max-w-[380px] max-lg:left-auto max-lg:right-[4%] max-lg:top-[38%] lg:w-[24vw]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={play ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 1.4, ease: EASE.out, delay: 0.15 }}
        >
          <StaticSculpture />
        </motion.div>
      </div>

      <div className="shell relative flex min-h-[100svh] flex-col pb-10 pt-[calc(var(--header-h)+1.5rem)] lg:justify-center lg:pb-24 lg:pt-[calc(var(--header-h)+2rem)]">
        {/* Identificação editorial */}
        <motion.div {...step(3)} className="layer mb-7 flex flex-wrap items-center gap-x-4 gap-y-1 lg:mb-10">
          <span className="h-px w-10 bg-clay" aria-hidden="true" />
          <p className="eyebrow text-cocoa">
            Estética avançada <span className="text-champagne-deep">•</span> Rejuvenescimento{" "}
            <span className="text-champagne-deep">•</span> Tricologia
          </p>
        </motion.div>

        <div className="lg:w-[54%]">
          {/* 4 · Título */}
          <RevealText
            as="h1"
            id="hero-title"
            play={play}
            delay={0.35}
            stagger={0.05}
            text={"Ciência para cuidar do tempo.\n*Naturalidade* para continuar sendo você."}
            className="layer text-hero text-espresso"
            italicClassName="serif-italic text-clay"
          />

          {/* 3 · Fotografia (mobile — após o título) */}
          <motion.div
            className="layer relative mt-8 lg:hidden"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: play ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 1.2, ease: EASE.curtain, delay: 0.3 }}
          >
            <MediaFrame
              media={MEDIA.heroPortrait}
              sizes="100vw"
              priority
              label="compact"
              className="aspect-[4/4.1] w-full rounded-[58%_42%_3px_3px/28%_20%_3px_3px] sm:aspect-[16/11]"
            />
            <p className="eyebrow mt-3 flex justify-between text-stone">
              <span>{DOCTOR.name}</span>
              <span>Espaço MB</span>
            </p>
          </motion.div>

          {/* 5 · Texto */}
          <motion.p {...step(6)} className="layer mt-8 max-w-[34rem] text-body text-stone lg:mt-10">
            No Espaço MB, cada tratamento começa com uma avaliação individualizada, respeito às suas características e
            um plano de cuidado pensado para cada fase da sua beleza.
          </motion.p>

          {/* 6 · Botões */}
          <motion.div {...step(7)} className="layer mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-10 lg:gap-4">
            <Button href={whatsappUrl()} external icon={<WhatsAppIcon size={16} />} className="w-full sm:w-auto">
              Agendar minha avaliação
            </Button>
            <Button href="#tratamentos" variant="secondary" className="w-full sm:w-auto" icon={<ArrowDown size={16} strokeWidth={1.5} />}>
              Conhecer os tratamentos
            </Button>
          </motion.div>

          <motion.p {...step(8)} className="layer eyebrow mt-8 text-stone lg:hidden">
            {ADDRESS.neighborhood} — {ADDRESS.city}
          </motion.p>
        </div>
      </div>

      {/* 3 · Fotografia (desktop) */}
      <motion.figure
        className="absolute bottom-[9vh] right-[var(--gutter)] top-[calc(var(--header-h)+4vh)] z-[2] hidden w-[35vw] max-w-[640px] lg:block"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: play ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: 1.3, ease: EASE.curtain, delay: 0.2 }}
      >
        <MediaFrame
          media={MEDIA.heroPortrait}
          sizes="(min-width: 1024px) 35vw, 100vw"
          priority
          interactive
          className="h-full w-full rounded-[62%_38%_3px_3px/40%_26%_3px_3px]"
          label="full"
        />
        <figcaption className="absolute -left-4 top-0 flex -translate-x-full flex-col items-end gap-2 text-right">
          <span className="eyebrow text-cocoa [writing-mode:vertical-rl] rotate-180">
            {ADDRESS.neighborhood} — {ADDRESS.city}
          </span>
        </figcaption>
      </motion.figure>

      <motion.p
        className="absolute bottom-[4vh] right-[var(--gutter)] z-[2] hidden text-right lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: play ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span className="eyebrow text-cocoa">{DOCTOR.name}</span>
        <span className="eyebrow ml-3 text-stone">Espaço MB</span>
      </motion.p>

      {/* 7 · Indicador de rolagem */}
      <motion.button
        type="button"
        onClick={() => scrollToTarget("#manifesto")}
        className="group absolute bottom-[4vh] left-[var(--gutter)] z-[2] hidden min-h-11 items-center gap-4 text-cocoa lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: play ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.35 }}
      >
        <span className="relative block h-12 w-px overflow-hidden bg-cocoa/15" aria-hidden="true">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_var(--ease-editorial)_infinite] bg-cocoa" />
        </span>
        <span className="eyebrow">Role para descobrir</span>
      </motion.button>
    </section>
  );
}
