"use client";

import { Upload, Brain, Zap, TrendingUp } from "lucide-react";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your CV",
    description: "Drag and drop your existing CV. MR:EGO instantly parses and structures your professional history.",
    color: "bg-primary-100 dark:bg-primary-900/40 text-primary",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Analysis",
    description: "Our AI analyzes your skills, experience, and career trajectory against millions of data points.",
    color: "bg-ai-100 dark:bg-ai-900/40 text-ai-600",
  },
  {
    icon: Zap,
    step: "03",
    title: "Get Recommendations",
    description: "Receive personalized job matches, skill gap analysis, and optimization suggestions.",
    color: "bg-warning-100 dark:bg-warning-900/40 text-warning-600",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Accelerate Growth",
    description: "Track your progress, apply to matched roles, and continuously improve with AI guidance.",
    color: "bg-cv-100 dark:bg-cv-900/40 text-cv-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 md:py-16 lg:py-20 bg-surface-1 border-t border-border/50" aria-labelledby="how-it-works-heading">
      <Container size="xl">
        <ScrollReveal y={20}>
          <div className="text-center mb-14">
            <span className="text-overline text-primary tracking-widest uppercase mb-3 block">
              HOW IT WORKS
            </span>
            <h2 id="how-it-works-heading" className="text-heading-2 md:text-[2rem] text-primary mb-4">
              Four steps to career transformation
            </h2>
            <p className="text-body text-secondary max-w-[560px] mx-auto">
              Get started in minutes. MR:EGO handles the heavy lifting.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <ScrollReveal key={step.step} delay={0.1 * (index + 1)} y={30}>
              <div className="flex flex-col items-center text-center relative">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-5", step.color)}>
                  <step.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <span className="text-smallest font-mono text-tertiary mb-2">{step.step}</span>
                <h3 className="text-heading-4 text-primary mb-2">{step.title}</h3>
                <p className="text-body-small text-secondary max-w-[260px]">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
