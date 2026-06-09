import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PROFILE } from "@/lib/socials";

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: "Links e redes — LinkedIn, GitHub e Instagram.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#05060a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
