import Link from "next/link";

export default function NotFound() {
  return (
    <section className="paper flex min-h-[100svh] items-center bg-bone">
      <div className="shell py-32">
        <p className="eyebrow text-clay">Erro 404</p>
        <h1 className="mt-6 max-w-[14ch] text-section text-espresso">
          Esta página não foi <em className="serif-italic text-clay">encontrada.</em>
        </h1>
        <Link href="/" className="link-line mt-10 inline-block py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em]">
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
