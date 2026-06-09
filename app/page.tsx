'use client';

import { useRef } from 'react';
import { InteractiveRobotSpline } from '@/components/InteractiveRobotSpline';
import { FloatingSocials } from '@/components/FloatingSocials';
import { PROFILE } from '@/lib/socials';

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

      {/* Nome fixo no topo */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-10 text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {PROFILE.name}
        </h1>
        <p className="mt-1.5 text-sm text-white/55 sm:text-base">
          {PROFILE.role}
        </p>
      </header>

      {/* Cards de redes sociais que passeiam pela tela; o robô acompanha */}
      <FloatingSocials robotRef={robotRef} />
    </main>
  );
}
