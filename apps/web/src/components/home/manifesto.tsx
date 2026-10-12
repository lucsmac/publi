"use client";

import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const text =
  "Evento bom dura uma noite. O assunto dura enquanto tiver conteúdo. A gente entra com a câmera na mão e sai com tudo publicado: na vertical, no mesmo dia, do jeito que as pessoas assistem hoje.";

// A partir desta palavra o texto fica em destaque.
const accentFrom = text.split(" ").indexOf("na");

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "text-accent" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

// Parágrafo que "acende" palavra por palavra conforme a rolagem.
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-36">
      <p className="mb-8 font-mono text-xs tracking-[0.18em] text-muted uppercase">Por que tempo real</p>
      <p
        ref={ref}
        className="font-display text-[clamp(2.1rem,5.6vw,5rem)] leading-[1.06] font-extrabold tracking-[-0.005em] uppercase"
      >
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            accent={i >= accentFrom}
          >
            {word}
          </Word>
        ))}
      </p>
    </section>
  );
}
