import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon: "M" sobre gradiente roxo→magenta da nossa paleta.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2a2a2a, #000000)",
          color: "white",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 7,
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
