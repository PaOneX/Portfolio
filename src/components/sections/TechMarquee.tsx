"use client";

import { allSkills } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function TechMarquee() {
  const reducedMotion = useReducedMotion();
  const items = [...allSkills, ...allSkills, ...allSkills];

  if (reducedMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-2 px-4 py-4">
        {allSkills.slice(0, 10).map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border/50 px-3 py-1 text-xs text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-y border-border/30 py-3 sm:py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24" />

      <div className="marquee-track gap-2 sm:gap-3">
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="mx-1 shrink-0 rounded-full border border-border/40 bg-surface/50 px-3 py-1 text-xs font-medium text-muted-foreground sm:mx-1.5 sm:px-4 sm:py-1.5 sm:text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
