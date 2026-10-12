import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RecDot } from "@/components/home/timecode";
import { Wordmark } from "@/components/site-chrome";
import { INSTAGRAM_WEDDING, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Links",
  description: "Orçamentos, Escola de Storymaker e vagas da Publi.",
};

const row =
  "group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface/90 px-5 py-4 backdrop-blur transition hover:border-accent hover:bg-accent hover:text-ink";

function Arrow() {
  return (
    <span aria-hidden className="text-xl transition group-hover:translate-x-1 group-hover:-rotate-45">
      →
    </span>
  );
}

function Row({ title, detail }: { title: string; detail: string }) {
  return (
    <>
      <span>
        <span className="block font-display text-2xl leading-none font-extrabold uppercase">{title}</span>
        <span className="mt-1 block text-sm text-muted transition group-hover:text-ink/70">{detail}</span>
      </span>
      <Arrow />
    </>
  );
}

const more = [
  { href: "/escola", title: "Escola de Storymaker", detail: "Lista de espera do primeiro curso." },
  { href: "/equipe", title: "Trabalhe conosco", detail: "Candidate-se para o time de storymakers." },
];

export default function BioPage() {
  return (
    <>
      <main className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-0 pb-12">
        <div className="relative -mx-5 h-64 overflow-hidden">
          <Image src="/media/storymaker.jpg" alt="" fill loading="eager" sizes="448px" className="animate-zoom-in object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/25 to-ink" />
        </div>

        <header className="relative -mt-20 text-center">
          <Link href="/" aria-label="Publi, página inicial">
            <Wordmark className="text-7xl" />
          </Link>
          <p className="mt-2 flex items-center justify-center gap-2 font-mono text-xs tracking-[0.16em] text-muted uppercase">
            <RecDot /> Conteúdo em tempo real · Natal, RN
          </p>
        </header>

        <section className="mt-9">
          <h2 className="mb-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">Pedir orçamento</h2>
          <ul className="space-y-3">
            {services.map((s, i) => (
              <li key={s.slug} className="animate-fade-up" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
                <Link href={`/orcamento/${s.slug}`} className={row}>
                  <Row title={s.title} detail={s.description} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">Mais da Publi</h2>
          <ul className="space-y-3">
            {more.map((m, i) => (
              <li key={m.href} className="animate-fade-up" style={{ animationDelay: `${0.45 + i * 0.07}s` }}>
                <Link href={m.href} className={row}>
                  <Row title={m.title} detail={m.detail} />
                </Link>
              </li>
            ))}
            <li className="animate-fade-up" style={{ animationDelay: "0.59s" }}>
              <a href={INSTAGRAM_WEDDING} target="_blank" rel="noreferrer" className={row}>
                <Row title="@publi.wedding" detail="Nosso perfil de casamentos." />
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
