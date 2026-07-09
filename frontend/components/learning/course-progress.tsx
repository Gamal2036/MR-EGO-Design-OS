"use client";

import { cn } from "@/lib/utils";

interface CourseProgressProps {
  progress: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function CourseProgress({
  progress,
  size = "md",
  showLabel = true,
  className,
}: CourseProgressProps) {
  const heights = { sm: "h-1", md: "h-1.5", lg: "h-2" };

  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-caption text-tertiary">Progress</span>
          <span className="text-caption font-medium text-primary">{progress}%</span>
        </div>
      )}
      <div
        className={cn("w-full overflow-hidden rounded-full bg-surface-3", heights[size])}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${progress}% complete`}
      >
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-all duration-500 ease-out",
            progress === 100 && "bg-success",
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
