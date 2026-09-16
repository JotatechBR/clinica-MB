import type { Metadata } from "next";
import { ADDRESS, CONTACT, DOCTOR, OPENING_HOURS, SITE } from "./constants";
import { FAQ } from "@/data/content";
import { TREATMENTS, type Treatment } from "@/data/treatments";

export const absoluteUrl = (path = "/") => new URL(path, SITE.url).toString();

type PageSeo = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function buildMetadata({ title, description, path = "/", noIndex }: PageSeo = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — Estética avançada no Jardim Anália Franco`;
  const desc = description ?? SITE.description;

  return {
    title: title ? title : { absolute: fullTitle },
    description: desc,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: path,
      siteName: SITE.name,
      title: fullTitle,
      description: desc,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Dados estruturados                                                  */
/* ------------------------------------------------------------------ */

const BUSINESS_ID = absoluteUrl("/#espaco-mb");
const DOCTOR_ID = absoluteUrl("/#dra-mariane-botelho");

/**
 * HealthAndBeautyBusiness foi escolhido por não declarar categoria médica
 * ou especialidade não confirmada.
 * Nota: aggregateRating não é incluído — o Google não exibe avaliações
 * autodeclaradas de LocalBusiness e considera esse uso inadequado.
 */
export function businessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": BUSINESS_ID,
    name: SITE.name,
    alternateName: SITE.alternateName,
    description: SITE.description,
    url: SITE.url,
    telephone: CONTACT.phoneE164,
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      addressCountry: ADDRESS.country,
      ...(ADDRESS.postalCode ? { postalCode: ADDRESS.postalCode } : {}),
    },
    areaServed: [
      { "@type": "Place", name: "Jardim Anália Franco, São Paulo" },
      { "@type": "City", name: "São Paulo" },
    ],
    sameAs: [CONTACT.instagramUrl],
    founder: { "@id": DOCTOR_ID },
    knowsAbout: [
      "Gerenciamento do envelhecimento facial",
      "Rejuvenescimento facial natural",
      "Saúde e qualidade da pele",
      "Tricologia",
      "Tratamentos capilares",
      "Tratamentos a laser",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Áreas de cuidado",
      itemListElement: TREATMENTS.map((t) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: t.kicker, url: absoluteUrl(`/tratamentos/${t.slug}`) },
      })),
    },
  };

  if (ADDRESS.geo) {
    data.geo = { "@type": "GeoCoordinates", ...ADDRESS.geo };
  }
  if (OPENING_HOURS) {
    data.openingHoursSpecification = OPENING_HOURS.filter((h) => h.schema).map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.schema!.days,
      opens: h.schema!.opens,
      closes: h.schema!.closes,
    }));
  }
  return data;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": DOCTOR_ID,
    name: DOCTOR.name,
    worksFor: { "@id": BUSINESS_ID },
    ...(DOCTOR.instagram ? { sameAs: [DOCTOR.instagram] } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "pt-BR",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function treatmentJsonLd(t: Treatment) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t.kicker,
      description: t.seoDescription,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "São Paulo" },
      url: absoluteUrl(`/tratamentos/${t.slug}`),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.name, item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Tratamentos", item: absoluteUrl("/#tratamentos") },
        { "@type": "ListItem", position: 3, name: t.kicker, item: absoluteUrl(`/tratamentos/${t.slug}`) },
      ],
    },
  ];
}
