"use client";

import { type FormEvent, useState } from "react";
import { API_URL } from "./site";

type State =
  | { status: "idle" | "sending" | "done" }
  | { status: "error"; message: string; fields: Record<string, string> };

// Envia os campos do formulário como JSON para a API e guarda o resultado.
export function useFormSubmit(path: string) {
  const [state, setState] = useState<State>({ status: "idle" });
  const [sent, setSent] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    setState({ status: "sending" });
    try {
      const response = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSent(data);
        setState({ status: "done" });
        return;
      }
      const body = await response.json().catch(() => ({}));
      setState({
        status: "error",
        message:
          response.status === 429
            ? "Muitas tentativas. Aguarde um minuto e envie de novo."
            : (body.message ?? "Não foi possível enviar. Tente novamente."),
        fields: body.fields ?? {},
      });
    } catch {
      setState({
        status: "error",
        message: "Sem conexão com o servidor. Tente novamente em instantes.",
        fields: {},
      });
    }
  }

  const fields = state.status === "error" ? state.fields : {};
  return { state, fields, sent, onSubmit };
}
