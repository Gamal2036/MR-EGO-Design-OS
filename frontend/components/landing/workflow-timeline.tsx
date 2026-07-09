"use client";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";

const milestones = [
  {
    phase: "Phase 1",
    title: "Onboarding & CV Import",
    description: "Import your existing CV or build from scratch with AI guidance. Set your career preferences and goals.",
  },
  {
    phase: "Phase 2",
    title: "AI Analysis & Optimization",
    description: "Receive comprehensive analysis with actionable suggestions. Optimize for ATS compatibility and impact.",
  },
  {
    phase: "Phase 3",
    title: "Active Job Matching",
    description: "Get matched with roles that align with your skills and aspirations. Apply with optimized materials.",
  },
  {
    phase: "Phase 4",
    title: "Track & Iterate",
    description: "Monitor application status, interview feedback, and continuously improve your approach with AI insights.",
  },
];

export function WorkflowTimeline() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-surface-0" aria-labelledby="timeline-heading">
      <Container size="md">
        <ScrollReveal y={20}>
          <div className="text-center mb-14">
            <span className="text-overline text-ai tracking-widest uppercase mb-3 block">
              WORKFLOW TIMELINE
            </span>
            <h2 id="timeline-heading" className="text-heading-2 md:text-[2rem] text-primary mb-4">
              From CV to career, guided every step
            </h2>
            <p className="text-body text-secondary max-w-[540px] mx-auto">
              A structured workflow that ensures no detail is overlooked.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden md:block" aria-hidden="true" />
          {milestones.map((item, index) => (
            <ScrollReveal key={item.phase} delay={0.1 * (index + 1)} y={20}>
              <div className="relative flex items-start gap-5 md:gap-8 pb-10 last:pb-0">
                <div className="shrink-0 relative z-base">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 border-2 border-primary text-primary flex items-center justify-center text-smallest font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 pt-1.5">
                  <span className="text-smallest text-primary font-semibold uppercase tracking-wider">
                    {item.phase}
                  </span>
                  <h3 className="text-heading-4 text-primary mt-1 mb-2">{item.title}</h3>
                  <p className="text-body-small text-secondary leading-relaxed max-w-[520px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
