"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function FloatingParticles() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const count = isMobile ? 12 : 24;

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: `${(i * 17 + 7) % 100}%`,
        y: `${(i * 23 + 11) % 100}%`,
        size: isMobile ? 2 + (i % 2) : 2 + (i % 4),
        duration: 8 + (i % 6) * 2,
        delay: (i % 5) * 0.8,
      })),
    [count, isMobile]
  );

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-40 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-primary/30"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
