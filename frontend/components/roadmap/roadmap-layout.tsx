"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface RoadmapLayoutProps {
  header: ReactNode;
  progress: ReactNode;
  careerSelector: ReactNode;
  timeline: ReactNode;
  phaseDetails: ReactNode;
  learningPath: ReactNode;
  dailyPlan: ReactNode;
  weeklyPlan: ReactNode;
  monthlyGoals: ReactNode;
  recommendations: ReactNode;
  className?: string;
}

export function RoadmapLayout({
  header,
  progress,
  careerSelector,
  timeline,
  phaseDetails,
  learningPath,
  dailyPlan,
  weeklyPlan,
  monthlyGoals,
  recommendations,
  className,
}: RoadmapLayoutProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10 space-y-8",
        className
      )}
      role="main"
      aria-label="AI Roadmap Generator"
    >
      {header}

      <section aria-label="Roadmap overview" className="space-y-4">
        <h2 className="text-heading-4 text-primary font-semibold">
          Overview
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">{progress}</div>
          <div className="lg:col-span-1">{careerSelector}</div>
          <div className="lg:col-span-1">{timeline}</div>
        </div>
      </section>

      <section aria-label="Phase details" className="space-y-4">
        <h2 className="text-heading-4 text-primary font-semibold">
          Current Phase
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {phaseDetails}
        </div>
      </section>

      <section aria-label="Learning and planning" className="space-y-4">
        <h2 className="text-heading-4 text-primary font-semibold">
          Learning & Planning
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {learningPath}
          {dailyPlan}
          {weeklyPlan}
          {monthlyGoals}
        </div>
      </section>

      <section aria-label="Recommendations" className="space-y-4">
        <h2 className="text-heading-4 text-primary font-semibold">
          AI Recommendations
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {recommendations}
        </div>
      </section>
    </div>
  );
}
