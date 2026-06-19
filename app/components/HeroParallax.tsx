"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Hero avec parallaxe à la souris : l'image se décale légèrement selon la
 * position du curseur, puis revient au centre quand la souris quitte la zone.
 * Le texte (children) reste fixe et lisible au-dessus du voile sombre.
 */
export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const AMPLITUDE = 22; // décalage max en px

  function handleMouseMove(e: React.MouseEvent) {
    // Pas d'effet si l'utilisateur préfère réduire les animations.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 → 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: -px * AMPLITUDE, y: -py * AMPLITUDE });
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="relative h-[90vh] min-h-[560px] flex items-end overflow-hidden"
    >
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.1)` }}
      >
        <Image
          src="/hero-abondance.jpg"
          alt="Vue sur la vallée d'Abondance"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />
      {children}
    </section>
  );
}
