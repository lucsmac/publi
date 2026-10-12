const words = ["Casamentos", "Convenções", "15 anos", "Lançamentos", "Formaturas", "Shows", "Marcas", "Chá revelação"];

function Row({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  const items = reverse ? [...words].reverse() : words;
  return (
    <div className="flex overflow-hidden">
      {/* O conteúdo vai duas vezes para o laço fechar sem emenda. */}
      <div
        className={`flex w-max shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ "--marquee-duration": "48s" } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((word) => (
              <li key={word} className="flex items-center">
                <span
                  className={`px-5 font-display text-6xl leading-none font-black uppercase sm:text-8xl ${outline ? "text-outline" : ""}`}
                >
                  {word}
                </span>
                <span aria-hidden className="size-3 rounded-full bg-accent sm:size-4" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Ticker() {
  return (
    <section aria-label="Tipos de evento que cobrimos" className="space-y-2 border-y border-line py-6 sm:py-8">
      <Row />
      <Row reverse outline />
    </section>
  );
}
