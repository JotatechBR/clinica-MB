import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/constants";
import { PageShell } from "@/components/layout/page-shell";
import { LegalContent } from "@/components/layout/legal-content";

export const metadata = buildMetadata({
  title: "Política de privacidade",
  description: "Como o Espaço MB trata as informações de quem visita o site e entra em contato.",
  path: "/politica-de-privacidade",
});

const sections = [
  {
    title: "Sobre este documento",
    body: [
      "Esta política explica, de forma simples, como o Espaço MB trata as informações relacionadas ao uso deste site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
    ],
  },
  {
    title: "Informações coletadas",
    body: [
      "Este site não possui formulários de cadastro. Quando você escolhe entrar em contato pelo WhatsApp, as informações que compartilha na conversa são utilizadas exclusivamente para responder à sua solicitação e organizar o agendamento.",
      "Dados técnicos de navegação (como tipo de dispositivo e páginas acessadas) podem ser registrados pela infraestrutura de hospedagem para fins de segurança e desempenho.",
    ],
  },
  {
    title: "Serviços de terceiros",
    body: [
      "O site utiliza serviços externos para funcionalidades específicas: o mapa de localização é carregado a partir do Google Maps, e os links de contato direcionam para o WhatsApp e o Instagram. Ao interagir com esses serviços, aplicam-se também as políticas de privacidade de cada plataforma.",
    ],
  },
  {
    title: "Compartilhamento",
    body: ["O Espaço MB não comercializa informações pessoais. Dados só são compartilhados quando necessário para cumprir obrigações legais."],
  },
  {
    title: "Seus direitos",
    body: [
      `Você pode solicitar informações sobre o tratamento dos seus dados, bem como correção ou exclusão, entrando em contato pelo WhatsApp ${CONTACT.phoneDisplay}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Documentos" title={<>Política de <em className="serif-italic text-clay">privacidade</em></>}>
      <LegalContent sections={sections} updated="setembro de 2026" />
    </PageShell>
  );
}
