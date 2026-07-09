"use client";

import {
  Monitor,
  Smartphone,
  Tablet,
  LayoutDashboard,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";

const highlights = [
  "Unified dashboard for all career activities",
  "Responsive design — works on any device",
  "Real-time AI suggestions as you work",
  "Seamless integration with job platforms",
];

export function ProductPreview() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-surface-0 border-t border-border/50" aria-labelledby="preview-heading">
      <Container size="xl">
        <ScrollReveal y={20}>
          <div className="text-center mb-14">
            <span className="text-overline text-primary tracking-widest uppercase mb-3 block">
              PRODUCT PREVIEW
            </span>
            <h2 id="preview-heading" className="text-heading-2 md:text-[2rem] text-primary mb-4">
              A workspace designed for your career
            </h2>
            <p className="text-body text-secondary max-w-[560px] mx-auto">
              Every pixel of MR:EGO is crafted for clarity, speed, and delight.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal x={-20} y={0}>
            <div className="relative">
              <div className="relative w-full aspect-[16/10] rounded-xl border border-border/50 bg-gradient-to-br from-surface-1 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 shadow-medium overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-10 bg-surface-1/80 border-b border-border/50 flex items-center px-4 gap-2" aria-hidden="true">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-danger-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-warning-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-cv-500" />
                  </div>
                  <div className="ml-4 flex items-center gap-3 text-smallest text-tertiary">
                    <LayoutDashboard className="h-3 w-3" />
                    <span>Dashboard</span>
                    <span className="w-px h-3 bg-border" />
                    <Sparkles className="h-3 w-3 text-ai-500" />
                    <span className="text-ai-500">AI Workspace</span>
                  </div>
                </div>
                <div className="absolute top-10 inset-x-0 bottom-0 p-5 flex gap-4" aria-hidden="true">
                  <div className="w-56 shrink-0 rounded-lg bg-surface-1/60 border border-border/30 p-3 space-y-2">
                    <div className="h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-2 w-full rounded bg-neutral-200/50 dark:bg-neutral-700/50" />
                    <div className="h-2 w-3/4 rounded bg-neutral-200/50 dark:bg-neutral-700/50" />
                    <div className="h-2 w-1/2 rounded bg-neutral-200/50 dark:bg-neutral-700/50" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <div className="h-2.5 w-32 rounded bg-neutral-200 dark:bg-neutral-700" />
                        <div className="h-2 w-24 rounded bg-neutral-200/50 dark:bg-neutral-700/50 mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 rounded-lg bg-neutral-200/30 dark:bg-neutral-700/30 border border-border/20" />
                      <div className="h-16 rounded-lg bg-neutral-200/30 dark:bg-neutral-700/30 border border-border/20" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-16 h-10 rounded-lg bg-ai-100 dark:bg-ai-900/40 border border-ai-200 dark:border-ai-800/50 flex items-center justify-center shadow-soft">
                <Sparkles className="h-4 w-4 text-ai-500" aria-hidden="true" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal x={20} y={0} delay={0.1}>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary">
                  <Monitor className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-ai-100 dark:bg-ai-900/40 text-ai-600">
                  <Tablet className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-job-100 dark:bg-job-900/40 text-job-600">
                  <Smartphone className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <p className="text-body text-secondary leading-relaxed">
                MR:EGO provides a unified workspace experience across all your devices. Whether you are optimizing your CV on desktop or reviewing job matches on mobile, your data and progress stay perfectly in sync.
              </p>
              <ul className="space-y-3 pt-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-small text-body">
                    <CheckCircle2 className="h-4 w-4 text-cv-500 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
