"use client";

import { useEffect, useRef } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

// Timecode de câmera (HH:MM:SS:FF a 30 fps) contando desde que a página abriu.
export function Timecode({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const total = Math.floor(((now - start) / 1000) * 30);
      const f = total % 30;
      const s = Math.floor(total / 30);
      if (ref.current) {
        ref.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      00:00:00:00
    </span>
  );
}

export function RecDot() {
  return <span aria-hidden className="inline-block size-2 animate-blink rounded-full bg-[#ff3b30]" />;
}
