import type { MediaSlot } from "./media";

/**
 * Categorias de cuidado do Espaço MB.
 *
 * Importante: descrevem áreas de atuação informadas pela clínica.
 * Procedimentos específicos, marcas de equipamentos e promessas de resultado
 * NÃO devem ser adicionados sem confirmação.
 * Cada categoria já gera uma página própria em /tratamentos/[slug].
 */

export type Treatment = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  summary: string;
  body: string[];
  focus: string[];
  seoTitle: string;
  seoDescription: string;
  /** Tonalidade da iluminação do palco na seção de tratamentos. */
  light: string;
  media: MediaSlot;
};

export const TREATMENTS: Treatment[] = [
  {
    slug: "rejuvenescimento-facial",
    number: "01",
    title: "Rejuvenescimento",
    kicker: "Rejuvenescimento facial natural",
    summary:
      "Cuidados voltados a uma aparência descansada e harmônica, respeitando traços, proporções e a expressão de cada mulher.",
    body: [
      "O rejuvenescimento no Espaço MB parte de uma leitura cuidadosa do rosto como um todo — não de um ponto isolado. A proposta é compreender como pele, contornos e sustentação se relacionam em cada fase da vida.",
      "A partir da avaliação, a Dra. Mariane discute com a paciente as possibilidades adequadas ao seu caso, sempre com foco em naturalidade e em decisões compartilhadas.",
    ],
    focus: ["Leitura global do rosto", "Respeito à expressão individual", "Planejamento gradual"],
    seoTitle: "Rejuvenescimento facial natural no Anália Franco",
    seoDescription:
      "Rejuvenescimento facial com foco em naturalidade no Espaço MB, Jardim Anália Franco. Indicação sempre a partir de avaliação individual.",
    light: "#C4AA87",
    media: {
      src: "/images/tratamentos/rejuvenescimento.webp",
      alt: "Atendimento de rejuvenescimento facial no Espaço MB",
      brief: "Foto real de atendimento facial (com autorização)",
      tone: "sand",
    },
  },
  {
    slug: "qualidade-da-pele",
    number: "02",
    title: "Qualidade da pele",
    kicker: "Saúde e qualidade da pele",
    summary:
      "Uma pele saudável é a base de qualquer cuidado. O acompanhamento considera textura, viço, sensibilidade e rotina.",
    body: [
      "Antes de qualquer indicação, observamos a pele com atenção: suas características, sua história e os hábitos que influenciam sua qualidade ao longo do tempo.",
      "O plano pode integrar cuidados em consultório e orientações para o dia a dia, definidos de forma individual após a avaliação.",
    ],
    focus: ["Análise das características da pele", "Orientação de rotina", "Cuidados em consultório"],
    seoTitle: "Tratamentos para qualidade da pele no Anália Franco",
    seoDescription:
      "Cuidados para saúde e qualidade da pele no Espaço MB, Jardim Anália Franco, São Paulo. Protocolos definidos após avaliação individual.",
    light: "#DCCBBB",
    media: {
      src: "/images/tratamentos/qualidade-da-pele.webp",
      alt: "Cuidado com a qualidade da pele no Espaço MB",
      brief: "Detalhe real de textura de pele ou cuidado em consultório",
      tone: "champagne",
    },
  },
  {
    slug: "gerenciamento-do-envelhecimento",
    number: "03",
    title: "Gerenciamento do envelhecimento",
    kicker: "Gerenciamento do envelhecimento facial",
    summary:
      "Uma visão de longo prazo: acompanhar as mudanças do rosto com planejamento, em vez de intervenções pontuais.",
    body: [
      "Envelhecer é um processo contínuo, e o cuidado também pode ser. O gerenciamento do envelhecimento facial propõe um acompanhamento ao longo do tempo, com etapas pensadas para cada momento.",
      "Esse olhar é central no trabalho da Dra. Mariane, especialmente para mulheres acima dos 40 anos que desejam cuidar de si sem deixar de se reconhecer.",
    ],
    focus: ["Planejamento a longo prazo", "Revisões periódicas", "Decisões compartilhadas"],
    seoTitle: "Gerenciamento do envelhecimento facial em São Paulo",
    seoDescription:
      "Gerenciamento do envelhecimento facial com planejamento individual no Espaço MB, Jardim Anália Franco, São Paulo.",
    light: "#9B715F",
    media: {
      src: "/images/tratamentos/envelhecimento.webp",
      alt: "Avaliação facial individualizada no Espaço MB",
      brief: "Foto real de avaliação ou planejamento facial",
      tone: "clay",
    },
  },
  {
    slug: "tricologia",
    number: "04",
    title: "Tricologia",
    kicker: "Tricologia",
    summary:
      "Atenção ao couro cabeludo e aos fios, com investigação cuidadosa das queixas antes de qualquer conduta.",
    body: [
      "Queixas capilares podem ter origens diferentes. Por isso, a tricologia no Espaço MB começa pela escuta e pela observação atenta do couro cabeludo e dos fios.",
      "Com base nessa avaliação, é definido um acompanhamento individual, com orientações claras sobre cada etapa.",
    ],
    focus: ["Escuta detalhada da queixa", "Avaliação do couro cabeludo", "Acompanhamento contínuo"],
    seoTitle: "Tricologia em São Paulo — Anália Franco",
    seoDescription:
      "Tricologia no Espaço MB, Jardim Anália Franco, São Paulo: avaliação do couro cabeludo e dos fios com acompanhamento individual.",
    light: "#C4AA87",
    media: {
      src: "/images/tratamentos/tricologia.webp",
      alt: "Avaliação tricológica no Espaço MB",
      brief: "Foto real de avaliação capilar",
      tone: "cocoa",
    },
  },
  {
    slug: "saude-capilar",
    number: "05",
    title: "Saúde capilar",
    kicker: "Tratamentos capilares",
    summary:
      "Cuidados para a saúde dos cabelos integrados ao plano individual, com orientação e acompanhamento da evolução.",
    body: [
      "Os tratamentos capilares são indicados a partir da avaliação e podem combinar cuidados em consultório com orientações para casa.",
      "A evolução é acompanhada ao longo do tempo, e o plano pode ser ajustado sempre que necessário.",
    ],
    focus: ["Plano individual", "Cuidados em consultório", "Ajustes ao longo do tempo"],
    seoTitle: "Tratamentos capilares no Anália Franco",
    seoDescription:
      "Tratamentos capilares com acompanhamento individual no Espaço MB, Jardim Anália Franco, São Paulo.",
    light: "#DCCBBB",
    media: {
      src: "/images/tratamentos/saude-capilar.webp",
      alt: "Cuidado capilar no Espaço MB",
      brief: "Foto real de cuidado capilar em consultório",
      tone: "sand",
    },
  },
  {
    slug: "tecnologias-avancadas",
    number: "06",
    title: "Tecnologias avançadas",
    kicker: "Tecnologias e tratamentos a laser",
    summary:
      "Recursos tecnológicos, incluindo tecnologias a laser, utilizados com critério e somente quando fazem sentido para o plano.",
    body: [
      "A tecnologia é uma ferramenta a serviço do planejamento — nunca o ponto de partida. Cada recurso é considerado de acordo com as características e o objetivo de cada paciente.",
      "Quando indicados, os tratamentos com tecnologia podem ser combinados a outros cuidados em protocolos personalizados.",
    ],
    focus: ["Indicação criteriosa", "Protocolos combinados", "Segurança em cada etapa"],
    seoTitle: "Tecnologias avançadas e laser no Anália Franco",
    seoDescription:
      "Tecnologias avançadas e tratamentos a laser com indicação individual no Espaço MB, Jardim Anália Franco, São Paulo.",
    light: "#9B715F",
    media: {
      src: "/images/tratamentos/tecnologias.webp",
      alt: "Tecnologia utilizada no Espaço MB",
      brief: "Foto real de equipamento da clínica",
      tone: "espresso",
    },
  },
];

export const TREATMENT_DISCLAIMER = "A indicação de qualquer tratamento depende de avaliação individual.";

export function getTreatment(slug: string) {
  return TREATMENTS.find((t) => t.slug === slug);
}
