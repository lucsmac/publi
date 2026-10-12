export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "";

export const INSTAGRAM = "https://www.instagram.com/publiagencia.rn/";
export const INSTAGRAM_WEDDING = "https://www.instagram.com/publi.wedding/";

export const services = [
  {
    slug: "evento",
    title: "Evento em tempo real",
    description: "Stories e vídeos publicados enquanto o evento acontece.",
    pitch: "Convenção, lançamento, show, 15 anos. Seu público assiste pelo celular enquanto a plateia ainda está aplaudindo.",
    image: "/media/evento.jpg",
  },
  {
    slug: "casamento",
    title: "Casamento",
    description: "Os melhores momentos na sua mão no dia seguinte.",
    pitch: "Você acorda casado e já com os melhores momentos na mão. Nada de esperar semanas pelo vídeo.",
    image: "/media/casamento.jpg",
  },
  {
    slug: "marcas",
    title: "Conteúdo para marcas",
    description: "Gravações recorrentes para as redes da sua empresa.",
    pitch: "Roteiro, direção e edição todo mês. Você cuida da empresa, a gente cuida do que ela posta.",
    image: "/media/marcas.jpg",
  },
  {
    slug: "blitz",
    title: "Blitz de Conteúdo",
    description: "Um dia de gravação, sem contrato mensal.",
    pitch: "Um dia de gravação, semanas de conteúdo pronto. Sem contrato mensal.",
    image: "/media/blitz.jpg",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

export function isServiceSlug(value: string): value is ServiceSlug {
  return services.some((s) => s.slug === value);
}

export function whatsappLink(text: string) {
  return WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}` : null;
}
