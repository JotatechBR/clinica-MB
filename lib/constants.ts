/**
 * Configuração central do Espaço MB.
 *
 * Tudo o que é conteúdo institucional, contato ou link externo vive aqui.
 * Regra de autenticidade: valores `null` significam "ainda não confirmado".
 * Os componentes escondem ou adaptam o conteúdo quando o valor é `null` —
 * nunca preencha com dados presumidos.
 */

export const SITE = {
  name: "Espaço MB",
  alternateName: "Clínica MB",
  // TODO: substituir pelo domínio definitivo antes da publicação.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.espacomb.com.br",
  locale: "pt_BR",
  description:
    "Clínica de estética avançada no Jardim Anália Franco, em São Paulo. Gerenciamento do envelhecimento facial, rejuvenescimento natural, saúde da pele e tricologia com avaliação individualizada.",
  shortDescription:
    "Estética avançada, rejuvenescimento natural e tricologia no Jardim Anália Franco, com avaliação individualizada e protocolos personalizados.",
} as const;

export const DOCTOR = {
  name: "Dra. Mariane Botelho",
  shortName: "Dra. Mariane",
  firstName: "Mariane",
  lastName: "Botelho",
  /**
   * TODO: inserir apenas credenciais confirmadas pela clínica
   * (ex.: registro profissional, formação, títulos).
   * A lista vazia oculta o bloco no site.
   */
  credentials: [] as string[],
  /** TODO: perfil pessoal do Instagram ainda não informado. Ex.: "https://www.instagram.com/usuario" */
  instagram: null as string | null,
};

const WHATSAPP_NUMBER = "5511939603959";
const DEFAULT_MESSAGE = "Olá, conheci o Espaço MB pelo site e gostaria de agendar uma avaliação.";

export const CONTACT = {
  phoneDisplay: "(11) 93960-3959",
  phoneE164: "+5511939603959",
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappMessage: DEFAULT_MESSAGE,
  instagramHandle: "@mbclinica",
  instagramUrl: "https://www.instagram.com/mbclinica/",
  // TODO: e-mail não informado.
  email: null as string | null,
};

export const ADDRESS = {
  street: "Rua Nestor de Barros, 116",
  neighborhood: "Jardim Anália Franco",
  city: "São Paulo",
  state: "SP",
  country: "BR",
  // TODO: confirmar CEP antes de incluir nos dados estruturados.
  postalCode: null as string | null,
  // TODO: confirmar coordenadas exatas (usadas no Schema.org). Não estimar.
  geo: null as { latitude: number; longitude: number } | null,
  full: "Rua Nestor de Barros, 116, Jardim Anália Franco, São Paulo – SP",
};

/**
 * Horários de funcionamento.
 * TODO: preencher somente com horários confirmados. Enquanto `null`,
 * o site orienta a consultar a equipe pelo WhatsApp.
 * Formato: [{ days: "Segunda a sexta", hours: "9h às 19h", schema: { days: ["Monday"], opens: "09:00", closes: "19:00" } }]
 */
export const OPENING_HOURS: null | Array<{
  days: string;
  hours: string;
  schema?: { days: string[]; opens: string; closes: string };
}> = null;

/** TODO: marcar `true` apenas se a clínica confirmar atendimento exclusivamente com hora marcada. */
export const BY_APPOINTMENT_ONLY: boolean | null = null;

export const REPUTATION = {
  rating: 4.9,
  ratingDisplay: "4,9",
  reviewCount: 94,
  /**
   * TODO: substituir pelo link direto do Perfil da Empresa no Google.
   * Enquanto isso, abre a busca do endereço no Google Maps.
   */
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Espaço MB, Rua Nestor de Barros, 116, Jardim Anália Franco, São Paulo"),
};

export const MAPS = {
  embedUrl:
    "https://www.google.com/maps?output=embed&z=16&q=" +
    encodeURIComponent("Rua Nestor de Barros, 116, Jardim Anália Franco, São Paulo - SP"),
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Rua Nestor de Barros, 116, Jardim Anália Franco, São Paulo - SP"),
};

export function whatsappUrl(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const TEAM_MESSAGE = "Olá, conheci o Espaço MB pelo site e gostaria de falar com a equipe.";

export const NAV_LINKS = [
  { label: "Clínica", href: "#clinica" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Dra. Mariane", href: "#dra-mariane" },
  { label: "Tecnologias", href: "#tecnologias" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Contato", href: "#contato" },
] as const;

export const LEGAL_LINKS = [
  { label: "Política de privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de uso", href: "/termos-de-uso" },
] as const;
