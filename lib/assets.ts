import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Lista, no servidor/build, quais arquivos de imagem já existem em /public/images.
 * Permite que o site troque placeholders por fotografias reais automaticamente,
 * sem referenciar arquivos inexistentes.
 */
export function getAvailableImages(): string[] {
  const root = path.join(process.cwd(), "public");
  const dir = path.join(root, "images");
  const found: string[] = [];

  const walk = (current: string) => {
    let entries: fs.Dirent[] = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(webp|avif|jpe?g|png)$/i.test(entry.name)) {
        found.push("/" + path.relative(root, full).split(path.sep).join("/"));
      }
    }
  };

  walk(dir);
  return found;
}
