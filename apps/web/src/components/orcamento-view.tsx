import type { ServiceSlug } from "@/lib/site";
import { LeadForm } from "./lead-form";
import { Accent, FormPage } from "./site-chrome";

export function OrcamentoView({ defaultService }: { defaultService?: ServiceSlug }) {
  return (
    <FormPage
      eyebrow="Orçamento"
      title={
        <>
          Conta o que <Accent>vai acontecer.</Accent>
        </>
      }
      lead="Um minuto de formulário. A proposta chega no seu WhatsApp, feita para a sua data e o seu tipo de evento."
    >
      <LeadForm defaultService={defaultService} />
    </FormPage>
  );
}
