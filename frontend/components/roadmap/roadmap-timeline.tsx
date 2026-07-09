"use client";

import { Check, Lock } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { roadmapPhaseStatusConfig } from "@/data/roadmaps";
import { cn } from "@/lib/utils";
import type { AIRoadmapPhase } from "@/types/roadmap";

export interface RoadmapTimelineProps extends HTMLAttributes<HTMLDivElement> {
  phases: AIRoadmapPhase[];
  selectedPhaseId?: string | null;
  onSelectPhase?: (id: string) => void;
}

const RoadmapTimeline = forwardRef<HTMLDivElement, RoadmapTimelineProps>(
  (
    { className, phases, selectedPhaseId, onSelectPhase, ...props },
    ref
  ) => {
    const sortedPhases = [...phases].sort((a, b) => a.order - b.order);

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Roadmap timeline"
        {...props}
      >
        <CardHeader>
          <CardTitle>Roadmap Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div role="list" aria-label="Roadmap phases" className="space-y-0">
            {sortedPhases.map((phase, index) => {
              const config = roadmapPhaseStatusConfig[phase.status];
              const isLast = index === sortedPhases.length - 1;
              const isSelected = phase.id === selectedPhaseId;

              return (
                <div
                  key={phase.id}
                  role="listitem"
                  className={cn(
                    "relative flex gap-4 rounded-lg p-2 -mx-2 transition-colors",
                    onSelectPhase && phase.status !== "locked" ? "cursor-pointer hover:bg-accent" : "",
                    isSelected && "bg-ai/5"
                  )}
                  aria-label={`${phase.title}: ${config.label}`}
                  onClick={() =>
                    onSelectPhase && phase.status !== "locked" ? onSelectPhase(phase.id) : undefined
                  }
                  tabIndex={onSelectPhase && phase.status !== "locked" ? 0 : -1}
                  onKeyDown={(e) => {
                    if (
                      onSelectPhase &&
                      phase.status !== "locked" &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      onSelectPhase(phase.id);
                    }
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                        phase.status === "completed"
                          ? "border-success bg-success text-success-foreground"
                          : phase.status === "in-progress"
                          ? "border-ai bg-ai text-ai-foreground"
                          : phase.status === "locked"
                          ? "border-border bg-surface-1 text-tertiary"
                          : "border-info bg-surface-1 text-info"
                      )}
                      aria-hidden="true"
                    >
                      {phase.status === "completed" ? (
                        <Check className="h-5 w-5" />
                      ) : phase.status === "locked" ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <span className="text-label font-semibold">
                          {phase.order}
                        </span>
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className={cn(
                          "mt-2 h-full w-0.5 min-h-[2rem]",
                          phase.status === "completed" ? "bg-success/50" : "bg-border"
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="flex-1 pb-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={cn(
                          "text-heading-4 font-semibold",
                          phase.status === "locked"
                            ? "text-tertiary"
                            : "text-primary"
                        )}
                      >
                        {phase.title}
                      </h3>
                      <Badge variant={config.variant} size="xs">
                        {config.label}
                      </Badge>
                    </div>
                    <p
                      className={cn(
                        "text-body-small mt-1",
                        phase.status === "locked"
                          ? "text-tertiary"
                          : "text-secondary"
                      )}
                    >
                      {phase.description}
                    </p>
                    <p className="text-caption text-tertiary mt-1">
                      {phase.estimatedWeeks} weeks · {phase.skills.length} skills
                    </p>
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
RoadmapTimeline.displayName = "RoadmapTimeline";

export { RoadmapTimeline };
