"use client";

import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/data/profile";
import { FadeIn } from "@/components/motion/FadeIn";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 py-8 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />

      <div className="section-container">
        <FadeIn className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:gap-6 sm:text-left">
          <div>
            <p className="text-sm font-semibold">{profile.name}</p>
            <p className="text-xs text-muted-foreground">
              &copy; {year} · Built with Next.js & passion
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {[
              { href: profile.github, icon: GitHubIcon, label: "GitHub" },
              { href: profile.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
              { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="glass touch-target flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-colors active:scale-95 hover:text-brand-primary sm:h-10 sm:w-10"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-red-400" /> in {profile.location}
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
