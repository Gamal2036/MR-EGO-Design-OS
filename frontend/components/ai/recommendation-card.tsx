"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, Lightbulb, Sparkles, Star, Target } from "lucide-react";
import { type HTMLAttributes, forwardRef, type ReactNode } from "react";

import { Badge } from "../foundation/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../foundation/card";

import { cn } from "@/lib/utils";

const recommendationVariants = cva("", {
  variants: {
    type: {
      insight: "",
      suggestion: "",
      action: "",
      alert: "",
    },
  },
  defaultVariants: {
    type: "insight",
  },
});

const typeConfig = {
  insight: { icon: Lightbulb, label: "Insight", color: "ai" as const },
  suggestion: { icon: Sparkles, label: "Suggestion", color: "info" as const },
  action: { icon: Target, label: "Action", color: "success" as const },
  alert: { icon: Star, label: "Alert", color: "warning" as const },
};

interface RecommendationCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof recommendationVariants> {
  title: string;
  description?: string;
  action?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  confidence?: number;
  source?: string;
}

const RecommendationCard = forwardRef<HTMLDivElement, RecommendationCardProps>(
  (
    {
      className,
      type = "insight",
      title,
      description,
      action,
      actionLabel,
      onAction,
      confidence,
      source,
      ...props
    },
    ref
  ) => {
    const config = typeConfig[type || "insight"];
    const Icon = config.icon;

    return (
      <Card
        ref={ref}
        variant="ai"
        padding="md"
        className={cn(recommendationVariants({ type }), className)}
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "rounded-full p-1.5",
                config.color === "ai" && "bg-ai/10 text-ai",
                config.color === "info" && "bg-info/10 text-info",
                config.color === "success" && "bg-success/10 text-success",
                config.color === "warning" && "bg-warning/10 text-warning"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <Badge variant={config.color} size="xs">
              {config.label}
            </Badge>
            {confidence !== undefined && (
              <Badge
                variant={
                  confidence >= 0.8
                    ? "success"
                    : confidence >= 0.5
                    ? "warning"
                    : "danger"
                }
                size="xs"
              >
                {Math.round(confidence * 100)}%
              </Badge>
            )}
          </div>
          <CardTitle className="mt-2">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        {(action || actionLabel) && (
          <CardFooter>
            {action || (
              <button
                type="button"
                onClick={onAction}
                className="inline-flex items-center gap-1.5 text-label font-medium text-link hover:text-link-hover transition-colors"
              >
                {actionLabel}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {source && (
              <span className="text-caption text-tertiary ml-auto">
                {source}
              </span>
            )}
          </CardFooter>
        )}
      </Card>
    );
  }
);
RecommendationCard.displayName = "RecommendationCard";

export { RecommendationCard, recommendationVariants };
export type { RecommendationCardProps };
