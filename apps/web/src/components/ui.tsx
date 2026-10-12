import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const control =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-base text-paper placeholder:text-muted/60 outline-none transition focus:border-accent aria-invalid:border-danger";

const pill =
  "inline-flex items-center justify-center rounded-full px-7 py-3.5 font-display text-lg font-extrabold tracking-wide uppercase transition";

type FieldProps = { label: string; error?: string; hint?: string; children: ReactNode };

export function Field({ label, error, hint, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-paper">{label}</span>
      {children}
      {hint && !error && <span className="mt-1.5 block text-sm text-muted">{hint}</span>}
      {error && <span className="mt-1.5 block text-sm text-danger">{error}</span>}
    </label>
  );
}

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={control} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea rows={4} {...props} className={control} />;
}

export function Select(props: ComponentProps<"select">) {
  return <select {...props} className={control} />;
}

type ChoiceProps = { name: string; value: string; title: string; description?: string; defaultChecked?: boolean };

// Opção de rádio em formato de cartão.
export function Choice({ name, value, title, description, defaultChecked }: ChoiceProps) {
  return (
    <label className="flex cursor-pointer flex-col rounded-lg border border-line bg-surface px-4 py-3 transition has-checked:border-accent has-checked:bg-accent/10 has-focus-visible:border-accent">
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} required className="sr-only" />
      <span className="font-medium text-paper">{title}</span>
      {description && <span className="mt-0.5 text-sm text-muted">{description}</span>}
    </label>
  );
}

// Campo isca: invisível para pessoas, preenchido por robôs.
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Site
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={sending} className={`${pill} w-full bg-accent text-ink hover:brightness-110 disabled:opacity-60`}>
      {sending ? "Enviando…" : children}
    </button>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
      {message}
    </p>
  );
}

const variants = {
  solid: "bg-accent text-ink hover:brightness-110",
  outline: "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  ink: "bg-ink text-accent hover:bg-ink/85",
};

export function ButtonLink({ href, children, variant = "solid" }: { href: string; children: ReactNode; variant?: keyof typeof variants }) {
  return (
    <Link href={href} className={`${pill} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
