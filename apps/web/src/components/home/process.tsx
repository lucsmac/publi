import { MaskLine, Reveal } from "@/components/motion";

const steps = [
  {
    when: "Antes",
    title: "A gente chega sabendo o que gravar.",
    body: "Roteiro do evento combinado com você: os momentos que não podem faltar, quem precisa aparecer e o que cada conteúdo tem que provocar.",
  },
  {
    when: "Durante",
    title: "Grava, edita, publica.",
    body: "Enquanto tudo acontece, a equipe capta e solta os conteúdos no ar. Seu evento vira assunto na hora, não na semana seguinte.",
  },
  {
    when: "Depois",
    title: "Você acorda com tudo pronto.",
    body: "Os melhores momentos chegam organizados no dia seguinte, prontos para repostar, impulsionar e vender a próxima edição.",
  },
];

export function Process() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-32">
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.86] font-black uppercase">
          <MaskLine>Como funciona</MaskLine>
          <MaskLine delay={0.1}>
            <em className="font-serif text-[0.85em] font-normal text-accent normal-case">o tempo real.</em>
          </MaskLine>
        </h2>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.when} className="bg-ink">
              <Reveal delay={i * 0.12} className="flex h-full flex-col p-7 sm:p-9">
                <p className="flex items-center justify-between font-mono text-xs tracking-[0.18em] text-muted uppercase">
                  <span>{step.when}</span>
                  <span className="text-accent">0{i + 1}</span>
                </p>
                <h3 className="mt-10 font-display text-4xl leading-[0.92] font-black uppercase sm:text-5xl">
                  {step.title}
                </h3>
                <p className="mt-5 text-muted">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
