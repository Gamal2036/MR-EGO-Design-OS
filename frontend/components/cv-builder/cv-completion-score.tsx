"use client";

import { cn } from "@/lib/utils";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

export function CVCompletionScore() {
  const getCompletionScore = useCVBuilderStore((s) => s.getCompletionScore);
  const score = getCompletionScore();

  const getColorClass = (value: number) => {
    if (value >= 80) return "bg-cv-500";
    if (value >= 60) return "bg-cyan-500";
    if (value >= 40) return "bg-warning-500";
    return "bg-danger-500";
  };

  const getTextColorClass = (value: number) => {
    if (value >= 80) return "text-cv-500";
    if (value >= 60) return "text-cyan-500";
    if (value >= 40) return "text-warning-500";
    return "text-danger-500";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={`CV completion: ${score}%`}>
        <div className="h-2 w-24 rounded-full bg-secondary overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-x-slow", getColorClass(score))}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={cn("text-label font-semibold tabular-nums", getTextColorClass(score))}>
          {score}%
        </span>
      </div>
    </div>
  );
}
