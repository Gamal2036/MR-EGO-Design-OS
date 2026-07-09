"use client";

import { ArrowRight, Sparkles, Target } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ConfidenceBadge } from "@/components/ai/confidence-badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent } from "@/components/foundation/card";
import type { AIRecommendation } from "@/data/dashboard";
import { cn } from "@/lib/utils";

interface DashboardHeroProps extends HTMLAttributes<HTMLDivElement> {
  recommendation: AIRecommendation;
  onAction?: () => void;
}

const DashboardHero = forwardRef<HTMLDivElement, DashboardHeroProps>(
  ({ className, recommendation, onAction, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="ai"
        padding="lg"
        className={cn("relative overflow-hidden", className)}
        role="region"
        aria-label="AI Recommendation"
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, var(--color-ai) 0%, transparent 50%)",
          }}
        />
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-ai/10 p-2">
                  <Target className="h-5 w-5 text-ai" aria-hidden="true" />
                </div>
                <h2 className="text-subtitle text-primary">
                  Next Best Action
                </h2>
              </div>
              <p className="text-heading-4 text-primary font-medium">
                {recommendation.title}
              </p>
              <p className="text-body text-secondary max-w-2xl">
                {recommendation.description}
              </p>
            </div>
            <ConfidenceBadge
              value={recommendation.confidence}
              className="shrink-0"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={onAction}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {recommendation.actionLabel}
            </Button>
            <span className="flex items-center gap-1 text-caption text-tertiary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              AI-powered recommendation
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }
);
DashboardHero.displayName = "DashboardHero";

export { DashboardHero };
export type { DashboardHeroProps };
