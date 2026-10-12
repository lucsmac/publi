"use client";

import { useFormSubmit } from "@/lib/use-form-submit";
import { SuccessPanel } from "./site-chrome";
import { Choice, Field, FormError, Honeypot, Input, SubmitButton, Textarea } from "./ui";

const levels = [
  { value: "iniciante", title: "Estou começando", description: "Ainda não gravo para clientes." },
  { value: "ja_gravo", title: "Já gravo", description: "Faço vídeos, mas ainda não vivo disso." },
  { value: "ja_vendo", title: "Já tenho clientes", description: "Quero crescer e cobrar melhor." },
];

const difficulties = [
  { value: "roteiro", title: "Criar roteiro e ideias" },
  { value: "gravacao", title: "Gravar bem" },
  { value: "edicao", title: "Editar rápido" },
  { value: "preco", title: "Saber quanto cobrar" },
  { value: "clientes", title: "Conseguir clientes" },
];

export function WaitlistForm() {
  const { state, fields, onSubmit } = useFormSubmit("/waitlist");

  if (state.status === "done") {
    return (
      <SuccessPanel title="Você está na lista.">
        <p>Quando as inscrições abrirem, você recebe o aviso pelo WhatsApp antes de todo mundo.</p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6">
      <Honeypot />

      <Field label="Seu nome" error={fields.name}>
        <Input name="name" autoComplete="name" required aria-invalid={Boolean(fields.name)} />
      </Field>

      <Field label="WhatsApp" error={fields.phone}>
        <Input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(84) 99999-9999"
          required
          aria-invalid={Boolean(fields.phone)}
        />
      </Field>

      <Field label="E-mail (opcional)" error={fields.email}>
        <Input name="email" type="email" autoComplete="email" aria-invalid={Boolean(fields.email)} />
      </Field>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-paper">Em que momento você está?</legend>
        <div className="grid gap-3">
          {levels.map((l) => (
            <Choice key={l.value} name="level" {...l} />
          ))}
        </div>
        {fields.level && <span className="mt-1.5 block text-sm text-danger">{fields.level}</span>}
      </fieldset>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-paper">Qual a sua maior dificuldade hoje?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {difficulties.map((d) => (
            <Choice key={d.value} name="difficulty" {...d} />
          ))}
        </div>
        {fields.difficulty && <span className="mt-1.5 block text-sm text-danger">{fields.difficulty}</span>}
      </fieldset>

      <Field label="O que você mais quer aprender? (opcional)" error={fields.notes}>
        <Textarea name="notes" />
      </Field>

      {state.status === "error" && <FormError message={state.message} />}
      <SubmitButton sending={state.status === "sending"}>Entrar na lista de espera</SubmitButton>
    </form>
  );
}
