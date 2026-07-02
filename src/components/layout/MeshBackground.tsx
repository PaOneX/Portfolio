"use client";

import { useIsMobile } from "@/hooks/useMediaQuery";

export function MeshBackground() {
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden" aria-hidden>
      <div className="dot-grid absolute inset-0 opacity-30 sm:opacity-40" />
      <div className="noise-overlay absolute inset-0" />
      <div
        className={`absolute rounded-full bg-brand-primary/8 blur-[80px] sm:blur-[120px] ${
          isMobile
            ? "-top-1/4 left-0 h-[300px] w-[300px]"
            : "-top-1/4 left-1/4 h-[600px] w-[600px]"
        }`}
      />
      <div
        className={`absolute rounded-full bg-brand-accent/6 blur-[60px] sm:blur-[100px] ${
          isMobile
            ? "top-1/2 -right-1/4 h-[250px] w-[250px]"
            : "top-1/2 -right-1/4 h-[500px] w-[500px]"
        }`}
      />
      {!isMobile && (
        <div className="absolute -bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-brand-violet/6 blur-[100px]" />
      )}
    </div>
  );
}
