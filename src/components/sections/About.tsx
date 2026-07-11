"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Quote } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { slideInLeft, slideInRight } from "@/lib/motion-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const contactItems = [
  { icon: Mail, value: profile.email, href: `mailto:${profile.email}`, label: "Email" },
  { icon: Phone, value: profile.phone, label: "Phone" },
  { icon: MapPin, value: profile.location, label: "Location" },
];

export function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="section-padding relative">
      <div className="section-container">
        <SectionHeader
          eyebrow="About"
          title="Who I Am"
          description="The story behind the code — and why I care about every pixel."
        />

        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-14">
          <motion.div
            className="relative pb-3 pr-3 lg:col-span-2"
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
          >
            <div className="glow-border glass-card glow-border-visible relative mx-auto aspect-square max-w-[280px] rounded-3xl p-1 sm:max-w-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[1.35rem]">
                <Image
                  src={profile.image}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 280px, 384px"
                  priority
                />
              </div>
              <div className="absolute -right-2 -bottom-2 z-10 rounded-xl border border-brand-accent/30 bg-brand-accent/10 px-3 py-2 backdrop-blur-md sm:-right-3 sm:-bottom-3">
                <p className="text-xs font-semibold whitespace-nowrap text-brand-accent">
                  {profile.stats.yearsExperience}+ yrs
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInRight}
          >
            <div className="glass-card mb-6 rounded-2xl p-6 sm:p-8">
              <Quote className="mb-3 h-8 w-8 text-brand-primary/40" />
              <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {profile.about}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <motion.div
                    className="glass-card flex h-full flex-col gap-2 rounded-xl p-4"
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium break-all">{item.value}</p>
                  </motion.div>
                );

                return item.href ? (
                  <a key={item.value} href={item.href} className="block h-full">
                    {inner}
                  </a>
                ) : (
                  <div key={item.value} className="h-full">
                    {inner}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}