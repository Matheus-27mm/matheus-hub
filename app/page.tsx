'use client';

import { useRef } from 'react';
import { InteractiveRobotSpline } from '@/components/InteractiveRobotSpline';
import { FloatingSocials } from '@/components/FloatingSocials';
import { NameCard } from '@/components/NameCard';

// Cena do robô interativo (segue o ponteiro). Troque pela sua cena do Spline
// se quiser outro robô — é só colar a URL .splinecode aqui.
const ROBOT_SCENE = 'https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode';

export default function Home() {
  const robotRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#05060a] text-white">
      {/* Brilhos de fundo (sutis, profissionais) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(56,98,255,0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_88%,rgba(225,48,108,0.10),transparent_55%)]" />

      {/* Robô 3D em tela cheia, atrás do conteúdo */}
      <div ref={robotRef} className="absolute inset-0">
        <InteractiveRobotSpline scene={ROBOT_SCENE} className="h-full w-full" />
      </div>

      {/* Nome no topo, dentro do card com borda de luz animada */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-6 pt-9 sm:pt-12">
        <NameCard />
      </header>

      {/* Cards de redes sociais que passeiam pela tela; o robô acompanha */}
      <FloatingSocials robotRef={robotRef} />

      {/* Máscara que cobre a marca d'água "Built with Spline" (canto inf. dir.).
          Opaca só no cantinho do selo e com fade longo p/ não virar "caixa".
          pointer-events-none: cliques passam direto pros cards. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-30 h-36 w-80"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 100% 100%, #05060a 0%, #05060a 60%, rgba(5,6,10,0.55) 80%, rgba(5,6,10,0) 100%)',
        }}
      />
    </main>
  );
}
