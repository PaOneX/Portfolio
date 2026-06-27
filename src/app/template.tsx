"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
