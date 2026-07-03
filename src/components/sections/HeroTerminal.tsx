"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const codeLines = [
  { text: "const developer = {", indent: 0, delay: 0 },
  { text: `  name: "${profile.name.split(" ")[0]}",`, indent: 1, delay: 0.3 },
  { text: '  role: "Full Stack Developer",', indent: 1, delay: 0.6 },
  { text: `  location: "${profile.location}",`, indent: 1, delay: 0.9 },
  { text: "  skills: [", indent: 1, delay: 1.2 },
  { text: '    "React", "Angular", "Node.js",', indent: 2, delay: 1.5 },
  { text: '    "TypeScript", "MongoDB"', indent: 2, delay: 1.8 },
  { text: "  ],", indent: 1, delay: 2.1 },
  { text: "  passion: buildAmazingThings()", indent: 1, delay: 2.4 },
  { text: "};", indent: 0, delay: 2.7 },
];

interface HeroTerminalProps {
  compact?: boolean;
}

export function HeroTerminal({ compact = false }: HeroTerminalProps) {
  const reducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(reducedMotion ? codeLines.length : 0);

  useEffect(() => {
    if (reducedMotion) return;

    const timers = codeLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000 + 800)
    );

    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  return (
    <motion.div
      className={cn(
        "glow-border glass relative w-full overflow-hidden rounded-2xl",
        compact && "glow-border-visible"
      )}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 border-b border-border/40 px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 sm:h-3 sm:w-3" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 sm:h-3 sm:w-3" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 sm:h-3 sm:w-3" />
        <span className="ml-1 font-mono text-[10px] text-muted-foreground sm:text-xs">
          portfolio.ts
        </span>
      </div>

      <div className="shimmer absolute inset-0 opacity-20 sm:opacity-30" />

      <pre
        className={cn(
          "relative overflow-x-auto p-3 font-mono leading-relaxed sm:p-5",
          compact ? "text-[11px] sm:text-[13px]" : "text-[13px] sm:text-sm"
        )}
      >
        {codeLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={reducedMotion ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ paddingLeft: `${line.indent * (compact ? 0.9 : 1.25)}rem` }}
          >
            <CodeHighlight line={line.text} />
          </motion.div>
        ))}
        {visibleLines < codeLines.length && (
          <span className="inline-block h-3.5 w-1.5 animate-[blink_1s_step-end_infinite] bg-brand-primary sm:h-4 sm:w-2" />
        )}
      </pre>

      <motion.div
        className="absolute right-2 bottom-2 rounded-lg border border-brand-accent/30 bg-brand-accent/10 px-2 py-1 font-mono text-[10px] text-brand-accent backdrop-blur-sm sm:-right-3 sm:-bottom-3 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs"
        animate={reducedMotion ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ✓ Ready to ship
      </motion.div>
    </motion.div>
  );
}

function CodeHighlight({ line }: { line: string }) {
  const parts = line.split(/("[^"]*"|'[^']*'|\w+|[^\w\s])/g).filter(Boolean);

  return (
    <span>
      {parts.map((part, i) => {
        if (/^["']/.test(part)) {
          return (
            <span key={i} className="text-brand-accent">
              {part}
            </span>
          );
        }
        if (/^(const|let|var)$/.test(part)) {
          return (
            <span key={i} className="text-brand-violet">
              {part}
            </span>
          );
        }
        if (/^\w+\(/.test(part)) {
          return (
            <span key={i} className="text-brand-primary">
              {part}
            </span>
          );
        }
        return (
          <span key={i} className="text-foreground/80">
            {part}
          </span>
        );
      })}
    </span>
  );
}
