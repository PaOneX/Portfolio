"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const scaleX = useSpring(0, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(value);
      scaleX.set(value);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scaleX]);

  if (reducedMotion) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 right-0 left-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-primary via-brand-violet to-brand-accent sm:h-[2px]"
        style={{ scaleX }}
      />

      <motion.div
        className="fixed right-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 md:bottom-6 md:right-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="glass flex h-10 w-10 items-center justify-center rounded-full text-[9px] font-bold tabular-nums text-brand-primary sm:h-12 sm:w-12 sm:text-[10px]">
          {Math.round(progress * 100)}%
        </div>
      </motion.div>
    </>
  );
}
