import Image from "next/image";
import { MaskLine, Reveal } from "@/components/motion";
import { postUrl, reels } from "@/lib/media";
import { INSTAGRAM } from "@/lib/site";

function Card({ reel, index, hidden }: { reel: (typeof reels)[number]; index: number; hidden: boolean }) {
  return (
    <li className={`shrink-0 snap-center px-2 sm:px-3 ${index % 2 ? "pt-8 lg:pt-10" : "pb-8 lg:pb-10"}`}>
      <a
        href={postUrl(reel.post)}
        target="_blank"
        rel="noreferrer"
        tabIndex={hidden ? -1 : undefined}
        className="group relative block aspect-[9/16] w-[62vw] max-w-[270px] overflow-hidden rounded-2xl border border-line bg-surface sm:w-[270px]"
      >
        <Image
          src={reel.src}
          alt={`${reel.label}: ${reel.detail}`}
          fill
          sizes="270px"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
        <span className="absolute right-4 bottom-4 left-4">
          <span className="block font-mono text-[11px] tracking-[0.16em] text-accent uppercase">{reel.label}</span>
          <span className="mt-1 block font-display text-2xl leading-none font-extrabold uppercase">{reel.detail}</span>
        </span>
      </a>
    </li>
  );
}

// Esteira de capas de reels que corre sozinha e pausa quando o mouse passa.
export function Reels() {
  return (
    <section id="trabalhos" className="scroll-mt-20 overflow-hidden py-16 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-10">
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.86] font-black uppercase">
          <MaskLine>Direto</MaskLine>
          <MaskLine delay={0.1}>
            <em className="font-serif text-[0.85em] font-normal text-accent normal-case">da</em> câmera.
          </MaskLine>
        </h2>
        <Reveal delay={0.2}>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs tracking-[0.18em] text-muted uppercase underline decoration-accent underline-offset-8 transition hover:text-paper"
          >
            Ver tudo no Instagram
          </a>
        </Reveal>
      </div>

      {/* No celular a esteira é arrastada com o dedo; no desktop ela corre sozinha. */}
      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory overflow-x-auto lg:mt-12 lg:snap-none lg:overflow-visible">
        <div
          className="flex w-max shrink-0 px-3 lg:animate-marquee lg:px-0 lg:hover:[animation-play-state:paused]"
          style={{ "--marquee-duration": "70s" } as React.CSSProperties}
        >
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className={`shrink-0 ${copy === 1 ? "hidden lg:flex" : "flex"}`}>
              {reels.map((reel, i) => (
                <Card key={reel.post} reel={reel} index={i} hidden={copy === 1} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
