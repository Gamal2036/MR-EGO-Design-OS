"use client";

import { Sparkles } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { RecommendationCard } from "@/components/ai/recommendation-card";
import type { InsightItem } from "@/data/dashboard";
import { cn } from "@/lib/utils";

interface AIRecommendationPanelProps extends HTMLAttributes<HTMLDivElement> {
  insights: InsightItem[];
  title?: string;
}

const AIRecommendationPanel = forwardRef<HTMLDivElement, AIRecommendationPanelProps>(
  ({ className, insights, title = "AI Insights", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("", className)}
        role="region"
        aria-label={title}
        {...props}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-ai" aria-hidden="true" />
          <h2 className="text-heading-4 text-primary">{title}</h2>
        </div>
        <div className="space-y-3">
          {insights.map((insight) => {
            const typeMap = {
              missing: "alert" as const,
              "skill-gap": "suggestion" as const,
              suggestion: "suggestion" as const,
              opportunity: "insight" as const,
            };
            return (
              <RecommendationCard
                key={insight.id}
                type={typeMap[insight.type]}
                title={insight.title}
                description={insight.description}
                source={
                  insight.priority === "high"
                    ? "High Priority"
                    : insight.priority === "medium"
                    ? "Medium Priority"
                    : "Low Priority"
                }
              />
            );
          })}
        </div>
      </section>
    );
  }
);
AIRecommendationPanel.displayName = "AIRecommendationPanel";

export { AIRecommendationPanel };
export type { AIRecommendationPanelProps };
