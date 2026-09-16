import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  aside?: React.ReactNode;
};

/** Estrutura editorial para páginas internas (tratamentos e documentos legais). */
export function PageShell({ eyebrow, title, intro, children, aside }: Props) {
  return (
    <article className="paper bg-bone">
      <header className="shell pb-16 pt-[calc(var(--header-h)+5rem)] lg:pb-24 lg:pt-[calc(var(--header-h)+8rem)]">
        <Link
          href="/"
          className="group mb-12 inline-flex min-h-11 items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-stone hover:text-espresso"
        >
          <ArrowLeft size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          Espaço MB
        </Link>
        <p className="eyebrow flex items-center gap-3 text-clay">
          <span className="h-px w-8 bg-clay" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-[16ch] text-hero text-espresso">{title}</h1>
        {intro && <div className="mt-10 max-w-[42rem] text-subtitle font-display text-cocoa">{intro}</div>}
      </header>
      <div className="shell grid gap-12 border-t border-espresso/10 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-7">{children}</div>
        {aside && <aside className="lg:col-span-4 lg:col-start-9">{aside}</aside>}
      </div>
    </article>
  );
}
