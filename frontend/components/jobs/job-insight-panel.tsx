"use client";

import {
  AlertTriangle,
  CheckCircle,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Target,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job-search";

interface JobInsightPanelProps extends HTMLAttributes<HTMLDivElement> {
  job: Job | null;
}

const InsightCard = ({
  icon,
  label,
  description,
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  variant?: "success" | "warning" | "info" | "default";
}) => {
  const borderColor =
    variant === "success"
      ? "border-success/20 bg-success/5"
      : variant === "warning"
        ? "border-warning/20 bg-warning/5"
        : variant === "info"
          ? "border-ai/20 bg-ai/5"
          : "border-border bg-surface-0";

  return (
    <div className={cn("rounded-xl border p-4 space-y-2", borderColor)}>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-",
            variant === "success"
              ? "text-success"
              : variant === "warning"
                ? "text-warning"
                : variant === "info"
                  ? "text-ai"
                  : "text-primary"
          )}
        >
          {icon}
        </span>
        <span className="text-caption font-semibold text-primary">{label}</span>
      </div>
      <p className="text-body-small text-secondary">{description}</p>
    </div>
  );
};

const JobInsightPanel = forwardRef<HTMLDivElement, JobInsightPanelProps>(
  ({ className, job, ...props }, ref) => {
    if (!job) {
      return (
        <Panel
          ref={ref}
          variant="default"
          padding="md"
          className={cn("", className)}
          {...props}
        >
          <PanelHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
              <span>AI Insights</span>
            </div>
          </PanelHeader>
          <PanelBody>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Lightbulb className="h-8 w-8 text-tertiary mb-3" aria-hidden="true" />
              <p className="text-body text-secondary">
                Select a job to see AI-powered insights about how it fits your profile.
              </p>
            </div>
          </PanelBody>
        </Panel>
      );
    }

    const hasGaps = job.missingSkills.length > 0;
    const hasMatches = job.matchingSkills.length > 0;

    return (
      <Panel
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        {...props}
      >
        <PanelHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
            <span>AI Insights</span>
          </div>
        </PanelHeader>
        <PanelBody className="space-y-3">
          <InsightCard
            icon={<CheckCircle className="h-4 w-4" />}
            label="Why This Job Fits"
            description={job.matchExplanation}
            variant="info"
          />

          {hasGaps && (
            <InsightCard
              icon={<AlertTriangle className="h-4 w-4" />}
              label="Skill Gaps to Address"
              description={`You're missing ${job.missingSkills.length} key skill${job.missingSkills.length > 1 ? "s" : ""}: ${job.missingSkills.join(", ")}. Consider upskilling in these areas.`}
              variant="warning"
            />
          )}

          {hasMatches && (
            <InsightCard
              icon={<Target className="h-4 w-4" />}
              label="Your Strengths"
              description={`Your profile matches ${job.matchingSkills.length} key requirements: ${job.matchingSkills.join(", ")}.`}
              variant="success"
            />
          )}

          <InsightCard
            icon={<FileText className="h-4 w-4" />}
            label="CV Recommendation"
            description={`Highlight your ${job.matchingSkills.slice(0, 3).join(", ")} experience more prominently. Consider adding quantifiable achievements in these areas.`}
            variant="default"
          />

          <div className="pt-2 space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-caption"
              leftIcon={<GraduationCap className="h-4 w-4" />}
            >
              Interview Preparation
              <Badge variant="neutral" size="xs" className="ml-auto">Coming Soon</Badge>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-caption"
              leftIcon={<MessageSquare className="h-4 w-4" />}
            >
              Cover Letter Draft
              <Badge variant="neutral" size="xs" className="ml-auto">Coming Soon</Badge>
            </Button>
          </div>
        </PanelBody>
      </Panel>
    );
  }
);
JobInsightPanel.displayName = "JobInsightPanel";

export { JobInsightPanel };
export type { JobInsightPanelProps };
