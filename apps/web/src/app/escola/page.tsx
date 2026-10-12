import type { Metadata } from "next";
import { Accent, FormPage } from "@/components/site-chrome";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Escola de Storymaker",
  description: "Entre na lista de espera da Escola de Storymaker da Publi.",
};

export default function EscolaPage() {
  return (
    <FormPage
      eyebrow="Escola de Storymaker · em breve"
      title={
        <>
          Aprenda com quem <Accent>vive disso.</Accent>
        </>
      }
      lead="Storymaker é empresa, é marca, é negócio. A Escola ainda não abriu: entre na lista de espera e diga o que você quer aprender. Suas respostas definem o primeiro curso."
    >
      <WaitlistForm />
    </FormPage>
  );
}
