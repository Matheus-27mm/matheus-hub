'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { SOCIALS } from '@/lib/socials';

const TWO_PI = Math.PI * 2;

const LINKS = [
  { name: 'LinkedIn', href: SOCIALS.linkedin, Icon: Linkedin, glow: '#0A66C2', phase: 0 },
  { name: 'GitHub', href: SOCIALS.github, Icon: Github, glow: '#9CA3AF', phase: TWO_PI / 3 },
  { name: 'Instagram', href: SOCIALS.instagram, Icon: Instagram, glow: '#E1306C', phase: (2 * TWO_PI) / 3 },
] as const;

/**
 * Cards de redes sociais que passeiam devagar pela tela.
 * O robô do Spline (que segue o ponteiro) é guiado pelo CENTRO do grupo de
 * cards, então ele "acompanha" os cards — funciona igual no celular e no PC.
 * Quando o usuário mexe o mouse de verdade, o robô passa a seguir o mouse.
 *
 * Velocidade propositalmente lenta pra dar tempo de clicar nos cards.
 */
export function FloatingSocials({ robotRef }: { robotRef: RefObject<HTMLElement> }) {
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Acessibilidade: se a pessoa prefere menos animação, deixa os cards
    // parados, espaçados em linha, e não mexe o robô automaticamente.
    if (reduce) {
      const W = window.innerWidth;
      const H = window.innerHeight;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const x = W / 2 + (i - 1) * 90;
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${H * 0.82}px)`;
      });
      return;
    }

    let raf = 0;
    let start = 0;

    const loop = (t: number) => {
      if (!start) start = t;
      const e = (t - start) / 1000;

      const W = window.innerWidth;
      const H = window.innerHeight;

      // Centro do "grupo" passeando lentamente pela tela.
      const cx = W / 2 + Math.sin(e * 0.22) * (W * 0.20);
      const cy = H * 0.56 + Math.sin(e * 0.17) * (H * 0.16);

      // Cada card orbita o centro do grupo (raio limitado p/ continuar clicável).
      const rx = Math.min(W * 0.14, 160);
      const ry = Math.min(H * 0.11, 100);

      const margin = 70;
      let sumX = 0;
      let sumY = 0;
      let count = 0;

      LINKS.forEach((l, i) => {
        let x = cx + Math.cos(e * 0.5 + l.phase) * rx;
        let y = cy + Math.sin(e * 0.62 + l.phase) * ry;

        // Mantém dentro da tela (e abaixo do nome, no topo).
        x = Math.max(margin, Math.min(W - margin, x));
        y = Math.max(150, Math.min(H - margin, y));

        const el = cardRefs.current[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        }

        sumX += x;
        sumY += y;
        count += 1;
      });

      // O robô SEMPRE acompanha o centro real dos cards (ignora o mouse).
      if (count > 0) {
        const canvas = robotRef.current?.querySelector('canvas');
        if (canvas) {
          const opts: MouseEventInit & PointerEventInit = {
            clientX: sumX / count,
            clientY: sumY / count,
            bubbles: true,
          };
          canvas.dispatchEvent(new PointerEvent('pointermove', opts));
          canvas.dispatchEvent(new MouseEvent('mousemove', opts));
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [robotRef]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {LINKS.map(({ name, href, Icon, glow }, i) => (
        <a
          key={name}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          // Posição inicial perto do centro p/ evitar "flash" no canto.
          style={{ transform: 'translate(-50%, -50%) translate(50vw, 56vh)' }}
          className="group pointer-events-auto absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-lg shadow-black/30 backdrop-blur-md transition-[border-color,background-color] duration-300 will-change-transform hover:border-white/40 hover:bg-white/[0.14] sm:h-16 sm:w-16"
        >
          <span
            className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60"
            style={{ backgroundColor: glow }}
            aria-hidden
          />
          <Icon
            className="relative h-6 w-6 text-white/80 transition-colors duration-300 group-hover:text-white sm:h-7 sm:w-7"
            strokeWidth={1.75}
          />
        </a>
      ))}
    </div>
  );
}
