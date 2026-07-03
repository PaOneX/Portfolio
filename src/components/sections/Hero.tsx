"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import { HeroTerminal } from "@/components/sections/HeroTerminal";
import { HeroStats } from "@/components/sections/HeroStats";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { TextReveal } from "@/components/motion/TextReveal";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % profile.titles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-[4.5rem] sm:pt-20"
    >
      <div className="gradient-bg absolute inset-0 -z-10" />

      <motion.div
        className="absolute top-1/4 left-[5%] h-48 w-48 rounded-full bg-brand-primary/12 blur-[80px] sm:h-80 sm:w-80 sm:blur-[100px]"
        animate={reducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-[5%] bottom-1/4 h-40 w-40 rounded-full bg-brand-accent/10 blur-[60px] sm:h-64 sm:w-64 sm:blur-[80px]"
        animate={reducedMotion ? {} : { scale: [1.1, 1, 1.1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      <div className="section-container relative flex flex-1 flex-col justify-center py-10 sm:py-16 lg:py-24">
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div variants={fadeInUp} className="mb-4 sm:mb-6">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1.5 text-[11px] font-medium text-brand-accent sm:text-xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
                </span>
                <span className="truncate">Available for opportunities</span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mb-4 text-[2rem] leading-[1.08] font-bold tracking-tight sm:text-4xl sm:mb-5 md:text-5xl lg:text-6xl xl:text-7xl"
            >
              <TextReveal text="Crafting digital" delay={0.1} as="span" />
              <br />
              <TextReveal text="experiences that" delay={0.3} as="span" />
              <br />
              <motion.span
                className="text-gradient-hero animate-gradient-x inline-block"
                initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                stick
              </motion.span>
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="mb-3 flex items-start gap-2 sm:mb-4 sm:items-center"
            >
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-brand-violet sm:mt-0" />
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
                Hi, I&apos;m{" "}
                <span className="font-semibold text-foreground">{profile.name}</span>
                <span className="hidden sm:inline">{" — "}</span>
                <br className="sm:hidden" />
                <motion.span
                  key={titleIndex}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block font-medium text-brand-primary"
                >
                  {profile.titles[titleIndex]}
                </motion.span>
              </p>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mb-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mb-8 sm:text-base md:text-lg"
            >
              I build beautiful, high-performance web apps that turn visitors into
              believers. Keep scrolling — there&apos;s a lot to explore.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:flex-wrap"
            >
              <Button
                size="lg"
                onClick={() => scrollTo("projects")}
                className="btn-glow touch-target h-12 w-full bg-brand-primary text-base hover:bg-brand-primary/90 sm:w-auto sm:px-6"
              >
                Explore My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("contact")}
                className="touch-target h-12 w-full border-border/60 text-base backdrop-blur-sm sm:w-auto sm:px-6"
              >
                Let&apos;s Talk
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-8 flex items-center gap-3 sm:mb-0">
              {[
                { href: profile.github, icon: GitHubIcon, label: "GitHub" },
                { href: profile.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass touch-target flex h-12 w-12 items-center justify-center rounded-xl text-muted-foreground transition-colors active:scale-95 hover:text-brand-primary"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-6 lg:hidden">
              <HeroStats />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative space-y-4"
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="lg:mt-0">
              <HeroTerminal compact />
            </div>

            <div className="hidden gap-4 lg:grid lg:grid-cols-2">
              <motion.div
                className="glass-card glow-border-visible rounded-xl px-4 py-3"
                animate={reducedMotion ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <p className="text-2xl font-bold text-gradient">
                  {profile.stats.yearsExperience}+
                </p>
                <p className="text-xs text-muted-foreground">Years building</p>
              </motion.div>
              <motion.div
                className="glass-card glow-border-visible rounded-xl px-4 py-3"
                animate={reducedMotion ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <p className="text-2xl font-bold text-gradient">
                  {profile.stats.projectsCompleted}+
                </p>
                <p className="text-xs text-muted-foreground">Projects shipped</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={() => scrollTo("about")}
          className="mt-8 flex flex-col items-center gap-1 self-center text-muted-foreground sm:absolute sm:bottom-6 sm:left-1/2 sm:mt-0 sm:-translate-x-1/2"
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Scroll to explore"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
          <ArrowDown className="h-5 w-5" />
        </motion.button>
      </div>

      <TechMarquee />
    </section>
  );
}
