"use client";

import { Bookmark, CheckCircle2, Clock, Lock, Compass } from "lucide-react";

import { Badge, Card } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { Roadmap, CourseDifficulty } from "@/types/learning";

const difficultyColors: Record<CourseDifficulty, string> = {
  beginner: "text-success",
  intermediate: "text-info",
  advanced: "text-warning",
  expert: "text-danger",
};

interface RoadmapCardProps {
  roadmap: Roadmap;
  onToggleBookmark?: (id: string) => void;
}

export function RoadmapCard({ roadmap, onToggleBookmark }: RoadmapCardProps) {
  const completedSteps = roadmap.steps.filter((s) => s.completed).length;

  return (
    <Card variant="interactive" padding="none" className="flex flex-col">
      <div className="flex flex-col p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-body font-semibold text-primary truncate">
              {roadmap.title}
            </h3>
            <p className="text-caption text-tertiary mt-0.5 line-clamp-2">
              {roadmap.description}
            </p>
          </div>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
            aria-label={roadmap.isBookmarked ? "Remove bookmark" : "Bookmark roadmap"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark?.(roadmap.id);
            }}
          >
            <Bookmark
              className={cn(
                "h-3.5 w-3.5",
                roadmap.isBookmarked && "fill-primary text-primary",
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral" size="xs">
            {roadmap.category}
          </Badge>
          <span
            className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-3",
              difficultyColors[roadmap.difficulty],
            )}
          >
            {roadmap.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3 text-caption text-tertiary">
          <span className="flex items-center gap-1">
            <Compass className="h-3 w-3" aria-hidden="true" />
            {roadmap.steps.length} steps
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {roadmap.estimatedTime}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-caption text-tertiary">Progress</span>
            <span className="text-caption font-medium text-primary">{roadmap.progress}%</span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3"
            role="progressbar"
            aria-valuenow={roadmap.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${roadmap.progress}% complete`}
          >
            <div
              className="h-full rounded-full bg-ai transition-all duration-500 ease-out"
              style={{ width: `${roadmap.progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          {roadmap.steps.slice(0, 4).map((step) => (
            <div key={step.id} className="flex items-center gap-2">
              {step.completed ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" aria-hidden="true" />
              ) : step.locked ? (
                <Lock className="h-3.5 w-3.5 text-tertiary shrink-0" aria-hidden="true" />
              ) : (
                <div className="h-3.5 w-3.5 rounded-full border-2 border-primary shrink-0" />
              )}
              <span
                className={cn(
                  "text-caption truncate",
                  step.completed
                    ? "text-success line-through"
                    : step.locked
                      ? "text-tertiary"
                      : "text-secondary",
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
          {roadmap.steps.length > 4 && (
            <p className="text-caption text-tertiary pl-5">+{roadmap.steps.length - 4} more steps</p>
          )}
        </div>
      </div>

      <div className="mt-auto border-t border-border px-5 py-3">
        <div className="flex items-center gap-2 text-caption text-tertiary">
          <span>{completedSteps}/{roadmap.steps.length} steps completed</span>
        </div>
      </div>
    </Card>
  );
}
