"use client";

import { AlertOctagon, RefreshCw } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

export interface AnalysisErrorStateProps
  extends HTMLAttributes<HTMLDivElement> {
  onRetry?: () => void;
  message?: string;
}

const AnalysisErrorState = forwardRef<
  HTMLDivElement,
  AnalysisErrorStateProps
>(({ className, onRetry, message, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "min-h-0 flex-1 flex items-center justify-center p-8",
        className
      )}
      role="alert"
      {...props}
    >
      <Card variant="danger" padding="xl" className="max-w-md text-center">
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <AlertOctagon className="h-12 w-12 text-danger" aria-hidden="true" />
            <div className="space-y-2">
              <h2 className="text-heading-3 text-primary font-semibold">
                Analysis Error
              </h2>
              <p className="text-body text-secondary">
                {message ||
                  "We encountered an error while analyzing your CV. Please try again."}
              </p>
            </div>
            <Button
              variant="primary"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={onRetry}
            >
              Retry Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
AnalysisErrorState.displayName = "AnalysisErrorState";

export { AnalysisErrorState };
