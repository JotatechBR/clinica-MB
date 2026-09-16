"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQ } from "@/data/content";
import { whatsappUrl } from "@/lib/constants";
import { EASE } from "@/lib/animations";
import { cn, pad } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/motion/reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="perguntas" aria-labelledby="faq-title" className="relative bg-ivory py-[var(--section-y)]">
      <div className="shell layer grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <Reveal effect="fade" className="eyebrow mb-6 flex items-center gap-3 text-clay">
              <span className="h-px w-8 bg-clay" aria-hidden="true" /> Dúvidas
            </Reveal>
            <RevealText
              as="h2"
              id="faq-title"
              text={"Perguntas *frequentes.*"}
              className="text-section text-espresso"
              italicClassName="serif-italic text-clay"
            />
            <Reveal delay={0.15} className="mt-8 max-w-[22rem]">
              <p className="text-body text-stone">Não encontrou o que procurava? A equipe responde pelo WhatsApp.</p>
              <Button href={whatsappUrl()} external variant="text" className="mt-4">
                Falar com a equipe
              </Button>
            </Reveal>
          </div>
        </div>

        <ul className="lg:col-span-7 lg:col-start-6">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={item.q} delay={i * 0.04} className="border-t border-espresso/12 last:border-b">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start gap-5 py-7 text-left md:gap-8"
                  >
                    <span className="tabular pt-1.5 text-[0.75rem] font-semibold text-clay">{pad(i + 1)}</span>
                    <span
                      className={cn(
                        "flex-1 font-display text-[clamp(1.375rem,1.1rem+0.9vw,2rem)] leading-[1.2] transition-[color,translate] duration-500 ease-(--ease-editorial) md:group-hover:translate-x-1",
                        isOpen ? "text-espresso" : "text-cocoa",
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,color,border-color] duration-500 ease-(--ease-editorial)",
                        isOpen ? "rotate-45 border-espresso bg-espresso text-ivory" : "border-espresso/15 text-espresso group-hover:border-espresso",
                      )}
                    >
                      <Plus size={16} strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE.out }}
                  className="overflow-hidden"
                  inert={!isOpen}
                >
                  <p className="max-w-[40rem] pb-8 pl-9 pr-14 text-body text-stone md:pl-12">{item.a}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
