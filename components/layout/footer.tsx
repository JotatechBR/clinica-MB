import Link from "next/link";
import { ADDRESS, CONTACT, DOCTOR, LEGAL_LINKS, NAV_LINKS, SITE, whatsappUrl } from "@/lib/constants";
import { TREATMENTS } from "@/data/treatments";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { RevealText } from "@/components/motion/reveal-text";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer data-surface="dark" className="relative bg-ink pb-[calc(2rem+var(--safe-bottom))] pt-20 text-sand lg:pt-28">
      <div className="shell layer">
        <RevealText
          as="p"
          text={"Naturalidade é reconhecer-se *em cada fase.*"}
          className="max-w-[16ch] font-display text-[clamp(2.75rem,1.2rem+5.4vw,8rem)] leading-[0.96] tracking-[-0.03em] text-bone"
          italicClassName="serif-italic text-champagne"
        />

        <div className="mt-20 grid gap-12 border-t border-bone/10 pt-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-display text-[2rem] leading-none text-bone">
              Espaço <span className="serif-italic text-champagne">MB</span>
            </p>
            <p className="mt-5 max-w-[22rem] text-[0.9375rem] leading-relaxed">{SITE.shortDescription}</p>
            <p className="mt-4 text-[0.9375rem] text-mist">À frente do Espaço MB: {DOCTOR.name}</p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-2 lg:col-start-6">
            <p className="eyebrow text-mist">Navegação</p>
            <ul className="mt-5 space-y-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={`/${l.href}`} className="link-line inline-block py-1.5 text-[0.9375rem] text-bone/85 hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tratamentos" className="lg:col-span-2">
            <p className="eyebrow text-mist">Cuidados</p>
            <ul className="mt-5 space-y-1">
              {TREATMENTS.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tratamentos/${t.slug}`} className="link-line inline-block py-1.5 text-[0.9375rem] text-bone/85 hover:text-bone">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="eyebrow text-mist">Contato</p>
            <address className="mt-5 text-[0.9375rem] not-italic leading-relaxed text-bone/85">
              {ADDRESS.street}
              <br />
              {ADDRESS.neighborhood}
              <br />
              {ADDRESS.city} – {ADDRESS.state}
            </address>
            <ul className="mt-5 space-y-1 text-[0.9375rem]">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-2 py-1.5 text-bone">
                  <WhatsAppIcon size={15} /> {CONTACT.phoneDisplay}
                  <span className="sr-only"> — WhatsApp (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-2 py-1.5 text-bone">
                  <InstagramIcon size={15} /> {CONTACT.instagramHandle}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              {DOCTOR.instagram && (
                <li>
                  <a href={DOCTOR.instagram} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-2 py-1.5 text-bone">
                    <InstagramIcon size={15} /> {DOCTOR.shortName}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-bone/10 pt-8 text-[0.8125rem] text-mist lg:grid-cols-12 lg:items-start">
          <p className="max-w-[46rem] leading-relaxed lg:col-span-7">
            As informações deste site têm caráter informativo e não substituem uma avaliação individual. A indicação de
            qualquer tratamento depende de avaliação profissional.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-5 lg:justify-end">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="link-line py-1 hover:text-bone">
                {l.label}
              </Link>
            ))}
            <p className="py-1">
              © <CurrentYear /> {SITE.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
