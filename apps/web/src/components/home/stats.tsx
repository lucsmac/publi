import { CountUp, Reveal } from "@/components/motion";

// Números de uma única cobertura, publicados no perfil da Publi (março de 2026).
const stats = [
  { value: 50, prefix: "+", suffix: "", label: "stories no ar" },
  { value: 500, prefix: "", suffix: "", label: "conteúdos gravados" },
  { value: 15, prefix: "", suffix: "h", label: "de tempo real" },
];

export function Stats() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-16">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Uma cobertura, um dia</p>
        </Reveal>
        <dl className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(5rem,13vw,11rem)] leading-[0.8] font-black text-accent">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </span>
                <span className="mt-3 block font-serif text-2xl text-paper italic sm:text-3xl">{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className="mt-10 max-w-md text-sm text-muted">
          Números de uma imersão de marketing coberta pela Publi em março de 2026.
        </p>
      </div>
    </section>
  );
}
