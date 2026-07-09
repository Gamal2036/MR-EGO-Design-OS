"use client";

import { AlertTriangle, ArrowRight } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { severityConfig } from "@/data/cv-analysis";
import { cn } from "@/lib/utils";
import type { Weakness } from "@/types/cv-analysis";

export interface PriorityFixCardProps extends HTMLAttributes<HTMLDivElement> {
  weaknesses: Weakness[];
  limit?: number;
}

const PriorityFixCard = forwardRef<HTMLDivElement, PriorityFixCardProps>(
  ({ className, weaknesses, limit = 4, ...props }, ref) => {
    const topFixes = weaknesses
      .filter((w) => w.severity === "high")
      .slice(0, limit);

    if (topFixes.length === 0) return null;

    return (
      <Card
        ref={ref}
        variant="danger"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="Priority fixes"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle
              className="h-5 w-5 text-danger"
              aria-hidden="true"
            />
            <CardTitle>Priority Fixes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topFixes.map((fix) => {
              const severity = severityConfig[fix.severity];
              return (
                <div
                  key={fix.id}
                  className="flex items-start gap-3 rounded-lg bg-danger/5 p-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-label font-medium text-primary">
                        {fix.title}
                      </span>
                      <Badge variant={severity.variant} size="xs">
                        {severity.label}
                      </Badge>
                    </div>
                    <p className="text-caption text-secondary mt-0.5">
                      {fix.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="xs">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
);
PriorityFixCard.displayName = "PriorityFixCard";

export { PriorityFixCard };
