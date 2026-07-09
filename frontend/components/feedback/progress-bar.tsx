"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const progressVariants = cva(
  "w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const indicatorVariants = cva(
  "h-full rounded-full transition-all duration-normal",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
        info: "bg-info",
        ai: "bg-ai",
        neutral: "bg-neutral-400 dark:bg-neutral-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface ProgressBarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "ai" | "neutral";
  showLabel?: boolean;
  animated?: boolean;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      max = 100,
      size = "md",
      variant = "primary",
      showLabel = false,
      animated = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className="flex items-center gap-3">
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(progressVariants({ size }), className)}
          {...props}
        >
          <div
            className={cn(
              indicatorVariants({ variant }),
              animated && "animate-progress-stripes"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <span className="text-caption font-medium text-secondary whitespace-nowrap">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar, progressVariants };
export type { ProgressBarProps };
