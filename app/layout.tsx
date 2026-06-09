import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { PROFILE } from "@/lib/socials";

export const metadata: Metadata = {
  metadataBase: new URL("https://matheus-hub-bice.vercel.app"),
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: "Links e redes — LinkedIn, GitHub e Instagram.",
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: "Links e redes — LinkedIn, GitHub e Instagram.",
    type: "website",
    locale: "pt_BR",
  },
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
