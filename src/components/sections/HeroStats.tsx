"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { CountUp } from "@/components/motion/CountUp";
import { fadeInUp } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const stats = [
  { value: profile.stats.yearsExperience, suffix: "+", label: "Years" },
  { value: profile.stats.projectsCompleted, suffix: "+", label: "Projects" },
  { value: profile.stats.technologies, suffix: "+", label: "Tech Stack" },
];

export function HeroStats() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="grid grid-cols-3 gap-2 sm:gap-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
      }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeInUp}
          className="glass-card glow-border-visible rounded-xl px-3 py-4 text-center sm:px-4 sm:py-5"
          whileTap={reducedMotion ? {} : { scale: 0.97 }}
        >
          <p className="text-xl font-bold text-gradient sm:text-2xl lg:text-3xl">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-muted-foreground sm:text-xs">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
