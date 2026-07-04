"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { fadeInUp } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Certifications() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="certifications" className="section-padding relative">
      <div className="section-container">
        <SectionHeader
          eyebrow="Credentials"
          title="Certifications"
          description="Proof that I never stop learning."
        />

        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={fadeInUp}
              className="group"
              whileHover={reducedMotion ? {} : { y: -4 }}
            >
              <div className="glow-border glass-card flex h-full flex-col rounded-2xl p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/10 text-brand-primary">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-semibold">{cert.name}</h3>
                <p className="mb-1 text-sm text-brand-primary">{cert.issuer}</p>
                <p className="mb-4 text-sm text-muted-foreground">{cert.year}</p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-brand-primary"
                  >
                    View credential
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
