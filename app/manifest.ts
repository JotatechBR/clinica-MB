import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Espaço MB",
    description: SITE.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1EA",
    theme_color: "#1B1715",
    lang: "pt-BR",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
