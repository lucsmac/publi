import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { OrcamentoView } from "@/components/orcamento-view";
import { isServiceSlug, services } from "@/lib/site";

export const metadata: Metadata = { title: "Orçamento" };

export function generateStaticParams() {
  return services.map((s) => ({ servico: s.slug }));
}

type Props = PageProps<"/orcamento/[servico]">;

async function Resolved({ params }: Props) {
  const { servico } = await params;
  if (!isServiceSlug(servico)) notFound();
  return <OrcamentoView defaultService={servico} />;
}

// O Suspense deixa a navegação instantânea: a moldura aparece antes de o
// serviço da URL ser lido.
export default function OrcamentoServicoPage(props: Props) {
  return (
    <Suspense fallback={<OrcamentoView />}>
      <Resolved {...props} />
    </Suspense>
  );
}
