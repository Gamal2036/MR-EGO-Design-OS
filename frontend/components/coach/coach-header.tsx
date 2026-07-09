"use client";

import { Brain, Sparkles, Target, TrendingUp } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { PageHeader } from "@/components/layout-primitives/page-header";
import { Breadcrumb, type BreadcrumbItem } from "@/components/shell/breadcrumb";
import { cn } from "@/lib/utils";

export interface CoachHeaderProps extends HTMLAttributes<HTMLDivElement> {
  targetRole: string;
  readinessScore: number;
  headline: string;
}

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "AI Career Coach" },
];

const CoachHeader = forwardRef<HTMLDivElement, CoachHeaderProps>(
  ({ className, targetRole, readinessScore, headline, ...props }, ref) => {
    const progressColor =
      readinessScore >= 80
        ? "text-success"
        : readinessScore >= 60
        ? "text-ai"
        : "text-warning";

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <PageHeader
          title="AI Career Coach"
          description="Personalized career guidance, daily focus, and a prioritized action plan to reach your target role."
          breadcrumb={<Breadcrumb items={breadcrumbItems} />}
          divider
          metadata={
            <>
              <Badge variant="ai" size="sm">
                <Brain className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                AI Guided
              </Badge>
              <Badge variant="outline" size="sm">
                <Target className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                Target: {targetRole}
              </Badge>
              <Badge variant="outline" size="sm" className={progressColor}>
                <TrendingUp className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                {readinessScore}% ready
              </Badge>
            </>
          }
        />
        <div className="rounded-xl border border-ai/30 bg-ai/5 p-4 shadow-ai-card">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
            <p className="text-caption text-ai font-semibold uppercase tracking-wider">
              Coach Summary
            </p>
          </div>
          <p className="text-body text-secondary mt-1">{headline}</p>
        </div>
      </div>
    );
  }
);
CoachHeader.displayName = "CoachHeader";

export { CoachHeader };
