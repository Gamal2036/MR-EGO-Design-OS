"use client";

import { Trophy } from "lucide-react";
import { useMemo } from "react";
import { type HTMLAttributes, forwardRef } from "react";

import { AchievementBadge } from "./achievement-badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { AchievementBadge as AchievementBadgeType } from "@/types/career-progress";

export interface AchievementBadgesProps extends HTMLAttributes<HTMLDivElement> {
  badges: AchievementBadgeType[];
}

const AchievementBadges = forwardRef<HTMLDivElement, AchievementBadgesProps>(
  ({ className, badges, ...props }, ref) => {
    const earnedCount = useMemo(
      () => badges.filter((b) => b.earned).length,
      [badges]
    );

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Achievement badges"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" aria-hidden="true" />
              <CardTitle>Achievement Badges</CardTitle>
            </div>
            <span className="text-caption text-tertiary">
              {earnedCount}/{badges.length} earned
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="grid grid-cols-1 gap-3"
            role="list"
            aria-label="Achievement badges"
          >
            {badges.map((badge) => (
              <AchievementBadge key={badge.id} badge={badge} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);
AchievementBadges.displayName = "AchievementBadges";

export { AchievementBadges };
