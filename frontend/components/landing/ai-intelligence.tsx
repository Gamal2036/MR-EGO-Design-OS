"use client";

import { BrainCircuit, Eye, LineChart, Lightbulb, ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    icon: Eye,
    title: "Deep CV Analysis",
    description: "Our AI examines every detail of your CV against industry benchmarks and role requirements.",
    gradient: "from-primary-500 to-ai-500",
  },
  {
    icon: LineChart,
    title: "Market Intelligence",
    description: "Real-time labor market data informs your career decisions with accuracy.",
    gradient: "from-ai-500 to-analytics-500",
  },
  {
    icon: Lightbulb,
    title: "Skill Gap Detection",
    description: "Identify missing skills and get curated learning paths to bridge them.",
    gradient: "from-job-500 to-cv-500",
  },
  {
    icon: BrainCircuit,
    title: "Predictive Matching",
    description: "Machine learning models predict your success rate for each opportunity.",
    gradient: "from-analytics-500 to-primary-500",
  },
];

export function AIIntelligence() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-surface-0" aria-labelledby="ai-intel-heading">
      <Container size="xl">
        <ScrollReveal y={20}>
          <div className="text-center mb-14">
            <span className="text-overline text-ai tracking-widest uppercase mb-3 block">
              AI INTELLIGENCE
            </span>
            <h2 id="ai-intel-heading" className="text-heading-2 md:text-[2rem] text-primary mb-4">
              Powered by advanced career AI
            </h2>
            <p className="text-body text-secondary max-w-[560px] mx-auto">
              Our proprietary AI models are trained on millions of career trajectories and job market data points.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((item, index) => (
            <ScrollReveal key={item.title} delay={0.1 * (index + 1)} y={20}>
              <article className="group relative p-7 rounded-xl border border-border/50 bg-surface-1 shadow-soft hover:shadow-hover transition-all duration-normal ease-out-custom">
                <div className="flex items-start gap-5">
                  <div className={cn(
                    "shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br text-white shadow-soft",
                    item.gradient
                  )}>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-heading-4 text-primary mb-2">{item.title}</h3>
                    <p className="text-body-small text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
