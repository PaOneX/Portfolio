"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolio-visited");
    if (hasVisited || reducedMotion) {
      setShow(false);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 95));
    }, 150);

    const timer = setTimeout(() => {
      setProgress(100);
      sessionStorage.setItem("portfolio-visited", "true");
      setTimeout(() => setShow(false), 400);
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="absolute inset-0 gradient-bg" />
          <div className="dot-grid absolute inset-0 opacity-30" />

          <div className="relative text-center">
            <motion.div
              className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary via-brand-violet to-brand-accent opacity-20 blur-xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-brand-primary/30 bg-brand-primary/10 text-2xl font-black text-gradient">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </motion.div>

            <motion.p
              className="mb-2 text-2xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {profile.name.split(" ")[0]}
            </motion.p>

            <motion.p
              className="mb-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Loading something worth your time...
            </motion.p>

            <div className="mx-auto h-1 w-48 overflow-hidden rounded-full bg-border/50">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-primary via-brand-violet to-brand-accent"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
