/**
 * Registro de todas as imagens reais esperadas pelo site.
 *
 * Basta salvar o arquivo em `public` com o caminho indicado para que ele
 * substitua automaticamente o placeholder (a verificação ocorre no build /
 * no servidor em `lib/assets.ts`). Nenhuma imagem de banco ou gerada por IA
 * deve ser usada para representar pacientes, profissionais ou resultados.
 */

export type MediaTone = "sand" | "clay" | "cocoa" | "espresso" | "ivory" | "champagne";

export type MediaSlot = {
  src: string;
  alt: string;
  /** Descrição curta exibida no placeholder enquanto o arquivo não existe. */
  brief: string;
  tone: MediaTone;
  /** Posição do recorte (object-position) para a fotografia real. */
  position?: string;
};

const slot = (s: MediaSlot) => s;

export const MEDIA = {
  heroPortrait: slot({
    src: "/images/dra-mariane-hero.webp",
    alt: "Dra. Mariane Botelho no Espaço MB",
    brief: "Retrato vertical da Dra. Mariane — luz natural lateral",
    tone: "sand",
    position: "50% 25%",
  }),
  doctorPortrait: slot({
    src: "/images/dra-mariane-retrato.webp",
    alt: "Retrato da Dra. Mariane Botelho",
    brief: "Retrato editorial da Dra. Mariane em ambiente da clínica",
    tone: "clay",
    position: "50% 20%",
  }),
  doctorDetail: slot({
    src: "/images/dra-mariane-detalhe.webp",
    alt: "Dra. Mariane Botelho durante avaliação no Espaço MB",
    brief: "Detalhe: mãos, avaliação ou consultório",
    tone: "champagne",
  }),
  manifesto: slot({
    src: "/images/manifesto.webp",
    alt: "Ambiente do Espaço MB com luz suave",
    brief: "Plano fechado com luz recortada — pele, textura ou ambiente",
    tone: "cocoa",
  }),
  finalCta: slot({
    src: "/images/cta-final.webp",
    alt: "Detalhe do Espaço MB",
    brief: "Plano fechado real — detalhe do atendimento ou do espaço",
    tone: "cocoa",
  }),
} satisfies Record<string, MediaSlot>;
