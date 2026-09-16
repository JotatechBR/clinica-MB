import { faqJsonLd } from "@/lib/seo";
import { ExperienceLayer } from "@/components/three/experience-layer";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Pillars } from "@/components/sections/pillars";
import { Doctor } from "@/components/sections/doctor";
import { Journey } from "@/components/sections/journey";
import { Technology } from "@/components/sections/technology";
import { Treatments } from "@/components/sections/treatments";
import { SpaceGallery } from "@/components/sections/space-gallery";
import { Reviews } from "@/components/sections/reviews";
import { Faq } from "@/components/sections/faq";
import { Location } from "@/components/sections/location";
import { FinalCta } from "@/components/sections/final-cta";

/**
 * Narrativa da página:
 * luz (hero) → escuridão (manifesto) → compreensão (pilares) → autoridade (Dra. Mariane)
 * → processo (jornada) → precisão (tecnologia) → escolha (tratamentos) → lugar (estrutura)
 * → confiança (avaliações) → dúvidas (FAQ) → chegada (localização) → conversa (CTA final)
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <ExperienceLayer />
      <Hero />
      <Manifesto />
      <Pillars />
      <Doctor />
      <Journey />
      <Technology />
      <Treatments />
      <SpaceGallery />
      <Reviews />
      <Faq />
      <Location />
      <FinalCta />
    </>
  );
}
