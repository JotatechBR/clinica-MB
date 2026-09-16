import { ImageResponse } from "next/og";

export const alt = "Espaço MB — Estética avançada no Jardim Anália Franco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(family: string, weight: number, italic = false) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:${italic ? "ital," : ""}wght@${italic ? "1," : ""}${weight}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

/**
 * Imagem de compartilhamento gerada com a identidade tipográfica do site.
 * TODO: pode ser substituída por uma fotografia real aprovada (1200×630).
 */
export default async function OpengraphImage() {
  const [bodoni, bodoniItalic, manrope] = await Promise.all([
    loadFont("Bodoni Moda", 500),
    loadFont("Bodoni Moda", 500, true),
    loadFont("Manrope", 600),
  ]);

  const fonts = [
    bodoni && { name: "Bodoni", data: bodoni, weight: 500 as const, style: "normal" as const },
    bodoniItalic && { name: "Bodoni", data: bodoniItalic, weight: 500 as const, style: "italic" as const },
    manrope && { name: "Manrope", data: manrope, weight: 600 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 500 | 600; style: "normal" | "italic" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #1B1715 0%, #100E0D 100%)",
          color: "#F6F1EA",
          padding: "64px 72px",
          fontFamily: "Bodoni",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "Manrope", fontSize: 18, letterSpacing: 4, color: "#C4AA87" }}>
          <div style={{ width: 48, height: 1, background: "#C4AA87" }} />
          ESPAÇO MB — JARDIM ANÁLIA FRANCO
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, letterSpacing: -2 }}>
          <span>Ciência para cuidar do tempo.</span>
          <span>
            <span style={{ fontStyle: "italic", color: "#C4AA87" }}>Naturalidade</span>&nbsp;para continuar sendo você.
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Manrope", fontSize: 18, color: "#DCCBBB" }}>
          <span>Estética avançada • Rejuvenescimento • Tricologia</span>
          <span>Dra. Mariane Botelho</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
