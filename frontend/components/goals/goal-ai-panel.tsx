"use client";

import { Lightbulb, Sparkles } from "lucide-react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoalAIRecommendation } from "@/types/smart-goal";

export interface GoalAIPanelProps {
  recommendations: SmartGoalAIRecommendation[];
  featured?: SmartGoalAIRecommendation | null;
  className?: string;
  onAction?: (recommendation: SmartGoalAIRecommendation) => void;
  onDismiss?: (id: string) => void;
}

export function GoalAIPanel({
  recommendations,
  featured,
  className,
  onAction,
  onDismiss,
}: GoalAIPanelProps) {
  const displayFeatured = featured ?? recommendations[0];
  const remaining = displayFeatured ? recommendations.filter((r) => r.id !== displayFeatured.id) : recommendations;

  return (
    <Card variant="ai" className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-ai" aria-hidden="true" />
          <CardTitle className="text-ai">AI Recommendations</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {displayFeatured && (
          <div className="mb-4 rounded-xl border border-ai/20 bg-ai/5 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ai/10 text-ai">
                <Lightbulb className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-body-small font-semibold text-ai">{displayFeatured.title}</p>
                <CardDescription className="mt-1 text-secondary">{displayFeatured.description}</CardDescription>
                <div className="mt-3 flex items-center gap-2">
                  {displayFeatured.actionHref && (
                    <Button
                      size="xs"
                      variant="primary"
                      onClick={() => onAction?.(displayFeatured)}
                    >
                      {displayFeatured.actionLabel}
                    </Button>
                  )}
                  <Button size="xs" variant="ghost" onClick={() => onDismiss?.(displayFeatured.id)}>
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {remaining.length > 0 && (
          <ul className="space-y-2" role="list" aria-label="More recommendations">
            {remaining.slice(0, 4).map((recommendation) => (
              <li
                key={recommendation.id}
                className="flex items-start gap-2 rounded-lg border border-border bg-surface-0 p-3"
              >
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-ai" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-caption font-medium text-primary">{recommendation.title}</p>
                  <p className="text-caption text-tertiary">{recommendation.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!displayFeatured && remaining.length === 0 && (
          <p className="text-body-small text-secondary">No active recommendations. Great job staying on track!</p>
        )}
      </CardContent>
    </Card>
  );
}
