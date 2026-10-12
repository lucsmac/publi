"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { MaskLine, Reveal } from "@/components/motion";

// Retratos da equipe com paralaxe: cada foto anda em velocidade diferente.
export function Crew() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const slow = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const fast = useTransform(scrollYProgress, [0, 1], [140, -140]);

  return (
    <section ref={ref} className="overflow-hidden border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 sm:px-10 sm:py-32 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">We are movement</p>
          <h2 className="font-display text-[clamp(3rem,7.4vw,6.5rem)] leading-[0.86] font-black uppercase">
            <MaskLine>Não é só</MaskLine>
            <MaskLine delay={0.1}>apertar</MaskLine>
            <MaskLine delay={0.2}>
              <em className="font-serif text-[0.85em] font-normal text-accent normal-case">o</em> REC.
            </MaskLine>
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-md text-lg text-paper/80">
              Storymaker de verdade lê o evento, antecipa o momento e pensa no gancho antes de gravar. É estratégia
              acontecendo ao vivo, com um time inteiro por trás de cada story.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <motion.figure style={{ y: slow }} className="mt-16">
            <div className="relative aspect-[9/14] overflow-hidden rounded-2xl">
              <Image src="/media/fernanda.jpg" alt="Fernanda Panequi com uma câmera na mão" fill sizes="(min-width: 1024px) 280px, 45vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              <span className="text-paper">Fernanda Panequi</span>
              <br />
              Estratégia e operação
            </figcaption>
          </motion.figure>
          <motion.figure style={{ y: fast }}>
            <div className="relative aspect-[9/14] overflow-hidden rounded-2xl">
              <Image src="/media/davi.jpg" alt="Davi sentado em um estúdio" fill sizes="(min-width: 1024px) 280px, 45vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              <span className="text-paper">Davi</span>
              <br />
              Direção criativa
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
