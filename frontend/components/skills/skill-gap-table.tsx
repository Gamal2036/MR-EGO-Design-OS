"use client";

import { type HTMLAttributes, forwardRef, useMemo } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types/skills";

interface SkillGapTableProps extends HTMLAttributes<HTMLDivElement> {
  skills: Skill[];
}

function getGap(current: number, target: number): number {
  return Math.max(0, target - current);
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case "high":
      return "text-danger";
    case "medium":
      return "text-warning";
    case "low":
      return "text-success";
    default:
      return "text-tertiary";
  }
}

function getGapSeverity(gap: number): "danger" | "warning" | "success" {
  if (gap >= 40) return "danger";
  if (gap >= 20) return "warning";
  return "success";
}

const SkillGapTable = forwardRef<HTMLDivElement, SkillGapTableProps>(
  ({ className, skills, ...props }, ref) => {
    const sorted = useMemo(
      () => [...skills].sort((a, b) => getGap(b.currentValue, b.targetValue) - getGap(a.currentValue, a.targetValue)),
      [skills]
    );

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Skill Gap Analysis"
        {...props}
      >
        <CardHeader>
          <CardTitle>Skill Gap Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" role="table" aria-label="Skill gaps">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-6 gap-3 px-4 py-2 text-caption font-medium text-tertiary uppercase tracking-wider" role="row">
                <div className="col-span-1" role="columnheader">Skill</div>
                <div className="col-span-1 text-center" role="columnheader">Current</div>
                <div className="col-span-1 text-center" role="columnheader">Required</div>
                <div className="col-span-1 text-center" role="columnheader">Gap</div>
                <div className="col-span-1 text-center" role="columnheader">Priority</div>
                <div className="col-span-1" role="columnheader">Recommended Action</div>
              </div>
              <div className="space-y-1">
                {sorted.map((skill) => {
                  const gap = getGap(skill.currentValue, skill.targetValue);
                  return (
                    <div
                      key={skill.id}
                      className="grid grid-cols-6 gap-3 rounded-lg px-4 py-3 text-body text-primary transition-colors duration-fast hover:bg-surface-0 items-center"
                      role="row"
                    >
                      <div className="col-span-1 font-medium truncate" role="cell">
                        {skill.name}
                      </div>
                      <div className="col-span-1 text-center" role="cell">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-normal"
                              style={{ width: `${skill.currentValue}%` }}
                            />
                          </div>
                          <span className="text-caption text-tertiary w-7">{skill.currentValue}%</span>
                        </div>
                      </div>
                      <div className="col-span-1 text-center text-tertiary text-body" role="cell">
                        {skill.targetValue}%
                      </div>
                      <div className="col-span-1 text-center" role="cell">
                        <Badge variant={getGapSeverity(gap)} size="xs">
                          {gap}%
                        </Badge>
                      </div>
                      <div className="col-span-1 text-center" role="cell">
                        <span className={cn("text-label font-medium capitalize", getPriorityColor(skill.priority))}>
                          {skill.priority}
                        </span>
                      </div>
                      <div className="col-span-1 text-caption text-secondary truncate" role="cell">
                        {gap >= 40
                          ? "Focus: critical skill gap"
                          : gap >= 20
                          ? "Practice & build projects"
                          : "Maintain & refine"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
SkillGapTable.displayName = "SkillGapTable";

export { SkillGapTable };
export type { SkillGapTableProps };
