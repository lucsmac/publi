"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MaskLine, Reveal } from "@/components/motion";
import { services } from "@/lib/site";

// Lista de serviços; no desktop a foto do serviço segue o cursor.
export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22 });
  const sy = useSpring(y, { stiffness: 160, damping: 22 });

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-32">
      <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.86] font-black uppercase">
        <MaskLine>O que a gente</MaskLine>
        <MaskLine delay={0.1}>
          coloca <em className="font-serif text-[0.85em] font-normal text-accent normal-case">no ar.</em>
        </MaskLine>
      </h2>

      <div
        className="relative mt-12"
        onMouseMove={(e) => {
          const box = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - box.left);
          y.set(e.clientY - box.top);
        }}
        onMouseLeave={() => setActive(null)}
      >
        <ul className="border-t border-line">
          {services.map((s, i) => (
            <li key={s.slug} className="border-b border-line">
              <Reveal delay={i * 0.06}>
                <Link
                  href={`/orcamento/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[1fr_5.5rem] items-center gap-x-4 py-6 sm:grid-cols-[1fr_8rem] sm:py-9 lg:grid-cols-[4rem_1.1fr_1fr_auto] lg:gap-x-5"
                >
                  {/* No celular: texto à esquerda e miniatura à direita. No desktop os itens viram colunas. */}
                  <span className="flex flex-col gap-2 lg:contents">
                    <span className="font-mono text-sm text-muted">0{i + 1}</span>
                    <span className="font-display text-[2rem] leading-[0.9] font-black uppercase transition duration-500 group-hover:text-accent sm:text-6xl lg:group-hover:translate-x-3">
                      {s.title}
                    </span>
                    <span className="max-w-md text-[0.95rem] text-muted sm:text-base">{s.pitch}</span>
                  </span>
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-xl lg:hidden">
                    <Image src={s.image} alt="" fill sizes="128px" className="object-cover" />
                  </span>
                  <span
                    aria-hidden
                    className="hidden size-12 place-items-center rounded-full border border-line text-xl transition duration-500 group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent group-hover:text-ink lg:grid"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <motion.div style={{ x: sx, y: sy }} className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:block">
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 4 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="absolute h-[330px] w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-paper/15 shadow-2xl shadow-black"
              >
                <Image src={services[active].image} alt="" fill sizes="240px" className="object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
