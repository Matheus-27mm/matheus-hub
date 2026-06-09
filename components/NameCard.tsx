import { display, mono } from "@/lib/fonts";
import { PROFILE } from "@/lib/socials";

/**
 * Card com a borda de luz giratória (conic-gradient) extraída do componente
 * de referência, agora ATRÁS do nome. O nome usa uma fonte de destaque em
 * contraste com o subtítulo (mono).
 */
export function NameCard() {
  return (
    <div className="relative inline-flex">
      {/* Glow externo difuso (borda animada) */}
      <div className="absolute -inset-[3px] overflow-hidden rounded-[22px] blur-[7px]">
        <div className="absolute inset-0 grid place-items-center">
          <div className="animate-border-spin h-[600px] w-[600px] bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)]" />
        </div>
      </div>

      {/* Linha de luz nítida (borda animada, sentido inverso) */}
      <div className="absolute -inset-[1.5px] overflow-hidden rounded-[20px] blur-[1.5px]">
        <div className="absolute inset-0 grid place-items-center">
          <div className="animate-border-spin-rev h-[600px] w-[600px] brightness-125 bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)]" />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative rounded-[19px] bg-[#050308]/90 px-9 py-5 text-center shadow-2xl shadow-black/50 backdrop-blur-md">
        <h1
          className={`${display.className} bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl`}
        >
          {PROFILE.name}
        </h1>
        <p
          className={`${mono.className} mt-2.5 text-[10px] uppercase tracking-[0.34em] text-[#c9b6ff]/75 sm:text-xs`}
        >
          {PROFILE.role}
        </p>
      </div>
    </div>
  );
}
