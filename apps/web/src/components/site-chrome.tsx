import Link from "next/link";
import type { ReactNode } from "react";
import { INSTAGRAM, INSTAGRAM_WEDDING } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-black tracking-tight uppercase ${className}`}>
      Publi<span className="text-accent">.</span>
    </span>
  );
}

// `overlay`: cabeçalho transparente por cima do vídeo da página inicial.
export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 h-16 ${overlay ? "bg-gradient-to-b from-ink/80 to-transparent" : "border-b border-line bg-ink/95 sm:bg-ink/80 sm:backdrop-blur"}`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-10">
        <Link href="/" aria-label="Publi, página inicial" className="relative z-50">
          <Wordmark className="text-3xl" />
        </Link>
        <nav className="flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-paper/70 uppercase sm:gap-6">
          <Link href="/escola" className="hidden transition hover:text-accent sm:block">
            Escola
          </Link>
          <Link href="/equipe" className="hidden transition hover:text-accent sm:block">
            Trabalhe conosco
          </Link>
          <Link
            href="/orcamento"
            className="relative z-50 rounded-full bg-accent px-5 py-2 font-display text-base font-extrabold tracking-wide text-ink transition hover:brightness-110"
          >
            Orçamento
          </Link>
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p className="flex items-center gap-3">
          <Wordmark className="text-2xl text-paper" />
          Produtora de conteúdo · Natal, RN
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="transition hover:text-paper">
            @publiagencia.rn
          </a>
          <a href={INSTAGRAM_WEDDING} target="_blank" rel="noreferrer" className="transition hover:text-paper">
            @publi.wedding
          </a>
          <Link href="/escola" className="transition hover:text-paper">
            Escola
          </Link>
          <Link href="/equipe" className="transition hover:text-paper">
            Trabalhe conosco
          </Link>
        </nav>
      </div>
    </footer>
  );
}

type FormPageProps = { eyebrow: string; title: ReactNode; lead: string; children: ReactNode };

// Moldura das páginas de formulário: cabeçalho, título e coluna estreita.
export function FormPage({ eyebrow, title, lead, children }: FormPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-xl px-5 py-12 sm:py-20">
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{eyebrow}</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.86] font-black uppercase sm:text-7xl">{title}</h1>
        <p className="mt-5 text-lg text-paper/75">{lead}</p>
        <div className="mt-10">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}

// Palavra em serifa itálica amarela, usada dentro dos títulos.
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif text-[0.85em] font-normal text-accent normal-case">{children}</em>;
}

export function SuccessPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="rounded-2xl border border-accent/40 bg-accent/10 p-7">
      <h2 className="font-display text-4xl leading-none font-black uppercase">{title}</h2>
      <div className="mt-4 space-y-4 text-paper/75">{children}</div>
    </div>
  );
}
