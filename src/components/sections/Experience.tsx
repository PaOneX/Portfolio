"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeInUp } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Experience() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute inset-0 -z-10 bg-surface/40" />

      <div className="section-container">
        <SectionHeader
          eyebrow="Career"
          title="Work Experience"
          description="Where I've built, shipped, and grown — role by role."
        />

        <div className="relative mx-auto max-w-3xl pl-6 sm:pl-0">
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-brand-primary via-brand-violet to-brand-accent sm:left-1/2"
            initial={reducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {experience.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={exp.company}
                className="relative mb-12 sm:grid sm:grid-cols-2 sm:gap-8"
                initial={reducedMotion ? false : "hidden"}
                whileInView={reducedMotion ? undefined : "visible"}
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
              >
                <motion.div
                  className="absolute top-3 left-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-brand-primary shadow-lg shadow-brand-primary/40 sm:left-1/2"
                  initial={reducedMotion ? {} : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring" }}
                />

                <div
                  className={`${isEven ? "sm:pr-12 sm:text-right" : "sm:col-start-2 sm:pl-12"}`}
                >
                  <div className="glow-border glass-card rounded-2xl p-6">
                    <ExperienceCard exp={exp} align={isEven ? "right" : "left"} />
                  </div>
                </div>

                <div
                  className={`hidden sm:block ${isEven ? "sm:col-start-2" : "sm:col-start-1 sm:row-start-1"}`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  align,
}: {
  exp: (typeof experience)[number];
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "sm:text-right" : ""}>
      <span className="mb-2 inline-block rounded-full bg-brand-primary/10 px-2.5 py-0.5 text-xs font-semibold text-brand-primary">
        {exp.period}
      </span>
      <h3 className="text-lg font-semibold">{exp.position}</h3>
      <p className="mb-4 text-brand-violet">{exp.company}</p>
      <ul className={`space-y-2 ${align === "right" ? "sm:items-end" : ""}`}>
        {exp.description.map((item) => (
          <li
            key={item}
            className={`flex items-start gap-2 text-sm text-muted-foreground ${align === "right" ? "sm:flex-row-reverse sm:text-right" : ""}`}
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
