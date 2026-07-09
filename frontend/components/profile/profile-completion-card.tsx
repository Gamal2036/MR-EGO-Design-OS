"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { ChecklistItem } from "@/types/profile";

interface ProfileCompletionCardProps extends HTMLAttributes<HTMLDivElement> {
  completionScore: number;
  checklist: ChecklistItem[];
}

const ProfileCompletionCard = forwardRef<HTMLDivElement, ProfileCompletionCardProps>(
  ({ className, completionScore, checklist, ...props }, ref) => {
    const completed = checklist.filter((item) => item.completed).length;
    const total = checklist.length;
    const requiredTotal = checklist.filter((item) => item.required).length;
    const requiredCompleted = checklist.filter((item) => item.required && item.completed).length;

    const scoreColor =
      completionScore >= 80
        ? "text-success"
        : completionScore >= 50
          ? "text-warning"
          : "text-danger";

    const barColor =
      completionScore >= 80
        ? "bg-success"
        : completionScore >= 50
          ? "bg-warning"
          : "bg-danger";

    return (
      <Card
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Profile Completion"
        {...props}
      >
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="relative flex items-center justify-center h-20 w-20">
              <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  className="stroke-neutral-200 dark:stroke-neutral-700"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  className={scoreColor}
                  strokeWidth="3"
                  strokeDasharray={`${completionScore * 0.97} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className={cn("absolute text-heading-4 font-bold", scoreColor)}>
                {completionScore}%
              </span>
            </div>
            <p className="text-caption text-tertiary">
              {completed} of {total} items complete
            </p>
          </div>

          <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 mb-4">
            <div
              className={cn("h-full rounded-full transition-all duration-normal", barColor)}
              style={{ width: `${completionScore}%` }}
              role="progressbar"
              aria-valuenow={completionScore}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Profile completion progress"
            />
          </div>

          <div className="space-y-1.5">
            {checklist.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-start gap-2 text-body-small",
                  item.completed ? "text-tertiary" : "text-secondary"
                )}
              >
                {item.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" aria-hidden="true" />
                ) : (
                  <Circle className="h-4 w-4 text-tertiary mt-0.5 shrink-0" aria-hidden="true" />
                )}
                <span className={cn(item.completed && "line-through")}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-smallest text-tertiary mt-3 border-t border-border pt-3">
            {requiredCompleted}/{requiredTotal} required fields completed
          </p>
        </CardContent>
      </Card>
    );
  }
);
ProfileCompletionCard.displayName = "ProfileCompletionCard";

export { ProfileCompletionCard };
export type { ProfileCompletionCardProps };
