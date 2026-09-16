import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { buildMetadata, businessJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { getAvailableImages } from "@/lib/assets";
import { ExperienceProvider } from "@/components/providers/experience-provider";
import { Preloader } from "@/components/layout/preloader";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ScrollRefresher } from "@/components/layout/scroll-refresher";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Cursor } from "@/components/layout/cursor";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/navigation/header";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...buildMetadata(),
  title: {
    default: `${SITE.name} — Estética avançada no Jardim Anália Franco`,
    template: `%s | ${SITE.name}`,
  },
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  keywords: [
    "clínica de estética Anália Franco",
    "estética avançada Anália Franco",
    "rejuvenescimento facial Anália Franco",
    "gerenciamento do envelhecimento facial",
    "qualidade da pele",
    "tricologia São Paulo",
    "tratamentos capilares Anália Franco",
  ],
  formatDetection: { telephone: false },
  category: "health and beauty",
};

export const viewport: Viewport = {
  themeColor: "#F6F1EA",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = [businessJsonLd(), personJsonLd(), websiteJsonLd()];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const availableImages = getAvailableImages();

  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script
          // marca JS ativo antes da pintura, evitando piscadas nas revelações
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <noscript>
          <style>{"[data-preloader]{display:none!important}"}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ExperienceProvider availableImages={availableImages}>
          <a
            href="#conteudo"
            className="sr-only fixed left-4 top-4 z-[300] bg-espresso px-5 py-3 text-ivory focus:not-sr-only"
          >
            Pular para o conteúdo
          </a>
          <Preloader />
          <SmoothScroll />
          <ScrollRefresher />
          <ScrollProgress />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <Cursor />
          <div className="grain" aria-hidden="true" />
        </ExperienceProvider>
      </body>
    </html>
  );
}
