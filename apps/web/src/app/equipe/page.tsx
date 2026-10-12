import type { Metadata } from "next";
import { CandidateForm } from "@/components/candidate-form";
import { Accent, FormPage } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Trabalhe conosco",
  description: "Candidate-se para fazer parte do time de storymakers da Publi.",
};

export default function EquipePage() {
  return (
    <FormPage
      eyebrow="Trabalhe conosco"
      title={
        <>
          Quer gravar <Accent>com a gente?</Accent>
        </>
      }
      lead="A Publi não acontece sozinha. Deixe seus dados e, quando abrir uma vaga com o seu perfil, o time chama no WhatsApp."
    >
      <CandidateForm />
    </FormPage>
  );
}
