import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { getProjectBySlug, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${profile.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailClient project={project}>
      <div className="section-container py-24 pt-32">
        <Link
          href="/#projects"
          className={cn(buttonVariants({ variant: "ghost" }), "mb-8 inline-flex")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <div className="relative mb-8 h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-primary/30 to-brand-accent/20">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-6xl font-bold text-brand-primary/40">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          {project.status === "pending" && (
            <Badge variant="outline" className="border-amber-500/50 text-amber-600">
              In Progress
            </Badge>
          )}
        </div>
        <p className="mb-6 max-w-3xl text-lg text-muted-foreground">
          {project.longDescription}
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mb-12 flex flex-wrap gap-4">
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "bg-brand-primary hover:bg-brand-primary/90 inline-flex")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          )}
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
            >
              <GitHubIcon className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          )}
        </div>

        {project.demoImages && project.demoImages.length > 0 && (
          <div className="glass overflow-hidden rounded-2xl">
            <h2 className="border-b border-border/50 px-6 py-4 text-lg font-semibold">
              Screenshots
            </h2>
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              {project.demoImages.map((src, index) => (
                <div
                  key={src}
                  className="relative aspect-video overflow-hidden rounded-xl border border-border/50 bg-muted/30"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProjectDetailClient>
  );
}
