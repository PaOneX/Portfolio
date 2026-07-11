"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { useIsMobile } from "@/hooks/useMediaQuery";

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
  const isMobile = useIsMobile();
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
          <div className="glow-border glass-card mx-auto max-w-4xl overflow-x-auto rounded-2xl p-4 sm:p-8">
            {mounted && (
              <div className="mx-auto w-fit min-w-0">
                <GitHubCalendar
                  username={profile.githubUsername}
                  colorScheme={resolvedTheme === "light" ? "light" : "dark"}
                  fontSize={isMobile ? 10 : 12}
                  blockSize={isMobile ? 10 : 12}
                  blockMargin={isMobile ? 3 : 4}
                />
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
