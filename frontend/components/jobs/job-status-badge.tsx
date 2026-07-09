"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { cn } from "@/lib/utils";

type JobStatusType = "new" | "saved" | "recommended" | "applied" | "interviewing" | "rejected" | "expired";

interface JobStatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  status: JobStatusType;
}

const statusConfig: Record<JobStatusType, { label: string; variant: "success" | "info" | "ai" | "warning" | "neutral" | "primary" | "danger" }> = {
  new: { label: "New", variant: "success" },
  saved: { label: "Saved", variant: "primary" },
  recommended: { label: "Recommended", variant: "ai" },
  applied: { label: "Applied", variant: "info" },
  interviewing: { label: "Interviewing", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },
  expired: { label: "Expired", variant: "neutral" },
};

const JobStatusBadge = forwardRef<HTMLDivElement, JobStatusBadgeProps>(
  ({ className, status, ...props }, ref) => {
    const config = statusConfig[status] ?? statusConfig.new;

    return (
      <div ref={ref} className={cn("inline-flex", className)} {...props}>
        <Badge variant={config.variant} size="xs">
          {config.label}
        </Badge>
      </div>
    );
  }
);
JobStatusBadge.displayName = "JobStatusBadge";

export { JobStatusBadge };
export type { JobStatusBadgeProps, JobStatusType };
