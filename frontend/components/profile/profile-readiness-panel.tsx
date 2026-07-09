"use client";

import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { ChecklistItem } from "@/types/profile";

interface ProfileReadinessPanelProps extends HTMLAttributes<HTMLDivElement> {
  checklist: ChecklistItem[];
}

const ProfileReadinessPanel = forwardRef<HTMLDivElement, ProfileReadinessPanelProps>(
  ({ className, checklist, ...props }, ref) => {
    const missing = checklist.filter((item) => !item.completed);
    const recommendations = [
      "Add a portfolio link to showcase your work",
      "Complete your GitHub profile with recent projects",
      "Add more advanced skills to stand out",
      "Upload your latest certifications",
    ];

    return (
      <Card
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Profile Readiness"
        {...props}
      >
        <CardHeader>
          <CardTitle>Profile Readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ListChecks className="h-4 w-4 text-cyan" aria-hidden="true" />
                <h3 className="text-body font-medium text-primary">Missing Fields</h3>
              </div>
              {missing.length > 0 ? (
                <div className="space-y-2">
                  {missing.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-start gap-2 rounded-lg border p-2.5 text-body-small",
                        item.required
                          ? "border-danger/20 bg-danger/5"
                          : "border-border bg-surface-0"
                      )}
                    >
                      {item.required ? (
                        <AlertCircle className="h-4 w-4 text-danger mt-0.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <Lightbulb className="h-4 w-4 text-warning mt-0.5 shrink-0" aria-hidden="true" />
                      )}
                      <div className="min-w-0">
                        <p className="text-secondary">{item.label}</p>
                        {item.required && (
                          <p className="text-smallest text-danger">Required</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body-small text-success flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  All fields complete
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-warning" aria-hidden="true" />
                <h3 className="text-body font-medium text-primary">Recommended Improvements</h3>
              </div>
              <div className="space-y-2">
                {recommendations.slice(0, 3).map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-lg border border-border bg-surface-0 p-2.5 text-body-small"
                  >
                    <ArrowUpRight className="h-4 w-4 text-cyan mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-secondary">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-ai" aria-hidden="true" />
                <h3 className="text-body font-medium text-primary">AI Suggestions</h3>
              </div>
              <p className="text-body-small text-tertiary mb-2">
                AI-powered profile improvement suggestions will appear here.
              </p>
              <Button
                variant="outline"
                size="sm"
                disabled
                title="Coming Soon"
                className="w-full"
              >
                Analyze Profile with AI
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
ProfileReadinessPanel.displayName = "ProfileReadinessPanel";

export { ProfileReadinessPanel };
export type { ProfileReadinessPanelProps };
