"use client";

import { Wrench } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { MissingSkill } from "@/types/cv-analysis";

export interface MissingSkillsProps extends HTMLAttributes<HTMLDivElement> {
  missingSkills: MissingSkill[];
}

const demandStyles = {
  high: { variant: "danger" as const, label: "High" },
  medium: { variant: "warning" as const, label: "Medium" },
  low: { variant: "info" as const, label: "Low" },
} as const;

const MissingSkills = forwardRef<HTMLDivElement, MissingSkillsProps>(
  ({ className, missingSkills, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Missing skills"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-primary" aria-hidden="true" />
            <CardTitle>Top Missing Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {missingSkills.slice(0, 6).map((skill) => {
              const demand = demandStyles[skill.demandLevel];
              return (
                <div
                  key={skill.name}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-label text-primary">
                      {skill.name}
                    </span>
                    <span className="text-caption text-tertiary ml-2">
                      {skill.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={demand.variant} size="xs">
                      {demand.label}
                    </Badge>
                    <span className="text-smallest text-tertiary w-8 text-right">
                      {skill.relevanceToTarget}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
MissingSkills.displayName = "MissingSkills";

export { MissingSkills };
