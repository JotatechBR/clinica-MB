"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { ADDRESS, BY_APPOINTMENT_ONLY, CONTACT, MAPS, OPENING_HOURS, TEAM_MESSAGE, whatsappUrl } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { TopoLines } from "@/components/ui/topo-lines";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";

export function Location() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loadMap, setLoadMap] = useState(false);

  // o mapa só é carregado quando se aproxima da viewport
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoadMap(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="contato" aria-labelledby="local-title" className="paper relative bg-bone py-[var(--section-y)]">
      <div className="shell layer grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal effect="fade" className="eyebrow mb-6 flex items-center gap-3 text-clay">
            <span className="h-px w-8 bg-clay" aria-hidden="true" /> Localização
          </Reveal>
          <RevealText
            as="h2"
            id="local-title"
            text={"Espaço MB — *Jardim Anália Franco*"}
            className="text-[clamp(2.25rem,1.5rem+2.6vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-espresso"
            italicClassName="serif-italic text-clay"
          />

          <Reveal delay={0.1}>
            <address className="mt-10 flex gap-4 not-italic">
              <MapPin size={20} strokeWidth={1.25} className="mt-1 shrink-0 text-clay" aria-hidden="true" />
              <span className="text-subtitle font-display text-cocoa">
                {ADDRESS.street}, {ADDRESS.neighborhood}, {ADDRESS.city} – {ADDRESS.state}.
              </span>
            </address>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-espresso/12 pt-8 sm:grid-cols-2">
              <div>
                <dt className="eyebrow text-clay">Horários</dt>
                <dd className="mt-2 text-[1rem] text-espresso">
                  {OPENING_HOURS ? (
                    <ul>
                      {OPENING_HOURS.map((h) => (
                        <li key={h.days}>
                          {h.days}: {h.hours}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    // TODO: substituir por horários confirmados em lib/constants.ts
                    <span className="text-stone">Consulte os horários de atendimento com a equipe pelo WhatsApp.</span>
                  )}
                  {BY_APPOINTMENT_ONLY && <span className="mt-2 block text-stone">Atendimento com hora marcada.</span>}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-clay">Contato</dt>
                <dd className="mt-2 flex flex-col text-[1rem]">
                  <a href={`tel:${CONTACT.phoneE164}`} className="link-line w-fit py-1 text-espresso">
                    {CONTACT.phoneDisplay}
                  </a>
                  <a
                    href={CONTACT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line flex w-fit items-center gap-2 py-1 text-espresso"
                  >
                    <InstagramIcon size={15} /> {CONTACT.instagramHandle}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={MAPS.directionsUrl} external variant="primary">
              Traçar rota
            </Button>
            <Button href={whatsappUrl(TEAM_MESSAGE)} external variant="secondary" icon={<WhatsAppIcon size={16} />}>
              Falar com a equipe
            </Button>
          </Reveal>
        </div>

        <Reveal effect="mask" duration={1.3} className="lg:col-span-6 lg:col-start-7">
          <div ref={mapRef} className="relative aspect-[4/4.2] w-full overflow-hidden bg-sand sm:aspect-[4/3] lg:aspect-[4/4.6]">
            <span className="absolute inset-0 text-clay opacity-30" aria-hidden="true">
              <TopoLines seed="mapa-anália-franco" rings={20} cx={50} cy={50} />
            </span>
            {loadMap && (
              <iframe
                title={`Mapa: ${ADDRESS.full}`}
                src={MAPS.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.9)_sepia(0.28)_contrast(0.95)_brightness(1.02)]"
                allowFullScreen
              />
            )}
            <span className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgb(27_23_21/0.08)]" aria-hidden="true" />
          </div>
          <p className="eyebrow mt-4 flex justify-between text-stone">
            <span>{ADDRESS.neighborhood}</span>
            <span>São Paulo — SP</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
