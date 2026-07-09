"use client";

import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/foundation/card";
import type { JobMatch } from "@/data/dashboard";
import { cn } from "@/lib/utils";

interface JobMatchCardProps extends HTMLAttributes<HTMLDivElement> {
  job: JobMatch;
  onView?: () => void;
}

function getMatchColor(score: number): "success" | "ai" | "warning" | "neutral" {
  if (score >= 90) return "success";
  if (score >= 75) return "ai";
  if (score >= 60) return "warning";
  return "neutral";
}

const JobMatchCard = forwardRef<HTMLDivElement, JobMatchCardProps>(
  ({ className, job, onView, ...props }, ref) => {
    const matchColor = getMatchColor(job.matchScore);

    return (
      <Card
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="article"
        aria-label={`${job.title} at ${job.company}`}
        {...props}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-3 w-full">
            <div className="space-y-1 min-w-0 flex-1">
              <CardTitle className="text-label text-primary truncate-single">
                {job.title}
              </CardTitle>
              <p className="text-body-small text-secondary">{job.company}</p>
            </div>
            <Badge variant={matchColor} size="sm" className="shrink-0">
              {job.matchScore}% Match
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-caption text-tertiary">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {job.location}
            </span>
            <span className="flex items-center gap-1 text-caption text-tertiary">
              <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
              {job.category}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-label font-medium text-primary">
              {job.salary}
            </span>
            <span className="text-caption text-tertiary">
              {job.postedDate}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={onView}
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            View Job
          </Button>
        </CardFooter>
      </Card>
    );
  }
);
JobMatchCard.displayName = "JobMatchCard";

export { JobMatchCard };
export type { JobMatchCardProps };
