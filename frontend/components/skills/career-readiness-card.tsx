"use client";

import { ArrowRight, Clock, Flag, Target } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { CareerReadiness } from "@/types/skills";

interface CareerReadinessCardProps extends HTMLAttributes<HTMLDivElement> {
  data: CareerReadiness;
}

const CareerReadinessCard = forwardRef<HTMLDivElement, CareerReadinessCardProps>(
  ({ className, data, ...props }, ref) => {
    const { currentRole, targetRole, readiness, nextMilestone, estimatedTime } = data;

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Career Readiness"
        {...props}
      >
        <CardHeader>
          <CardTitle>Career Readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-caption text-tertiary">Current Role</span>
              </div>
              <span className="text-body font-medium text-primary">{currentRole}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-ai" aria-hidden="true" />
                <span className="text-caption text-tertiary">Target Role</span>
              </div>
              <span className="text-body font-medium text-ai">{targetRole}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-caption text-tertiary">Readiness</span>
                <span className={cn(
                  "text-label font-semibold",
                  readiness >= 70 ? "text-success" : readiness >= 50 ? "text-warning" : "text-danger"
                )}>
                  {readiness}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-slow ease-out-custom",
                    readiness >= 70 ? "bg-success" : readiness >= 50 ? "bg-warning" : "bg-danger"
                  )}
                  style={{ width: `${readiness}%` }}
                  role="progressbar"
                  aria-valuenow={readiness}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Career readiness: ${readiness}%`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-tertiary" aria-hidden="true" />
                <span className="text-caption text-tertiary">Next Milestone</span>
              </div>
              <span className="text-caption text-primary truncate ml-2">{nextMilestone}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-tertiary" aria-hidden="true" />
                <span className="text-caption text-tertiary">Estimated Time</span>
              </div>
              <Badge variant="info" size="sm">{estimatedTime}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
CareerReadinessCard.displayName = "CareerReadinessCard";

export { CareerReadinessCard };
export type { CareerReadinessCardProps };
