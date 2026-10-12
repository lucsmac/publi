import type { Metadata } from "next";
import { OrcamentoView } from "@/components/orcamento-view";

export const metadata: Metadata = { title: "Orçamento" };

export default function OrcamentoPage() {
  return <OrcamentoView />;
}
