import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTreatment, TREATMENTS, TREATMENT_DISCLAIMER } from "@/data/treatments";
import { buildMetadata, treatmentJsonLd } from "@/lib/seo";
import { whatsappUrl } from "@/lib/constants";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { WhatsAppIcon } from "@/components/ui/icons";

type Params = { slug: string };

export function generateStaticParams() {
  return TREATMENTS.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  return buildMetadata({ title: t.seoTitle, description: t.seoDescription, path: `/tratamentos/${t.slug}` });
}

export default async function TreatmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();

  const message = `Olá, conheci o Espaço MB pelo site e gostaria de agendar uma avaliação sobre ${t.kicker.toLowerCase()}.`;
  const others = TREATMENTS.filter((o) => o.slug !== t.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(treatmentJsonLd(t)) }} />
      <PageShell
        eyebrow={`${t.number} — Tratamentos`}
        title={t.kicker}
        intro={<p>{t.summary}</p>}
        aside={
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <p className="eyebrow text-clay">Outros cuidados</p>
            <ul className="mt-5 border-b border-espresso/10">
              {others.map((o) => (
                <li key={o.slug} className="border-t border-espresso/10">
                  <Link href={`/tratamentos/${o.slug}`} className="group flex min-h-14 items-baseline gap-4 py-4">
                    <span className="tabular text-[0.75rem] text-clay">{o.number}</span>
                    <span className="font-display text-[1.375rem] leading-tight text-espresso transition-transform duration-500 group-hover:translate-x-1">
                      {o.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <MediaFrame media={t.media} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[16/10] w-full" priority />

        <div className="mt-14 space-y-6 text-body text-stone">
          {t.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <ul className="mt-12 grid gap-0 sm:grid-cols-3 sm:gap-6">
          {t.focus.map((f) => (
            <li key={f} className="border-t border-espresso/15 py-5 text-[1rem] text-espresso">
              {f}
            </li>
          ))}
        </ul>

        <p className="mt-10 flex items-center gap-3 text-[0.875rem] text-stone">
          <span className="size-1.5 rounded-full bg-clay" aria-hidden="true" />
          {TREATMENT_DISCLAIMER}
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={whatsappUrl(message)} external icon={<WhatsAppIcon size={16} />}>
            Agendar minha avaliação
          </Button>
          <Button href="/#tratamentos" variant="secondary">
            Ver todas as categorias
          </Button>
        </div>
      </PageShell>
    </>
  );
}
