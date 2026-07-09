"use client";

import { Briefcase, FileText, GraduationCap, Target, UserCheck, Users } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { getReadinessColor, getReadinessVariant } from "@/data/coach";
import { cn } from "@/lib/utils";
import type { CoachProgressSnapshot } from "@/types/coach";

export interface CoachProgressProps extends HTMLAttributes<HTMLDivElement> {
  progress: CoachProgressSnapshot;
}

const metricIcons = {
  overallReadiness: Target,
  profileCompletion: UserCheck,
  skillReadiness: GraduationCap,
  cvReadiness: FileText,
  applicationReadiness: Briefcase,
  interviewReadiness: Users,
};

const metricLabels: Record<keyof CoachProgressSnapshot, string> = {
  overallReadiness: "Overall Readiness",
  profileCompletion: "Profile Completion",
  skillReadiness: "Skill Readiness",
  cvReadiness: "CV Readiness",
  applicationReadiness: "Application Readiness",
  interviewReadiness: "Interview Readiness",
  targetRole: "Target Role",
};

const CoachProgress = forwardRef<HTMLDivElement, CoachProgressProps>(
  ({ className, progress, ...props }, ref) => {
    const metrics: Array<keyof Omit<CoachProgressSnapshot, "targetRole">> = [
      "overallReadiness",
      "skillReadiness",
      "cvReadiness",
      "applicationReadiness",
      "interviewReadiness",
      "profileCompletion",
    ];

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Career readiness progress"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Readiness Breakdown</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {metrics.map((key) => {
              const Icon = metricIcons[key];
              const value = progress[key];
              const variant = getReadinessVariant(value);
              const color = getReadinessColor(value);

              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("h-4 w-4", color)} aria-hidden="true" />
                      <span className="text-body-small text-secondary">
                        {metricLabels[key]}
                      </span>
                    </div>
                    <span className={cn("text-label font-bold", color)}>{value}%</span>
                  </div>
                  <ProgressBar value={value} variant={variant} size="md" animated />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
CoachProgress.displayName = "CoachProgress";

export { CoachProgress };
