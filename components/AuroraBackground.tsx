// Fundo "aurora": manchas de luz desfocadas (nossas cores) que derivam devagar.
// Tudo via transform/opacity (GPU) — leve, sem filtros SVG pesados, anima suave
// mesmo junto com o robô 3D.
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden ${className ?? ''}`}
      aria-hidden
    >
      <div className="aurora-blob absolute -left-[12%] -top-[12%] h-[55vmax] w-[55vmax] rounded-full bg-[#5b3fc4] opacity-50 blur-[110px] mix-blend-screen [animation:aurora1_20s_ease-in-out_infinite]" />
      <div className="aurora-blob absolute -bottom-[15%] -right-[15%] h-[60vmax] w-[60vmax] rounded-full bg-[#cf30aa] opacity-40 blur-[120px] mix-blend-screen [animation:aurora2_26s_ease-in-out_infinite]" />
      <div className="aurora-blob absolute left-[28%] top-[30%] h-[42vmax] w-[42vmax] rounded-full bg-[#3862ff] opacity-30 blur-[110px] mix-blend-screen [animation:aurora3_23s_ease-in-out_infinite]" />
    </div>
  );
}
