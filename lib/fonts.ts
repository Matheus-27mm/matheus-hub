import { Space_Grotesk, Space_Mono } from "next/font/google";

// Fonte de destaque pro nome (geométrica, moderna, com peso forte).
export const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

// Mono pro subtítulo — cria contraste com o nome.
export const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
