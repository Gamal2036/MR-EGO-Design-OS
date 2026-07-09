"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface CoachLayoutProps {
  header: ReactNode;
  summary: ReactNode;
  advisor: ReactNode;
  progress: ReactNode;
  insights: ReactNode;
  actionPlan: ReactNode;
  decisions: ReactNode;
  nextSteps: ReactNode;
  motivation: ReactNode;
  recommendations: ReactNode;
  className?: string;
}

export function CoachLayout({
  header,
  summary,
  advisor,
  progress,
  insights,
  actionPlan,
  decisions,
  nextSteps,
  motivation,
  recommendations,
  className,
}: CoachLayoutProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10 space-y-8",
        className
      )}
      role="main"
      aria-label="AI Career Coach"
    >
      {header}

      <section aria-label="Coach summary and daily advice" className="space-y-4">
        <h2 className="text-heading-4 text-primary font-semibold">Overview</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">{summary}</div>
          <div className="lg:col-span-1">{advisor}</div>
        </div>
      </section>

      <section aria-label="Readiness progress" className="space-y-4">
        <h2 className="text-heading-4 text-primary font-semibold">Readiness</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">{progress}</div>
          <div className="lg:col-span-1">{nextSteps}</div>
        </div>
      </section>

      <section aria-label="AI insights" className="space-y-4">
        <h2 className="text-heading-4 text-primary font-semibold">AI Insights</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {insights}
          {recommendations}
        </div>
      </section>

      <section aria-label="Action plan" className="space-y-4">
        <h2 className="text-heading-4 text-primary font-semibold">Your Action Plan</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">{actionPlan}</div>
          <div className="lg:col-span-1 space-y-6">
            {decisions}
            {motivation}
          </div>
        </div>
      </section>
    </div>
  );
}
