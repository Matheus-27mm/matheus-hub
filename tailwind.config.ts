import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        // rotação só com rotate (sem translate) p/ não quebrar a centralização
        spin360: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 3.5s ease-in-out infinite",
        "border-spin": "spin360 8s linear infinite",
        "border-spin-rev": "spin360 11s linear infinite reverse",
      },
    },
  },
  plugins: [],
};

export default config;
