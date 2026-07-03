"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { skills } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { fadeInUp } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const categoryIcons: Record<string, string> = {
  Frontend: "⚡",
  Backend: "🔧",
  Database: "🗄️",
  "Tools & Others": "🛠️",
};

export function Skills() {
  const reducedMotion = useReducedMotion();

  const copySkill = (skill: string) => {
    navigator.clipboard.writeText(skill);
    toast.success(`Copied "${skill}"`);
  };

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute inset-0 -z-10 bg-surface/40" />

      <div className="section-container">
        <SectionHeader
          eyebrow="Expertise"
          title="Skills & Tools"
          description="Click any skill to copy it. I pick the right tool for every challenge."
        />

        <StaggerChildren className="grid gap-5 sm:grid-cols-2">
          {skills.map((group) => (
            <motion.div
              key={group.category}
              variants={fadeInUp}
              className="glow-border glass-card group rounded-2xl p-6 sm:p-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-lg">
                  {categoryIcons[group.category] ?? "✦"}
                </span>
                <h3 className="text-lg font-semibold">{group.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <motion.button
                    key={skill}
                    onClick={() => copySkill(skill)}
                    className="touch-target rounded-lg border border-border/40 bg-background/40 px-3 py-2.5 text-sm font-medium transition-all active:scale-95 hover:border-brand-primary/50 hover:bg-brand-primary/10 hover:text-brand-primary sm:py-2"
                    whileHover={reducedMotion ? {} : { scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {skill}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
