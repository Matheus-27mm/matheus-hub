// Fundo "ethereal shadows" (o que o usuário mandou), porém leve: usa a textura
// de tecido como máscara colorida e ANIMA via transform (GPU) — sem os filtros
// SVG (turbulence/displacement) que travavam. Fica ATRÁS do robô.
const MASK =
  "https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png";

const maskStyle = {
  WebkitMaskImage: `url('${MASK}')`,
  maskImage: `url('${MASK}')`,
  WebkitMaskSize: "cover",
  maskSize: "cover",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
} as const;

export function EtherealBg({ className }: { className?: string }) {
  return (
    <div className={`overflow-hidden bg-[#070510] ${className ?? ''}`} aria-hidden>
      <div
        className="ethereal-layer absolute inset-[-25%] opacity-70 blur-[1px] [animation:etherealDrift1_32s_ease-in-out_infinite]"
        style={{ backgroundColor: '#5b3fc4', ...maskStyle }}
      />
      <div
        className="ethereal-layer absolute inset-[-25%] opacity-55 blur-[1px] [animation:etherealDrift2_40s_ease-in-out_infinite]"
        style={{ backgroundColor: '#cf30aa', ...maskStyle }}
      />
    </div>
  );
}
