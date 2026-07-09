"use client";

import { CheckCircle2, Crosshair, Target } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { CoachSummary as CoachSummaryType } from "@/types/coach";

export interface CoachSummaryProps extends HTMLAttributes<HTMLDivElement> {
  summary: CoachSummaryType;
}

const CoachSummary = forwardRef<HTMLDivElement, CoachSummaryProps>(
  ({ className, summary, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Career coach summary"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Your Career Snapshot</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-heading-3 text-primary font-bold">{summary.headline}</p>
            <p className="text-body-small text-secondary">{summary.subheadline}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                <p className="text-label font-medium text-primary">Recent Wins</p>
              </div>
              <ul className="space-y-2" role="list">
                {summary.keyWins.map((win, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-body-small text-secondary"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" aria-hidden="true" />
                    {win}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Crosshair className="h-4 w-4 text-ai" aria-hidden="true" />
                <p className="text-label font-medium text-primary">Focus Areas</p>
              </div>
              <ul className="space-y-2" role="list">
                {summary.focusAreas.map((area, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-body-small text-secondary"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ai" aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
CoachSummary.displayName = "CoachSummary";

export { CoachSummary };
