import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { Prisma, PrismaClient } from "@prisma/client";
import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";
import { candidateSchema, leadSchema, waitlistSchema } from "./schemas.js";

const prisma = new PrismaClient();
const app = Fastify({ logger: true });

const adminToken = process.env.ADMIN_TOKEN;

await app.register(cors, {
  origin: (process.env.WEB_ORIGIN ?? "http://localhost:3000").split(","),
});
await app.register(rateLimit, { max: 20, timeWindow: "1 minute" });

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof z.ZodError) {
    const fields: Record<string, string> = {};
    for (const issue of error.issues) {
      const key = issue.path.join(".");
      fields[key] ??= issue.message;
    }
    return reply.status(400).send({ message: "Confira os campos destacados.", fields });
  }
  const status = (error as { statusCode?: number }).statusCode ?? 500;
  if (status >= 500) app.log.error(error);
  return reply.status(status).send({
    message: status >= 500 ? "Erro interno. Tente novamente." : (error as Error).message,
  });
});

// O campo "website" fica escondido no formulário; só robôs preenchem.
function isBot(body: unknown) {
  return typeof body === "object" && body !== null && Boolean((body as { website?: string }).website);
}

async function requireAdmin(request: FastifyRequest, reply: FastifyReply) {
  if (!adminToken) return reply.status(404).send({ message: "Not found" });
  if (request.headers.authorization !== `Bearer ${adminToken}`) {
    return reply.status(401).send({ message: "Não autorizado" });
  }
}

app.get("/health", async () => ({ ok: true }));

app.post("/leads", async (request, reply) => {
  if (isBot(request.body)) return reply.status(201).send({ ok: true });
  const data = leadSchema.parse(request.body);
  const lead = await prisma.lead.create({ data });
  return reply.status(201).send({ ok: true, id: lead.id });
});

app.post("/waitlist", async (request, reply) => {
  if (isBot(request.body)) return reply.status(201).send({ ok: true });
  const data = waitlistSchema.parse(request.body);
  try {
    await prisma.waitlistEntry.create({ data });
  } catch (error) {
    // Telefone já inscrito: atualiza as respostas em vez de recusar.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      await prisma.waitlistEntry.update({ where: { phone: data.phone }, data });
    } else {
      throw error;
    }
  }
  return reply.status(201).send({ ok: true });
});

app.post("/candidates", async (request, reply) => {
  if (isBot(request.body)) return reply.status(201).send({ ok: true });
  const data = candidateSchema.parse(request.body);
  await prisma.candidate.create({ data });
  return reply.status(201).send({ ok: true });
});

app.get("/leads", { preHandler: requireAdmin }, () =>
  prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
);
app.get("/waitlist", { preHandler: requireAdmin }, () =>
  prisma.waitlistEntry.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
);
app.get("/candidates", { preHandler: requireAdmin }, () =>
  prisma.candidate.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
);

await app.listen({ port: Number(process.env.PORT ?? 3333), host: "0.0.0.0" });
