// Mídias tiradas do Instagram da Publi (@publiagencia.rn). `post` é o código do
// post de origem: https://www.instagram.com/p/<post>/
// Antes de publicar o site, a Publi precisa aprovar cada uma (há clientes e
// pessoas de outras equipes em algumas imagens).
export const reels = [
  { src: "/media/evento.jpg", post: "DeMyXwvxGGn", label: "Tempo real", detail: "Nexum Mastermind" },
  { src: "/media/fernanda.jpg", post: "DWq9iAREbAh", label: "Quem faz", detail: "Fernanda Panequi" },
  { src: "/media/blitz.jpg", post: "DW4_z2hEVMa", label: "Estúdio", detail: "Em movimento" },
  { src: "/media/palco.jpg", post: "DcGnWe8xRAA", label: "Música", detail: "Gravação de EP" },
  { src: "/media/casamento.jpg", post: "DYOZUPkusi7", label: "Backstage", detail: "Casar Macamirim" },
  { src: "/media/davi.jpg", post: "DXwdEP0xJha", label: "Quem faz", detail: "Davi, direção criativa" },
  { src: "/media/marcas.jpg", post: "DXpAFOGkfBN", label: "Marcas", detail: "Conteúdo de produto" },
  { src: "/media/storymaker.jpg", post: "DO_cEO7EZWu", label: "Creative", detail: "Storymaker outfit" },
  { src: "/media/detalhe.jpg", post: "DdB_DP5RGN1", label: "Marcas", detail: "Novo ângulo de câmera" },
  { src: "/media/drone.jpg", post: "DTNzjR5kTKB", label: "Drone", detail: "Lá de cima" },
] as const;

// Vídeo do topo: trecho de bastidores do reel DeMyXwvxGGn, sem áudio.
export const heroVideo = { src: "/media/hero.mp4", poster: "/media/hero-poster.jpg" };

export function postUrl(code: string) {
  return `https://www.instagram.com/p/${code}/`;
}
