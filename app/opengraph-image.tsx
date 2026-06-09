import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/socials";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${PROFILE.name} — ${PROFILE.role}`;

// Imagem de preview (compartilhamento no Insta/WhatsApp/LinkedIn).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050507",
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(120,120,140,0.20), transparent 55%), radial-gradient(circle at 75% 75%, rgba(60,60,70,0.30), transparent 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 90,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          {PROFILE.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 34,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#b8b8c4",
          }}
        >
          {PROFILE.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
