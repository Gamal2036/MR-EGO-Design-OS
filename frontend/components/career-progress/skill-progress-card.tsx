"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { skillCategoryConfig, skillLevelConfig } from "@/data/career-progress";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types/career-progress";

export interface SkillProgressCardProps extends HTMLAttributes<HTMLDivElement> {
  skill: Skill;
}

const SkillProgressCard = forwardRef<HTMLDivElement, SkillProgressCardProps>(
  ({ className, skill, ...props }, ref) => {
    const categoryConfig = skillCategoryConfig[skill.category];
    const currentConfig = skillLevelConfig[skill.level];
    const targetConfig = skillLevelConfig[skill.targetLevel];

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card p-4 transition-colors hover:border-hover",
          skill.isMissing && "border-danger/30 bg-danger/5",
          className
        )}
        role="listitem"
        aria-label={`${skill.name}: ${currentConfig.label} progressing to ${targetConfig.label}`}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-label font-medium text-primary">
                {skill.name}
              </h4>
              <Badge variant="outline" size="xs" className={categoryConfig.color}>
                {categoryConfig.label}
              </Badge>
              {skill.priority === "high" && (
                <Badge variant="danger" size="xs">
                  Priority
                </Badge>
              )}
            </div>
            <p className="text-smallest text-tertiary mt-1">
              {currentConfig.label} → {targetConfig.label}
            </p>
          </div>
          <span
            className={cn(
              "text-heading-4 font-semibold",
              skill.progress >= 80
                ? "text-success"
                : skill.progress >= 50
                ? "text-ai"
                : skill.isMissing
                ? "text-danger"
                : "text-warning"
            )}
          >
            {skill.progress}%
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar
            value={skill.progress}
            variant={
              skill.progress >= 80
                ? "success"
                : skill.progress >= 50
                ? "ai"
                : skill.isMissing
                ? "danger"
                : "warning"
            }
            size="sm"
          />
        </div>
      </div>
    );
  }
);
SkillProgressCard.displayName = "SkillProgressCard";

export { SkillProgressCard };
