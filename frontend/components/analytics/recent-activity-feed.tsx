"use client";

import { Brain, FileText, GraduationCap, Milestone, Send, Briefcase } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import type { RecentActivityItem } from "@/types/analytics";

const CONFIG: Record<
  RecentActivityItem["type"],
  { icon: React.ComponentType<{ className?: string }>; color: string; label: string }
> = {
  ai: { icon: Brain, color: "var(--color-ai-500)", label: "AI" },
  cv: { icon: FileText, color: "var(--color-cv-500)", label: "CV" },
  job: { icon: Briefcase, color: "var(--color-job-500)", label: "Job" },
  application: { icon: Send, color: "var(--color-primary-500)", label: "Application" },
  learning: { icon: GraduationCap, color: "var(--color-cyan-500)", label: "Learning" },
  milestone: { icon: Milestone, color: "var(--color-success-500)", label: "Milestone" },
};

interface RecentActivityFeedProps {
  items: RecentActivityItem[];
}

export function RecentActivityFeed({ items }: RecentActivityFeedProps) {
  return (
    <Card variant="default" padding="md" role="region" aria-label="Recent activity feed">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4" role="list">
          {items.map((item, index) => {
            const config = CONFIG[item.type];
            const Icon = config.icon;
            return (
              <li key={item.id} className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${config.color}15`, color: config.color }}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  {index !== items.length - 1 && (
                    <div className="mt-2 h-full w-px bg-border" aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-body font-medium text-primary">{item.title}</h3>
                    <span className="text-caption text-tertiary">{item.timestamp}</span>
                  </div>
                  <p className="text-caption text-secondary mt-0.5">{item.description}</p>
                  <span className="inline-flex mt-2 text-smallest font-medium text-tertiary">
                    {config.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
