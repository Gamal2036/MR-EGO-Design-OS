"use client";

import {
  ArrowUp,
  Brain,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { AssessmentSummary as AssessmentSummaryType } from "@/types/skills";

interface AssessmentSummaryProps extends HTMLAttributes<HTMLDivElement> {
  summary: AssessmentSummaryType;
}

interface SummaryItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue?: string;
  color: string;
}

function SummaryItem({ icon: Icon, label, value, subValue, color }: SummaryItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-surface-0 p-3 transition-all duration-fast hover:border-primary/20 hover:shadow-soft">
      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", color)}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-caption text-tertiary">{label}</p>
        <p className="text-body font-medium text-primary truncate">{value}</p>
        {subValue && <p className="text-smallest text-secondary">{subValue}</p>}
      </div>
    </div>
  );
}

const AssessmentSummary = forwardRef<HTMLDivElement, AssessmentSummaryProps>(
  ({ className, summary, ...props }, ref) => {
    const items: SummaryItemProps[] = [
      {
        icon: Zap,
        label: "Strongest Skill",
        value: summary.strongestSkill,
        subValue: `${summary.strongestValue}% proficiency`,
        color: "bg-success/10 text-success",
      },
      {
        icon: Brain,
        label: "Weakest Skill",
        value: summary.weakestSkill,
        subValue: `${summary.weakestValue}% - needs focus`,
        color: "bg-danger/10 text-danger",
      },
      {
        icon: TrendingUp,
        label: "Fastest Growing",
        value: summary.fastestGrowing,
        subValue: `${summary.fastestGrowth}% improvement`,
        color: "bg-ai/10 text-ai",
      },
      {
        icon: ArrowUp,
        label: "Needs Attention",
        value: summary.needsAttention,
        subValue: `At ${summary.needsAttentionValue}%`,
        color: "bg-warning/10 text-warning",
      },
    ];

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Assessment Summary"
        {...props}
      >
        <CardHeader>
          <CardTitle>Assessment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map((item) => (
              <SummaryItem key={item.label} {...item} />
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-primary/5 border border-primary/10 p-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-body font-medium text-primary">Recommended Focus</span>
            </div>
            <p className="mt-1 text-caption text-secondary">{summary.recommendedFocus}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
);
AssessmentSummary.displayName = "AssessmentSummary";

export { AssessmentSummary };
export type { AssessmentSummaryProps };
