"use client";

import { Briefcase, Calendar, MapPin } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";
import type { ExperienceSnapshot as ExperienceSnapshotType } from "@/types/profile";

interface ExperienceSnapshotProps extends HTMLAttributes<HTMLDivElement> {
  experience: ExperienceSnapshotType;
}

const ExperienceSnapshot = forwardRef<HTMLDivElement, ExperienceSnapshotProps>(
  ({ className, experience, ...props }, ref) => {
    return (
      <Panel
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Experience Snapshot"
        {...props}
      >
        <PanelHeader>
          <h2 className="text-heading-4 text-primary">Experience Snapshot</h2>
        </PanelHeader>
        <PanelBody>
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center rounded-lg bg-surface-0 p-3 text-center">
                <span className="text-heading-3 text-cyan font-semibold">
                  {experience.totalYears}+
                </span>
                <span className="text-caption text-tertiary">Years</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-surface-0 p-3 text-center">
                <span className="text-heading-3 text-cyan font-semibold">
                  {experience.projectsCount}
                </span>
                <span className="text-caption text-tertiary">Projects</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-surface-0 p-3 text-center">
                <span className="text-heading-3 text-cyan font-semibold">
                  {experience.certificationsCount}
                </span>
                <span className="text-caption text-tertiary">Certs</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-body font-medium text-primary flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-cyan" aria-hidden="true" />
                Recent Roles
              </h3>
              {experience.recentRoles.map((role) => (
                <div
                  key={role.id}
                  className="rounded-lg border border-border bg-surface-0 p-3 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-body font-medium text-primary">{role.title}</p>
                      <p className="text-body-small text-secondary">{role.company}</p>
                    </div>
                    {role.current && (
                      <span className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-smallest text-success">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-smallest text-tertiary">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {role.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {role.startDate} - {role.current ? "Present" : role.endDate}
                    </span>
                  </div>
                  <p className="text-body-small text-secondary line-clamp-2">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PanelBody>
      </Panel>
    );
  }
);
ExperienceSnapshot.displayName = "ExperienceSnapshot";

export { ExperienceSnapshot };
export type { ExperienceSnapshotProps };
