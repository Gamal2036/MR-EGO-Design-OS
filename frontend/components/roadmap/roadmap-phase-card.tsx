"use client";

import { Flag, Layers, Milestone } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { roadmapPhaseStatusConfig } from "@/data/roadmaps";
import { cn } from "@/lib/utils";
import type { AIRoadmapPhase } from "@/types/roadmap";

export interface RoadmapPhaseCardProps extends HTMLAttributes<HTMLDivElement> {
  phase: AIRoadmapPhase;
}

const RoadmapPhaseCard = forwardRef<HTMLDivElement, RoadmapPhaseCardProps>(
  ({ className, phase, ...props }, ref) => {
    const config = roadmapPhaseStatusConfig[phase.status];

    return (
      <Card
        ref={ref}
        variant={phase.status === "in-progress" ? "ai" : "default"}
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label={`Phase details: ${phase.title}`}
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Phase Details</CardTitle>
          </div>
          <CardDescription>
            Breakdown of the selected roadmap phase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-heading-4 text-primary font-semibold">
              {phase.title}
            </h3>
            <Badge variant={config.variant} size="xs">
              {config.label}
            </Badge>
          </div>

          <p className="text-body-small text-secondary">
            {phase.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface-0 p-3">
              <p className="text-caption text-tertiary">Duration</p>
              <p className="text-label font-semibold text-primary">
                {phase.estimatedWeeks} weeks
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-0 p-3">
              <p className="text-caption text-tertiary">Skills covered</p>
              <p className="text-label font-semibold text-primary">
                {phase.skills.length}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-ai" aria-hidden="true" />
              <h4 className="text-label font-semibold text-primary">Skills</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {phase.skills.map((skill) => (
                <Badge key={skill} variant="neutral" size="xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Milestone className="h-4 w-4 text-success" aria-hidden="true" />
              <h4 className="text-label font-semibold text-primary">
                Milestones
              </h4>
            </div>
            <ul className="space-y-2" role="list" aria-label="Phase milestones">
              {phase.milestones.map((milestone, index) => (
                <li
                  key={`${phase.id}-milestone-${index}`}
                  className="flex items-start gap-2 text-body-small text-secondary"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ai"
                    aria-hidden="true"
                  />
                  {milestone}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }
);
RoadmapPhaseCard.displayName = "RoadmapPhaseCard";

export { RoadmapPhaseCard };
