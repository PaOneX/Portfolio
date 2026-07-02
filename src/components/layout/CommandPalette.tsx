"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { navLinks } from "@/data/navigation";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { toast } from "sonner";
import {
  Home,
  User,
  Code,
  FolderOpen,
  Briefcase,
  Mail,
  Moon,
  Sun,
  Copy,
  ExternalLink,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Home,
  About: User,
  Skills: Code,
  Projects: FolderOpen,
  Experience: Briefcase,
  Contact: Mail,
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    if (window.location.pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, [router]);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    toast.success("Email copied to clipboard");
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navLinks.map((link) => {
            const Icon = iconMap[link.label] ?? Home;
            return (
              <CommandItem key={link.href} onSelect={() => scrollTo(link.href)}>
                <Icon className="mr-2 h-4 w-4" />
                Go to {link.label}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.map((project) => (
            <CommandItem
              key={project.slug}
              onSelect={() => {
                setOpen(false);
                router.push(`/projects/${project.slug}`);
              }}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {project.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={copyEmail}>
            <Copy className="mr-2 h-4 w-4" />
            Copy email
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setOpen(false);
            }}
          >
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            Toggle theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
