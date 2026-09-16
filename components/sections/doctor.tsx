"use client";

import { motion } from "framer-motion";
import { DOCTOR_FACTS, DOCTOR_TEXT } from "@/data/content";
import { MEDIA } from "@/data/media";
import { CONTACT, DOCTOR } from "@/lib/constants";
import { EASE } from "@/lib/animations";
import { MediaFrame } from "@/components/ui/media-frame";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/icons";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";

export function Doctor() {
  // TODO: quando o Instagram pessoal da Dra. Mariane for informado, ele substitui o perfil da clínica.
  const instagram = DOCTOR.instagram ?? CONTACT.instagramUrl;
  const hasCredentials = DOCTOR.credentials.length > 0;

  return (
    <section id="dra-mariane" aria-labelledby="doutora-title" className="paper relative overflow-hidden bg-bone py-[var(--section-y)]">
      <div className="shell layer grid gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        {/* Cabeçalho (no mobile vem antes do retrato) */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end">
          <Reveal effect="fade" className="eyebrow mb-6 flex items-center gap-3 text-clay">
            <span className="h-px w-8 bg-clay" aria-hidden="true" /> {DOCTOR.name}
          </Reveal>
          <RevealText
            as="h2"
            id="doutora-title"
            text={"Conhecimento técnico.\n*Olhar individual.*"}
            className="text-section text-espresso"
            italicClassName="serif-italic text-clay"
          />
        </div>

        {/* Retrato em grande escala */}
        <div className="relative lg:col-span-6 lg:row-span-2 lg:row-start-1">
          <Reveal effect="mask" duration={1.4}>
            <div className="relative overflow-hidden">
              <Parallax speed={-0.08}>
                <MediaFrame
                  media={MEDIA.doctorPortrait}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="aspect-[4/5] w-full lg:aspect-[4/5.4]"
                  interactive
                  overscan
                />
              </Parallax>
            </div>
          </Reveal>

          {/* Detalhe sobreposto */}
          <Parallax speed={0.22} className="absolute -bottom-10 -right-4 hidden w-[38%] sm:block lg:-right-[18%]">
            <Reveal effect="mask" delay={0.3} duration={1.2}>
              <MediaFrame media={MEDIA.doctorDetail} sizes="20vw" className="aspect-[4/5] w-full border-[6px] border-bone" label="compact" />
            </Reveal>
          </Parallax>

          <p className="eyebrow mt-5 text-stone lg:[writing-mode:vertical-rl] lg:absolute lg:-left-10 lg:top-0 lg:mt-0 lg:rotate-180">
            Espaço MB — Jardim Anália Franco
          </p>
        </div>

        {/* Conteúdo editorial */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-2">
          <Reveal>
            <p className="font-display text-[clamp(1.25rem,1rem+0.75vw,1.75rem)] leading-[1.38] text-cocoa">{DOCTOR_TEXT}</p>
          </Reveal>

          {/* assinatura */}
          <Reveal effect="fade" delay={0.1} className="mt-10 flex items-end gap-5">
            <span className="font-display text-[clamp(2.5rem,1.6rem+2.4vw,3.75rem)] italic leading-none text-espresso">
              Mariane Botelho
            </span>
            <svg width="90" height="20" viewBox="0 0 90 20" aria-hidden="true" className="mb-2 text-champagne-deep">
              <motion.path
                d="M1 14 C 20 2, 40 22, 60 10 S 85 6, 89 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE.out, delay: 0.4 }}
              />
            </svg>
          </Reveal>

          <dl className="mt-12 grid gap-x-8 sm:grid-cols-2">
            {DOCTOR_FACTS.map((f, i) => (
              <Reveal key={f.label} delay={0.08 * i} className="border-t border-espresso/12 py-5">
                <dt className="eyebrow text-clay">{f.label}</dt>
                <dd className="mt-2 text-[1.0625rem] leading-snug text-espresso">{f.value}</dd>
              </Reveal>
            ))}
          </dl>

          {hasCredentials ? (
            <Reveal className="mt-8">
              <h3 className="eyebrow text-clay">Formação e registros</h3>
              <ul className="mt-4 space-y-2 text-[1rem] text-stone">
                {DOCTOR.credentials.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-4 shrink-0 bg-champagne-deep" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : (
            process.env.NODE_ENV === "development" && (
              <p className="mt-8 border border-dashed border-clay/40 px-4 py-3 text-[0.8125rem] text-clay">
                [Dev] Espaço reservado para credenciais confirmadas — preencha <code>DOCTOR.credentials</code> em{" "}
                <code>lib/constants.ts</code>.
              </p>
            )
          )}

          <Reveal delay={0.1} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="#experiencia" variant="primary">
              Conhecer sua abordagem
            </Button>
            <Button href={instagram} external variant="secondary" icon={<InstagramIcon size={16} />}>
              Acompanhar no Instagram
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
