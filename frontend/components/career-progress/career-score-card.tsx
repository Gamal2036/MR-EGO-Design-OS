"use client";

import { TrendingUp } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { getScoreColor, getScoreLabel, getScoreRingColor } from "@/data/career-progress";
import { cn } from "@/lib/utils";

export interface CareerScoreCardProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 96, viewBox: 128, stroke: 6, radius: 54, text: "text-heading-2" },
  md: { width: 128, viewBox: 128, stroke: 8, radius: 54, text: "text-heading-1" },
  lg: { width: 160, viewBox: 128, stroke: 8, radius: 54, text: "text-display" },
};

const CareerScoreCard = forwardRef<HTMLDivElement, CareerScoreCardProps>(
  (
    {
      className,
      score,
      label = "Career Score",
      description = "Overall career health based on your profile, activity, and market alignment.",
      size = "md",
      ...props
    },
    ref
  ) => {
    const config = sizeMap[size];
    const circumference = 2 * Math.PI * config.radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label={label}
        {...props}
      >
        <CardHeader>
          <CardTitle>{label}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative flex items-center justify-center"
              role="img"
              aria-label={`${label}: ${score} out of 100`}
            >
              <svg
                width={config.width}
                height={config.width}
                viewBox={`0 0 ${config.viewBox} ${config.viewBox}`}
                className="-rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx={config.viewBox / 2}
                  cy={config.viewBox / 2}
                  r={config.radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={config.stroke}
                  className="text-neutral-200 dark:text-neutral-700"
                />
                <circle
                  cx={config.viewBox / 2}
                  cy={config.viewBox / 2}
                  r={config.radius}
                  fill="none"
                  strokeWidth={config.stroke}
                  strokeLinecap="round"
                  className={cn(
                    "transition-all duration-xx-slow ease-out-custom",
                    getScoreRingColor(score)
                  )}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span
                  className={cn(
                    "font-bold",
                    config.text,
                    getScoreColor(score)
                  )}
                >
                  {score}
                </span>
                <span className="text-caption text-tertiary">/ 100</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp
                className={cn("h-4 w-4", getScoreColor(score))}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "text-label font-medium",
                  getScoreColor(score)
                )}
              >
                {getScoreLabel(score)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
CareerScoreCard.displayName = "CareerScoreCard";

export { CareerScoreCard };
