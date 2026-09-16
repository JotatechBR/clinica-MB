"use client";

import { MEDIA } from "@/data/media";
import { TEAM_MESSAGE, whatsappUrl } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { WhatsAppIcon } from "@/components/ui/icons";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { StaticSculpture } from "@/components/three/static-sculpture";

export function FinalCta() {
  return (
    <section
      id="cta-final"
      aria-labelledby="cta-title"
      data-surface="dark"
      className="relative overflow-hidden bg-espresso text-bone"
    >
      {/* luz lateral quente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20%] top-[10%] h-[80%] w-[70%] bg-[radial-gradient(closest-side,rgb(196_170_135/0.16),transparent)]"
      />
      <div aria-hidden="true" className="static-sculpture pointer-events-none absolute right-[6%] top-[14%] hidden w-[18vw] max-w-[260px] opacity-50 lg:block">
        <StaticSculpture tone="dark" />
      </div>

      <div className="shell layer grid min-h-[100svh] items-center gap-12 py-[var(--section-y)] lg:grid-cols-12 lg:gap-8">
        <div className="relative order-2 lg:order-1 lg:col-span-4">
          <Reveal effect="mask" duration={1.4}>
            <div className="relative overflow-hidden">
              <Parallax speed={-0.1}>
                <MediaFrame media={MEDIA.finalCta} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/3] w-full lg:aspect-[3/4.2]" overscan label="compact" />
              </Parallax>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
          <Reveal effect="fade" className="eyebrow mb-8 flex items-center gap-3 text-champagne">
            <span className="h-px w-8 bg-champagne" aria-hidden="true" /> Agendamento
          </Reveal>
          <RevealText
            as="h2"
            id="cta-title"
            text={"Seu cuidado pode começar com uma *conversa.*"}
            className="text-[clamp(2.625rem,1.4rem+4.2vw,6.25rem)] leading-[0.98] tracking-[-0.025em] text-bone"
            italicClassName="serif-italic text-champagne"
            stagger={0.06}
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[32rem] text-body text-mist">
              Agende uma avaliação e conheça uma abordagem que une ciência, tecnologia, escuta e naturalidade.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={whatsappUrl()} external variant="light" icon={<WhatsAppIcon size={16} />}>
              Agendar minha avaliação
            </Button>
            <Button href={whatsappUrl(TEAM_MESSAGE)} external variant="outline-light">
              Falar com a equipe
            </Button>
          </Reveal>
        </div>
      </div>

      {/* transição orgânica para o rodapé */}
      <svg aria-hidden="true" className="relative block h-[12vh] min-h-16 w-full text-ink" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 120 L0 70 C 240 20, 520 110, 820 70 C 1080 36, 1260 10, 1440 40 L1440 120 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
