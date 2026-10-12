"use client";

import { type MotionStyle, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MaskLine } from "@/components/motion";
import { ButtonLink } from "@/components/ui";
import { heroVideo } from "@/lib/media";
import { RecDot, Timecode } from "./timecode";

function Corner({ className }: { className: string }) {
  return <span aria-hidden className={`absolute size-5 border-paper/80 ${className}`} />;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const frameY = useTransform(scrollYProgress, [0, 1], ["0px", "-140px"]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], ["4deg", "-5deg"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate -mt-16 flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pt-24 pb-6 sm:px-10 sm:pt-32 sm:pb-8"
    >
      {/* No celular o vídeo cobre o fundo; no desktop vira um visor de câmera inclinado. */}
      <motion.div
        style={{ "--fy": frameY, "--fr": frameRotate } as MotionStyle}
        className="absolute inset-0 -z-10 lg:inset-auto lg:top-28 lg:right-[6%] lg:z-0 lg:w-[min(26vw,350px)] lg:[transform:translateY(var(--fy))_rotate(var(--fr))]"
      >
        <div
          style={{ animationDelay: "0.2s" }}
          className="relative h-full animate-zoom-in overflow-hidden lg:aspect-[9/16] lg:h-auto lg:rounded-2xl lg:border lg:border-paper/15 lg:shadow-2xl lg:shadow-black"
        >
          <video
            className="size-full object-cover"
            src={heroVideo.src}
            poster={heroVideo.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40 lg:from-ink/70 lg:via-transparent lg:to-ink/30" />

          <div className="absolute inset-4 hidden font-mono text-[11px] tracking-wider text-paper uppercase lg:block">
            <Corner className="top-0 left-0 border-t-2 border-l-2" />
            <Corner className="top-0 right-0 border-t-2 border-r-2" />
            <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
            <Corner className="right-0 bottom-0 border-r-2 border-b-2" />
            <p className="absolute top-3 left-4 flex items-center gap-2">
              <RecDot /> Rec <Timecode />
            </p>
            <p className="absolute top-3 right-4">9:16</p>
            <p className="absolute bottom-3 left-4">Bastidores · Nexum</p>
            <p className="absolute right-4 bottom-3">30 fps</p>
          </div>
        </div>
      </motion.div>

      <p
        style={{ animationDelay: "0.8s" }}
        className="relative z-10 mb-5 flex animate-fade-up items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted uppercase"
      >
        <RecDot />
        <span className="text-paper">Tempo real</span>
        <span aria-hidden>/</span>
        Produtora de conteúdo · Natal, RN
      </p>

      <motion.h1
        style={{ y: titleY, opacity: fade }}
        className="relative z-10 font-display text-[clamp(3.6rem,13.4vw,13.5rem)] leading-[0.84] font-black tracking-[-0.01em] uppercase lg:mix-blend-difference"
      >
        <MaskLine onMount delay={0.15}>
          Seu evento
        </MaskLine>
        <MaskLine onMount delay={0.27}>
          no ar <em className="font-serif text-[0.82em] font-normal tracking-normal text-accent normal-case">enquanto</em>
        </MaskLine>
        <MaskLine onMount delay={0.39}>
          acontece.
        </MaskLine>
      </motion.h1>

      <div
        style={{ animationDelay: "0.95s" }}
        className="relative z-10 mt-8 flex animate-fade-up flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <p className="max-w-md text-lg text-paper/80">
          A Publi grava, edita e publica na hora. Quem não foi acompanha tudo pelo celular, e você acorda no dia
          seguinte com o conteúdo pronto.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/orcamento">Pedir orçamento</ButtonLink>
          <ButtonLink href="#trabalhos" variant="outline">
            Ver trabalhos
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
