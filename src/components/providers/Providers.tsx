"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { MeshBackground } from "@/components/layout/MeshBackground";
import { FloatingParticles } from "@/components/layout/FloatingParticles";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { PointerCaptureFix } from "@/components/layout/PointerCaptureFix";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PointerCaptureFix />
      <MeshBackground />
      <FloatingParticles />
      <ScrollProgress />
      <LoadingScreen />
      <CursorGlow />
      <CommandPalette />
      {children}
      <MobileBottomNav />
      <Toaster position="top-center" richColors swipeDirections={[]} />
    </ThemeProvider>
  );
}
