"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Download, Send, Sparkles } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/SocialIcons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { profile } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    try {
      if (formspreeId) {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to send");
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try email directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent" />

      <div className="section-container">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Build Together"
          description="Got a project in mind? I'd love to hear about it."
        />

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-5 lg:gap-12">
          <FadeIn className="lg:col-span-2">
            <div className="glow-border glass-card mb-6 rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2 text-brand-accent">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold tracking-wider uppercase">
                  Open to work
                </span>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Whether it&apos;s a full-time role, freelance project, or just a
                coffee chat about tech — my inbox is always open.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                {
                  href: `mailto:${profile.email}`,
                  icon: Mail,
                  label: "Send Email",
                  accent: "primary" as const,
                },
                {
                  href: profile.linkedin,
                  icon: LinkedInIcon,
                  label: "Connect on LinkedIn",
                  accent: "primary" as const,
                },
                {
                  href: "/resume.pdf",
                  icon: Download,
                  label: "Download Resume",
                  accent: "accent" as const,
                },
              ].map(({ href, icon: Icon, label, accent }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label.includes("LinkedIn") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  download={label.includes("Resume") ? true : undefined}
                  className="glass-card flex items-center gap-3 rounded-xl px-5 py-4 transition-colors"
                  whileHover={{ x: 4, borderColor: "var(--brand-primary)" }}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent === "accent" ? "bg-brand-accent/10 text-brand-accent" : "bg-brand-primary/10 text-brand-primary"}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{label}</span>
                </motion.a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glow-border glass-card space-y-5 rounded-2xl p-6 sm:p-8"
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} className="mt-1.5 h-12 bg-background/50 text-base sm:h-10 sm:text-sm" />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1.5 h-12 bg-background/50 text-base sm:h-10 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="mt-1.5 bg-background/50 text-base sm:text-sm"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="btn-glow w-full bg-brand-primary py-5 text-base hover:bg-brand-primary/90"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
