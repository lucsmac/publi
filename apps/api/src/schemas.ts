import { z } from "zod";

// Campos opcionais chegam do formulário como string vazia.
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === "" || v === null ? undefined : v), schema.optional());

const name = z.string().trim().min(2, "Informe seu nome").max(120);

const phone = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((v) => v.length >= 10 && v.length <= 13, "Informe um WhatsApp com DDD");

const email = optional(z.email("E-mail inválido").max(160));

export const leadSchema = z.object({
  name,
  phone,
  email,
  service: z.enum(["evento", "casamento", "marcas", "blitz"], "Escolha um serviço"),
  eventDate: optional(z.iso.date("Data inválida").transform((v) => new Date(`${v}T12:00:00Z`))),
  city: optional(z.string().trim().max(80)),
  budget: optional(z.enum(["ate_2k", "2k_5k", "5k_10k", "acima_10k", "nao_sei"])),
  message: optional(z.string().trim().max(2000)),
});

export const waitlistSchema = z.object({
  name,
  phone,
  email,
  level: z.enum(["iniciante", "ja_gravo", "ja_vendo"], "Escolha seu nível"),
  difficulty: z.enum(["roteiro", "gravacao", "edicao", "preco", "clientes"], "Escolha uma opção"),
  notes: optional(z.string().trim().max(2000)),
});

export const candidateSchema = z.object({
  name,
  phone,
  city: z.string().trim().min(2, "Informe sua cidade").max(80),
  instagram: optional(z.string().trim().max(60)),
  experience: z.enum(["nenhuma", "ate_1_ano", "mais_de_1_ano"], "Escolha uma opção"),
  equipment: optional(z.string().trim().max(300)),
  portfolioUrl: optional(z.url("Link inválido").max(300)),
  notes: optional(z.string().trim().max(2000)),
});
