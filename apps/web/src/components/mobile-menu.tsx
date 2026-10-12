"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { INSTAGRAM } from "@/lib/site";

const links = [
  { href: "/orcamento", label: "Orçamento" },
  { href: "/#trabalhos", label: "Trabalhos" },
  { href: "/escola", label: "Escola" },
  { href: "/equipe", label: "Trabalhe conosco" },
];

// Menu de tela cheia para o celular.
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 grid size-11 place-items-center rounded-full border border-paper/25"
      >
        <span className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-0.5 w-5 bg-paper transition duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
          />
          <span
            className={`absolute left-0 h-0.5 w-5 bg-paper transition duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
          />
        </span>
      </button>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pt-24 pb-10">
          <nav>
            <ul>
              {links.map((link, i) => (
                <li key={link.href} className="overflow-hidden border-b border-line">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{ animationDelay: `${i * 0.06}s` }}
                    className="block animate-rise py-4 font-display text-5xl leading-none font-black tracking-normal text-paper uppercase active:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            style={{ animationDelay: "0.3s" }}
            className="animate-fade-up font-mono text-xs tracking-[0.18em] text-muted uppercase underline decoration-accent underline-offset-8"
          >
            @publiagencia.rn no Instagram
          </a>
        </div>
      )}
    </div>
  );
}
