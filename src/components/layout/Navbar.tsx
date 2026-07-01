"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { sectionIds } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/40 bg-background/80 py-2.5 shadow-lg shadow-black/5 backdrop-blur-2xl sm:py-3"
            : "bg-transparent py-3 sm:py-5"
        )}
      >
        <nav className="section-container flex items-center justify-between gap-3">
          <button
            onClick={() => scrollTo("#home")}
            className="group touch-target flex items-center gap-2 text-base font-bold tracking-tight sm:text-lg"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/15 text-sm font-black text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white sm:h-8 sm:w-8">
              {profile.name.charAt(0)}
            </span>
            <span className="hidden sm:inline">{profile.name.split(" ")[0]}</span>
          </button>

          <div className="hidden items-center gap-0.5 rounded-full border border-border/40 bg-background/50 p-1 backdrop-blur-md md:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-300",
                    isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-brand-primary shadow-md shadow-brand-primary/25"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              size="sm"
              onClick={() => scrollTo("#contact")}
              className="btn-glow hidden bg-brand-primary hover:bg-brand-primary/90 sm:inline-flex"
            >
              Hire Me
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="touch-target rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="touch-target rounded-full md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[45] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="absolute top-0 right-0 bottom-0 flex w-[min(100%,20rem)] flex-col border-l border-border/40 bg-background/95 backdrop-blur-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            >
              <div className="flex items-center justify-between border-b border-border/40 p-5">
                <p className="font-bold">{profile.name.split(" ")[0]}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(false)}
                  className="touch-target rounded-full"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {navLinks.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeId === id;
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollTo(link.href)}
                      className={cn(
                        "touch-target rounded-xl px-4 py-3.5 text-left text-base font-medium transition-colors active:scale-[0.98]",
                        isActive
                          ? "bg-brand-primary/15 text-brand-primary"
                          : "hover:bg-muted/50"
                      )}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </div>

              <div className="border-t border-border/40 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="btn-glow touch-target flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3.5 text-base font-semibold text-white active:scale-[0.98]"
                >
                  Hire Me
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
