"use client";

import { useRef } from "react";
import type { HTMLAttributes } from "react";

import { ApplicationStageColumn } from "./ApplicationStageColumn";

import type { Application, ApplicationStatus } from "@/types/application-tracker";
import { APPLICATION_STATUSES } from "@/types/application-tracker";

interface ApplicationPipelineBoardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  applications: Application[];
  onSelect: (app: Application) => void;
}

const PIPELINE_STATUSES: ApplicationStatus[] = [
  "draft",
  "prepared",
  "applied",
  "viewed",
  "interview",
  "technical-test",
  "offer",
  "accepted",
  "rejected",
  "archived",
];

export function ApplicationPipelineBoard({
  applications,
  onSelect,
  className,
  ...props
}: ApplicationPipelineBoardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const stageMap = new Map<ApplicationStatus, Application[]>();
  PIPELINE_STATUSES.forEach((s) => stageMap.set(s, []));
  applications.forEach((app) => {
    const existing = stageMap.get(app.status) || [];
    existing.push(app);
    stageMap.set(app.status, existing);
  });

  return (
    <div
      className={`-mx-5 overflow-x-auto px-5 pb-4 md:-mx-7 md:px-7 lg:-mx-8 lg:px-8 ${className || ""}`}
      ref={scrollRef}
      role="region"
      aria-label="Application Pipeline Board"
      {...props}
    >
      <div className="flex gap-4" style={{ minWidth: `${PIPELINE_STATUSES.length * 288 + (PIPELINE_STATUSES.length - 1) * 16}px` }}>
        {PIPELINE_STATUSES.map((status) => {
          const statusConfig = APPLICATION_STATUSES.find((s) => s.status === status);
          return (
            <ApplicationStageColumn
              key={status}
              status={status}
              label={statusConfig?.label || status}
              applications={stageMap.get(status) || []}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}
