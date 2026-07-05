"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { pageTransition } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProjectDetailClient({
  children,
  project,
}: {
  children: React.ReactNode;
  project: Project;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={project.slug}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
