"use client";

import { useFormSubmit } from "@/lib/use-form-submit";
import { SuccessPanel } from "./site-chrome";
import { Choice, Field, FormError, Honeypot, Input, SubmitButton, Textarea } from "./ui";

const experience = [
  { value: "nenhuma", title: "Ainda não trabalhei com vídeo" },
  { value: "ate_1_ano", title: "Até 1 ano de experiência" },
  { value: "mais_de_1_ano", title: "Mais de 1 ano de experiência" },
];

export function CandidateForm() {
  const { state, fields, onSubmit } = useFormSubmit("/candidates");

  if (state.status === "done") {
    return (
      <SuccessPanel title="Candidatura enviada.">
        <p>Guardamos seus dados. Quando abrir uma vaga com o seu perfil, a gente chama no WhatsApp.</p>
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

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Cidade" error={fields.city}>
          <Input name="city" autoComplete="address-level2" required aria-invalid={Boolean(fields.city)} />
        </Field>
        <Field label="Instagram (opcional)" error={fields.instagram}>
          <Input name="instagram" placeholder="@seuperfil" />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-paper">Sua experiência</legend>
        <div className="grid gap-3">
          {experience.map((e) => (
            <Choice key={e.value} name="experience" {...e} />
          ))}
        </div>
        {fields.experience && <span className="mt-1.5 block text-sm text-danger">{fields.experience}</span>}
      </fieldset>

      <Field label="Equipamento que você usa (opcional)" error={fields.equipment} hint="Celular, câmera, microfone, luz.">
        <Input name="equipment" />
      </Field>

      <Field label="Link do portfólio (opcional)" error={fields.portfolioUrl}>
        <Input name="portfolioUrl" type="url" placeholder="https://" aria-invalid={Boolean(fields.portfolioUrl)} />
      </Field>

      <Field label="Por que você quer fazer parte do time? (opcional)" error={fields.notes}>
        <Textarea name="notes" />
      </Field>

      {state.status === "error" && <FormError message={state.message} />}
      <SubmitButton sending={state.status === "sending"}>Enviar candidatura</SubmitButton>
    </form>
  );
}
