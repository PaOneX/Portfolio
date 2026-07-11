"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { projects, type Project } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { fadeInUp } from "@/lib/motion-variants";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useMediaQuery";

const projectGradients = [
  "from-brand-primary/30 via-brand-violet/20 to-brand-accent/20",
  "from-brand-accent/25 via-brand-primary/15 to-brand-violet/25",
  "from-brand-violet/30 via-brand-primary/20 to-brand-accent/15",
  "from-brand-primary/20 via-brand-accent/25 to-brand-violet/20",
];

function getProjectCover(project: Project) {
  return project.image ?? project.demoImages?.[0];
}

function ProjectCoverImage({
  project,
  gradient,
  priority = false,
}: {
  project: Project;
  gradient: string;
  priority?: boolean;
}) {
  const cover = getProjectCover(project);

  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      {cover ? (
        <>
          <Image
            src={cover}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        </>
      ) : (
        <span className="relative text-4xl font-bold text-brand-primary/25 sm:text-5xl md:text-8xl">
          {project.title.charAt(0)}
        </span>
      )}
    </>
  );
}

export function Projects() {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container">
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Projects"
          description="Real apps, real problems solved. Tap any project to dive deeper."
        />

        <StaggerChildren className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {featured && (
            <motion.article
              key={featured.slug}
              variants={fadeInUp}
              className="group md:col-span-2"
              whileHover={reducedMotion || isTouch ? {} : { y: -4 }}
              whileTap={{ scale: 0.99 }}
            >
              <Link href={`/projects/${featured.slug}`} className="block">
                <div className="glow-border glass-card glow-border-visible relative overflow-hidden rounded-2xl sm:rounded-3xl">
                  <div className="grid md:grid-cols-2">
                    <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden bg-gradient-to-br p-6 sm:min-h-[220px] sm:p-8 md:min-h-[280px]">
                      <ProjectCoverImage
                        project={featured}
                        gradient={projectGradients[0]}
                        priority
                      />
                      <div className="absolute top-3 left-3 z-10 sm:top-4 sm:left-4">
                        <Badge className="bg-brand-primary/90 text-white">Featured</Badge>
                      </div>
                      <div className="absolute right-4 bottom-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg shadow-brand-primary/30 sm:right-6 sm:bottom-6 sm:h-12 sm:w-12">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10">
                      <h3 className="mb-2 text-xl font-bold sm:mb-3 sm:text-2xl md:text-3xl">
                        {featured.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground sm:mb-5 sm:text-base">
                        {featured.description}
                      </p>
                      <div className="mb-4 flex flex-wrap gap-1.5 sm:mb-6 sm:gap-2">
                        {featured.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
                        View case study <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {rest.map((project, index) => (
            <motion.article
              key={project.slug}
              variants={fadeInUp}
              className="group"
              whileHover={reducedMotion || isTouch ? {} : { y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="glow-border glass-card glow-border-visible relative h-full overflow-hidden rounded-2xl">
                <div
                  className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br sm:h-44 ${projectGradients[(index + 1) % projectGradients.length]}`}
                >
                  <ProjectCoverImage
                    project={project}
                    gradient={projectGradients[(index + 1) % projectGradients.length]}
                  />
                  <div
                    className={`absolute inset-0 z-10 flex items-center justify-center bg-background/70 backdrop-blur-sm transition-all duration-300 ${
                      isTouch ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
                    >
                      Open Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="mb-1.5 text-base font-semibold sm:mb-2 sm:text-lg">
                    {project.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground sm:mb-4">
                    {project.description}
                  </p>

                  <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 border-t border-border/40 pt-3 sm:gap-4 sm:pt-4">
                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target flex items-center gap-1 py-1 text-xs text-brand-primary"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    )}
                    {project.github && project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target flex items-center gap-1 py-1 text-xs text-muted-foreground"
                      >
                        <GitHubIcon className="h-3.5 w-3.5" />
                        Code
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="touch-target ml-auto flex items-center gap-1 py-1 text-xs font-semibold text-brand-primary"
                    >
                      Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
