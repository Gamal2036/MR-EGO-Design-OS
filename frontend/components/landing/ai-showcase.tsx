"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, MessageSquare, Sparkles } from "lucide-react";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";

const features = [
  "AI analyzes your CV against thousands of job descriptions",
  "Personalized recommendations updated in real-time",
  "Natural conversation interface — no complex menus",
];

export function AIShowcase() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-surface-0" aria-labelledby="ai-showcase-heading">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <ScrollReveal x={-30} y={0}>
            <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 shadow-2 overflow-hidden border border-border/50">
              <div className="absolute inset-0 flex flex-col p-5 gap-3" aria-hidden="true">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-danger-500" />
                  <div className="w-3 h-3 rounded-full bg-warning-500" />
                  <div className="w-3 h-3 rounded-full bg-cv-500" />
                  <span className="ml-2 text-smallest text-tertiary font-mono">AI Workspace</span>
                </div>
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-surface-1/90 shadow-soft border border-border/50">
                    <p className="text-smallest text-body">
                      I see your CV has strong engineering leadership experience. Let me optimize it for senior roles at top tech companies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 max-w-[80%] ml-auto">
                  <div className="flex-1 p-3 rounded-lg bg-primary text-primary-foreground shadow-soft">
                    <p className="text-smallest">
                      What specific improvements can you suggest?
                    </p>
                  </div>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                </div>
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-surface-1/90 shadow-soft border border-border/50">
                    <p className="text-smallest text-body">
                      I found 12 opportunities matching your profile. Your ATS match rate could increase from 45% to 92%.
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex items-center gap-2 p-3 rounded-lg bg-surface-1/80 border border-border/50">
                  <MessageSquare className="h-4 w-4 text-tertiary" />
                  <span className="text-smallest text-tertiary">Ask MR:EGO anything about your career...</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal x={20} y={0} delay={0.1}>
            <div className="lg:pl-8">
              <span className="text-overline text-primary tracking-widest uppercase mb-3 block">
                AI-POWERED
              </span>
              <h2
                id="ai-showcase-heading"
                className="text-heading-2 md:text-[2rem] text-primary mb-4"
              >
                Your Personal Career Assistant
              </h2>
              <p className="text-body text-secondary mb-6 leading-relaxed">
                MR:EGO&apos;s AI understands your unique skills, experience, and aspirations. It works alongside you to optimize every step of your career journey.
              </p>
              <ul className="space-y-3 mb-8">
                {features.map((item) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-body text-body"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + features.indexOf(item) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Check className="h-4 w-4 text-cv-500 mt-1 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-body-small font-semibold text-link hover:text-link-hover no-underline transition-colors duration-fast"
              >
                See it in action
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
