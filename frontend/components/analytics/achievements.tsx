"use client";

import { Brain, FileText, Send, Trophy, Users, Zap } from "lucide-react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { AchievementBadge } from "@/types/analytics";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Send,
  FileText,
  Brain,
  Users,
  Zap,
  Trophy,
};

interface AchievementsProps {
  badges: AchievementBadge[];
}

export function Achievements({ badges }: AchievementsProps) {
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <Card variant="default" padding="md" role="region" aria-label="Achievements">
      <CardHeader
        action={
          <Badge variant="success" size="sm">
            {earnedCount}/{badges.length} Earned
          </Badge>
        }
      >
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="list">
          {badges.map((badge) => {
            const Icon = ICONS[badge.icon] ?? Trophy;
            return (
              <li
                key={badge.id}
                className={cn(
                  "rounded-lg border p-3 text-center transition-colors duration-fast",
                  badge.earned
                    ? "border-border bg-surface-1"
                    : "border-dashed border-border bg-surface-0 opacity-60"
                )}
              >
                <div
                  className={cn(
                    "mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full",
                    badge.earned ? "bg-success/10 text-success" : "bg-surface-2 text-tertiary"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-caption font-semibold text-primary">{badge.label}</h3>
                <p className="text-smallest text-tertiary mt-0.5">{badge.description}</p>
                {badge.earned && badge.earnedAt && (
                  <p className="text-smallest text-success mt-1">Earned {badge.earnedAt}</p>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
