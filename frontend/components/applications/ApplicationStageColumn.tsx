"use client";

import type { HTMLAttributes } from "react";

import { ApplicationCard } from "./ApplicationCard";

import type { Application, ApplicationStatus } from "@/types/application-tracker";

interface ApplicationStageColumnProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  status: ApplicationStatus;
  label: string;
  applications: Application[];
  onSelect: (app: Application) => void;
}

const STATUS_HEADER_COLORS: Record<string, string> = {
  draft: "border-l-neutral-400",
  prepared: "border-l-info",
  applied: "border-l-primary",
  viewed: "border-l-info",
  interview: "border-l-ai",
  "technical-test": "border-l-warning",
  offer: "border-l-success",
  accepted: "border-l-success",
  rejected: "border-l-danger",
  archived: "border-l-neutral-500",
};

const STATUS_DOT_COLORS: Record<string, string> = {
  draft: "bg-neutral-400",
  prepared: "bg-info",
  applied: "bg-primary",
  viewed: "bg-info",
  interview: "bg-ai",
  "technical-test": "bg-warning",
  offer: "bg-success",
  accepted: "bg-success",
  rejected: "bg-danger",
  archived: "bg-neutral-500",
};

export function ApplicationStageColumn({
  status,
  label,
  applications,
  onSelect,
  className,
  ...props
}: ApplicationStageColumnProps) {
  return (
    <div
      className={`flex w-72 shrink-0 flex-col ${className || ""}`}
      role="region"
      aria-label={`${label} stage`}
      {...props}
    >
      <div
        className={`mb-3 flex items-center justify-between border-l-2 pl-3 ${
          STATUS_HEADER_COLORS[status] || "border-l-border"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${STATUS_DOT_COLORS[status] || "bg-neutral-400"}`} aria-hidden="true" />
          <h3 className="text-label text-primary font-medium">{label}</h3>
        </div>
        <span className="text-caption text-tertiary">{applications.length}</span>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pr-1" role="list" aria-label={`${label} applications`}>
        {applications.length === 0 ? (
          <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface-0 px-4 py-8">
            <p className="text-caption text-tertiary">No applications</p>
          </div>
        ) : (
          applications.map((app) => (
            <div key={app.id} role="listitem">
              <ApplicationCard application={app} onSelect={onSelect} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
