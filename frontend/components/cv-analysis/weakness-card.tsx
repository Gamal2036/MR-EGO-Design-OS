"use client";

import { AlertTriangle } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { severityConfig } from "@/data/cv-analysis";
import { cn } from "@/lib/utils";
import type { Weakness } from "@/types/cv-analysis";

export interface WeaknessCardProps extends HTMLAttributes<HTMLDivElement> {
  weaknesses: Weakness[];
}

const WeaknessCard = forwardRef<HTMLDivElement, WeaknessCardProps>(
  ({ className, weaknesses, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="danger"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Weaknesses"
        {...props}
      >
        <CardHeader>
          <CardTitle>Areas for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weaknesses.map((w) => {
              const severity = severityConfig[w.severity];
              return (
                <div
                  key={w.id}
                  className="flex gap-3 rounded-lg bg-danger/5 p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-danger/10">
                    <AlertTriangle
                      className="h-4 w-4 text-danger"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-label font-medium text-primary">
                        {w.title}
                      </p>
                      <Badge variant={severity.variant} size="xs">
                        {severity.label}
                      </Badge>
                    </div>
                    <p className="text-caption text-secondary mt-0.5">
                      {w.description}
                    </p>
                    <span className="text-smallest text-tertiary">
                      {w.category}
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
WeaknessCard.displayName = "WeaknessCard";

export { WeaknessCard };
