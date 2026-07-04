"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="glass-card h-36 animate-pulse rounded-2xl" />
    ),
  }
);

export function GitHubActivity() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section id="github" className="section-padding relative">
      <div className="absolute inset-0 -z-10 bg-surface/40" />

      <div className="section-container">
        <SectionHeader
          eyebrow="Activity"
          title="GitHub Contributions"
          description="A living record of code — green squares don't lie."
        />

        <FadeIn delay={0.2}>
          <div className="glow-border glass-card mx-auto max-w-4xl overflow-x-auto rounded-2xl p-6 sm:p-8">
            {mounted && (
              <GitHubCalendar
                username={profile.githubUsername}
                colorScheme={resolvedTheme === "light" ? "light" : "dark"}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
              />
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
