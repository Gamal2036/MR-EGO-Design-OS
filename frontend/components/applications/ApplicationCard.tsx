"use client";

import {
  Building2,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { HTMLAttributes } from "react";

import { Badge } from "@/components/foundation/badge";
import type { Application, ApplicationStatus } from "@/types/application-tracker";

interface ApplicationCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  application: Application;
  onSelect: (app: Application) => void;
}

const STATUS_VARIANT: Record<ApplicationStatus, "primary" | "info" | "success" | "warning" | "danger" | "neutral" | "ai"> = {
  draft: "neutral",
  prepared: "info",
  applied: "primary",
  viewed: "info",
  interview: "ai",
  "technical-test": "warning",
  offer: "success",
  accepted: "success",
  rejected: "danger",
  archived: "neutral",
};

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  draft: "Draft",
  prepared: "Prepared",
  applied: "Applied",
  viewed: "Viewed",
  interview: "Interview",
  "technical-test": "Tech Test",
  offer: "Offer",
  accepted: "Accepted",
  rejected: "Rejected",
  archived: "Archived",
};

const getPriorityDot = (priority: string) => {
  switch (priority) {
    case "high": return "bg-danger";
    case "medium": return "bg-warning";
    default: return "bg-neutral-400 dark:bg-neutral-600";
  }
};

export function ApplicationCard({ application, onSelect, className, ...props }: ApplicationCardProps) {
  const app = application;

  return (
    <div
      className={`group rounded-xl border border-border bg-card p-4 shadow-soft transition-all duration-normal hover:shadow-hover hover:border-hover cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className || ""}`}
      onClick={() => onSelect(app)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(app); } }}
      role="button"
      tabIndex={0}
      aria-label={`${app.company} - ${app.role} - ${STATUS_LABEL[app.status]}`}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${getPriorityDot(app.priority)}`}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-label text-primary truncate">{app.company}</h3>
              <Badge variant={STATUS_VARIANT[app.status]} size="xs">
                {STATUS_LABEL[app.status]}
              </Badge>
            </div>
            <p className="text-body-small text-secondary truncate">{app.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Sparkles className="h-3.5 w-3.5 text-ai" aria-hidden="true" />
          <span className="text-caption font-medium text-ai">{app.matchScore}%</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="flex items-center gap-1 text-smallest text-tertiary">
          <Building2 className="h-3 w-3" aria-hidden="true" />
          {app.company}
        </span>
        <span className="flex items-center gap-1 text-smallest text-tertiary">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {app.location}
        </span>
        {app.appliedDate && (
          <span className="flex items-center gap-1 text-smallest text-tertiary">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            {app.appliedDate}
          </span>
        )}
      </div>

      {app.nextAction && (
        <div className="mt-3 flex items-center justify-between rounded-lg bg-surface-0 px-3 py-2 border border-border/50">
          <span className="flex items-center gap-1.5 text-smallest text-secondary">
            <ArrowRight className="h-3 w-3 text-info" aria-hidden="true" />
            {app.nextAction}
          </span>
          {app.nextActionDate && (
            <span className="text-smallest text-tertiary">{app.nextActionDate}</span>
          )}
        </div>
      )}

      {app.tasks.length > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div
              className="h-full rounded-full bg-ai transition-all duration-normal"
              style={{
                width: `${Math.round((app.tasks.filter((t) => t.completed).length / app.tasks.length) * 100)}%`,
              }}
              role="progressbar"
              aria-valuenow={app.tasks.filter((t) => t.completed).length}
              aria-valuemin={0}
              aria-valuemax={app.tasks.length}
              aria-label={`${app.tasks.filter((t) => t.completed).length} of ${app.tasks.length} tasks complete`}
            />
          </div>
          <span className="text-smallest text-tertiary shrink-0">
            {app.tasks.filter((t) => t.completed).length}/{app.tasks.length}
          </span>
        </div>
      )}
    </div>
  );
}
