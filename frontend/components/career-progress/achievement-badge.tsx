"use client";

import {
  Award,
  BarChart3,
  Briefcase,
  FileText,
  FolderOpen,
  Send,
  type LucideIcon,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { badgeTierConfig } from "@/data/career-progress";
import { cn } from "@/lib/utils";
import type { AchievementBadge as AchievementBadgeType } from "@/types/career-progress";

export interface AchievementBadgeProps extends HTMLAttributes<HTMLDivElement> {
  badge: AchievementBadgeType;
}

const iconMap: Record<string, LucideIcon> = {
  FileText,
  BarChart3,
  Briefcase,
  Send,
  FolderOpen,
  Award,
};

const AchievementBadge = forwardRef<HTMLDivElement, AchievementBadgeProps>(
  ({ className, badge, ...props }, ref) => {
    const tierConfig = badgeTierConfig[badge.tier];
    const Icon = iconMap[badge.icon] || Award;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card p-4 transition-colors",
          badge.earned
            ? "border-success/30 bg-success/5"
            : "border-border hover:border-hover",
          className
        )}
        role="listitem"
        aria-label={`${badge.title}: ${badge.earned ? "Earned" : "In progress"}`}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              badge.earned ? tierConfig.bg : "bg-surface-1",
              badge.earned ? tierConfig.color : "text-tertiary"
            )}
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4
                className={cn(
                  "text-label font-medium",
                  badge.earned ? "text-primary" : "text-tertiary"
                )}
              >
                {badge.title}
              </h4>
              <Badge
                variant={badge.earned ? "success" : "neutral"}
                size="xs"
              >
                {badge.earned ? "Earned" : "Locked"}
              </Badge>
            </div>
            <p className="text-smallest text-tertiary mt-0.5">
              {badge.description}
            </p>
            {badge.earnedDate && (
              <p className="text-caption text-tertiary mt-1">
                Earned {badge.earnedDate}
              </p>
            )}
          </div>
        </div>
        {!badge.earned && (
          <div className="mt-3">
            <ProgressBar
              value={badge.progress}
              variant={badge.progress >= 50 ? "ai" : "warning"}
              size="sm"
              showLabel
            />
          </div>
        )}
      </div>
    );
  }
);
AchievementBadge.displayName = "AchievementBadge";

export { AchievementBadge };
