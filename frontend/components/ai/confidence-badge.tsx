"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Brain } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const confidenceVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-caption font-medium transition-colors duration-fast",
  {
    variants: {
      level: {
        high: "bg-success/10 text-success border border-success/20",
        medium: "bg-warning/10 text-warning border border-warning/20",
        low: "bg-danger/10 text-danger border border-danger/20",
      },
    },
    defaultVariants: {
      level: "high",
    },
  }
);

interface ConfidenceBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof confidenceVariants> {
  value: number;
  showIcon?: boolean;
  showValue?: boolean;
}

function getConfidenceLevel(value: number) {
  if (value >= 0.8) return "high";
  if (value >= 0.5) return "medium";
  return "low";
}

function getConfidenceLabel(value: number) {
  if (value >= 0.8) return "High Confidence";
  if (value >= 0.5) return "Medium Confidence";
  return "Low Confidence";
}

const ConfidenceBadge = forwardRef<HTMLSpanElement, ConfidenceBadgeProps>(
  (
    {
      className,
      value,
      showIcon = true,
      showValue = true,
      level,
      ...props
    },
    ref
  ) => {
    const resolvedLevel = level || getConfidenceLevel(value);

    return (
      <span
        ref={ref}
        className={cn(confidenceVariants({ level: resolvedLevel }), className)}
        title={getConfidenceLabel(value)}
        {...props}
      >
        {showIcon && <Brain className="h-3 w-3" aria-hidden="true" />}
        <span>{getConfidenceLabel(value)}</span>
        {showValue && (
          <span className="opacity-70">({Math.round(value * 100)}%)</span>
        )}
      </span>
    );
  }
);
ConfidenceBadge.displayName = "ConfidenceBadge";

export { ConfidenceBadge, confidenceVariants, getConfidenceLevel };
export type { ConfidenceBadgeProps };
