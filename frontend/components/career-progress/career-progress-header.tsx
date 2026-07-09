"use client";

import { Briefcase, TrendingUp } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { PageHeader } from "@/components/layout-primitives/page-header";
import { Breadcrumb, type BreadcrumbItem } from "@/components/shell/breadcrumb";
import { cn } from "@/lib/utils";

export interface CareerProgressHeaderProps extends HTMLAttributes<HTMLDivElement> {
  targetRole: string;
  overallProgress: number;
  nextBestAction: string;
}

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Career Progress" },
];

const CareerProgressHeader = forwardRef<HTMLDivElement, CareerProgressHeaderProps>(
  (
    { className, targetRole, overallProgress, nextBestAction, ...props },
    ref
  ) => {
    const progressColor =
      overallProgress >= 80 ? "text-success" : overallProgress >= 60 ? "text-ai" : "text-warning";

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <PageHeader
          title="Career Progress"
          description="Track your growth, close skill gaps, and reach your next career milestone with AI guidance."
          breadcrumb={<Breadcrumb items={breadcrumbItems} />}
          divider
          metadata={
            <>
              <Badge variant="ai" size="sm">
                <Briefcase className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                Target: {targetRole}
              </Badge>
              <Badge variant="outline" size="sm" className={progressColor}>
                <TrendingUp className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                {overallProgress}% complete
              </Badge>
            </>
          }
        />
        <div className="rounded-xl border border-ai/30 bg-ai/5 p-4 shadow-ai-card">
          <p className="text-caption text-ai font-semibold uppercase tracking-wider">
            Next Best Action
          </p>
          <p className="text-body text-secondary mt-1">{nextBestAction}</p>
        </div>
      </div>
    );
  }
);
CareerProgressHeader.displayName = "CareerProgressHeader";

export { CareerProgressHeader };
