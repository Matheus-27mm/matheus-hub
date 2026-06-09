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
          backgroundColor: "#05060a",
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(64,47,181,0.55), transparent 55%), radial-gradient(circle at 75% 75%, rgba(207,48,170,0.45), transparent 55%)",
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
            color: "#c9b6ff",
          }}
        >
          {PROFILE.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
