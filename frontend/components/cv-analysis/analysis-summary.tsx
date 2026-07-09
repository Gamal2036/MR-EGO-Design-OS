"use client";

import { Brain, Sparkles } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

const AnalysisSummary = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="ai"
        padding="lg"
        className={cn("", className)}
        role="region"
        aria-label="AI analysis summary"
        {...props}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-ai" aria-hidden="true" />
            <CardTitle>AI Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <Sparkles className="h-10 w-10 text-ai/40" aria-hidden="true" />
            <div className="max-w-md space-y-2">
              <p className="text-body text-secondary">
                AI-powered summary will analyze your CV and provide a
                comprehensive overview of strengths, weaknesses, and
                actionable recommendations.
              </p>
              <p className="text-caption text-tertiary">
                This feature will be available once AI providers are
                configured and connected.
              </p>
            </div>
            <Button variant="outline" size="sm" disabled>
              Generate Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);
AnalysisSummary.displayName = "AnalysisSummary";

export { AnalysisSummary };
