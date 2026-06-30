"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeInUp, defaultViewport, getMotionProps } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: FadeInProps) {
  const reducedMotion = useReducedMotion();
  const motionProps = getMotionProps(reducedMotion);

  return (
    <motion.div
      className={cn(className)}
      variants={fadeInUp}
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={defaultViewport}
      transition={{ delay }}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}
