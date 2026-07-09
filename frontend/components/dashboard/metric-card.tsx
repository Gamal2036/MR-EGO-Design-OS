"use client";

import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  value: string | number;
  label: string;
  description?: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    value: string;
  };
  variant?: "default" | "success" | "warning" | "danger" | "ai" | "info";
}

const trendColors = {
  up: "text-success",
  down: "text-danger",
  neutral: "text-tertiary",
};

const variantIcons = {
  default: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  ai: "text-ai",
  info: "text-info",
};

const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      className,
      icon,
      value,
      label,
      description,
      trend,
      variant = "default",
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label={label}
        {...props}
      >
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div
              className={cn(
                "rounded-lg p-2 bg-surface-1",
                variantIcons[variant]
              )}
              aria-hidden="true"
            >
              {icon}
            </div>
            {trend && (
              <span
                className={cn(
                  "text-caption font-medium",
                  trendColors[trend.direction]
                )}
              >
                {trend.value}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <p className="text-heading-3 text-primary font-semibold">{value}</p>
            <CardTitle className="text-body-small text-secondary font-medium">
              {label}
            </CardTitle>
            {description && (
              <CardDescription className="text-caption text-tertiary">
                {description}
              </CardDescription>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
MetricCard.displayName = "MetricCard";

export { MetricCard };
export type { MetricCardProps };
