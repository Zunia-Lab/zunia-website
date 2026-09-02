"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@zunialab/ui";

/**
 * Visual QR stand-in for the pairing mock.
 *
 * A real encoder would pull in a dependency for eight modules of marketing UI.
 * Finder patterns in three corners plus a seeded module field read as a QR at
 * a glance, and the seed rotates with the countdown so the plate does not look
 * frozen.
 */
export function MockQr({
  size = 132,
  seed,
  className,
}: {
  size?: number;
  seed: number;
  className?: string;
}) {
  const modules = 21;
  const cells = useMemo(() => buildModules(modules, seed), [seed]);
  const cell = size / modules;

  return (
    <svg
      role="img"
      aria-label="Pairing code"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("block", className)}
    >
      <rect width={size} height={size} fill="currentColor" className="text-fg" />
      {cells.map((on, index) => {
        if (!on) return null;
        const x = index % modules;
        const y = Math.floor(index / modules);
        return (
          <rect
            key={index}
            x={x * cell}
            y={y * cell}
            width={cell}
            height={cell}
            fill="var(--z-bg)"
          />
        );
      })}
    </svg>
  );
}

function buildModules(n: number, seed: number): boolean[] {
  const cells = Array.from({ length: n * n }, () => false);
  const rand = mulberry32(seed | 0);

  paintFinder(cells, n, 0, 0);
  paintFinder(cells, n, n - 7, 0);
  paintFinder(cells, n, 0, n - 7);

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (inFinder(x, y, n)) continue;
      // Timing patterns keep the plate looking like a QR rather than noise.
      if (y === 6 || x === 6) {
        cells[y * n + x] = (x + y) % 2 === 0;
        continue;
      }
      cells[y * n + x] = rand() > 0.52;
    }
  }

  return cells;
}

function paintFinder(cells: boolean[], n: number, ox: number, oy: number) {
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      const edge = x === 0 || y === 0 || x === 6 || y === 6;
      const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
      cells[(oy + y) * n + (ox + x)] = edge || core;
    }
  }
}

function inFinder(x: number, y: number, n: number) {
  const inTopLeft = x < 8 && y < 8;
  const inTopRight = x >= n - 8 && y < 8;
  const inBottomLeft = x < 8 && y >= n - 8;
  return inTopLeft || inTopRight || inBottomLeft;
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Shared reduced-motion gate for the product mocks. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
