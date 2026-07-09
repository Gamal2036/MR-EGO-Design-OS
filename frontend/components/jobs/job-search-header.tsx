"use client";

import { Briefcase, MapPin, Target } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { cn } from "@/lib/utils";

interface JobSearchHeaderProps extends HTMLAttributes<HTMLElement> {
  careerTarget?: string;
  location?: string;
}

const JobSearchHeader = forwardRef<HTMLElement, JobSearchHeaderProps>(
  ({ className, careerTarget = "Senior AI Engineer", location = "San Francisco, CA (Remote)", ...props }, ref) => {
    return (
      <header ref={ref} className={cn("space-y-4", className)} {...props}>
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Job Search" },
          ]}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-heading-2 text-primary">Job Search</h1>
            </div>
            <p className="text-body text-secondary">
              Find and compare opportunities that match your profile
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="ai" size="sm">
                <Target className="h-3 w-3 mr-1" aria-hidden="true" />
                {careerTarget}
              </Badge>
              <span className="flex items-center gap-1 text-caption text-tertiary">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {location}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-0 px-3 py-2 text-caption text-tertiary">
              <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
              <span>AI-powered search</span>
            </div>
          </div>
        </div>
      </header>
    );
  }
);
JobSearchHeader.displayName = "JobSearchHeader";

export { JobSearchHeader };
export type { JobSearchHeaderProps };
