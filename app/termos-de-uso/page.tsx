import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/page-shell";
import { LegalContent } from "@/components/layout/legal-content";

export const metadata = buildMetadata({
  title: "Termos de uso",
  description: "Condições de uso do site do Espaço MB.",
  path: "/termos-de-uso",
});

const sections = [
  {
    title: "Finalidade do site",
    body: [
      "Este site apresenta o Espaço MB, sua abordagem de cuidado e suas áreas de atuação, e oferece canais para contato e agendamento de avaliação.",
    ],
  },
  {
    title: "Caráter informativo",
    body: [
      "Os conteúdos publicados têm caráter exclusivamente informativo e não substituem uma avaliação individual. Nenhuma informação deste site deve ser interpretada como indicação de tratamento ou garantia de resultado.",
      "A indicação de qualquer tratamento depende de avaliação profissional.",
    ],
  },
  {
    title: "Imagens e conteúdo",
    body: [
      "Textos, imagens e elementos visuais deste site pertencem ao Espaço MB ou são utilizados com autorização, e não podem ser reproduzidos sem permissão.",
    ],
  },
  {
    title: "Links externos",
    body: [
      "O site contém links para serviços de terceiros, como WhatsApp, Instagram e Google. O Espaço MB não se responsabiliza pelo conteúdo ou pelas práticas dessas plataformas.",
    ],
  },
  {
    title: "Atualizações",
    body: ["Estes termos podem ser atualizados a qualquer momento. A versão vigente é sempre a publicada nesta página."],
  },
];

export default function TermsPage() {
  return (
    <PageShell eyebrow="Documentos" title={<>Termos de <em className="serif-italic text-clay">uso</em></>}>
      <LegalContent sections={sections} updated="setembro de 2026" />
    </PageShell>
  );
}
