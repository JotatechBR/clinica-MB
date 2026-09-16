import type { MediaSlot } from "./media";

/* ------------------------------------------------------------------ */
/* Manifesto                                                           */
/* ------------------------------------------------------------------ */

export const MANIFESTO = [
  "Envelhecer não significa perder a própria identidade.",
  "Significa compreender cada mudança.",
  "Cuidar da pele, dos contornos e dos cabelos com precisão.",
  "Preservando aquilo que faz você ser você.",
];

/* ------------------------------------------------------------------ */
/* Pilares                                                             */
/* ------------------------------------------------------------------ */

export type Pillar = {
  number: string;
  title: string;
  description: string;
  /** Cor de fundo da seção quando o pilar está ativo. */
  tint: string;
  media: MediaSlot;
};

export const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Rejuvenescimento facial",
    description:
      "Cuidado com a aparência do rosto a partir de uma leitura global, buscando harmonia e um aspecto descansado, sem apagar a expressão de quem você é.",
    tint: "#F6F1EA",
    media: {
      src: "/images/pilares/rejuvenescimento.webp",
      alt: "Cuidado facial no Espaço MB",
      brief: "Foto real — cuidado facial",
      tone: "sand",
    },
  },
  {
    number: "02",
    title: "Saúde e qualidade da pele",
    description:
      "Atenção à textura, ao viço e às necessidades de cada pele, integrando cuidados em consultório e orientações para a rotina.",
    tint: "#F3ECE3",
    media: {
      src: "/images/pilares/pele.webp",
      alt: "Detalhe de cuidado com a pele",
      brief: "Foto real — detalhe de pele / textura",
      tone: "champagne",
    },
  },
  {
    number: "03",
    title: "Gerenciamento do envelhecimento",
    description:
      "Um acompanhamento planejado ao longo do tempo, que compreende as mudanças de cada fase em vez de tratá-las de forma isolada.",
    tint: "#EFE5DA",
    media: {
      src: "/images/pilares/envelhecimento.webp",
      alt: "Planejamento de cuidado no Espaço MB",
      brief: "Foto real — avaliação / planejamento",
      tone: "clay",
    },
  },
  {
    number: "04",
    title: "Tricologia",
    description:
      "Investigação cuidadosa das queixas relacionadas ao couro cabeludo e aos fios, com escuta e avaliação antes de qualquer conduta.",
    tint: "#EDE3D7",
    media: {
      src: "/images/pilares/tricologia.webp",
      alt: "Avaliação tricológica",
      brief: "Foto real — avaliação capilar",
      tone: "cocoa",
    },
  },
  {
    number: "05",
    title: "Tratamentos capilares",
    description:
      "Cuidados para a saúde dos cabelos definidos individualmente e acompanhados ao longo da evolução de cada paciente.",
    tint: "#F1E9DF",
    media: {
      src: "/images/pilares/capilar.webp",
      alt: "Cuidado capilar no Espaço MB",
      brief: "Foto real — cuidado capilar",
      tone: "sand",
    },
  },
  {
    number: "06",
    title: "Protocolos personalizados",
    description:
      "Cada plano é construído a partir da avaliação, podendo combinar diferentes cuidados e tecnologias de acordo com a necessidade de cada mulher.",
    tint: "#F4EEE6",
    media: {
      src: "/images/pilares/protocolos.webp",
      alt: "Protocolo personalizado no Espaço MB",
      brief: "Foto real — consultório / planejamento",
      tone: "espresso",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Dra. Mariane                                                        */
/* ------------------------------------------------------------------ */

export const DOCTOR_TEXT =
  "À frente do Espaço MB, a Dra. Mariane Botelho desenvolve um trabalho voltado ao gerenciamento do envelhecimento facial e ao rejuvenescimento natural, especialmente para mulheres acima dos 40 anos. Sua abordagem parte da análise individual, da escuta e do respeito às características de cada paciente.";

/** Pontos derivados exclusivamente do texto institucional fornecido. */
export const DOCTOR_FACTS = [
  { label: "Foco", value: "Gerenciamento do envelhecimento facial" },
  { label: "Proposta", value: "Rejuvenescimento natural" },
  { label: "Para quem", value: "Especialmente mulheres acima dos 40 anos" },
  { label: "Ponto de partida", value: "Análise individual e escuta" },
];

/* ------------------------------------------------------------------ */
/* Jornada                                                             */
/* ------------------------------------------------------------------ */

export const JOURNEY = [
  {
    number: "01",
    title: "Escuta",
    text: "Entender suas necessidades, expectativas e histórico.",
  },
  {
    number: "02",
    title: "Avaliação",
    text: "Observar de forma individual a pele, os contornos e as características que tornam você única.",
  },
  {
    number: "03",
    title: "Planejamento",
    text: "Definir um protocolo personalizado, com clareza e responsabilidade.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    text: "Acompanhar a evolução e adaptar o cuidado quando necessário.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Tecnologia                                                          */
/* ------------------------------------------------------------------ */

export const TECH_CONCEPTS = [
  {
    code: "T.01",
    title: "Análise individualizada",
    text: "Cada decisão começa pela observação detalhada das características de quem está sendo atendida.",
    image: 0,
  },
  {
    code: "T.02",
    title: "Tecnologias a laser",
    text: "Recursos a laser considerados de acordo com a indicação de cada caso, integrados ao plano de cuidado.",
    image: 1,
  },
  {
    code: "T.03",
    title: "Protocolos combinados",
    text: "Diferentes cuidados podem se complementar quando o planejamento indica esse caminho.",
    image: 1,
  },
  {
    code: "T.04",
    title: "Planejamento personalizado",
    text: "A tecnologia acompanha o plano — e não o contrário. Etapas definidas com clareza.",
    image: 2,
  },
  {
    code: "T.05",
    title: "Segurança",
    text: "Critério na indicação, orientação em cada etapa e acompanhamento da evolução.",
    image: 2,
  },
  {
    code: "T.06",
    title: "Precisão",
    text: "Atenção aos detalhes para respeitar aquilo que torna cada rosto único.",
    image: 0,
  },
];

/** TODO: substituir por fotografias reais dos equipamentos da clínica (fundo escuro, luz recortada). */
export const TECH_IMAGES: (MediaSlot & { caption: string })[] = [
  {
    src: "/images/tecnologia-01.webp",
    alt: "Equipamento do Espaço MB",
    brief: "Equipamento real — luz recortada, fundo escuro",
    caption: "Fig. 01 — Análise",
    tone: "espresso",
  },
  {
    src: "/images/tecnologia-02.webp",
    alt: "Tecnologia a laser do Espaço MB",
    brief: "Equipamento real a laser — detalhe",
    caption: "Fig. 02 — Laser",
    tone: "cocoa",
  },
  {
    src: "/images/tecnologia-03.webp",
    alt: "Sala de procedimentos do Espaço MB",
    brief: "Sala / equipamento real — plano aberto",
    caption: "Fig. 03 — Planejamento",
    tone: "espresso",
  },
];

/* ------------------------------------------------------------------ */
/* Estrutura                                                           */
/* ------------------------------------------------------------------ */

export type GalleryItem = MediaSlot & { caption: string; ratio: "portrait" | "landscape" | "square" | "tall" };

/** TODO: substituir pelas fotografias reais da clínica. */
export const SPACE_GALLERY: GalleryItem[] = [
  {
    src: "/images/estrutura/fachada.webp",
    alt: "Fachada do Espaço MB na Rua Nestor de Barros",
    brief: "Fachada",
    caption: "Fachada — Rua Nestor de Barros, 116",
    ratio: "tall",
    tone: "sand",
  },
  {
    src: "/images/estrutura/recepcao.webp",
    alt: "Recepção do Espaço MB",
    brief: "Recepção",
    caption: "Recepção",
    ratio: "landscape",
    tone: "champagne",
  },
  {
    src: "/images/estrutura/sala.webp",
    alt: "Sala de atendimento do Espaço MB",
    brief: "Sala de atendimento",
    caption: "Sala de atendimento",
    ratio: "portrait",
    tone: "clay",
  },
  {
    src: "/images/estrutura/equipe.webp",
    alt: "Equipe do Espaço MB",
    brief: "Equipe",
    caption: "Equipe",
    ratio: "landscape",
    tone: "cocoa",
  },
  {
    src: "/images/estrutura/equipamentos.webp",
    alt: "Equipamentos do Espaço MB",
    brief: "Equipamentos",
    caption: "Equipamentos",
    ratio: "square",
    tone: "espresso",
  },
  {
    src: "/images/estrutura/detalhes.webp",
    alt: "Detalhe arquitetônico do Espaço MB",
    brief: "Detalhes arquitetônicos",
    caption: "Detalhes arquitetônicos",
    ratio: "portrait",
    tone: "sand",
  },
];

/* ------------------------------------------------------------------ */
/* Avaliações — somente depoimentos reais publicados no Google          */
/* ------------------------------------------------------------------ */

export const REVIEWS = [
  {
    author: "Marcelle Ventura",
    text: "O atendimento foi perfeito. A Dra. Mari explicou como funcionavam os procedimentos, sempre prezando pela naturalidade e por um resultado impecável.",
  },
  {
    author: "Eliana Martins",
    text: "Dra. Mari super profissional e muito atenciosa. Explicou todos os processos e o tratamento foi personalizado de acordo com minhas queixas e necessidades.",
  },
  {
    author: "Itala Nandi",
    text: "Fui acolhida, respeitada e me senti segura para fazer os procedimentos. Esperei meses para conhecê-la e valeu muito a pena.",
  },
  {
    author: "Thais Salviano",
    text: "Amo tudo, é impecável, desde o atendimento na recepção até o cuidado com os pacientes.",
  },
  {
    author: "Tamires Luiz",
    text: "Tive uma experiência excelente do início ao fim. A Isa foi muito cuidadosa, atenciosa e extremamente profissional durante todo o atendimento.",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const FAQ = [
  {
    q: "Como funciona a primeira avaliação?",
    a: "A primeira avaliação é um momento de conversa e observação. Você compartilha suas queixas, expectativas e histórico, e a pele, os contornos ou os cabelos são avaliados de forma individual. A partir disso, as possibilidades são explicadas com clareza.",
  },
  {
    q: "Os tratamentos são personalizados?",
    a: "Sim. Cada plano é definido depois da avaliação, considerando as características, a rotina e os objetivos de cada paciente.",
  },
  {
    q: "A clínica atende mulheres acima dos 40 anos?",
    a: "Sim. O trabalho da Dra. Mariane é especialmente voltado ao gerenciamento do envelhecimento facial e ao rejuvenescimento natural de mulheres acima dos 40 anos — com respeito às mudanças de cada fase.",
  },
  {
    q: "Como é definido o protocolo de tratamento?",
    a: "O protocolo é construído a partir da escuta e da avaliação individual. As etapas, os cuidados envolvidos e o acompanhamento são explicados antes do início, e o plano pode ser ajustado conforme a evolução. A indicação de qualquer tratamento depende dessa avaliação.",
  },
  {
    q: "O Espaço MB oferece tratamentos para pele e cabelos?",
    a: "Sim. Além dos cuidados com o rosto e com a qualidade da pele, o Espaço MB atua com tricologia e tratamentos capilares, sempre a partir de avaliação individual.",
  },
  {
    q: "Onde a clínica está localizada?",
    a: "O Espaço MB fica na Rua Nestor de Barros, 116, no Jardim Anália Franco, em São Paulo – SP.",
  },
  {
    q: "Como posso agendar uma avaliação?",
    a: "O agendamento é feito pelo WhatsApp (11) 93960-3959. Nossa equipe orienta sobre datas disponíveis e tira as dúvidas iniciais.",
  },
];
