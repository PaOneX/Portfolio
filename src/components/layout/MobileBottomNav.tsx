"use client";

import { motion } from "framer-motion";
import { Home, FolderKanban, Wrench, Mail } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { sectionIds } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const mobileNavItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Work", icon: FolderKanban },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "contact", label: "Contact", icon: Mail },
];

export function MobileBottomNav() {
  const activeId = useScrollSpy(sectionIds);
  const reducedMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-border/50 bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl md:hidden"
      initial={reducedMotion ? false : { y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 30 }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch justify-around px-2 pt-1">
        {mobileNavItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={cn(
                "touch-target relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-2 transition-colors active:scale-95",
                isActive ? "text-brand-primary" : "text-muted-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-x-2 inset-y-1 rounded-xl bg-brand-primary/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={cn("relative z-10 h-5 w-5", isActive && "drop-shadow-[0_0_8px_var(--brand-primary)]")} />
              <span className="relative z-10 text-[10px] font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
