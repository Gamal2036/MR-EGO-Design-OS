"use client";

import {
  Briefcase,
  FileText,
  Layers,
  Send,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { getScoreColor } from "@/data/career-progress";
import { cn } from "@/lib/utils";
import type { CareerScore } from "@/types/career-progress";

export interface CareerScoreOverviewProps extends HTMLAttributes<HTMLDivElement> {
  scores: CareerScore;
}

interface ScoreItem {
  key: keyof CareerScore;
  label: string;
  description: string;
  icon: LucideIcon;
}

const scoreItems: ScoreItem[] = [
  {
    key: "jobReadiness",
    label: "Job Readiness",
    description: "How well your profile matches target roles",
    icon: Briefcase,
  },
  {
    key: "cvReadiness",
    label: "CV Readiness",
    description: "Quality and completeness of your CV",
    icon: FileText,
  },
  {
    key: "skillReadiness",
    label: "Skill Readiness",
    description: "Your skills versus target role requirements",
    icon: Layers,
  },
  {
    key: "applicationReadiness",
    label: "Application Readiness",
    description: "Consistency and quality of your applications",
    icon: Send,
  },
];

const CareerScoreOverview = forwardRef<HTMLDivElement, CareerScoreOverviewProps>(
  ({ className, scores, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Career readiness breakdown"
        {...props}
      >
        <CardHeader>
          <CardTitle>Readiness Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {scoreItems.map((item) => {
              const value = scores[item.key];
              const Icon = item.icon;
              return (
                <div key={item.key} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="rounded-lg bg-surface-1 p-1.5 text-primary"
                        aria-hidden="true"
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-label font-medium text-primary">
                          {item.label}
                        </p>
                        <p className="text-smallest text-tertiary hidden sm:block">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-heading-4 font-semibold",
                        getScoreColor(value)
                      )}
                    >
                      {value}%
                    </span>
                  </div>
                  <ProgressBar
                    value={value}
                    variant={
                      value >= 80
                        ? "success"
                        : value >= 60
                        ? "ai"
                        : value >= 40
                        ? "warning"
                        : "danger"
                    }
                    size="sm"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
CareerScoreOverview.displayName = "CareerScoreOverview";

export { CareerScoreOverview };
