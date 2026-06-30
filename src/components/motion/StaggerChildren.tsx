"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { staggerContainer, defaultViewport, getMotionProps } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}: StaggerChildrenProps) {
  const reducedMotion = useReducedMotion();
  const motionProps = getMotionProps(reducedMotion);

  return (
    <motion.div
      className={cn(className)}
      variants={{
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={defaultViewport}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}
