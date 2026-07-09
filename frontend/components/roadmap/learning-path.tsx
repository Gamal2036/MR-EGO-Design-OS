"use client";

import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { ProgressBar } from "@/components/feedback/progress-bar";
import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/foundation/card";
import {
  roadmapDifficultyConfig,
  roadmapLearningPathStatusConfig,
} from "@/data/roadmaps";
import { cn } from "@/lib/utils";
import type { AIRoadmapLearningPath } from "@/types/roadmap";

export interface LearningPathProps extends HTMLAttributes<HTMLDivElement> {
  items: AIRoadmapLearningPath[];
}

const LearningPath = forwardRef<HTMLDivElement, LearningPathProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Learning path"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Learning Path</CardTitle>
          </div>
          <CardDescription>
            Curated courses and resources for your target role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="grid grid-cols-1 gap-3"
            role="list"
            aria-label="Learning path items"
          >
            {items.map((item) => {
              const statusConfig = roadmapLearningPathStatusConfig[item.status];
              const difficulty = roadmapDifficultyConfig[item.difficulty];

              return (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-xl border border-border bg-card p-4 transition-colors hover:border-hover",
                    item.status === "in-progress" && "border-ai/30 bg-ai/5"
                  )}
                  role="listitem"
                  aria-label={`${item.title}: ${statusConfig.label}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          item.status === "completed"
                            ? "bg-success/10 text-success"
                            : item.status === "in-progress"
                            ? "bg-ai/10 text-ai"
                            : "bg-surface-1 text-tertiary"
                        )}
                        aria-hidden="true"
                      >
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-label font-semibold text-primary">
                            {item.title}
                          </h4>
                          <Badge variant={statusConfig.variant} size="xs">
                            {statusConfig.label}
                          </Badge>
                          <Badge
                            variant="outline"
                            size="xs"
                            className={difficulty.color}
                          >
                            {difficulty.label}
                          </Badge>
                        </div>
                        <p className="text-caption text-secondary mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-caption text-tertiary">
                        {item.estimatedHours}h
                      </span>
                      <span className="text-caption font-medium text-primary">
                        {item.progress}%
                      </span>
                    </div>
                    <ProgressBar
                      value={item.progress}
                      variant={
                        item.progress >= 80
                          ? "success"
                          : item.progress >= 40
                          ? "ai"
                          : "warning"
                      }
                      size="sm"
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {item.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="neutral" size="xs">
                        {skill}
                      </Badge>
                    ))}
                    {item.skills.length > 3 && (
                      <Badge variant="neutral" size="xs">
                        +{item.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  {item.href && (
                    <Button
                      asChild
                      variant="link"
                      size="sm"
                      className="mt-2 h-auto p-0"
                    >
                      <Link href={item.href}>
                        Continue
                        <ArrowRight
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
LearningPath.displayName = "LearningPath";

export { LearningPath };
