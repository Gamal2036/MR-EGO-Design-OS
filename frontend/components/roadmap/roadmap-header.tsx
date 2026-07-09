"use client";

import { Map, Sparkles, Target } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { PageHeader } from "@/components/layout-primitives/page-header";
import { Breadcrumb, type BreadcrumbItem } from "@/components/shell/breadcrumb";
import { cn } from "@/lib/utils";

export interface RoadmapHeaderProps extends HTMLAttributes<HTMLDivElement> {
  targetRole: string;
  overallProgress: number;
  aiConfidence: number;
}

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "AI Roadmap" },
];

const RoadmapHeader = forwardRef<HTMLDivElement, RoadmapHeaderProps>(
  (
    { className, targetRole, overallProgress, aiConfidence, ...props },
    ref
  ) => {
    const progressColor =
      overallProgress >= 80
        ? "text-success"
        : overallProgress >= 60
        ? "text-ai"
        : "text-warning";

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <PageHeader
          title="AI Roadmap Generator"
          description="Your personalized career path built by AI. Track phases, learning goals, and daily actions to reach your target role."
          breadcrumb={<Breadcrumb items={breadcrumbItems} />}
          divider
          metadata={
            <>
              <Badge variant="ai" size="sm">
                <Map className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                Target: {targetRole}
              </Badge>
              <Badge variant="outline" size="sm" className={progressColor}>
                <Target className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                {overallProgress}% complete
              </Badge>
              <Badge variant="outline" size="sm" className="text-ai">
                <Sparkles className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                {aiConfidence}% AI confidence
              </Badge>
            </>
          }
        />
      </div>
    );
  }
);
RoadmapHeader.displayName = "RoadmapHeader";

export { RoadmapHeader };
