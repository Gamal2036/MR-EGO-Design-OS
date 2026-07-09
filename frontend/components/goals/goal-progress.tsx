"use client";

import { cn } from "@/lib/utils";

export interface GoalProgressProps {
  progress: number;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  className?: string;
  variant?: "ring" | "bar";
  label?: string;
}

const sizeClasses = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
};

const strokeWidths = {
  sm: 6,
  md: 8,
  lg: 10,
};

const textSizes = {
  sm: "text-caption",
  md: "text-body-small",
  lg: "text-body",
};

export function GoalProgress({
  progress,
  size = "md",
  showPercentage = true,
  className,
  variant = "ring",
  label,
}: GoalProgressProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  if (variant === "bar") {
    return (
      <div className={cn("w-full", className)}>
        {label && (
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-caption text-secondary">{label}</span>
            {showPercentage && (
              <span className="text-caption font-medium text-primary">{clampedProgress}%</span>
            )}
          </div>
        )}
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-surface-2"
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ?? "Progress"}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-normal",
              clampedProgress === 100 ? "bg-success" : "bg-primary"
            )}
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
      </div>
    );
  }

  const dimension = size === "sm" ? 64 : size === "md" ? 96 : 128;
  const strokeWidth = strokeWidths[size];
  const radius = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", sizeClasses[size], className)}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Progress"}
    >
      <svg className="h-full w-full -rotate-90" viewBox={`0 0 ${dimension} ${dimension}`}>
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-surface-2"
        />
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn("transition-all duration-normal", clampedProgress === 100 ? "text-success" : "text-primary")}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      {showPercentage && (
        <span className={cn("absolute text-primary font-semibold", textSizes[size])}>
          {clampedProgress}%
        </span>
      )}
    </div>
  );
}
