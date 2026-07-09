"use client";

import { Route } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { CareerRoadmapStep } from "./career-roadmap-step";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { RoadmapStep } from "@/types/career-progress";

export interface CareerRoadmapProps extends HTMLAttributes<HTMLDivElement> {
  steps: RoadmapStep[];
}

const CareerRoadmap = forwardRef<HTMLDivElement, CareerRoadmapProps>(
  ({ className, steps, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn("h-full", className)}
        role="region"
        aria-label="Career roadmap"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Route className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>Roadmap</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div role="list" aria-label="Career roadmap steps" className="space-y-0">
            {steps.map((step, index) => (
              <CareerRoadmapStep
                key={step.id}
                step={step}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);
CareerRoadmap.displayName = "CareerRoadmap";

export { CareerRoadmap };
