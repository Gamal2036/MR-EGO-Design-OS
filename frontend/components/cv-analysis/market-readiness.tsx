"use client";

import { TrendingUp, Building2, DollarSign, MapPin } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { MarketReadiness as MarketReadinessData } from "@/types/cv-analysis";

export interface MarketReadinessProps
  extends HTMLAttributes<HTMLDivElement> {
  marketReadiness: MarketReadinessData;
}

const levelConfig = {
  low: { label: "Low", variant: "danger" as const },
  medium: { label: "Medium", variant: "warning" as const },
  high: { label: "High", variant: "success" as const },
  "very-high": { label: "Very High", variant: "ai" as const },
} as const;

const MarketReadiness = forwardRef<HTMLDivElement, MarketReadinessProps>(
  ({ className, marketReadiness, ...props }, ref) => {
    const level = levelConfig[marketReadiness.level];

    return (
      <Card
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Market readiness"
        {...props}
      >
        <CardHeader
          action={
            <Badge variant={level.variant} size="xs">
              {level.label}
            </Badge>
          }
        >
          <CardTitle>Market Readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-caption text-secondary">Overall</span>
                <span className="text-caption font-medium text-primary">
                  {marketReadiness.score}%
                </span>
              </div>
              <ProgressBar
                value={marketReadiness.score}
                variant={
                  marketReadiness.score >= 70
                    ? "success"
                    : marketReadiness.score >= 50
                      ? "warning"
                      : "danger"
                }
                size="md"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <TrendingUp
                    className="h-3.5 w-3.5 text-tertiary"
                    aria-hidden="true"
                  />
                  <span className="text-caption text-tertiary">
                    Industry Demand
                  </span>
                </div>
                <span className="text-caption font-medium text-primary">
                  {marketReadiness.industryDemand}%
                </span>
              </div>
              <ProgressBar
                value={marketReadiness.industryDemand}
                variant="ai"
                size="sm"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Building2
                    className="h-3.5 w-3.5 text-tertiary"
                    aria-hidden="true"
                  />
                  <span className="text-caption text-tertiary">
                    Role Fit
                  </span>
                </div>
                <span className="text-caption font-medium text-primary">
                  {marketReadiness.roleFit}%
                </span>
              </div>
              <ProgressBar
                value={marketReadiness.roleFit}
                variant="info"
                size="sm"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <DollarSign
                    className="h-3.5 w-3.5 text-tertiary"
                    aria-hidden="true"
                  />
                  <span className="text-caption text-tertiary">
                    Salary Alignment
                  </span>
                </div>
                <span className="text-caption font-medium text-primary">
                  {marketReadiness.salaryAlignment}%
                </span>
              </div>
              <ProgressBar
                value={marketReadiness.salaryAlignment}
                variant="success"
                size="sm"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <MapPin
                    className="h-3.5 w-3.5 text-tertiary"
                    aria-hidden="true"
                  />
                  <span className="text-caption text-tertiary">
                    Location Fit
                  </span>
                </div>
                <span className="text-caption font-medium text-primary">
                  {marketReadiness.locationFit}%
                </span>
              </div>
              <ProgressBar
                value={marketReadiness.locationFit}
                variant="warning"
                size="sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
MarketReadiness.displayName = "MarketReadiness";

export { MarketReadiness };
