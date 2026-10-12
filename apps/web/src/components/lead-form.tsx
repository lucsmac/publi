"use client";

import { services, type ServiceSlug, whatsappLink } from "@/lib/site";
import { useFormSubmit } from "@/lib/use-form-submit";
import { SuccessPanel } from "./site-chrome";
import { Choice, Field, FormError, Honeypot, Input, Select, SubmitButton, Textarea } from "./ui";

export function LeadForm({ defaultService }: { defaultService?: ServiceSlug }) {
  const { state, fields, sent, onSubmit } = useFormSubmit("/leads");

  if (state.status === "done") {
    const service = services.find((s) => s.slug === sent.service)?.title ?? "um serviço";
    const link = whatsappLink(`Oi, Publi! Sou ${sent.name} e acabei de pedir um orçamento de ${service} pelo site.`);
    return (
      <SuccessPanel title="Pedido recebido.">
        <p>Nosso time comercial vai falar com você pelo WhatsApp informado.</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-lg bg-accent px-5 py-3 font-display text-sm font-bold tracking-wide text-ink uppercase transition hover:brightness-110"
          >
            Adiantar a conversa no WhatsApp
          </a>
        )}
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6" noValidate={false}>
      <Honeypot />

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-paper">O que você precisa?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <Choice
              key={s.slug}
              name="service"
              value={s.slug}
              title={s.title}
              description={s.description}
              defaultChecked={s.slug === defaultService}
            />
          ))}
        </div>
        {fields.service && <span className="mt-1.5 block text-sm text-danger">{fields.service}</span>}
      </fieldset>

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

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Data (se já tiver)" error={fields.eventDate}>
          <Input name="eventDate" type="date" aria-invalid={Boolean(fields.eventDate)} />
        </Field>
        <Field label="Cidade" error={fields.city}>
          <Input name="city" autoComplete="address-level2" placeholder="Natal" />
        </Field>
      </div>

      <Field label="Faixa de investimento" error={fields.budget}>
        <Select name="budget" defaultValue="">
          <option value="">Prefiro não informar</option>
          <option value="ate_2k">Até R$ 2 mil</option>
          <option value="2k_5k">De R$ 2 mil a R$ 5 mil</option>
          <option value="5k_10k">De R$ 5 mil a R$ 10 mil</option>
          <option value="acima_10k">Acima de R$ 10 mil</option>
          <option value="nao_sei">Ainda não sei</option>
        </Select>
      </Field>

      <Field label="Conte um pouco do que você imagina" error={fields.message}>
        <Textarea name="message" placeholder="Tipo de evento, número de convidados, o que não pode faltar…" />
      </Field>

      {state.status === "error" && <FormError message={state.message} />}
      <SubmitButton sending={state.status === "sending"}>Pedir orçamento</SubmitButton>
    </form>
  );
}
