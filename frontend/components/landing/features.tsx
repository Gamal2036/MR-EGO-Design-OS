"use client";

import {
  FileText,
  Search,
  TrendingUp,
  Bell,
  BarChart3,
  Sparkles,
  BrainCircuit,
  FolderOpen,
} from "lucide-react";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Container } from "@/components/layout-primitives/container";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: typeof FileText;
  title: string;
  description: string;
  color: string;
  delay: number;
}

function FeatureCard({ icon: Icon, title, description, color, delay }: FeatureCardProps) {
  return (
    <ScrollReveal delay={delay} y={30}>
      <article
        className="group relative p-6 rounded-lg bg-surface-1 border border-border shadow-soft hover:shadow-hover hover:border-hover hover:-translate-y-0.5 transition-all duration-normal ease-out-custom"
        tabIndex={0}
        aria-label={`Feature: ${title}`}
      >
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-3", color)}>
          <Icon className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
        </div>
        <h3 className="text-heading-4 text-primary mb-2">{title}</h3>
        <p className="text-body-small text-secondary leading-relaxed">{description}</p>
      </article>
    </ScrollReveal>
  );
}

const features = [
  {
    icon: FileText,
    title: "Smart CV Builder",
    description: "AI-powered CV optimization with real-time ATS scoring and suggestions.",
    color: "bg-primary-100 dark:bg-primary-900/40",
    delay: 0.1,
  },
  {
    icon: Search,
    title: "AI Job Search",
    description: "Intelligent matching that finds roles perfectly tailored to your profile.",
    color: "bg-ai-100 dark:bg-ai-900/40",
    delay: 0.2,
  },
  {
    icon: TrendingUp,
    title: "Career Tracking",
    description: "Visual progress tracking toward your professional goals and milestones.",
    color: "bg-job-100 dark:bg-job-900/40",
    delay: 0.3,
  },
  {
    icon: Bell,
    title: "Application Tracker",
    description: "Never lose track of an application with automated status updates.",
    color: "bg-cv-100 dark:bg-cv-900/40",
    delay: 0.4,
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Deep insights into your career progress with data-driven recommendations.",
    color: "bg-analytics-100 dark:bg-analytics-900/40",
    delay: 0.15,
  },
  {
    icon: BrainCircuit,
    title: "AI Career Assistant",
    description: "Your personal AI coach available 24/7 for career guidance and advice.",
    color: "bg-ai-100 dark:bg-ai-900/40",
    delay: 0.25,
  },
  {
    icon: Sparkles,
    title: "Document Intelligence",
    description: "Smart document parsing that extracts and structures your professional data.",
    color: "bg-primary-100 dark:bg-primary-900/40",
    delay: 0.35,
  },
  {
    icon: FolderOpen,
    title: "Future AI Modules",
    description: "Continuously expanding AI capabilities that grow with your career.",
    color: "bg-info-100 dark:bg-info-900/40",
    delay: 0.45,
  },
];

export function Features() {
  return (
    <section id="features" className="py-14 md:py-16 lg:py-20 bg-surface-1" aria-labelledby="features-heading">
      <Container size="xl">
        <ScrollReveal y={20}>
          <div className="text-center mb-12 md:mb-14">
            <h2 id="features-heading" className="text-heading-2 md:text-[2rem] text-primary mb-4">
              Everything you need to advance your career
            </h2>
            <p className="text-body text-secondary max-w-[600px] mx-auto">
              MR:EGO combines eight powerful AI modules into a single unified platform.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
