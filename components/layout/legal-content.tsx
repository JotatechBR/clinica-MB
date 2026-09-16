type Section = { title: string; body: string[] };

export function LegalContent({ sections, updated }: { sections: Section[]; updated: string }) {
  return (
    <div className="max-w-[44rem]">
      <p className="mb-12 border-l-2 border-clay/50 pl-4 text-[0.875rem] text-stone">
        Documento-base em revisão. {/* TODO: revisar com assessoria jurídica e confirmar dados do controlador (razão social, CNPJ, e-mail do encarregado). */}
        Última atualização: {updated}.
      </p>
      {sections.map((s, i) => (
        <section key={s.title} className="border-t border-espresso/10 py-10 first:border-t-0 first:pt-0">
          <h2 className="flex items-baseline gap-4 text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-tight text-espresso">
            <span className="tabular font-sans text-[0.75rem] font-semibold text-clay">{String(i + 1).padStart(2, "0")}</span>
            {s.title}
          </h2>
          <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-stone">
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
