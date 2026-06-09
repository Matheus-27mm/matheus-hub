'use client';

import { useEffect, useId, useRef } from 'react';
import type { CSSProperties } from 'react';

interface EtherealShadowProps {
  /** Cor base da "névoa" (nossa paleta). */
  color?: string;
  /** 1-100 — tamanho/escala da ondulação. */
  scale?: number;
  /** 1-100 — velocidade da animação. */
  speed?: number;
  /** 0-1 — granulado por cima. */
  noiseOpacity?: number;
  noiseScale?: number;
  className?: string;
  style?: CSSProperties;
}

const MASK_URL =
  "https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png";
const NOISE_URL =
  "https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png";

function mapRange(v: number, a: number, b: number, c: number, d: number): number {
  if (a === b) return c;
  return c + ((v - a) / (b - a)) * (d - c);
}

/**
 * Fundo animado "ethereal shadows": uma névoa suave que ondula devagar.
 * O movimento vem da animação do hueRotate sobre o ruído (feTurbulence) que
 * alimenta o deslocamento — a COR visível continua sendo `color`, então fica
 * dentro da nossa paleta (roxo/magenta).
 */
export function EtherealShadow({
  color = '#5b3fc4',
  scale = 70,
  speed = 38,
  noiseOpacity = 0.2,
  noiseScale = 1,
  className,
  style,
}: EtherealShadowProps) {
  const rawId = useId().replace(/:/g, '');
  const filterId = `ethereal-${rawId}`;
  const feRef = useRef<SVGFEColorMatrixElement>(null);

  const displacementScale = mapRange(scale, 1, 100, 20, 100);
  // segundos para um ciclo completo (mais rápido => menor)
  const cycleSeconds = mapRange(speed, 1, 100, 40, 2);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let start = 0;
    const loop = (t: number) => {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const value = ((elapsed / cycleSeconds) * 360) % 360;
      feRef.current?.setAttribute('values', String(value));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [cycleSeconds]);

  return (
    <div
      className={className}
      style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%', ...style }}
      aria-hidden
    >
      <div style={{ position: 'absolute', inset: -displacementScale, filter: `url(#${filterId}) blur(4px)` }}>
        <svg style={{ position: 'absolute' }}>
          <defs>
            <filter id={filterId}>
              <feTurbulence
                result="undulation"
                numOctaves="2"
                baseFrequency={`${mapRange(scale, 0, 100, 0.001, 0.0005)},${mapRange(scale, 0, 100, 0.004, 0.002)}`}
                seed="0"
                type="turbulence"
              />
              <feColorMatrix ref={feRef} in="undulation" type="hueRotate" values="180" />
              <feColorMatrix
                in="dist"
                result="circulation"
                type="matrix"
                values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
              />
              <feDisplacementMap in="SourceGraphic" in2="circulation" scale={displacementScale} result="dist" />
              <feDisplacementMap in="dist" in2="undulation" scale={displacementScale} result="output" />
            </filter>
          </defs>
        </svg>
        <div
          style={{
            backgroundColor: color,
            maskImage: `url('${MASK_URL}')`,
            WebkitMaskImage: `url('${MASK_URL}')`,
            maskSize: 'cover',
            WebkitMaskSize: 'cover',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {noiseOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${NOISE_URL}")`,
            backgroundSize: noiseScale * 200,
            backgroundRepeat: 'repeat',
            opacity: noiseOpacity / 2,
          }}
        />
      )}
    </div>
  );
}
