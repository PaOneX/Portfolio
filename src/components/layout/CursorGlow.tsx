"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const cursorX = useSpring(0, { stiffness: 150, damping: 25 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 25 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [reducedMotion, isTouch, cursorX, cursorY]);

  if (reducedMotion || isTouch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-30 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--brand-primary) 25%, transparent) 0%, color-mix(in oklch, var(--brand-accent) 8%, transparent) 40%, transparent 70%)",
        }}
        animate={{ opacity: visible ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="pointer-events-none fixed z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/50 bg-brand-primary/20"
        style={{ left: cursorX, top: cursorY }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
