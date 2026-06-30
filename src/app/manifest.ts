import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PaySplit",
    short_name: "PaySplit",
    description:
      "PaySplit turns annual subscription renewals into predictable installment plans.",
    start_url: "/",
    display: "standalone",
    background_color: "#060b0d",
    theme_color: "#14b8a6",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
