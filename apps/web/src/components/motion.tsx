"use client";

import { animate, MotionConfig, motion, useInView } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

// Respeita "reduzir movimento" do sistema em todas as animações da página.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Sobe e aparece quando entra na tela.
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// Linha de título que sobe por trás de uma máscara.
export function MaskLine({
  children,
  delay = 0,
  onMount = false,
}: {
  children: ReactNode;
  delay?: number;
  onMount?: boolean;
}) {
  // A folga em cima e embaixo evita cortar acentos (Ã, É) e descendentes (q, ç).
  const mask = "-mt-[0.2em] -mb-[0.18em] block overflow-hidden pt-[0.2em] pb-[0.18em]";
  // No topo da página a entrada é em CSS, para não esperar o JavaScript.
  if (onMount) {
    return (
      <span className={mask}>
        <span className="block animate-rise" style={{ animationDelay: `${delay}s` }}>
          {children}
        </span>
      </span>
    );
  }
  return (
    <span className={mask}>
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.05, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Número que conta de zero até o valor quando aparece.
export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
