"use client";

import { Wrench, TrendingUp } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { severityConfig } from "@/data/cv-analysis";
import { cn } from "@/lib/utils";
import type { SkillGap } from "@/types/cv-analysis";

export interface SkillGapCardProps extends HTMLAttributes<HTMLDivElement> {
  skillGaps: SkillGap[];
}

const demandConfig = {
  high: { label: "High Demand", variant: "danger" as const },
  medium: { label: "Medium Demand", variant: "warning" as const },
  low: { label: "Low Demand", variant: "info" as const },
} as const;

const levelConfig = {
  expert: { label: "Expert", color: "text-success" },
  advanced: { label: "Advanced", color: "text-ai" },
  intermediate: { label: "Intermediate", color: "text-warning" },
  beginner: { label: "Beginner", color: "text-danger" },
  none: { label: "None", color: "text-danger" },
} as const;

const SkillGapCard = forwardRef<HTMLDivElement, SkillGapCardProps>(
  ({ className, skillGaps, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Skill gap analysis"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" aria-hidden="true" />
            <CardTitle>Skill Gaps</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {skillGaps.map((gap) => {
              const demand = demandConfig[gap.demandLevel];
              const level = levelConfig[gap.currentLevel];
              const priority = severityConfig[gap.priority];
              return (
                <div
                  key={gap.skill}
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface-0 p-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-label font-medium text-primary">
                        {gap.skill}
                      </span>
                      <Badge variant={demand.variant} size="xs">
                        {demand.label}
                      </Badge>
                    </div>
                    <span className="text-caption text-tertiary">
                      {gap.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn("text-caption font-medium", level.color)}>
                      {level.label}
                    </span>
                    <div
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2 py-0.5 text-smallest font-medium",
                        priority.bg,
                        priority.color
                      )}
                    >
                      <TrendingUp className="h-3 w-3" aria-hidden="true" />
                      {priority.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
SkillGapCard.displayName = "SkillGapCard";

export { SkillGapCard };
