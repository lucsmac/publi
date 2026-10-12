import Image from "next/image";
import { MaskLine, Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui";
import { INSTAGRAM } from "@/lib/site";

export function School() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-32">
      <div className="grid gap-10 overflow-hidden rounded-3xl border border-line lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative min-h-[320px]">
          <Image
            src="/media/storymaker.jpg"
            alt="Boné da Publi e crachá escrito Storymaker sobre uma mesa amarela"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-7 sm:p-12 lg:pl-2">
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Escola de Storymaker · em breve</p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.88] font-black uppercase">
            <MaskLine>Storymaker não</MaskLine>
            <MaskLine delay={0.1}>é hobby.</MaskLine>
            <MaskLine delay={0.2}>
              <em className="font-serif text-[0.85em] font-normal text-accent normal-case">É empresa.</em>
            </MaskLine>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-paper/80">
              O que a Publi aprendeu gravando evento atrás de evento, organizado para quem quer viver disso: roteiro,
              gravação, edição rápida, preço e cliente. A lista de espera define o primeiro curso.
            </p>
            <div className="mt-8">
              <ButtonLink href="/escola" variant="outline">
                Entrar na lista de espera
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BoraRow() {
  return (
    <div className="flex overflow-hidden" aria-hidden>
      <div className="flex w-max shrink-0 animate-marquee" style={{ "--marquee-duration": "22s" } as React.CSSProperties}>
        {[0, 1].map((copy) => (
          <p key={copy} className="flex shrink-0 items-center font-display text-[clamp(6rem,22vw,20rem)] leading-[0.82] font-black uppercase">
            <span className="px-6">Bora gravar?</span>
            <span className="px-6 text-outline">Bora gravar?</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export function FinalCall() {
  return (
    <section className="overflow-hidden border-t border-line bg-accent pt-16 text-ink sm:pt-24 [&_.text-outline]:[-webkit-text-stroke-color:var(--color-ink)]">
      <h2 className="sr-only">Bora gravar?</h2>
      <BoraRow />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-lg font-serif text-3xl leading-tight italic sm:text-4xl">
          Conta a data e o que vai acontecer. A proposta chega no seu WhatsApp.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/orcamento" variant="ink">
            Pedir orçamento
          </ButtonLink>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-ink px-7 py-3.5 font-display text-lg font-extrabold tracking-wide uppercase transition hover:bg-ink hover:text-accent"
          >
            Ver o Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
