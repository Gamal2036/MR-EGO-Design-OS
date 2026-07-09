"use client";

import { Check, X } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface JobSkillMatchProps extends HTMLAttributes<HTMLDivElement> {
  matchingSkills: string[];
  missingSkills: string[];
  compact?: boolean;
}

const JobSkillMatch = forwardRef<HTMLDivElement, JobSkillMatchProps>(
  ({ className, matchingSkills, missingSkills, compact = false, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {matchingSkills.length > 0 && (
          <div className="space-y-1">
            {!compact && (
              <p className="text-caption font-medium text-success">Matching Skills</p>
            )}
            <div className="flex flex-wrap gap-1.5">
              {matchingSkills.slice(0, compact ? 3 : undefined).map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5",
                    "text-smallest font-medium",
                    "border-success/20 bg-success/5 text-success"
                  )}
                >
                  <Check className="h-2.5 w-2.5" aria-hidden="true" />
                  {skill}
                </span>
              ))}
              {compact && matchingSkills.length > 3 && (
                <span className="text-smallest text-tertiary">
                  +{matchingSkills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {missingSkills.length > 0 && (
          <div className="space-y-1">
            {!compact && (
              <p className="text-caption font-medium text-warning">Skills to Develop</p>
            )}
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.slice(0, compact ? 2 : undefined).map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5",
                    "text-smallest font-medium",
                    "border-warning/20 bg-warning/5 text-warning"
                  )}
                >
                  <X className="h-2.5 w-2.5" aria-hidden="true" />
                  {skill}
                </span>
              ))}
              {compact && missingSkills.length > 2 && (
                <span className="text-smallest text-tertiary">
                  +{missingSkills.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
JobSkillMatch.displayName = "JobSkillMatch";

export { JobSkillMatch };
export type { JobSkillMatchProps };
