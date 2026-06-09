'use client';

import { useRef, useState } from 'react';
import { SplineScene } from '@/components/SplineScene';
import { FloatingSocials } from '@/components/FloatingSocials';
import { NameCard } from '@/components/NameCard';
import { EtherealBg } from '@/components/EtherealBg';

// Cena do robô "Nexbot" (segue o ponteiro). Troque a URL .splinecode aqui
// se quiser outro robô.
const ROBOT_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

// Nomes EXATOS de objetos a esconder p/ deixar só o robô flutuando (sem chão).
// 'floor'/'plane'/'grid' são o piso/grade — identificados direto na cena .splinecode.
const HIDE_NAMES: string[] = ['floor', 'plane', 'grid'];

export default function Home() {
  const robotRef = useRef<HTMLDivElement>(null);
  const [debugNames, setDebugNames] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSplineLoad = (spline: any) => {
    try {
      // Deixa o canvas transparente => robô mantém a cor e o fundo aparece atrás.
      spline.setBackgroundColor?.('transparent');

      // Esconde só os objetos listados explicitamente (nome exato).
      HIDE_NAMES.forEach((name) => {
        const target = spline.findObjectByName(name);
        if (target) target.visible = false;
      });

      // Modo debug: abra com ?debug pra ver os nomes dos objetos na tela.
      if (typeof window !== 'undefined' && window.location.search.includes('debug')) {
        const objects: Array<{ name?: string }> = spline.getAllObjects?.() ?? [];
        setDebugNames(objects.map((o) => o.name || '(sem nome)'));
      }
    } catch {
      /* silencioso: se a API mudar, só não esconde nada */
    }
  };

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#05060a] text-white">
      {/* Fundo "ethereal" nas nossas cores, ATRÁS do robô (z-0). */}
      <EtherealBg className="pointer-events-none absolute inset-0 z-0" />

      {/* Robô 3D em tela cheia, na frente do fundo (canvas transparente). */}
      <div ref={robotRef} className="absolute inset-0 z-[5]">
        <SplineScene
          scene={ROBOT_SCENE}
          className="h-full w-full"
          onLoad={handleSplineLoad}
        />
      </div>

      {/* Nome no topo, dentro do card com borda de luz animada */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-6 pt-5 sm:pt-8">
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

      {/* Lista de nomes dos objetos da cena (só com ?debug) */}
      {debugNames.length > 0 && (
        <div className="absolute left-3 top-3 z-40 max-h-[80vh] w-64 overflow-auto rounded-lg border border-white/15 bg-black/80 p-3 font-mono text-xs text-white/80">
          <div className="mb-1 font-bold text-[#cf30aa]">Objetos da cena:</div>
          <ol className="list-decimal pl-4">
            {debugNames.map((n, i) => (
              <li key={`${n}-${i}`}>{n}</li>
            ))}
          </ol>
        </div>
      )}
    </main>
  );
}
