"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion();
  const isCenter = align === "center";

  return (
    <FadeIn className={`mb-10 sm:mb-14 ${isCenter ? "text-center" : "text-left"}`}>
      <motion.span
        className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/8 px-3 py-1 text-xs font-semibold tracking-widest text-brand-primary uppercase"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-[pulse-glow_2s_ease-in-out_infinite]" />
        {eyebrow}
      </motion.span>

      <h2 className="section-title mb-4">
        <span className="text-gradient">{title}</span>
      </h2>

      {description && (
        <p
          className={`mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg ${isCenter ? "" : "mx-0"}`}
        >
          {description}
        </p>
      )}

      <div
        className={`mt-6 h-px w-24 bg-gradient-to-r from-brand-primary via-brand-accent to-transparent ${isCenter ? "mx-auto" : ""}`}
      />
    </FadeIn>
  );
}
